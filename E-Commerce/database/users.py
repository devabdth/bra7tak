class User:
	def __init__(
		self, name: str, email: str, password: str, id: str, favourites: list, cart: list,
		address: str, gender: int, city_code: int, fav_categories: list,
		orders: list, joined_in: str
	):

		self.id= id
		self.name= name
		self.email= email
		self.password= password
		self.favourites= favourites
		self.fav_categories= fav_categories
		self.cart= cart
		self.address= address
		self.gender= gender
		self.city_code= city_code
		self.orders= orders
		self.joined_in= joined_in



class Users:
	def __init__(self):
		import datetime
		self.user= User(
			id="dsfsdfsdfs",
			name="User Name",
			email="info@cubersio.com",
			password="1234567890",
			favourites= [],
			fav_categories= [],
			cart= [],
			address= "User Address",
			gender= 0,
			city_code= 0,
			orders= [],
			joined_in= str(datetime.date.today())
		)


	def get_user_by_id(self, uid: str):
		return self.user

	def get_user_by_username(self, username: str):
		return self.user

	def check_email_uniquness(self, email):
		return email == self.user.email

	def update_user_data(self, uid: str, user_data: User):
		self.user= user_data