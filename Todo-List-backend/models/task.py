from enum import Enum
from typing import Optional
from pydantic import BaseModel
import datetime


class StatusProcessEnum(str, Enum):
    pendiente = "Pendiente"
    completada = "Completada"


class StatusEnum(str, Enum):
    activa = "Activa"
    Inactiva = "Inactiva"


class TaskModel(BaseModel):
    id: Optional[int]
    name: str 
    description: str
    expirationDate: datetime.datetime
    status: StatusEnum
    statusProcess: StatusProcessEnum
    userId: str

class CreateTask(BaseModel):
    name: str 
    description: str
    expirationDate: datetime.datetime
    userId: str




