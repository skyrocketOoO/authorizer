from sqlalchemy.orm import Session
from ..models import User
from typing import List


def get_users(
    db: Session,
    _start: int,
    _end: int,
    _sort: str,
    _order: str,
    name: str,
) -> List[User]:
    # Construct your query based on the provided parameters
    query = db.query(User)

    # Apply filters
    if name:
        query = query.filter(User.name == name)

    # Sort the results
    query = query.order_by(getattr(User, _sort))

    # Apply sorting order
    if _order == "DESC":
        query = query.reverse()

    # Apply pagination
    users = query.offset(_start).limit(_end - _start).all()

    return users

def get_user_by_email(db: Session, email: str) -> User | None:
    return db.query(User).filter(User.email == email).first()

def get_user(db: Session, id: int) -> User | None:
    return db.query(User).filter(User.id == id).first()

def create_user(db: Session, email: str, hashed_password: str, name: str) -> User | None:
    db_user = User(
        email=email,
        hashed_password=hashed_password,
        name=name
    )
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

def update_user(db: Session, id: int, name: str, password: str = None) -> User | None:
    db_user = get_user(db, id)
    if name != "":
        db_user.name = name
    if password != None:
        db_user.hashed_password = password
    db.commit()
    db.refresh(db_user)
    return db_user

def delete_user(db: Session, id: int):
    db_user = get_user(db, id)
    db.delete(db_user)
    db.commit()

