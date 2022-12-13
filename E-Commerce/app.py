from flask import Flask

from config import Config
from setup import setup


cfg: Config = Config()
app: Flask = Flask('BRA7TAK_ECOMMERCE')
setup(app)


app.run(
	port= cfg.port,
	debug= cfg.debug
)
