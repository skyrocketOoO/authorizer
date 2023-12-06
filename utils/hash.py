import bcrypt


def hash_password(password: str) -> str:
    salt = b'$2b$12$zx7JK9Wwx2FgDe7GUjrV6.'
    hashed_password = bcrypt.hashpw(password.encode('utf-8'), salt)
    return hashed_password.decode('utf-8')
