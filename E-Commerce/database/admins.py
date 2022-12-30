import os
import json


class Admin:
	def __init__(self, username: str, access_key: str, name: str, accesses: list, log: dict):
		self.username= username
		self.access_key= access_key
		self.name= name
		self.accesses= accesses
		self.log= log



class Admins:
	def __init__(self):
		with open(os.path.join(os.path.dirname(__file__), '../jsons/admins.json'), 'r') as f:
			self.admins_file_data: dict= dict(json.loads(f.read()))
			f.close()



	def get_admin_by_id(self, aid: str):
		return self.admins_file_data[aid]

