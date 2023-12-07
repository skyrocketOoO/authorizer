from fastapi import APIRouter, HTTPException, Depends, status, Response
from sqlalchemy.orm import Session
from internal.usecases import user as user_usecase
from pydantic import BaseModel
from internal.db.db import get_db
from internal.middleware.bearer import annotated_bearer_middleware
from utils import error
import logging


router = APIRouter()

class User(BaseModel):
    id: int
    name: str
    email: str
    hashed_password: str

@router.get("/", response_model=list[User])
def list_users(response: Response, db: Session = Depends(get_db)):
    users = user_usecase.list_users(db)
    response.headers["X-Total-Count"] = str(len(users))
    return users

@router.get("/{id}")
def get_user(id: int, db: Session = Depends(get_db)):
    try:
        return user_usecase.get_user(id, db)
    except error.UserNotFoundError as e:
        raise HTTPException(404, detail=e.message)

class UpdateUserReq(BaseModel):
    name: str
    password: str

@router.put("/{id}")
def update_user(id: int, update_user_req: UpdateUserReq, db: Session = Depends(get_db)):
    try:
        return user_usecase.update_user(id, update_user_req.name, update_user_req.password, db)
    except error.UserNotFoundError as e:
        raise HTTPException(404, detail=e.message)
    
@router.delete("/{id}")
def delete_user(id: int, db: Session = Depends(get_db)):
    try:
        user_usecase.delete_user(id, db)
    except error.UserNotFoundError as e:
        raise HTTPException(404, detail=e.message)