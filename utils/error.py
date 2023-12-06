

class EmailAlreadyRegisteredError(Exception):
    def __init__(self, message="Email already registered"):
        self.message = message
        super().__init__(self.message)

class UserNotFoundError(Exception):
    def __init__(self, message="User not found"):
        self.message = message
        super().__init__(self.message)

class PasswordIncorrectError(Exception):
    def __init__(self, message="Password is incorrect"):
        self.message = message
        super().__init__(self.message)