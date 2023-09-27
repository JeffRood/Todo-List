
from jose import JWTError, jwt
from datetime import datetime, timedelta
import configparser
from models.user import User
from utils.mongo_utils import MongoAtlas


class UserService():
    def __init__(self):
        self.config = configparser.ConfigParser()
        self.config.read("config.ini")
        self.mongo_util = MongoAtlas()


    async def create_access_token(self, data: dict, expires_delta: timedelta):
        to_encode = data.copy()
        expire = datetime.utcnow() + expires_delta
        to_encode.update({"exp": expire})
        encoded_jwt = jwt.encode(to_encode, self.config['configuration']['SECRET_KEY'], algorithm= self.config['configuration']['ALGORITHM'])
        return encoded_jwt


    async def authenticate_user(self, email: str, password: str):
        users_collection = self.mongo_util.get_collections().Users
        user_document = users_collection.find_one({"email": email, "pwd": password})
        if user_document:
            return user_document
        else:
            return None