import sys
sys.path.insert(0, '../')
sys.path.insert(0, '../../')


from flask import Flask, render_template, url_for, request, redirect, session, send_file

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
		self.assign_orders_post()
		self.assign_order_qr_code()
		self.assign_order_status_change()


	def assign_orders_post(self):
		@self.app.route('/webapp/adminstration/orders/', methods=["POST"])
		def orders_post():
			aid= session.get("CURRENT_ADMIN_ID", None)
			if aid is None:
				return redirect('{}/webapp/adminstration/login/'.format(self.cfg.base_url))

			admin_data= self.database.admins.get_admin_by_id(aid)

			body= dict(json.loads(request.data))
			order: self.database.orders.order_form= self.database.orders.order_form(
				id=None,
				username= body['information']['customerName'],
				user_email= body['information']['customerEmail'],
				user_phone= body['information']['customerPhone'],
				uid= body['information']['customerEmail'],
				address= body['information']['customerAddressLineOne'],
				address_two= body['information']['customerAddressLineTwo'],
				city_code= body['information']['customerCity'],
				products= body['products'],
				status= body['status'],
				price= body['fees']['price'],
				vat= body['fees']['vat'],
				shipping_fees= body['fees']['shippingFees'],
				placed_in= None,
				aid= admin_data['aid'],
				police_number= 0
			)

			try:
				oid= self.database.orders.create_order(order)
				print(oid)
				if oid is not None:
					return self.app.response_class(status= 201)

				return self.app.response_class(status= 500)
			except Exception as e:
				print(e)
				return self.app.response_class(status= 500)



	def assign_orders_index(self):
		@self.app.route('/webapp/adminstration/orders/', methods=["GET"])
		def orders_index():
			params= dict(request.values)

			aid= session.get("CURRENT_ADMIN_ID", None)
			if aid is None:
				return redirect('{}/webapp/adminstration/login/'.format(self.cfg.base_url))

			admin_data= self.database.admins.get_admin_by_id(aid)
			orders= self.database.orders.get_all_orders(params)
			products= self.database.products.get_all_products()
			return render_template(
				'adminstration/orders/index.html',
				cfg= self.cfg,
				orders= orders,
				products= products,
				database= self.database,
				content= self.content,
				admin_data= admin_data,
				utils= self.utils,
				len= len,
				lang= "en",
				search_params= params,
				cats_ids= [cat.id for cat in self.database.categories.all_categories],
			)


	def assign_order_qr_code(self):
		@self.app.route('/webapp/adminstration/orders/qr/<oid>')
		def qr_generation(oid):
			if session.get('CURRENT_ADMIN_ID', 'sdsdcsdf') is not None:
				from qrcode import make
				from io import BytesIO
				file_= make(oid)
				buf= BytesIO()
				file_.save(buf)
				buf.seek(0)
				return send_file(buf, mimetype="image/jpeg")

			return self.app.response_class(status=403)


	def assign_order_status_change(self):
		@self.app.route('/webapp/adminstration/orders/', methods=["PATCH"])
		def order_status_change():
			try:
				params= dict(request.values)
				if ('oid' in params.keys() and 'status' in params.keys()):
					res= self.database.orders.update_order(params['oid'], {'status': params['status']})
					if res:
						return self.app.response_class(status= 200)
						
				return self.app.response_class(status= 500)
			except Exception as e:
				print(e)
				return self.app.response_class(status= 500)

