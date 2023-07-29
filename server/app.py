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
#------------------------------------------------------------------------------------------------------------------------------
#Questions
#1. Should I do the request.get_json() above my try and excepts?
#------------------------------------User Routing------------------------------------------------------------------------------

class Users(Resource):

    #Get all USERS
    def get(self):
        users = [user.to_dict(rules =('-user_hobby.id',)) for user in User.query.all()]

        response = make_response(users, 200)

        return response
    
    #POST a USER
    def post(self):
        #try:
        data = request.get_json()
        new_user = User(
            firstName = data['firstName'],
            lastName = data['lastName'],
            username = data['username'],
            age = data['age'],
            bio = data['bio'],
            location = data['location'],
            phone = data['phone'],
            email = data['email'],
            profileImg = data['profileImg'],
            bannerImg = data['bannerImg']
        )

        db.session.add(new_user)
        db.session.commit()

        return make_response(new_user.to_dict(), 201)
    
        #except ValueError:
        
api.add_resource(Users, '/users')
#---------------------------------UserByID (GET, PATCH, DELETE) Routing----------------------------------------------------------

class UserByID(Resource):

    #Get a Single USER by ID
    def get(self,id):
        user = User.query.filter(User.id == id).first()

        if user:
            response = make_response(user.to_dict(), 200)
        else:
            response = make_response({
                "error": "User not found"
            }, 404)
        return response
    
    #Patch a USER by ID
    def patch(self, id):
        user = User.query.filter(User.id == id).first()

        if user:
            #try
            data = request.get_json()
            for key in data:
                setattr(user, key, data[key])
            db.session.add(user)
            db.session.commit()

            response = make_response(user.to_dict(), 202)
            
            #except ValueError:
        else:
            response = make_response({
                "error": "User not found"
            }, 404)
        return response
    
    #Delete USER by ID
    def delete(self,id):
        user = User.query.filter(User.id == id).first()

        if user:
            db.session.delete(user)
            db.session.commit()
            response = make_response({"message":"User Succesfully deleted!"}, 204)
        else:
            response = make_response({
                "error": "User not found"
            }, 404)
        return response

api.add_resource(UserByID, '/user/<int:id>')
#------------------------------------------------------------------------------------------------------------------------------

#------------------------------------Hobby (Not USER) Routing------------------------------------------------------------------------

class Hobbies(Resource):

    #Get ALL hobbies
    def get(self):
        hobby = [hobby.to_dict() for hobby in Hobby.query.all()]

        response = make_response(hobby, 200)

        return response
    
    #Post a Hobby
    def post(self):
        #try:
        data = request.get_json()
        new_hobby = Hobby(
            type_of_hobby = data['type_of_hobby'],
            description = data['description']
        )

        db.session.add(new_hobby)
        db.session.commit()

        return make_response(new_hobby.to_dict(), 201)
    
        #except ValueError:
    
api.add_resource(Hobbies, '/hobbies')
#------------------------------------Hobby by ID (Not USER) (GET, PATCH, DELETE) Routing ------------------------------------------

class HobbiesByID(Resource):

    #Get Hobbies by ID
    def get(self, id):
        hobby = Hobby.query.filter(Hobby.id == id).first()

        if hobby:
            response = make_response(hobby.to_dict(),200)
        else:
            response = make_response({
                "error": "Hobby not found"
            }, 404)
        return response
    
    #PATCH a Hobby
    def patch(self, id):
        hobby = Hobby.query.filter(Hobby.id == id).first()

        if hobby:
            #try
            data = request.get_json()
            for key in data:
                setattr(hobby, key, data[key])
            db.session.add(hobby)
            db.session.commit()

            response = make_response(hobby.to_dict(), 202)
            
            #except ValueError:
        else:
            response = make_response({
                "error": "Hobby not found"
            }, 404)
        return response
    
    #Delete Hobby by ID
    def delete(self,id):
        hobby = Hobby.query.filter(Hobby.id == id).first()

        if hobby:
            db.session.delete(hobby)
            db.session.commit()

            response = make_response({"message":"Hobby Succesfully deleted!"}, 204)
        else:
            response = make_response({
                "error": "Hobby not found"
            }, 404)
        return response

api.add_resource(HobbiesByID, '/hobby/<int:id>')
#------------------------------------------------------------------------------------------------------------------------------

#------------------------------------HobbyUSER (meaning a user has this hobby) Routing------------------------------------------

class UserHobbies(Resource):

    #Get ALL User Hobbies
    def get(self):
        user_hobbies = [hobby.to_dict() for hobby in UserHobby.query.all()]

        response = make_response(user_hobbies, 200)

        return response
    
    #POST a USER Hobby
    def post(self):
        #try:
        data = request.get_json()
        new_user_hobby = UserHobby(
            expertise = data['expertise'],
            user_id = data['user_id'],
            hobby_id = data['hobby_id']
        )

        db.session.add(new_user_hobby)
        db.session.commit()

        return make_response(new_user_hobby.to_dict(), 201)
        
        #except ValueError:

    
api.add_resource(UserHobbies, '/user-hobbies')
#------------------------------------HobbyUSER BY ID (GET, PATCH, DELETE) Routing------------------------------------------

class UserHobbiesByID(Resource):

    #Get Users Hobby by ID
    def get(self, id):
        user_hobby = UserHobby.query.filter(UserHobby.id == id).first()

        if user_hobby:
            response = make_response(user_hobby.to_dict(rules = ('-hobby.id',)),200)
        else:
            response = make_response({
                "error": "Users Hobby not found"
            }, 404)
        return response
    
    #Patch Users Hobby by ID
    def patch(self, id):
        user_hobby = UserHobby.query.filter(UserHobby.id == id).first()

        if user_hobby:
            #try:
            data = request.get_json()
            for key in data:
                setattr(user_hobby, key, data[key])
            db.session.add(user_hobby)
            db.session.commit()
            
            response = make_response(user_hobby.to_dict(), 202)
            #except ValueError:
        else:
            response = make_response({
                "error": "Users Hobby not found"
            }, 404)
        return response
    
    #Delete Users Hobby by ID
    def delete(self, id):
        user_hobby = UserHobby.query.filter(UserHobby.id == id).first()

        if user_hobby:
            db.session.delete(user_hobby)
            db.session.commit()
            response = make_response({"message":"Users Hobby Succesfully deleted!"}, 204)
        else:
            response = make_response({
                "error": "Users Hobby not found"
            }, 404)
        return response
    
api.add_resource(UserHobbiesByID, '/user/hobbies/<int:id>')
#------------------------------------------------------------------------------------------------------------------------------

#------------------------------------Competition Routing------------------------------------------------------------------------

class Competitions(Resource):
    def get(self):
        competitions = [competition.to_dict() for competition in Competition.query.all()]

        response = make_response(competitions, 200)

        return response 
    
api.add_resource(Competitions,'/competitions')

#------------------------------------CompetitionByID (GET, PATCH, DELETE) Routing----------------------------------------------

class CompetitionByID(Resource):
    def get(self, id):
        competition = Competition.query.filter(Competition.id == id).first()

        if competition:
            response = make_response(competition.to_dict(), 200)
        else:
            response = make_response({
                "error": "Competition not found"
            }, 404)
        return response
    
api.add_resource(CompetitionByID, '/competition/<int:id>')

#------------------------------------------------------------------------------------------------------------------------------


#------------------------------------Result Routing------------------------------------------

class Results(Resource):
    def get(self):
        results = [result.to_dict() for result in Result.query.all()]

        response = make_response(results, 200)

        return response
    
api.add_resource(Results, '/results')
#------------------------------------ResultByID (GET, PATCH, DELETE) Routing------------------------------------------

class ResultsByID(Resource):
    def get(self, id):
        result = Result.query.filter(Result.id == id).first()

        if result:
            response = make_response(result.to_dict(), 200)
        else:
            response = make_response({
                "error": "Result not found"
            }, 404)
        return response

api.add_resource(ResultsByID, '/result/<int:id>')
#------------------------------------------------------------------------------------------------------------------------------

#------------------------------------Entry Routing------------------------------------------

class Entries(Resource):
    def get(self):
        entries = [entry.to_dict() for entry in Entry.query.all()]

        response = make_response(entries, 200)

        return response
    
api.add_resource(Entries, '/entries')

#------------------------------------EntriesByID (GET, PATCH, DELETE) Routing------------------------------------------

class EntriesByID(Resource):
    def get(self,id):
        entry = Entry.query.filter(Entry.id == id).first()

        if entry:
            response = make_response(entry.to_dict(),200)
        else:
            response = make_response({
                "error": "Entry not found"
            }, 404)
        return response

api.add_resource(EntriesByID, '/entry/<int:id>')


if __name__ == '__main__':
    app.run(port=5555, debug=True)



#would be cool to make a competition by almost result ID? Like if the results competition id matches the competition ID show all those results for that competition? Same for entry

#maybe a route for user hobbies by user'

#user hobby is showing the hobby description, hobby id, and the type of hobby

# {
#   "expertise": 6,
#   "hobby": {
#     "description": "Theater involves the performance of plays or other dramatic works. It's a collaborative form of fine art that uses live performers to present a real or imagined event before an audience.",
#     "id": 31,
#     "type_of_hobby": "Theater"
#   },
#   "hobby_id": 31,
#   "id": 5,
#   "user_id": 5
# }

# Do I need the hobby twice? < - removed hobby id

#also, as far as competition goes, I should likely go and edit the result to be results and entry to entries like Tyler had suggested.