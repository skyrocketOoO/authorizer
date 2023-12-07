import secrets
from datetime import datetime, timedelta

# In-memory storage (replace with a database in a real-world scenario)
reset_tokens = {}

def generate_unique_token(length=32):
    return secrets.token_urlsafe(length)

def initiate_password_reset(user_id):
    token = generate_unique_token()

    expiration_time = datetime.now() + timedelta(hours=1)
    reset_tokens[token] = {'user_id': user_id, 'expiration_time': expiration_time}

    return token

def verify_reset_token(token):
    token_details = reset_tokens.get(token)

    if token_details and datetime.now() < token_details['expiration_time']:
        return token_details['user_id']
    else:
        return None

if __name__ == '__main__':
    user_id = 123
    reset_token = initiate_password_reset(user_id)

    # Simulate user clicking on the reset link
    user_id_from_token = verify_reset_token(reset_token)

    if user_id_from_token:
        print(f"Token verified. Reset for user with ID {user_id_from_token}.")
    else:
        print("Invalid or expired token.")
