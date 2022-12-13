class Product:
    def __init__(self, id: str, name: dict, bio: dict, pricing: float, assets: list, category: int, avg_del_days: int, code: str, specs: dict, vat: float= 0.14, shipping_fees: dict= {}):
        self.id = id
        self.name = name
        self.bio = bio
        self.assets = assets
        self.category = category
        self.code = code
        self.pricing = pricing
        self.avg_del_days= avg_del_days
        self.specs= specs
        self.vat= vat
        self.shipping_fees= shipping_fees


class Products:
    def __init__(self):
        self.all_products: list = [Product(
            id="0",
            name={
                "en": "Nike Shoes",
                "ar": "Nike Shoes"
            },
            bio={
                "en": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus vitae mauris in tortor ornare mollis ac nec nisi. Donec in felis dui. Sed velit tellus, convallis nec congue et, vulputate sit amet sem. Aliquam lorem tellus, faucibus at eros in, facilisis tristique ipsum. Vestibulum a pretium quam. Suspendisse tristique purus ac arcu maximus, vel malesuada sapien dictum. Sed a convallis lectus.",
                "ar": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus vitae mauris in tortor ornare mollis ac nec nisi. Donec in felis dui. Sed velit tellus, convallis nec congue et, vulputate sit amet sem. Aliquam lorem tellus, faucibus at eros in, facilisis tristique ipsum. Vestibulum a pretium quam. Suspendisse tristique purus ac arcu maximus, vel malesuada sapien dictum. Sed a convallis lectus."
            },
            category=0,
            assets=["nike-shoes.png", "nike-shoes1.png", "nike-shoes2.png"],
            code="xsdfsd",
            pricing={
                "currentPrice": 15000.0,
                "perviousPrice": 20000.0
            },
            avg_del_days= 3,
            specs= {
                "en": [
                    "English Spec Example",
                    "English Spec Example",
                    "English Spec Example",
                    "English Spec Example",
                    "English Spec Example",
                    "English Spec Example",
                ],
                "ar": [
                    "English Spec Example",
                    "English Spec Example",
                    "English Spec Example",
                    "English Spec Example",
                    "English Spec Example",
                    "English Spec Example",
                ],
            },
            shipping_fees= {
                0: 30
            }
        ) for _ in range(0, 50)]

    def get_product_by_id(self, product_id):
        return self.all_products[0]

    def get_multiple_products_by_id(self, ids: list):
        return self.all_products

    def get_all_products_by_category(self, ids: list):
        return self.all_products

    def get_products_by_filterization(self, search_params):
        return self.all_products

    def get_products_similer_to(self, similers: list):
        return self.all_products
