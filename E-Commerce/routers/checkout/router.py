import sys
sys.path.insert(0, '../')

from flask import Flask, render_template, url_for, session, request

from content import Content
from config import Config
from utils import Utils
from database.database import Database

class CheckoutRouter:
	def __init__(self, app: Flask):
		self.app= app
		self.cfg: Config= Config()
		self.content: Content= Content()
		self.utils: Utils= Utils()
		self.database: Database= Database()


	def setup(self):
		self.assign_checkout_form_router()
		self.assign_place_order()

	def assign_place_order(self):
		@self.app.route('/checkout/', methods=["POST"])
		def place_order():
			import json

			params= dict(request.values)
			uid= session.get('CURRENT_USER_ID', None)
			user_data= self.database.users.get_user_by_id(uid)

			body= dict(json.loads(request.data))
			if not 'order' in body.keys():
				print('Order not Found!')
				return self.app.response_class(status= 500)

			order= body['order']
			cart_calc= self.utils.cart_calculations(user_data.cart)
			order_: Order= self.database.orders.order_form(
				id= "",
				aid= None,
				username= order['username'],
				user_email= order['email'],
				user_phone= order['phone'],
				address= order['addressLineOne'],
				address_two= order['addressLineTwo'],
				city_code= order['city'],
				products= user_data.cart,
				vat= cart_calc['TOTAL_VAT'],
				price= cart_calc['TOTAL_PRICE'],
				shipping_fees= cart_calc['TOTAL_SHIPPING_FEE'],
				status= 0,
				uid= uid if uid is not None else "",
				placed_in= ""
			)

			try:
				order_id= self.database.orders.create_order(order)
				print(order_id)
				return self.app.response_class(status= 201)
			except Exception as e:
				return self.app.response_class(status= 500)






	def assign_checkout_form_router(self):
		@self.app.route('/checkout/', methods=["GET"])
		def checkout_form():
			lang = session.get("LANG", "ar")
			uid= session.get("CURRENT_USER_ID", None)
			if lang == 'en':
				primary_font_family= 'Raleway'
				second_font_family= 'Poppins'
			elif lang == 'ar':
				primary_font_family= 'Cairo'
				second_font_family= 'Cairo'
			if not uid is None:
				user_data= self.database.users.get_user_by_id(uid)
				cart= user_data.cart
				return render_template(
					'checkout/index.html',
					uid= uid,
					user_data= user_data,
					lang= lang,
					cfg= self.cfg,
					content= self.content,
					primary_font_family= primary_font_family,
					second_font_family= second_font_family,
					len= len,
					database= self.database,
					utils= self.utils,
					cart= cart
				)
			cart= []
			return render_template(
				'checkout/index.html',
				lang= lang,
				cfg= self.cfg,
				content= self.content,
				primary_font_family= primary_font_family,
				second_font_family= second_font_family,
				len= len,
				database= self.database,
				utils= self.utils,
				cart= cart
			)



