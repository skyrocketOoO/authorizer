from fastapi import APIRouter, HTTPException, Depends, status
from sqlalchemy.orm import Session
from ..usecase import user as user_usecase
from pydantic import BaseModel
from ..sql.database import get_db
from ..middleware.bearer import annotated_bearer_middleware

router = APIRouter()


class RegisterReq(BaseModel):
    name: str
    email: str
    password: str

@router.post("/register")
def register(register_req: RegisterReq, token: annotated_bearer_middleware, db: Session = Depends(get_db)):
    user_usecase.register(db, RegisterReq.email, register_req.password, register_req.name)
    
class LoginReq(BaseModel):
    email: str
    password: str

@router.post("/login")
def login(login_req: LoginReq, token: annotated_bearer_middleware, db: Session = Depends(get_db)):
    token = user_usecase.login(db, login_req.email, login_req.password)
    if token:
        return {"token": token}
    else:
        raise HTTPException(status_code=401, detail="Login failed")

@router.post("/current_user")
def get_current_user(token: annotated_bearer_middleware, db: Session = Depends(get_db)):
    # Validate and decode JWT token
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    user = user_usecase.get_user(db, token)
    if user is None:
        raise credentials_exception
    return user

@router.get("/")
def list_users(token: annotated_bearer_middleware, db: Session = Depends(get_db)):
    return user_usecase.list_users(db)
    
class UpdateUserReq(BaseModel):
    name: str

@router.patch("/")
def update_user(update_user_req: UpdateUserReq, token: annotated_bearer_middleware, db: Session = Depends(get_db)):
    user_usecase.update_user(db, token, update_user_req.name)

@router.delete("/")
def delete_user(token: annotated_bearer_middleware, db: Session = Depends(get_db)):
    user_usecase.delete_user(db, token)



