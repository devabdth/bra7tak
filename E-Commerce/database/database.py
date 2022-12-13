from .categories import Categories
from .collections import Collections
from .products import Products
from .users import Users
from .orders import Orders

class Database:
    def __init__(self):
        self.categories: Categories = Categories()
        self.collections: Collections = Collections()
        self.products: Products= Products()
        self.users: Users= Users()
        self.orders: Orders= Orders()
