from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from internal.sql import models
from internal.db import db
from internal.routers import user as user_router
import logging


logging.basicConfig(level=logging.INFO)


models.Base.metadata.create_all(bind=db.engine)
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(user_router.router, prefix="/selfuser")
