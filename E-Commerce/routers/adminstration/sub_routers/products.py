import sys
sys.path.insert(0, '../')
sys.path.insert(0, '../../')


from flask import Flask, render_template, url_for, request, redirect, session

from config import Config
from database.database import Database
from utils import Utils
from content import Content

import json
class ProductsSubRouter:
	def __init__(self, app: Flask):
		self.app: Flask= app
		self.cfg: Config= Config()
		self.database: Database= Database()
		self.utils: Utils= Utils()
		self.content: Content= Content()


	def setup(self):
		self.assign_products_index()
		self.assign_create_product()
		self.assign_update_product()
		self.assign_delete_product()


	def assign_products_index(self):
		@self.app.route('/webapp/adminstration/products/', methods=["GET"])
		def products_index():
			params= dict(request.values)

			aid= session.get("CURRENT_ADMIN_ID", None)
			if aid is None:
				return redirect('{}/webapp/adminstration/login/'.format(self.cfg.base_url))

			admin_data= self.database.admins.get_admin_by_id(aid)
			products= self.database.products.get_products_by_filterization(params)
			categories= self.database.categories.all_categories
			return render_template(
				'adminstration/products/index.html',
				cfg= self.cfg,
				products= products,
				categories= categories,
				database= self.database,
				content= self.content,
				admin_data= admin_data,
				utils= self.utils,
				lang= "en",
				search_params= params,
				cats_ids= [cat.id for cat in self.database.categories.all_categories]

			)


	def assign_create_product(self):
		@self.app.route('/webapp/adminstration/products/', methods=["POST"])
		def create_product():
			body: dict= dict(request.form)
			files: ImmutableMultiDict= request.files
			res: bool= self.database.products.create_product(dict(json.loads(body["product"])), files)
			if res:
				return self.app.response_class(status= 201)
			else:
				return self.app.response_class(status= 500)


	def assign_delete_product(self):
		@self.app.route('/webapp/adminstration/products/', methods=["DELETE"])
		def delete_product():
			try:
				res: bool= self.database.products.delete_product(dict(request.values)['prodId'])
				if res:
					return self.app.response_class(status= 200)
				
				return self.app.response_class(status= 500)
			except Exception as e:
				print(e)
				return self.app.response_class(status= 200)


	def assign_update_product(self):
		@self.app.route('/webapp/adminstration/products/', methods=["PATCH"])
		def update_product():
			body: dict= dict(request.form)
			files: ImmutableMultiDict= request.files
			res: bool= self.database.products.update_product(dict(json.loads(body["product"])), files)
			if res:
				return self.app.response_class(status= 200)
			else:
				return self.app.response_class(status= 500)
