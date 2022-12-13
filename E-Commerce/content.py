class Content:
    def __init__(self):
        self.global_: dict = {
            'en': {
                "name": "Bra7tak",
                "searchHint": "Search by name, code, etc...",
                "flashSell": "Flash Sell",
                "offerEndsIn": "Offer ends in:",
                "bio": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus vitae mauris in tortor ornare mollis ac nec nisi. Donec in felis dui. Sed velit tellus, convallis nec congue et, vulputate sit amet sem. Aliquam lorem tellus, faucibus at eros in, facilisis tristique ipsum. Vestibulum a pretium quam. Suspendisse tristique purus ac arcu maximus, vel malesuada sapien dictum. Sed a convallis lectus.",
                "filter": "Filter",
                "filterMsg": "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
                "category": "Category",
                "categoryMsg": "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
                "subcategory": "Sub Category",
                "subcategoryMsg": "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
                "price": "Price",
                "priceMsg": "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
                "searchMsg": "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
                "minPrice": "Minimum Price",
                "maxPrice": "Maximum Price",
                "code": "Code",
                "discount": "Discount",
                "productInformation": "Product Information",
                "delivery": "Delivery",
                "discountPercentOff": "off Discount Percent",
                "userId": "User Id",
                "userName": "Name",
                "joinedIn": "Joined In",
                "address": "Address",
                "city": "City",
                "gender": "Gender",
                "userHasNoOrders": "You have placed no orders, Start Ordering Now!",
                "orders": "Orders",
                "canceled": "Cancelled",
                "stocked": "Stocked",
                "delivering": "Delivering",
                "delivered": "Delivered",
                "userHasNoProductsInCart": "You have no products in your cart, Add Some Now!",
                "userHasNoProductsInFavourites": "It seems like no product catched your attension yet, See Recommendations!",
                "completeProfile": "Complete Profile",
                "phoneNumber": "Phone Number",
                "products": "Products",
                "reciept":"Reciept",
                "productsPrice": "Products Price",
                "vat": "Vat",
                "shippingFees": "Shipping Fees",
                "totalPrice": "Total Price",
                "basedOnYourChoises": "Based On Your Choises",
                "welcomeBack": "Welcome Back",
                "notFoundProduct": "The product you're searching for maybe deleted or unavailable right now!",
                "notFoundCollection": "The collection you're searching for maybe deleted or unavailable right now!",
                "notFoundCategory": "The category you're searching for maybe deleted or unavailable right now!",
            },
            'ar': {
                "name": "براحتـــــك",
                "searchHint": "ابحث بالاسم، الكود، أي شيء أخر",
                "flashSell": "خثم سريع",
                "offerEndsIn": "ينتهي العرض بعد:",
                "bio": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus vitae mauris in tortor ornare mollis ac nec nisi. Donec in felis dui. Sed velit tellus, convallis nec congue et, vulputate sit amet sem. Aliquam lorem tellus, faucibus at eros in, facilisis tristique ipsum. Vestibulum a pretium quam. Suspendisse tristique purus ac arcu maximus, vel malesuada sapien dictum. Sed a convallis lectus.",
                "filter": "Filter",
                "filterMsg": "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
                "category": "تصنيف",
                "categoryMsg": "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
                "subcategory": "تصنيف داخلي",
                "subcategoryMsg": "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
                "price": "السعر",
                "priceMsg": "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
                "searchMsg": "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
                "minPrice": "أصصغر سعر",
                "maxPrice": "أكبر سعر",
                "code": "كود",
                "discount": "خصم",
                "productInformation": "معلومات المنتج",
                "delivery": "التوصيل",

            },
        }

        self.actions: dict = {
            "en": {
                "apply": "Apply",
                "clear": "Clear",
                "search": "Search",
                "seeMore": "See More",
                "addToCart": "Add to Cart",
                "orderNow": "Order now",
                "editProfile": "Edit Profile",
                "getStarted": "Get Started",
                "downlowdInvoice": "Downlowd Invoice",
                "submit": "Submit",
                "pickCity": "Pick City",
                "pickGender": "Pick Gender",
                "removeUnit": "Remove Unit",
                "removeAll": "Remove All",
                "checkout": "Checkout",
                "emptyCart": "Empty Cart",
                "seeAll": "see All",
                "logout": "Logout",
            },
            "ar": {},
        }

        self.tabs: dict = {
            'en': {
                "home": "Home",
                "login": "Login",
                "signup": "SignUp",
                "account": "Account",
                "products": "Products",
                "cart": "Cart",
                "favourites": "Favourites",
                "categories": "Categories",
                "socialMedia": "Social Media"

            },
            'ar': {},
        }

        self.auth: dict= {
            "en": {
              "email": "Email",
              "phone": "Phone",
              "username": "Username",
              "password": "Password",
              "repassword": "Re-Password",
              "login": "Login",
              "logout": "Logout",
              "signup": "Sign Up",
              "forgetPassword": "Forget Password?",
              "rememberMe": "Remember me",
              "newUserMessage": "Don't have account? Sign up now!",
              "existingUserMessage": "Already have account? Login now!",
              "content": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse lacus nibh, sagittis a ante eu, luctus fringilla est. Aliquam pulvinar justo iaculis lorem pretium elementum. In mauris quam, porttitor nec venenatis in, vulputate non arcu. Aliquam ac iaculis nisl. Morbi sit amet ante justo. Donec lectus erat, molestie at gravida in, convallis a massa. Aenean rutrum vel ligula consequat convallis. Suspendisse nec leo leo. Donec non mi nec eros consequat facilisis. In condimentum et libero ut hendrerit. Nullam scelerisque mauris ac nunc ultricies, eget tincidunt sapien ullamcorper.",
              "confirmEmail": "Confrim you email!",
              "confirmEmailMsg": "Enter the code that was delivered with an email has been sent to your email",
              "sendCodeAgain": "Send verification code again",
              "changeEmail": "Change Email"
            },
            "ar": {
              "email": "البريد الإلكتروني",
              "phone": "الهاتف",
              "username": "اسم المستخدم",
              "password": "كلمة المرور",
              "repassword": "إعادة كلمة المرور",
              "login": "تسجيل الدخول",
              "signup": "تسجيل الإشتراك",
              "forgetPassword": "نسيت كلمة المرور؟",
              "rememberMe": "تذكرني",
              "newUserMessage": "ليس لديك حساب؟ سجل الإشتراك الأن",
              "existingUserMessage": "لديك حساب بالفعل؟ سجل دخول الأن",
              "content": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse lacus nibh, sagittis a ante eu, luctus fringilla est. Aliquam pulvinar justo iaculis lorem pretium elementum. In mauris quam, porttitor nec venenatis in, vulputate non arcu. Aliquam ac iaculis nisl. Morbi sit amet ante justo. Donec lectus erat, molestie at gravida in, convallis a massa. Aenean rutrum vel ligula consequat convallis. Suspendisse nec leo leo. Donec non mi nec eros consequat facilisis. In condimentum et libero ut hendrerit. Nullam scelerisque mauris ac nunc ultricies, eget tincidunt sapien ullamcorper."
            }
        }


        self.cities = {
            "en": {
                0: 'alex',
                1: 'aswan',
                2: 'asyut',
                3: 'behira',
                4: 'beni_suef',
                5: 'cairo',
                6: 'dakahlia',
                7: 'damietta',
                8: 'faiyum',
                9: 'gharbia',
                10: 'giza',
                11: 'ismailia',
                12: 'kafr_sheikh',
                13: 'luxor',
                14: 'matruh',
                15: 'minya',
                16: 'monufia',
                17: 'wadi_geded',
                18: 'north_sinai',
                19: 'port_said',
                20: 'qalyubia',
                21: 'qena',
                22: 'red_sea',
                23: 'sharqia',
                24: 'sohag',
                25: 'south_sinai',
                26: 'suez',
            }
        }


        self.genders = {
            "en": {
                0: "male",
                1: "female",
                2: "preferNotToSay",
            }
        }

        self.toast_content = {
            "en": {},
            "ar": {},
        }
 


    def get_city_name_by_id(self, city_code: int, lang: str):
        return 'Cairo'

    def get_gender_by_id(self, city_code: int, lang: str):
        return 'Male'

