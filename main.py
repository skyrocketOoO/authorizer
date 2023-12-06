from fastapi import FastAPI
from pydantic import BaseModel
from internal.sql import models
from internal.db import db
from internal.routers import user as user_router
import logging


logging.basicConfig(level=logging.INFO)


models.Base.metadata.create_all(bind=db.engine)
app = FastAPI()

app.include_router(user_router.router, prefix="/selfuser")
