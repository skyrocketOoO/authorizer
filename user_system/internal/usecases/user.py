from internal.sql.crud import user as user_crud
from sqlalchemy.orm import Session
from internal.sql.models import User
from utils import hash
from utils import error


def list_users(db: Session):
    return user_crud.list_users(db)

def get_user(id: int, db: Session):
    user = user_crud.get_user(db, id)
    if user is None:
        raise error.UserNotFoundError()
    return user

def update_user(id: int, name: str, password: str, db: Session):
    user_crud.update_user(db, id, name, hash.hash_password(password))

def delete_user(id: int, db: Session):
    user_crud.delete_user(db, id)
    