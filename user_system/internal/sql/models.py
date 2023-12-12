from __future__ import annotations
from typing import List

from sqlalchemy import ForeignKey, Integer, String, Float, DateTime, Table, Column
from sqlalchemy.orm import relationship, Mapped, mapped_column, DeclarativeBase


class Base(DeclarativeBase):
    pass


user_role_association = Table(
    'user_role_association', 
    Base.metadata,
    Column('user_id', Integer, ForeignKey('users.id')),
    Column('role_id', Integer, ForeignKey('roles.id'))
)

class User(Base):
    __tablename__ = "users"

    id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str] = mapped_column()
    email: Mapped[str] = mapped_column(unique=True)
    hashed_password: Mapped[str] = mapped_column()
    
    roles: Mapped[List[Role]] = relationship(secondary=user_role_association, back_populates="users")
    
class Role(Base):
    __tablename__ = "roles"

    id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str] = mapped_column(unique=True)

    users: Mapped[List[User]] = relationship(secondary=user_role_association, back_populates="roles")
    
