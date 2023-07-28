from models import db, User, Hobby, UserHobby, Competition, Result, Entry
from flask_cors import CORS
from flask_migrate import Migrate
from flask import Flask, request, make_response, jsonify
from flask_restful import Api, Resource
import os

BASE_DIR = os.path.abspath(os.path.dirname(__file__))
DATABASE = os.environ.get(
    "DB_URI", f"sqlite:///{os.path.join(BASE_DIR, 'app.db')}")

app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = DATABASE
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.json.compact = False


migrate = Migrate(app, db)

db.init_app(app)
api = Api(app)
CORS(app)
#-----------------------------------------------------------------------------------------
#Routing here
#------------------------------------User Routing--------------------------------------

class Users(Resource):
    def get(self):
        users = [user.to_dict(rules =('-user_hobby.id',)) for user in User.query.all()]

        response = make_response(users, 200)

        return response

api.add_resource(Users, '/users')

#------------------------------------Hobby (Not USER) Routing------------------------------------------

class Hobbies(Resource):
    def get(self):
        hobby = [hobby.to_dict() for hobby in Hobby.query.all()]

        response = make_response(hobby, 200)

        return response
    
api.add_resource(Hobbies, '/hobbies')

#------------------------------------HobbyUSER (meaning a user has this hobby) Routing------------------------------------------

class UserHobbies(Resource):
    def get(self):
        user_hobbies = [hobby.to_dict() for hobby in UserHobby.query.all()]

        response = make_response(user_hobbies, 200)

        return response
    
api.add_resource(UserHobbies, '/user-hobbies')

#------------------------------------Competition Routing------------------------------------------

class Competitions(Resource):
    def get(self):
        competitions = [competition.to_dict() for competition in Competition.query.all()]

        response = make_response(competitions, 200)

        return response 
    
api.add_resource(Competitions,'/competitions')

if __name__ == '__main__':
    app.run(port=5555, debug=True)