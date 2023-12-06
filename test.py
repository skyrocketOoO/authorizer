from datetime import datetime, timedelta
import jwt

SECRET_KEY = "your_secret_key"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30

def create_access_token(data: dict) -> str:
    to_encode = data.copy()

    # Convert expiration time to a timestamp
    expire = datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode.update({"exp": expire.timestamp()})

    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)

# Example usage:
user_data = {"user_id": 123}
token = create_access_token(user_data)
print(token)
