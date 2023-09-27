
from bson import ObjectId
from models.task import StatusEnum, StatusProcessEnum, TaskModel, CreateTask
from utils.mongo_utils import MongoAtlas


class TaskService():
    def __init__(self):
        self.mongo_util = MongoAtlas()

  
    async def create_task(self, task: CreateTask):
        try:
            task_model = TaskModel(
                id=None,
                name= task.name,
                description= task.description,
                expirationDate= task.expirationDate,
                userId= task.userId,
                status= StatusEnum.activa, 
                statusProcess=StatusProcessEnum.pendiente
            )

            task_collection = self.mongo_util.get_collections().Task
            result = task_collection.insert_one(task_model.dict())
            task_id = str(result.inserted_id)
            task_model.id = task_id
            return task_model
              
        except Exception as e:
            print(f"Error al obtener la lista de tareas: {str(e)}")
            return []
    


    async def get_list(self, page: int, limit: int):
        try:
            task_collection = self.mongo_util.get_collections().Task
            skip = (page - 1) * limit
            condition = {"status": "Activa", "userId": "userId"}
            projection = {"_id": 0, "name": 1, "description": 1, "expirationDate": 1, "status": 1, "statusProcess": 1}
            tasks = list(task_collection.find(condition, projection).skip(skip).limit(limit))
            
            if tasks:
                return tasks
            else:
                return {"message": "No se encontraron tareas"}
        
        except Exception as e:
            print(f"Error al obtener la lista de tareas: {str(e)}")
            return []
        
    
    async def update_task(self, updated_task: TaskModel):
        try:
            task_collection = self.mongo_util.get_collections().Task


            existing_task = task_collection.find_one({"_id": ObjectId(updated_task.id)})
            if not existing_task:
                return {"message": "Tarea no encontrada"}

            update_data = {
                "name": updated_task.name,
                "description": updated_task.description,
                "expirationDate": updated_task.expirationDate,
                "status": updated_task.status,
                "statusProcess": updated_task.statusProcess
            }

            task_collection.update_one({"_id": ObjectId(updated_task.id)}, {"$set": update_data})

            return {"message": "Tarea actualizada exitosamente"}

        except Exception as e:
            print(f"Error al actualizar la tarea: {str(e)}")
            return {"message": "Error al actualizar la tarea"}


    async def delete_task(self, task_id: str):
        try:
            task_collection = self.mongo_util.get_collections().Task
            existing_task = task_collection.find_one({"_id": ObjectId(task_id)})
            if not existing_task:
                return {"message": "Tarea no encontrada"}

            task_collection.update_one({"_id": ObjectId(task_id)}, {"$set": {"status": StatusEnum.Inactiva}})

            return {"message": "Tarea marcada como inactiva"}

        except Exception as e:
            print(f"Error al eliminar la tarea: {str(e)}")
            return {"message": "Error al eliminar la tarea"}
