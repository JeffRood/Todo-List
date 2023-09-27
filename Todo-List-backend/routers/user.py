
from fastapi import APIRouter, HTTPException, status
from typing import List
from models.user import Token
from services.user import UserService
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from datetime import datetime, timedelta


router = APIRouter(
    prefix="/user",
    tags=["user"]
)


@router.post("/token", response_model=Token)
async def login_for_access_token(email, password ):
    user_service_instance = UserService()

    user = await user_service_instance.authenticate_user(email, password)

    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password",
            headers={"WWW-Authenticate": "Bearer"},
        )

    access_token_expires = timedelta(minutes=30)
    access_token = await user_service_instance.create_access_token(data={"sub": user['email'], "name": user['name'], "id": str(user['_id'])}, expires_delta=access_token_expires)
    return {"access_token": access_token, "token_type": "bearer"}