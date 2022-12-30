import os
class Product:
    def __init__(self, id: str, name: dict, bio: dict, pricing: float, assets: list, category: int, sub_category: int, avg_del_days: dict, code: str, specs: dict, vat: float= 0.14, shipping_fees: dict= {}):
        self.id = id
        self.name = name
        self.bio = bio
        self.assets = assets
        self.category = category
        self.sub_category = sub_category
        self.code = code
        self.pricing = pricing
        self.avg_del_days= avg_del_days
        self.specs= specs
        self.vat= vat
        self.shipping_fees= shipping_fees

    def to_dict(self) -> dict:
        return {
            "id": self.id,
            "name": self.name,
            "bio": self.bio,
            "assets": self.assets,
            "category": self.category,
            "subCategory": self.sub_category,
            "code": self.code,
            "pricing": self.pricing,
            "avgDelDays": self.avg_del_days,
            "specs": self.specs,
            "vat": self.vat,
            "shippingFees": self.shipping_fees,
        }


class Products:
    def __init__(self):
        self.all_products: list = [Product(
            id="{}".format(x),
            name={
                "en": "Nike Shoes",
                "ar": "Nike Shoes"
            },
            bio={
                "en": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus vitae mauris in tortor ornare mollis ac nec nisi. Donec in felis dui. Sed velit tellus, convallis nec congue et, vulputate sit amet sem. Aliquam lorem tellus, faucibus at eros in, facilisis tristique ipsum. Vestibulum a pretium quam. Suspendisse tristique purus ac arcu maximus, vel malesuada sapien dictum. Sed a convallis lectus.",
                "ar": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus vitae mauris in tortor ornare mollis ac nec nisi. Donec in felis dui. Sed velit tellus, convallis nec congue et, vulputate sit amet sem. Aliquam lorem tellus, faucibus at eros in, facilisis tristique ipsum. Vestibulum a pretium quam. Suspendisse tristique purus ac arcu maximus, vel malesuada sapien dictum. Sed a convallis lectus."
            },
            category="0",
            sub_category="0",
            assets=["nike-shoes.png", "nike-shoes1.png", "nike-shoes2.png"],
            code="xsdfsd",
            pricing={
                "currentPrice": 15000.0,
                "twoPiecesPrice": 14000.0,
                "fourPiecesPrice": 13000.0,
                "sixPiecesPrice": 12000.0,
                "dozinPiecesPrice": 11000.0,
            },
            avg_del_days= {
                0: 3,
                1: 4,
                5: 2,
            },
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
                0: 30,
                1: 50,
                5: 50
            }
        ) for x in range(0, 50)]

    def get_product_by_id(self, product_id):
        return self.all_products[int(product_id)]

    def get_all_products(self):
        return self.all_products

    def get_multiple_products_by_id(self, ids: list):
        return self.all_products

    def get_all_products_by_category(self, ids: list):
        return self.all_products

    def get_products_by_filterization(self, search_params):
        return self.all_products

    def get_products_similer_to(self, similers: list):
        return self.all_products

    def update_product(self, product_: dict, files) -> bool:
        try:
            product: Product= self.get_product_by_id(product_["id"])
            for asset in product.assets:
                if asset not in product_["assets"]:
                    path_= os.path.abspath(os.path.join(os.path.dirname(__file__),'../routers/assets/products/{}'.format(asset)))
                    if os.path.exists(path_):
                        os.remove(path_)

            for file_ in files.values():
                file_.save(os.path.abspath(os.path.join(os.path.dirname(__file__),'../routers/assets/products/{}'.format(file_.filename))))


            product.code= product_["code"]
            product.name= product_["name"]
            product.bio= product_["bio"]
            product.specs= product_["specs"]
            product.pricing= product_["pricing"]
            product.vat= product_["vat"]
            product.assets= product_["assets"]
            product.avg_del_days= product_["avgDelDays"]
            product.shipping_fees= product_["shippingFees"]
            print(product.to_dict())

            return True
        except Exception as e:
            print(e)
            return False



    def create_product(self, product_: dict, files) -> bool:
        try:
            for file_ in files.values():
                file_.save(os.path.abspath(os.path.join(os.path.dirname(__file__),'../routers/assets/products/{}'.format(file_.filename))))


            product: Product= Product(
                id= "fsdfsd",
                code= product_["code"],
                name= product_["name"],
                bio= product_["bio"],
                specs= product_["specs"],
                pricing= product_["pricing"],
                vat= product_["vat"],
                assets= product_["assets"],
                avg_del_days= product_["avgDelDays"],
                shipping_fees= product_["shippingFees"],
                category= 0,
                sub_category= 1,
            )
            self.all_products.append(product)

            return True
        except Exception as e:
            print(e)
            return False

    def delete_product(self, prodId):
        newList= self.all_products.remove(all_products[-1])
        self.all_products= newList

