

from datetime import timedelta, datetime
from fastapi import Depends
from fastapi.security import OAuth2PasswordBearer
from jose import JWTError, jwt
import configparser

from models.user import User

class AuthHelper:
    def __init__(self):
        self.config = configparser.ConfigParser()
        self.config.read("config.ini")

    oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

    def create_access_token(self, data: dict, expires_delta: timedelta):
        to_encode = data.copy()
        expire = datetime.utcnow() + expires_delta
        to_encode.update({"exp": expire})
        encoded_jwt = jwt.encode(to_encode, self.config['configuration']['SECRET_KEY'], algorithm=self.config['configuration']['ALGORITHM'])
        return encoded_jwt

    def get_current_user(self, token: str = Depends(oauth2_scheme)):
        try:
            payload = jwt.decode(token, self.config['configuration']['SECRET_KEY'], algorithms= [self.config['configuration']['ALGORITHM']])
            username: str = payload.get("sub")
            if username is None:
                return None
            user = User(username=username, email="user@example.com")  
            return user
        except JWTError:
            return None