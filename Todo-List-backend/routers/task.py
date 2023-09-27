from fastapi import APIRouter
from typing import List
from models.task import CreateTask, TaskModel
from services.task import TaskService


router = APIRouter(
    prefix="/task",
    tags=["task"]
)

@router.post("/create",)
async def create_task(task: CreateTask):
    data =  await TaskService().create_task(task)
    return (data)

@router.get("/list")
async def get_list(page: int = 1, limit: int = 10):
    result = await TaskService().get_list(page, limit)
    return (result)

@router.put("/update")
async def get_list(taskId, task: TaskModel):
    result = await TaskService().update_task(taskId, task)
    return (result)

@router.delete("/{task_id}")
async def delete_task(task_id):
    result = await TaskService().delete_task(task_id)
    return (result)
