from internal.sql.crud import user as user_crud
from sqlalchemy.orm import Session
from internal.sql.models import User
from utils import hash
from utils import error


def get_users(
    db: Session,
    _start: int,
    _end: int,
    _sort: str,
    _order: str,
    name: str,
):
    return user_crud.get_users(db, _start, _end, _sort, _order, name)

def get_user(id: int, db: Session):
    user = user_crud.get_user(db, id)
    if user is None:
        raise error.UserNotFoundError()
    return user

def update_user(id: int, name: str, password: str, db: Session):
    user_crud.update_user(db, id, name)

def delete_user(id: int, db: Session):
    user_crud.delete_user(db, id)
    