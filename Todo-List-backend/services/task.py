
from bson import ObjectId
from models.task import StatusEnum, StatusProcessEnum, TaskModel, CreateTask
from utils.mongo_utils import MongoAtlas


class TaskService():
    def __init__(self):
        self.mongo_util = MongoAtlas()

  
    async def create_task(self, task: CreateTask):
        try:
            users_collection = self.mongo_util.get_collections().Users
            user_document = users_collection.find_one({"_id": ObjectId(task.userId)})
            if user_document:
                task_model = TaskModel(
                    name= task.name,
                    description= task.description,
                    expirationDate= task.expirationDate,
                    userId= str(user_document['_id']),
                    status= StatusEnum.activa, 
                    statusProcess=StatusProcessEnum.pendiente
                )

                task_collection = self.mongo_util.get_collections().Task
                task_collection.insert_one(task_model.dict())
                return {"data": None, "Success": True, "message": ""}
            else:
                return {"data": None, "Success": False, "message": "Este usuario no esta registrado"}
              
        except Exception as e:
            return {"data": None, "Success": False, "message": f"Error al crear tareas: {str(e)}"}
    

    async def get_list(self, page: int, limit: int):
        try:
            task_collection = self.mongo_util.get_collections().Task
            skip = (page - 1) * limit
            condition = {"status": "Activa"}
            projection = {"name": 1, "description": 1, "expirationDate": 1, "status": 1, "statusProcess": 1, "userId": 1 }
            tasks = list(task_collection.find(condition, projection).skip(skip).limit(limit))
            
            if tasks:
                total_count = task_collection.count_documents(condition)
                for task in tasks:
                    task["_id"] = str(task["_id"])
                    if "userId" in task:
                        task["userId"] = str(task["userId"])

                return {"data": tasks, "totalrow": total_count, "Success": True, "message": ""}
            
            else:
                return {"data": {}, "totalrow": 0, "Success": False, "message": "No se encontraron tareas"}
        
        except Exception as e:
            return {"data": None, "Success": False, "message": f"Error al obtener la lista de tareas: {str(e)}"}


    
    async def update_task(self, taskId,  updated_task: TaskModel):
        try:
            task_collection = self.mongo_util.get_collections().Task


            existing_task = task_collection.find_one({"_id": ObjectId(taskId)})
            if not existing_task:
                return {"data": None, "Success": False, "message": "Tarea no encontrada"}

            update_data = {
                "name": updated_task.name,
                "description": updated_task.description,
                "expirationDate": updated_task.expirationDate,
                "status": updated_task.status,
                "statusProcess": updated_task.statusProcess
            }

            task_collection.update_one({"_id": ObjectId(taskId)}, {"$set": update_data})
            return {"data": update_data, "Success": True, "message": "Tarea actualizada exitosamente"}

        except Exception as e:
            return {"data": None, "Success": False, "message": f"Error al actualizar la tarea: {str(e)}"}
            

    async def delete_task(self, task_id: str):
        try:
            task_collection = self.mongo_util.get_collections().Task
            existing_task = task_collection.find_one({"_id": ObjectId(task_id)})
            if not existing_task:
                return {"data": None, "Success": False, "message": "Tarea no encontrada"}

            task_collection.update_one({"_id": ObjectId(task_id)}, {"$set": {"status": StatusEnum.Inactiva}})
            return {"data": None, "Success": True, "message": "Tarea Eliminada Correctamente"}

        except Exception as e:            
            return {"data": None, "Success": False, "message": f"Error al eliminar la tarea: {str(e)}"}

