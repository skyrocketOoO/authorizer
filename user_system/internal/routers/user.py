from fastapi import APIRouter, HTTPException, Depends, status
from sqlalchemy.orm import Session
from internal.usecases import user as user_usecase
from pydantic import BaseModel
from internal.db.db import get_db
from internal.middleware.bearer import annotated_bearer_middleware
from utils import error
import logging


router = APIRouter()

class RegisterReq(BaseModel):
    name: str
    email: str
    password: str

@router.post("/register")
def register(register_req: RegisterReq, db: Session = Depends(get_db)):
    try:
        user_usecase.register(db, register_req.email, register_req.password, register_req.name)
    except error.EmailAlreadyRegisteredError as e:
        raise HTTPException(status_code=409, detail=e.message)
    
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
    try:
        user_usecase.update_user(db, token, update_user_req.name)
    except error.UserNotFoundError as e:
        raise HTTPException(status_code=404, detail=e.message)
    
@router.delete("/")
def delete_user(token: annotated_bearer_middleware, db: Session = Depends(get_db)):
    try:
        user_usecase.delete_user(db, token)
    except error.UserNotFoundError as e:
        raise HTTPException(status_code=404, detail=e.message)

class ChangePasswordReq(BaseModel):
    old_password: str
    new_password: str

@router.post("/change_password")
def change_password(change_password_req: ChangePasswordReq, token: annotated_bearer_middleware, db: Session = Depends(get_db)):
    try:
        user_usecase.change_password(db, token, change_password_req.old_password, change_password_req.new_password)
    except error.UserNotFoundError as e:
        raise HTTPException(status_code=404, detail=e.message)
    except error.PasswordIncorrectError as e:    
        raise HTTPException(status_code=400, detail=e.message)
    
@router.post("/is_token_valid")
def is_token_valid(token: str = ""):
    # return True
    return user_usecase.is_token_valid(token)

class ForgetPasswordReq(BaseModel):
    email: str

@router.post("/forget_password")
def forget_password(forget_password_req: ForgetPasswordReq, db: Session = Depends(get_db)):
    try:
        user_usecase.forget_password(db, forget_password_req.email)
    except error.UserNotFoundError as e:
        raise HTTPException(status_code=404, detail=e.message)
    
class ResetPasswordReq(BaseModel):
    new_password: str

@router.post("/reset_password")
def reset_password(reset_password_req: ResetPasswordReq, token: str = "", db: Session = Depends(get_db)):
    try:
        user_usecase.reset_password(db, token, reset_password_req.new_password)
    except error.UserNotFoundError as e:
        raise HTTPException(status_code=404, detail=e.message)