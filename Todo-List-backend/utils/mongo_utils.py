from pymongo.mongo_client import MongoClient
import configparser


class MongoAtlas:
    def __init__(self):   
        self.config = configparser.ConfigParser()
        self.config.read("config.ini")

    def get_collections(self):
        self.config
        cluster = MongoClient(
            host=self.config['configuration']['MONGODB_HOST'],
            port= int(self.config['configuration']['MONGODB_PORT']),
            username=self.config['configuration']['MONGODB_USERNAME'],
            password=self.config['configuration']['MONGODB_PASSWORD'],
            maxPoolSize=int(self.config['configuration']['MONGODB_MAX_POOL_SIZE']),
            serverSelectionTimeoutMS=int(self.config['configuration']['MONGODB_SERVER_SELECTION_TIMEOUT_MS']),
            appname=self.config['configuration']['MONGODB_APPNAME'],
            authSource=self.config['configuration']['MONGODB_AUTH_SOURCE'],
            tls=bool(self.config['configuration']['MONGODB_TLS']),
        )
        return cluster.ToDoList
