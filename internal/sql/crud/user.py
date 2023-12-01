from sqlalchemy.orm import Session
from ..models import User
from typing import List
from ..schemas.user import UserCreateReq, UserUpdateReq

#TODO: don't return password
def list_users(db: Session) -> List[User]:
    return db.query(User).all()

def get_user_by_email(db: Session, email: str) -> User | None:
    return db.query(User).filter(User.email == email).first()

def get_user(db: Session, id: int) -> User | None:
    return db.query(User).filter(User.id == id).first()

def create_user(db: Session, user_create_req: UserCreateReq) -> User | None:
    db_user = User(**user_create_req.model_dump())
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

def update_user(db: Session, user_update_req: UserUpdateReq) -> User | None:
    db_user = get_user(db, user_update_req.id)
    for field, value in user_update_req.model_dump(exclude_unset=True).items():
        setattr(db_user, field, value)
    db.commit()
    db.refresh(db_user)
    return db_user

def delete_user(db: Session, id: int):
    db_user = get_user(db, id)
    db.delete(db_user)
    db.commit()

