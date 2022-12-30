import sys
sys.path.insert(0, '../')

import os
import json

from layout.ad_banners import AdBanner
from layout.layout import Layout
class Category:
    def __init__(self, name: dict, bio: dict, id: str, products: list, subcats: list, ad_banner: AdBanner):
        self.name= name
        self.bio= bio
        self.id= id
        self.products= products
        self.subcats= subcats
        self.ad_banner= ad_banner

    def to_dict(self) -> dict:
        return {
            "name": self.name,
            "bio": self.bio,
            "id": self.id,
            "products": self.products,
            "subcats": self.subcats,
        }


class Categories:
    def __init__(self):
        self.layout: Layout= Layout()

        with open(os.path.join(os.path.dirname(__file__), '../jsons/categories.json'), 'r') as f:
            self.categories_file_data = dict(json.load(f))
        self.all_categories: list = [
            Category(
                id= x['id'],
                name= x['name'],
                bio= x['bio'],
                products= x['products'],
                ad_banner= self.layout.get_banner_by_id(x['adBannerId']),
                subcats= [
                    Category(
                        name= y['name'],
                        id= y['id'],
                        products= y['products'],
                        bio= y['bio'],
                        subcats= None,
                        ad_banner= None
                    )
                    for y in x['subcats']
                ]
            ) 
            for x in self.categories_file_data.values()
        ]

        self.all_categories_dicts: list = []
        for cat in self.all_categories:
            subcats_dicts= []
            for subcat in cat.subcats:
                subcat_dict= subcat.to_dict()
                del subcat_dict['subcats']
                subcats_dicts.append(subcat_dict)
            cat.subcats= subcats_dicts

            self.all_categories_dicts.append(cat.to_dict())

    def get_category_by_id(self, id):
        for cat in self.all_categories:
            if str(id) == str(cat.id):
                print(cat)
                return cat


