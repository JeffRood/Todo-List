from pydantic import BaseModel


class User(BaseModel):
    username: str
    email: str



class Token(BaseModel):
    access_token: str
    token_type: str    


class LoginRequest(BaseModel):
    email: str
    password: str