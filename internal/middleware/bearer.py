from typing import Annotated
from fastapi.security import OAuth2PasswordBearer
from fastapi import Depends


oauth2_schema = OAuth2PasswordBearer(tokenUrl="login")
annotated_bearer_middleware = Annotated[str, Depends(oauth2_schema)]