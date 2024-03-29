from flask import Flask
from flask_migrate import Migrate
from flask_bcrypt import Bcrypt
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from flask_restful import Api
from sqlalchemy import MetaData
import os

app = Flask(__name__)

app.secret_key = "TESTING123456789" # signature for Flask session

# app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///app.db'

app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://hobbywars_user:X54rYVyCL6Zc8k5c7gJ91ZsaHtuofbnw@dpg-cmrcq221hbls73fomrs0-a/hobbywars'

app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.json.compact = False

metadata = MetaData(naming_convention={
    "fk": "fk_%(table_name)s_%(column_0_name)s_%(referred_table_name)s",
})

db = SQLAlchemy(metadata=metadata)

migrate = Migrate(app, db)

db.init_app(app)
api = Api(app)

bcrypt = Bcrypt(app) # allows for encryption/hashing

CORS(app)


