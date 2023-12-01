from fastapi import FastAPI
from pydantic import BaseModel
from internal.sql import models
from internal.db import db
from internal.routers import user as user_router

models.Base.metadata.create_all(bind=db.engine)
app = FastAPI()

app.include_router(user_router.router, prefix="/user")
# app.include_router(product_router.router, prefix="/product")
# app.include_router(cart_router.router, prefix="/cart")
# app.include_router(cart_item_router.router, prefix="/cart_item")
