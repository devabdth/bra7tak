class Utils:
	def format_date(self, date, show_hour: bool= False):
		if show_hour:
			parts= date.split(' ')
			return "{} / {} / {}-{} : {} : {}".format(
				parts[0].split('-')[0],
				parts[0].split('-')[1],
				parts[0].split('-')[2],
				parts[1].split(':')[0],
				parts[1].split(':')[1],
				parts[1].split(':')[2].split('.')[0]
			)

		else: 
			return "{} / {} / {}".format(
				date.split('-')[0],
				date.split('-')[1],
				date.split('-')[2]
			)


	def format_price(self, price, show_curr: bool= True, show_full: bool= False):
		if show_full:
			exp= '{:20,.2f}'
		else:
			exp= '{:20,.0f}'

		if show_curr:
			return "{} L.E.".format(
				exp.format(price)
			)
		return "{}".format(
			exp.format(price)
		)

	def cart_calculations(self, cart: list, city_code: int= 0) -> dict:
		import sys
		sys.path.insert(0, '../')

		from database.database import Database
		database: Database= Database()

		cart_: dict= {}
		products_price= 0
		total_vat= 0
		total_shipping_fee= 0

		cart_['PRODUCTS_LENGTH']= len(cart)
		uniques: list= set(cart)
		cart_['PRODUCTS']= [
			{
				'COUNT': cart.count(unique),
				'PRODUCT_DATA': database.products.get_product_by_id(unique)
			} for unique in uniques
		]

		for prod in cart_['PRODUCTS']:
			products_price+= (prod['COUNT'] * prod['PRODUCT_DATA'].pricing['currentPrice'])
			total_vat+= (prod['COUNT'] * prod['PRODUCT_DATA'].pricing['currentPrice']) * prod['PRODUCT_DATA'].vat
			# total_shipping_fee+= prod['COUNT'] * prod['PRODUCT_DATA'].shipping_fees[str(city_code)]
			total_shipping_fee+= prod['COUNT'] * prod['PRODUCT_DATA'].shipping_fees[5]

		cart_['PRODUCTS_PRICE']= products_price
		cart_['TOTAL_VAT']= total_vat
		cart_['TOTAL_SHIPPING_FEE']= total_shipping_fee
		cart_['TOTAL_PRICE']= products_price + total_vat + total_shipping_fee
		return cart_