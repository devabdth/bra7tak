from .products import Products
class Collection:
	def __init__(self, name: dict, msg: dict, bio: dict, id: str, products: list):
		self.name= name
		self.msg= msg
		self.bio= bio
		self.id= id
		self.products= products


class Collections:
	def __init__(self):
		self.products: Products = Products()
		self.flash_sell: Collection= Collection(
			name= {
				"en": "Flash Sell",
			},
			bio= {
				"en": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus vitae mauris in tortor ornare mollis ac nec nisi. Donec in felis dui. Sed velit tellus, convallis nec congue et, vulputate sit amet sem. Aliquam lorem tellus, faucibus at eros in, facilisis tristique ipsum. Vestibulum a pretium quam. Suspendisse tristique purus ac arcu maximus, vel malesuada sapien dictum. Sed a convallis lectus.",
				"ar": "",
			},
			msg= {
				"en": "Lorem ipsum dolor sit amet.",
				"ar": "",
			},
			id= "0",
			products= self.products.get_multiple_products_by_id(
				[
					"0",
					"0",
					"0",
					"0",
					"0",
					"0",
					"0",
					"0",
					"0",
					"0",
					"0",
					"0",
					"0",
				]
			)
		)


	def get_collection_by_id(self, collection_id):
		return self.flash_sell
