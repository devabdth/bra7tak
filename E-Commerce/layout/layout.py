import sys
sys.path.insert(0, '../')

from .ad_banners import AdBanner
from .prodcuts_section import ProductsSection

from config import Config


class Layout:
    def __init__(self):
        self.main_banner: AdBanner = AdBanner(
            subtitle={
                "en": "72% Off on all new Nike Collection Products"
            },
            title={
                "en": "Winter Nike is here"
            },
            pricing=None,
            action_text={
                "en": "Check it Now!"
            },
            action_link="{}/collections/0".format(Config().base_url),
            card_action_link="{}/collections/0".format(Config().base_url),
            asset="nike-shoes.png",
            background_color="#010a67",
            subtitle_color="#999999",
            title_color="#ffffff",
            action_background_color="#010a61",
            action_text_color="#ffffff"
        )

        self.sup_banner_one: AdBanner = AdBanner(
            subtitle={
                "en": "For the real gamers only!"
            },
            title={
                "en": "RTX 4000! is here!"
            },
            pricing=None,
            action_text={
                "en": "Check it Now!"
            },
            action_link=None,
            card_action_link=None,
            asset="asus-gpu.png",
            background_color="green",
            subtitle_color="#999999",
            title_color="#ffffff",
            action_background_color=None,
            action_text_color=None
        )

        self.sup_banner_two: AdBanner = AdBanner(
            subtitle={
                "en": "25% off on the photography monster!"
            },
            title={
                "en": "Winter Nike is here"
            },
            pricing={
                "currentPrice": "15000",
                "perviousPrice": "20000"
            },
            action_text={
                "en": "Check it Now!"
            },
            action_link=None,
            card_action_link=None,
            asset="nikon-camera.png",
            background_color="orange",
            subtitle_color="#999999",
            title_color="#ffffff",
            action_background_color=None,
            action_text_color=None
        )

        self.flash_sell: ProductsSection = ProductsSection(
            products_ids=[], side_ad=self.sup_banner_two,
            see_more_action_link="", is_grid=True
        )
