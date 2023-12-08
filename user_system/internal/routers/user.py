from fastapi import APIRouter, HTTPException, Depends, status, Response, Query
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
def get_users(
    response: Response,
    db: Session = Depends(get_db),
    _start: int = Query(0, description="Start index for pagination"),
    _end: int = Query(10, description="End index for pagination"),
    _sort: str = Query("id", description="Field to sort by"),
    _order: str = Query("ASC", description="Sorting order (ASC or DESC)"),
    name: str = Query(None, description="Filter by name"),
):
    users = user_usecase.get_users(db, _start, _end, _sort, _order, name)
    response.headers["X-Total-Count"] = str(len(users))
    return users

@router.get("/{id}")
def get_user(id: int, db: Session = Depends(get_db)):
    try:
        return user_usecase.get_user(id, db)
    except error.UserNotFoundError as e:
        raise HTTPException(404, detail=e.message)

class UpdateUserReq(BaseModel):
    id: int
    name: str
    email: str
    # actually, its not been hashed
    hashed_password: str

@router.put("/{id}")
def update_user(id: int, update_user_req: UpdateUserReq, db: Session = Depends(get_db)):
    try:
        password = update_user_req.hashed_password
        return user_usecase.update_user(id, update_user_req.name, password, db)
    except error.UserNotFoundError as e:
        raise HTTPException(404, detail=e.message)
    
@router.delete("/{id}")
def delete_user(id: int, db: Session = Depends(get_db)):
    try:
        user_usecase.delete_user(id, db)
    except error.UserNotFoundError as e:
        raise HTTPException(404, detail=e.message)