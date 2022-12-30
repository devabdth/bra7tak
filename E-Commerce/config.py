from os import environ


class Config:
	def __init__(self):
		self.port = environ.get('PORT') or 3030
		self.debug = (environ.get('MODE') or 0) == 0
		self.auth_key = environ.get('AUTH_KEY') or '1234567890'
		self.base_url = environ.get('BASE_URL') or 'http://127.0.0.1:{}'.format(self.port)

		self.facebook = environ.get('FACEBOOK') or "None"
		self.instagram= environ.get('INSTAGRAM') or "None"
		self.linkedin = environ.get('LINKEDIN') or "None"
		self.twitter= environ.get('TWITTER') or "None"
		self.tiktok = environ.get('TIKTOK') or "None"

		self.meta_description = environ.get('DESCRIPTION') or "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus vitae mauris in tortor ornare mollis ac nec nisi. Donec in felis dui. Sed velit tellus, convallis nec congue et, vulputate sit amet sem. Aliquam lorem tellus, faucibus at eros in, facilisis tristique ipsum. Vestibulum a pretium quam. Suspendisse tristique purus ac arcu maximus, vel malesuada sapien dictum. Sed a convallis lectus."

		self.supported_checkout_methods: dict= {
			0: {
				"title": 'cashOnDelivery',
				"supported": True
			},
			1: {
				"title": 'paypal',
				"supported": False
			},
			2: {
				"title": 'creditCard',
				"supported": False
			},
			3: {
				"title": 'points',
				"supported": False
			},
			4: {
				"title": 'vouchers',
				"supported": False
			},
		}
