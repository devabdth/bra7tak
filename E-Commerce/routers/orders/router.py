import sys
sys.path.insert(0, '../')

from flask import Flask, session, request, redirect

from database.database import Database
from config import Config

class OrdersRouter:
	def __init__(self, app: Flask):
		self.app: Flask= app
		self.cfg: Config= Config()
		self.database: Database= Database()


	def setup(self):
		self.assign_order_placement()

	def assign_order_placement(self):
		@self.app.route('/orders/placement/')
		def order_placement():
			uid= session.get('CURRENT_URER_ID', None)