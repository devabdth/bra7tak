import datetime

class User:
	def __init__(
		self, name: str, phone: str, email: str, password: str, id: str, favourites: list, cart: list,
		address_line_one: str, address_line_two: str, gender: int, city_code: int, fav_categories: list,
		orders: list, joined_in: str
	):

		self.id= id
		self.name= name
		self.phone= phone
		self.email= email
		self.password= password
		self.favourites= favourites
		self.fav_categories= fav_categories
		self.cart= cart
		self.address_line_one= address_line_one
		self.address_line_two= address_line_two
		self.gender= gender
		self.city_code= city_code
		self.orders= orders
		self.joined_in= joined_in

	def to_dict(self):
		return {
			"id": self.id,
			"name": self.name,
			"phone": self.phone,
			"email": self.email,
			"password": self.password,
			"favourites": self.favourites,
			"favCategories": self.fav_categories,
			"cart": self.cart,
			"addressLineOne": self.address_line_one,
			"addressLineTwo": self.address_line_two,
			"gender": self.gender,
			"cityCode": self.city_code,
			"orders": self.orders,
			"joined_in": self.joined_in,
		}



class Users:
	def __init__(self):
		self.user= User(
			id="dsfsdfsdfs",
			name="User Name",
			email="info@cubersio.com",
			phone="+20 109 300 8313",
			password="1234567890",
			favourites= [],
			fav_categories= [],
			cart= [],
			address_line_one= "User Address",
			address_line_two= "User Address 2",
			gender= 0,
			city_code= 0,
			orders= ["{}".format(x) for x in range(0, 30)],
			joined_in= str(datetime.date.today())
		)

	def create_user(self, payload) -> str:
		try:
			user_= User(
				id="ssdfsd",
				name=payload["name"],
				email=payload["email"],
				password=payload["password"],
				phone=payload["phone"],
				address_line_one=payload["addressLineOne"],
				address_line_two=payload["addressLineTwo"],
				gender=payload["gender"],
				city_code=payload["city"],
				favourites= [],
				fav_categories= [],
				cart= [],
				orders= [],
				joined_in= str(datetime.date.today())
			)
			print(user_.to_dict())

			return user_.id
		except Exception as e:
			print(e)
			return None

	def get_all_users(self, search_params):
		return [self.user for _ in range (0, 30)]
		

	def get_user_by_id(self, uid: str):
		return self.user

	def get_user_by_username(self, username: str):
		return self.user

	def check_email_uniquness(self, email):
		return email == self.user.email

	def update_user_data(self, uid: str, user_data: User):
		self.user= user_data

	def delete_user(self, uid: str):
		return True