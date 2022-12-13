import sys
sys.path.insert(0, '../')

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

        self.all_categories: list = [
             Category(
                ad_banner= Layout().main_banner,
                name= {
                    "en": "Clothes",
                },
                id= x,
                bio= {
                    "en": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus vitae mauris in tortor ornare mollis ac nec nisi. Donec in felis dui. Sed velit tellus, convallis nec congue et, vulputate sit amet sem. Aliquam lorem tellus, faucibus at eros in, facilisis tristique ipsum. Vestibulum a pretium quam. Suspendisse tristique purus ac arcu maximus, vel malesuada sapien dictum. Sed a convallis lectus."
                },
                products= [
                    "",
                    "",
                    "",
                    "",
                    "",
                    "",
                    "",
                    "",
                    "",
                    "",
                    "",
                    "",
                    "",
                ],
                subcats= [
                    Category(
                        ad_banner= None,
                        name= {
                            "en": "Men",
                        },
                        id= 0,
                        bio= {
                            "en": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus vitae mauris in tortor ornare mollis ac nec nisi. Donec in felis dui. Sed velit tellus, convallis nec congue et, vulputate sit amet sem. Aliquam lorem tellus, faucibus at eros in, facilisis tristique ipsum. Vestibulum a pretium quam. Suspendisse tristique purus ac arcu maximus, vel malesuada sapien dictum. Sed a convallis lectus."
                        },
                        products= [
                            "",
                            "",
                            "",
                            "",
                            "",
                            "",
                            "",
                            "",
                            "",
                            "",
                            "",
                            "",
                            "",
                        ],
                        subcats= None
                    ),
                    Category(
                        ad_banner= None,
                        name= {
                            "en": "Women",
                        },
                        id= 1,
                        bio= {
                            "en": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus vitae mauris in tortor ornare mollis ac nec nisi. Donec in felis dui. Sed velit tellus, convallis nec congue et, vulputate sit amet sem. Aliquam lorem tellus, faucibus at eros in, facilisis tristique ipsum. Vestibulum a pretium quam. Suspendisse tristique purus ac arcu maximus, vel malesuada sapien dictum. Sed a convallis lectus."
                        },
                        products= [
                            "",
                            "",
                            "",
                            "",
                            "",
                            "",
                            "",
                            "",
                            "",
                            "",
                            "",
                            "",
                            "",
                        ],
                        subcats= None
                    ),
                    Category(
                        ad_banner= None,
                        name= {
                            "en": "Children",
                        },
                        id= 2,
                        bio= {
                            "en": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus vitae mauris in tortor ornare mollis ac nec nisi. Donec in felis dui. Sed velit tellus, convallis nec congue et, vulputate sit amet sem. Aliquam lorem tellus, faucibus at eros in, facilisis tristique ipsum. Vestibulum a pretium quam. Suspendisse tristique purus ac arcu maximus, vel malesuada sapien dictum. Sed a convallis lectus."
                        },
                        products= [
                            "",
                            "",
                            "",
                            "",
                            "",
                            "",
                            "",
                            "",
                            "",
                            "",
                            "",
                            "",
                            "",
                        ],
                        subcats= None
                    ),
                    Category(
                        ad_banner= None,
                        name= {
                            "en": "Sports Wear",
                        },
                        id= 3,
                        bio= {
                            "en": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus vitae mauris in tortor ornare mollis ac nec nisi. Donec in felis dui. Sed velit tellus, convallis nec congue et, vulputate sit amet sem. Aliquam lorem tellus, faucibus at eros in, facilisis tristique ipsum. Vestibulum a pretium quam. Suspendisse tristique purus ac arcu maximus, vel malesuada sapien dictum. Sed a convallis lectus."
                        },
                        products= [
                            "",
                            "",
                            "",
                            "",
                            "",
                            "",
                            "",
                            "",
                            "",
                            "",
                            "",
                            "",
                            "",
                        ],
                        subcats= None
                    ),
                    Category(
                        ad_banner= None,
                        name= {
                            "en": "Shoes",
                        },
                        id= 4,
                        bio= {
                            "en": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus vitae mauris in tortor ornare mollis ac nec nisi. Donec in felis dui. Sed velit tellus, convallis nec congue et, vulputate sit amet sem. Aliquam lorem tellus, faucibus at eros in, facilisis tristique ipsum. Vestibulum a pretium quam. Suspendisse tristique purus ac arcu maximus, vel malesuada sapien dictum. Sed a convallis lectus."
                        },
                        products= [
                            "",
                            "",
                            "",
                            "",
                            "",
                            "",
                            "",
                            "",
                            "",
                            "",
                            "",
                            "",
                            "",
                        ],
                        subcats= None
                    )
                ]
            ) for x in range(20)
            
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
        return self.all_categories[0]


