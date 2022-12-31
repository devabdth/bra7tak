import sys
sys.path.insert(0, '../')
sys.path.insert(0, '../../')


from flask import Flask, render_template, url_for, request, redirect, session

from config import Config
from database.database import Database
from utils import Utils
from content import Content

import json
class OrdersSubRouter:
	def __init__(self, app: Flask):
		self.app: Flask= app
		self.cfg: Config= Config()
		self.database: Database= Database()
		self.utils: Utils= Utils()
		self.content: Content= Content()


	def setup(self):
		self.assign_orders_index()


	def assign_orders_index(self):
		@self.app.route('/webapp/adminstration/orders/', methods=["GET"])
		def orders_index():
			params= dict(request.values)

			aid= session.get("CURRENT_ADMIN_ID", "sdsdcsdf")
			if aid is None:
				return redirect('{}/webapp/adminstration/login/'.format(self.cfg.base_url))

			admin_data= self.database.admins.get_admin_by_id(aid)
			orders= self.database.orders.get_all_orders(params)
			return render_template(
				'adminstration/orders/index.html',
				cfg= self.cfg,
				orders= orders,
				database= self.database,
				content= self.content,
				admin_data= admin_data,
				utils= self.utils,
				len= len,
				lang= "en",
				search_params= params,
				cats_ids= [cat.id for cat in self.database.categories.all_categories],
			)

