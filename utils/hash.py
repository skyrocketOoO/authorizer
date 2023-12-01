import bcrypt


def hash_password(password: str) -> str:
    salt = "ZWZqMTkoMDEyLWtsa2EwOS4uZmcwCg".encode('utf-8')
    hashed_password = bcrypt.hashpw(password.encode('utf-8'), salt)
    return hashed_password.decode('utf-8')
