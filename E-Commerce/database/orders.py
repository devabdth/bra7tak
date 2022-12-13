class Order:
	def __init__(
		self, id: str, address: str, city_code: str, products: list,
		vat: float, price: int, shipping_fees: int, status: int, uid: str,
		placed_in: str
	):

		self.id= id
		self.address= address
		self.city_code= city_code
		self.products= products
		self.vat= vat
		self.price= price
		self.shipping_fees= shipping_fees
		self.status= status
		self.uid= uid
		self.placed_in= placed_in




class Orders:

	def get_orders_by_uid(self, uid: str) -> list:
		from datetime import datetime
		return [Order(
			id="xsasd{}".format(x),
			address= "User Address",
			city_code= 0,
			products= [],
			vat= 0.14,
			price= x+1 * 100 + x+1 / 100,
			shipping_fees= x * 10,
			status= x - 1,
			uid="dsfdsfsdf",
			placed_in= str(datetime.now())
		) for x in range(4)]


	def get_order_by_id(self, order_id):
		from datetime import datetime
		return Order(
			id="xsasd1",
			address= "User Address",
			city_code= 0,
			products= [],
			vat= 0.14,
			price= 1+1 * 100 + 1+1 / 100,
			shipping_fees= 1 * 10,
			status= 1 - 1,
			uid="dsfdsfsdf",
			placed_in= str(datetime.now())
		)
