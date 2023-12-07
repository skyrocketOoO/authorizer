from datetime import datetime, timedelta
import logging
import jwt


SECRET_KEY = "amlhbXdmYTAxMGYzYTkpXzM4MWFsCg"
ALGORITHM = "HS256"
# ACCESS_TOKEN_EXPIRE_MINUTES = 30

def create_access_token(data: dict) -> str:
    to_encode = data.copy()
    # expire = datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    # to_encode.update({"exp": expire.timestamp()})
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)

def decode_token(token: str) -> dict:
    try:
        decoded_token = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        return decoded_token
    except jwt.ExpiredSignatureError:
        # Handle token expiration
        print("Token has expired")
        return {}
    except jwt.InvalidTokenError:
        # Handle other token validation errors
        print("Invalid token")
        return {}