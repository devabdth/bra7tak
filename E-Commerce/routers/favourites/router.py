import sys
sys.path.insert(0, '../')


from flask import Flask, render_template, session, url_for, redirect

from config import Config
from database.database import Database
from layout.layout import Layout
from content import Content
from utils import Utils

class FavouritesRouter:
	def __init__(self, app: Flask):
		self.app= app
		self.cfg: Config= Config()
		self.content: Content= Content()
		self.database: Database= Database()
		self.layout: Layout= Layout()
		self.utils: Utils= Utils()


	def setup(self):
		self.assign_favourites_router()

	def assign_favourites_router(self):
		@self.app.route('/favourites/')
		@self.app.route('/favourite/')
		@self.app.route('/likes/')
		@self.app.route('/liked/')
		@self.app.route('/wishlist/')
		@self.app.route('/savedForLater/')
		def favourites_index():
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
				prods: list= self.database.products.get_multiple_products_by_id(user_data.favourites)

				return render_template(
					'favourites/index.html',
					prods= prods,
					uid= uid,
					user_data= user_data,
					lang= lang,
					cfg= self.cfg,
					content= self.content,
					primary_font_family= primary_font_family,
					second_font_family= second_font_family,
					len= len,
					database= self.database,
					layout= self.layout,
					utils= self.utils
				)

			return redirect('{}/login/?customRecall=favourites'.format(self.cfg.base_url))



