import sys
sys.path.insert(0, '../')

from flask import Flask, render_template, url_for, session, request, redirect

from config import Config
from content import Content
from database.database import Database
from layout.layout import Layout


class CategoriesRouter:
	def __init__(self, app: Flask):
		self.app= app
		self.cfg: Config = Config()
		self.database: Database = Database()
		self.content: Content = Content()
		self.layout: Layout = Layout()


	def setup(self):
		self.assign_single_category()


	def assign_single_category(self):
		@self.app.route('/categories/<id>/', methods=["GET"])
		def single_category_index(id):
			params= dict(request.values)
			cat= self.database.categories.get_category_by_id(id)
			if cat == None:
				return redirect('{}/404/category/'.format(self.cfg.base_url))
			products= self.database.products.all_products
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
					'categories/single_category/index.html',
					user_data= user_data,
					cat= cat,
					lang= lang,
					cfg= self.cfg,
					content= self.content,
					primary_font_family= primary_font_family,
					second_font_family= second_font_family,
					len= len,
					database= self.database,
					layout= self.layout,
					products= products,
					search_params= params,
					subcats_ids= [subcat['id'] for subcat in cat.subcats]
				)

			return render_template(
				'categories/single_category/index.html',
				cat= cat,
				lang= lang,
				cfg= self.cfg,
				content= self.content,
				primary_font_family= primary_font_family,
				second_font_family= second_font_family,
				len= len,
				database= self.database,
				layout= self.layout,
				products= products,
				search_params= params,
				subcats_ids= [subcat['id'] for subcat in cat.subcats]
			)