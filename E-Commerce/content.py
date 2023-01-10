class Content:
    def __init__(self):
        from os import path
        import sys
        import json
        sys.path.insert(0, '../')
        with open(path.abspath(path.join(path.dirname(__file__), 'jsons/localizations.json')), 'r', encoding="cp866") as f:
            data: dict= dict(json.load(f))
            self.global_= data['global']
            self.actions= data['actions']
            self.tabs= data['tabs']
            self.auth= data['auth']

        self.cities = {
            "en": {
                0: 'Alex',
                1: 'Aswan',
                2: 'Asyut',
                3: 'Behira',
                4: 'Beni Suef',
                5: 'Cairo',
                6: 'Dakahlia',
                7: 'Damietta',
                8: 'Faiyum',
                9: 'Gharbia',
                10: 'Giza',
                11: 'Ismailia',
                12: 'Kafr Sheikh',
                13: 'Luxor',
                14: 'Matruh',
                15: 'Minya',
                16: 'Monufia',
                17: 'Wadi Geded',
                18: 'North Sinai',
                19: 'Port Said',
                20: 'Qalyubia',
                21: 'Qena',
                22: 'Red Sea',
                23: 'Sharqia',
                24: 'Sohag',
                25: 'South Sinai',
                26: 'Suez',
            }
        }


        self.genders = {
            "en": {
                0: "Male",
                1: "Female",
                2: "Prefer not to say!",
            }
        }

        self.toast_content = {
            "en": {},
            "ar": {},
        }
 


    def get_city_name_by_id(self, city_code: int, lang: str):
        print(city_code)
        print(lang)
        return self.cities[lang][city_code]

    def get_gender_by_id(self, gender_code: int, lang: str):
        return self.genders[lang][gender_code]

