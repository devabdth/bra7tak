from flask import Flask

from config import Config
from setup import setup


cfg: Config = Config()
app: Flask = Flask(
    'BRA7TAK_ECOMMERCE',
    template_folder=os.path.join(os.path.dirname(__file__), "./templates"),
    static_folder=os.path.join(os.path.dirname(__file__), "./static"),
)
setup(app)


app.run(
	port= cfg.port,
	debug= cfg.debug
)
