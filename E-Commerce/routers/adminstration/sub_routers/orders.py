import sys
sys.path.insert(0, '../')
sys.path.insert(0, '../../')


from flask import Flask, render_template, url_for, request, redirect, session, send_file

from config import Config
from database.database import Database
from utils import Utils
from content import Content

import json
from json import dumps as jsonParser
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
		self.assign_order_invoice()

	def assign_order_invoice(self):
		@self.app.route('/webapp/adminstration/orders/invoices/')
		def admin_order_invoice():
			params= dict(request.values)

			oid= params['oid']
			aid= session.get("CURRENT_ADMIN_ID", None)

			if aid is None or oid is None:
				return self.app.response_class(status= 403)
			print(params['oid'])
			order= self.database.orders.get_order_by_id(params['oid'])
			if order is None:
				return self.app.response_class(status= 404)

			invoice= self.utils.inv_gen(order, self.utils).generate_invoice()
			return send_file(invoice, mimetype="application/pdf", as_attachment= True, attachment_filename="Order-{}.pdf".format(order.police_number))



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
				uid= '',
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
				all_products= [prod.to_dict() for prod in products],
				database= self.database,
				content= self.content,
				admin_data= admin_data,
				utils= self.utils,
				len= len,
				lang= "en",
				search_params= params,
				cats_ids= [cat.id for cat in self.database.categories.all_categories],
				dumps= json.dumps
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
					res= self.database.orders.update_order(params['oid'], {'status': int(params['status'])})
					if res:
						return self.app.response_class(status= 200)
						
				return self.app.response_class(status= 500)
			except Exception as e:
				print(e)
				return self.app.response_class(status= 500)

