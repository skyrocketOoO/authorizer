from sqlalchemy.orm import Session
from ..models import User
from typing import List

#TODO: don't return password
def list_users(db: Session) -> List[User]:
    return db.query(User).all()

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

def update_user(db: Session, id: int, name: str) -> User | None:
    db_user = get_user(db, id)
    if name != "":
        db_user.name = name
    db.commit()
    db.refresh(db_user)
    return db_user

def delete_user(db: Session, id: int):
    db_user = get_user(db, id)
    db.delete(db_user)
    db.commit()

