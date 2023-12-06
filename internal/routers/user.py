from fastapi import APIRouter, HTTPException, Depends, status
from sqlalchemy.orm import Session
from internal.usecases import user as user_usecase
from pydantic import BaseModel
from internal.db.db import get_db
from internal.middleware.bearer import annotated_bearer_middleware
import logging


router = APIRouter()

class RegisterReq(BaseModel):
    name: str
    email: str
    password: str

@router.post("/register")
def register(register_req: RegisterReq, db: Session = Depends(get_db)):
    user_usecase.register(db, register_req.email, register_req.password, register_req.name)
    return None
    
class LoginReq(BaseModel):
    email: str
    password: str

@router.post("/login")
def login(login_req: LoginReq, db: Session = Depends(get_db)):
    token = user_usecase.login(db, login_req.email, login_req.password)
    if token:
        return {"token": token}
    else:
        raise HTTPException(status_code=401, detail="Login failed")

@router.get("/")
def get_current_user(token: annotated_bearer_middleware, db: Session = Depends(get_db)):
    # Validate and decode JWT token
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    user = user_usecase.get_current_user(db, token)
    if user is None:
        raise credentials_exception
    return user
    
class UpdateUserReq(BaseModel):
    name: str

@router.put("/")
def update_user(update_user_req: UpdateUserReq, token: annotated_bearer_middleware, db: Session = Depends(get_db)):
    user_usecase.update_user(db, token, update_user_req.name)

@router.delete("/")
def delete_user(token: annotated_bearer_middleware, db: Session = Depends(get_db)):
    user_usecase.delete_user(db, token)



