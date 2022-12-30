import sys
sys.path.insert(0, '../')

from .ad_banners import AdBanner
from .prodcuts_section import ProductsSection

from config import Config

import os
import json


class Layout:
    def __init__(self):
        self.cfg: Config= Config()

        with open(os.path.join(os.path.dirname(__file__), '../jsons/banners.json'), 'r') as f:
            self.banners_file_data= dict(json.loads(f.read()))
            f.close()
        self.all_banners= {
            x["id"]: AdBanner(
                subtitle= x["subtitle"],
                title= x["title"],
                pricing= x["pricing"],
                action_text= x["actionText"],
                action_link= x["actionLink"].format(self.cfg.base_url) if """{}""" in (x["actionLink"] or "") else x["actionLink"], 
                card_action_link= x["cardActionLlink"].format(self.cfg.base_url) if """{}""" in (x["cardActionLlink"] or "") else x["actionLink"], 
                asset= x["asset"],
                background_color= x["backgroundColor"],
                subtitle_color= x["subtitleColor"],
                title_color= x["titleColor"],
                action_background_color= x["actionBackgroundColor"],
                action_text_color= x["actionTextColor"],
                id= x["id"]
            ) for x in self.banners_file_data.values()
        }

        self.main_banner= self.all_banners["mainBanner"]
        self.sup_banner_one= self.all_banners["subBannerOne"]
        self.sup_banner_two= self.all_banners["subBannerTwo"]

        self.flash_sell: ProductsSection = ProductsSection(
            products_ids=[], side_ad= self.sup_banner_two,
            see_more_action_link="", is_grid=True
        )

    def get_banner_by_id(self, bid):
        return self.all_banners[bid]
