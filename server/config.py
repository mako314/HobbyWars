from flask import Flask
from flask_migrate import Migrate
from flask_bcrypt import Bcrypt
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)

app.secret_key = "ABC123" # signature for Flask session

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///app.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.json.compact = False

db = SQLAlchemy()

migrate = Migrate(app, db)

db.init_app(app)

bcrypt = Bcrypt(app) # allows for encryption/hashing

CORS(app)