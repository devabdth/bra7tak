import pymongo
import time
import datetime
from bson.objectid import ObjectId


import sys
sys.path.insert(0, '../')

from config import Config

class Order:
	def __init__(
		self, id: str, address: str, address_two: str, city_code: str, products: list,
		vat: float, price: int, shipping_fees: int, status: int, uid: str,
		placed_in: str, username: str, user_email: str, user_phone: str, aid: str
	):

		self.id= id
		self.username= username
		self.user_email= user_email
		self.user_phone= user_phone
		self.address= address
		self.address_two= address_two
		self.city_code= city_code
		self.products= products
		self.vat= vat
		self.price= price
		self.shipping_fees= shipping_fees
		self.status= status
		self.uid= uid
		self.placed_in= placed_in
		self.aid= aid or None

	def to_dict(self):
		return {
		"id": self.id,
		"_id": self.id,
		"username": self.username,
		"userEmail": self.user_email,
		"userPhone": self.user_phone,
		"address": self.address,
		"cityCode": self.city_code,
		"products": self.products,
		"vat": self.vat,
		"price": self.price,
		"shippingFees": self.shipping_fees,
		"status": self.status,
		"uid": self.uid,
		"placedIn": self.placed_in,
		"aid": self.aid

		}




class Orders:
	def __init__(self, client: pymongo.MongoClient):
		self.order_form= Order
		self.cfg: Config= Config()
		self.client: pymongo.MongoClient =client
		self.database = self.client["bra7tak"]
		self.orders_collection = self.database["orders"]


	def create_order_from_dict(self, dict_: dict)-> Order:
		return Order(
			id= dict_['_id'],
			username= dict_['username'],
			user_email= dict_['userEmail'],
			user_phone= dict_['userPhone'],
			address= dict_['address'],
			city_code= dict_['cityCode'],
			products= dict_['products'],
			vat= dict_['vat'],
			price= dict_['price'],
			shipping_fees= dict_['shippingFees'],
			status= dict_['status'],
			uid= dict_['uid'],
			placed_in= dict_['placedIn'],
			aid= dict_['aid'],
		)


	def get_orders_by_uid(self, uid: str) -> list:
		orders= self.orders_collection.find({'uid': ObjectId(uid)})
		return [self.create_order_from_dict(dict(order)) for order in list(orders)]

	def get_all_orders(self, params):
		return {
			"RETURNED": [self.create_order_from_dict(dict(order)) for order in list(self.orders_collection.find({'status': -2}))],
			"CANCELED": [self.create_order_from_dict(dict(order)) for order in list(self.orders_collection.find({'status': -1}))],
			"STOCKED": [self.create_order_from_dict(dict(order)) for order in list(self.orders_collection.find({'status': 0}))],
			"IN_DELIVERY": [self.create_order_from_dict(dict(order)) for order in list(self.orders_collection.find({'status': 1}))],
			"DELIVERED": [self.create_order_from_dict(dict(order)) for order in list(self.orders_collection.find({'status': 2}))],
		}


	def get_order_by_id(self, order_id):
		orders= self.orders_collection.find({'_id': ObjectId(order_id)})
		return self.create_order_from_dict(dict(list(orders)[0]))

	def update_order(self, oid, params):
		try:
			self.orders_collection.find_one_and_update({'_id': ObjectId(oid)}, {'$set': params})
		except Exception as e:
			raise e


	def create_order(self, order: Order) -> str:
		try:
			from datetime import datetime
			order["placed_in"]= str(datetime.now())
			order= self.orders_collection.insert_one(order)
			return order.inserted_id
		except Exception as e:
			print(e)