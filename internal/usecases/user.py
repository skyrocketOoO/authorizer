from internal.sql.crud import user as user_crud
from sqlalchemy.orm import Session
from internal.sql.models import User
from utils import hash
from utils.auth import jwt
from utils import error

import logging


def register(db: Session, email: str, password: str, name: str):
    user = user_crud.get_user_by_email(db, email)
    if user:
        raise error.EmailAlreadyRegisteredError()
    user_crud.create_user(db, email, hash.hash_password(password), name)
    
def login(db: Session, email: str, password: str) -> str | None:
    db_user = user_crud.get_user_by_email(db, email)
    if db_user and hash.hash_password(password) == db_user.hashed_password:
        return jwt.create_access_token({
            "id": db_user.id
        })
    else:
        return None
    
def get_userid_by_token(token: str) -> int:
    info = jwt.decode_token(token)
    user_id = info.get("id")
    return user_id
    
def get_current_user(db: Session, token: str) -> User | None:
    user_id = get_userid_by_token(token)
    user = user_crud.get_user(db, user_id)
    return user    

def logout(db: Session):
    # In a stateless environment (like REST APIs with token-based authentication),
    # logout might be handled on the client-side by expiring or removing the authentication token.
    # If you're working with sessions, you might need to handle session termination here.
    # Depending on your authentication mechanism, the implementation might vary.
    pass

def update_user(db: Session, token: str, name: str):
    user = get_current_user(db, token)
    if user is None:
        raise error.UserNotFoundError()
    user_crud.update_user(db, user.id, name)
    
def delete_user(db: Session, token: str):
    user = get_current_user(db, token)
    if user is None:
        raise error.UserNotFoundError()
    user_crud.delete_user(db, user.id)

def change_password(db: Session, token: str, old_password: str, new_password: str):
    user = get_current_user(db, token)
    if user is None:
        raise error.UserNotFoundError()
    if user.hashed_password != hash.hash_password(old_password):
        raise error.PasswordIncorrectError()
    user.hashed_password = hash.hash_password(new_password)
    user_crud.update_user(db, user.id, user.name, user.hashed_password)


