from fastapi import FastAPI
import uvicorn
import routers.task as task
import routers.user as User

from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.include_router(task.router)
app.include_router(User.router)


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], 
    allow_methods=["*"],
    allow_headers=["*"],
)


uvicorn.run(app, host="0.0.0.0", port=8000)