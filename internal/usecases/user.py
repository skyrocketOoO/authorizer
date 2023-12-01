from ..sql.crud import user as user_crud
from sqlalchemy.orm import Session
from ..sql.models import User
from typing import List
from utils import hash
from utils.auth import jwt

def register(db: Session, email: str, password: str, name: str):
    user = user_crud.get_user_by_email(db, email)
    if user:
        raise "Email already registered"
    user_create_req = user_schema.UserCreateReq()
    user_create_req.email = email
    user_create_req.hashed_password = hash.hash_password(password)
    user_create_req.name = name
    user_crud.create_user(db, user_create_req)

def login(db: Session, email: str, password: str) -> str | None:
    db_user = user_crud.get_user_by_email(db, email)
    
    if db_user and hash.hash_password(password) == db_user.hashed_password:
        return create_access_token({
            id: db_user.id
        })
    else:
        return None
    
def get_userid_by_token(token: str) -> int:
    info = decode_token(token)
    user_id = info.get("id")
    return user_id
    
def get_user(db: Session, token: str) -> User | None:
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
    user_update_req = user_schema.UserUpdateReq()
    user_update_req.name = name
    
    user = get_user(db, token)
    if user is None:
        raise "user not found"
    user_update_req.id = user.id
    user_crud.update_user(db, user_update_req)
    
def delete_user(db: Session, token: str):
    user = get_user(db, token)
    user_crud.delete_user(db, user.id)

def change_password(db: Session, token: str, old_password: str, new_password: str):
    user = get_user(db, token)
    # Add logic to check old password and update the password securely
    if user is None:
        raise "user not found"
    if user.hashed_password != hash.hash_password(old_password):
        raise "Password not correct"
    user.hashed_password = hash.hash_password(new_password)
    db.commit()
    db.refresh(user)


