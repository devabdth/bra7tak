import sys
sys.path.insert(0, '../')


from flask import Flask, request, redirect, url_for, render_template, session

from config import Config
from content import Content
from database.database import Database
from layout.layout import Layout

from .sub_routers.products import ProductsSubRouter
from .sub_routers.users import UsersSubRouter
from .sub_routers.orders import OrdersSubRouter


class AdminstrationRouter:
	def __init__(self, app: Flask):
		self.app: Flask= app
		self.cfg: Config= Config()
		self.content: Content= Content()
		self.database: Database= Database()
		self.layout: Layout= Layout()


	def setup(self):
		ProductsSubRouter(app= self.app).setup()
		UsersSubRouter(app= self.app).setup()
		OrdersSubRouter(app= self.app).setup()
		# InventorySubRouter(app= app).setup()
		# LoginSubRouter(app= app).setup()
		# CategoriesSubRouter(app= app).setup()
		# ColellectionsSubRouter(app= app).setup()
		# BannersSubRouter(app= app).setup()
		# BulksSubRouter(app= app).setup()
		pass
