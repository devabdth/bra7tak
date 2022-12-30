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
		self.assing_checkout_form_router()


	def assing_checkout_form_router(self):
		@self.app.route('/checkout/', methods=["GET"])
		def checkout_form():
			cart= (dict(request.values)['prods']).split('|')
			for cart_item in cart:
				if self.database.products.get_product_by_id(cart_item) == None:
					return "<h1>Some Products Missin</h1>"

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



