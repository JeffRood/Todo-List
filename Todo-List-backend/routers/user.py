
from fastapi import APIRouter
from typing import List
from models.user import LoginRequest
from services.user import UserService
from datetime import datetime, timedelta


router = APIRouter(
    prefix="/user",
    tags=["user"]
)



@router.post("/token")
async def login_for_access_token(login_data: LoginRequest):
    try:
        user_service_instance = UserService()
        email = login_data.email
        password = login_data.password
        user = await user_service_instance.authenticate_user(email, password)

        if not user:
            return {"data": None, "Success": False, "message": "Incorrect email or password"}

        access_token_expires = timedelta(minutes=30)
        access_token = await user_service_instance.create_access_token(data={"sub": user['email'], "name": user['name'], "id": str(user['_id'])}, expires_delta=access_token_expires)
        return {"data": {"access_token": access_token, "token_type": "bearer"}, "Success": True, "message": "token generado correctamente"}
    
    except Exception as e:            
            return {"data": None, "Success": False, "message": f"Error al generar token: {str(e)}"}
