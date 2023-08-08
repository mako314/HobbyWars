# from models import db, User, Hobby, UserHobby, Competition, Result, Entry #original import
from models import User, Hobby, UserHobby, Competition, Result, Entry
# from flask_bcrypt import Bcrypt
# from flask_cors import CORS
# from flask_migrate import Migrate
from flask import Flask, request, make_response, jsonify, session
# from flask_restful import Api, Resource #original import
from flask_restful import Resource
from config import db, app, api
from sqlalchemy import asc
# import os #original import


#------------------------------------------------------------------------------------------------------------------------------
#Questions
#1. Should I do the request.get_json() above my try and excepts?
#2. Do I need to jsonify this stuff below for login and such? Eleanor had jsonified it, so I am curious as to why.
#3. I'd like to make it both username or email sign in

#------------------------------------User LOGIN------------------------------------------------------------------------------

class Login(Resource):

    def get(self):
        pass

    def post(self):
        data = request.get_json()
        #Test to find username,
        username = data['username']
        user = User.query.filter(User.username == username).first()
        #Grab password
        password = data['password']
        # print(user)
        #Test to see if password matches
        if user:
            if user.authenticate(password):
                session['user_id'] = user.id
                return user.to_dict(), 200
        #Do I need to JSONIFY^ ?

        return make_response({'error': 'Invalid username or password'}, 401)

api.add_resource(Login, '/login')
#------------------------------------------------------------------------------------------------------------------------------

#------------------------------------User LOGOUT------------------------------------------------------------------------------

class Logout(Resource):

    def delete(self): # just add this line!
        session['user_id'] = None
        return {'message': '204: No Content'}, 204

api.add_resource(Logout, '/logout')
#------------------------------------------------------------------------------------------------------------------------------

#------------------------------------Check Session------------------------------------------------------------------------------

class CheckSession(Resource):

    def get(self):

        # user_id = session.get('user_id')

        # if user_id:

        #     user_row = User.query.filter(User.id == user_id).first()

        #     response = make_response(jsonify(user_row.to_dict()), 200)



        user = User.query.filter(User.id == session.get('user_id')).first()
        if user:
            return user.to_dict()
        else:
            return {'message': '401: Not Authorized'}, 401

api.add_resource(CheckSession, '/check_session')
#------------------------------------------------------------------------------------------------------------------------------

#------------------------------------User Routing------------------------------------------------------------------------------

class Users(Resource):

    #GET all USERS
    def get(self):
        users = [user.to_dict(rules =('-user_hobby.id',)) for user in User.query.all()]

        response = make_response(users, 200)

        return response
    
    #POST a USER
    def post(self):
        try:
            data = request.get_json()
            new_user = User(
                firstName = data['firstName'],
                lastName = data['lastName'],
                username = data['username'],
                _password_hash = data['password'],
                age = data['age'],
                bio = data['bio'],
                location = data['location'],
                phone = data['phone'],
                email = data['email'],
                profileImg = data['profileImg'],
                bannerImg = data['bannerImg']
            )

            #How do I make the password hash not visible after it's submitted?
            
            db.session.add(new_user)

            new_user.password_hash = new_user._password_hash

            # print(new_user._password_hash)

            #So I actually needed to add the user before I can hash lol

            db.session.commit()

            return make_response(new_user.to_dict(), 201)
    
        except ValueError:
            return make_response({"error": ["validations errors, check your input and try again"]} , 400)
        
api.add_resource(Users, '/users')
#------------------------------------------------------------------------------------------------------------------------------

#---------------------------------UserByID (GET, PATCH, DELETE) Routing---------------------------------------------------------

class UserByID(Resource):

    #GET a Single USER by ID
    def get(self,id):
        user = User.query.filter(User.id == id).first()

        if user:
            response = make_response(user.to_dict(rules=('-entry.competitions.competition_tasks',
                                                         '-entry.competitions.description',
                                                         '-entry.competitions.objective',
                                                         '-entry.competitions.scoring',
                                                         '-entry.competitions.safety_measures',
                                                         '-entry.competitions.prize1',
                                                         '-entry.competitions.prize2',
                                                         '-entry.competitions.prize3',
                                                         '-entry.competitions.prize4',
                                                         '-entry.competitions.prize5',
                                                         '-entry.competitions.prize6',
                                                         '-entry.competitions.prize7',
                                                         '-entry.competitions.prize8',
                                                         '-entry.competitions.schedule',
                                                         '-entry.competitions.registration_schedule',
                                                         '-entry.competitions.requirements',
                                                         '-entry.competitions.user',
                                                         '-results.competitions.competition_tasks',
                                                         '-results.competitions.description',
                                                         '-results.competitions.objective',
                                                         '-results.competitions.scoring',
                                                         '-results.competitions.safety_measures',
                                                         '-results.competitions.prize1',
                                                         '-results.competitions.prize2',
                                                         '-results.competitions.prize3',
                                                         '-results.competitions.prize4',
                                                         '-results.competitions.prize5',
                                                         '-results.competitions.prize6',
                                                         '-results.competitions.prize7',
                                                         '-results.competitions.prize8',
                                                         '-results.competitions.schedule',
                                                         '-results.competitions.registration_schedule',
                                                         '-results.competitions.requirements',
                                                         '-results.competitions.user',)), 200)
        else:
            response = make_response({
                "error": "User not found"
            }, 404)
        return response
    
    #PATCH a USER by ID
    def patch(self, id):
        user = User.query.filter(User.id == id).first()

        if user:
            try:
                data = request.get_json()
                for key in data:
                    setattr(user, key, data[key])
                db.session.add(user)

                #The below two lines should be able to take the password and hash it after it has been patched, if it has been patched
                #Actually it does not seem possible to edit a password
                user.password_hash = user._password_hash

                # print(user._password_hash)

                db.session.commit()

                response = make_response(user.to_dict(), 202)
            
            except ValueError:
                return make_response({"error": ["validations errors, check your input and try again"]} , 400)

        else:
            response = make_response({
                "error": "User not found"
            }, 404)
        return response
    
    #DELETE USER by ID
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

    #GET ALL hobbies
    def get(self):
        hobby = [hobby.to_dict() for hobby in Hobby.query.all()]

        response = make_response(hobby, 200)

        return response
    
    #POST a Hobby
    def post(self):
        try:
            data = request.get_json()
            new_hobby = Hobby(
                type_of_hobby = data['type_of_hobby'],
                description = data['description']
            )

            db.session.add(new_hobby)
            db.session.commit()

            return make_response(new_hobby.to_dict(), 201)
        
        except ValueError:
            return make_response({"error": ["validations errors, check your input and try again"]} , 400)
    
api.add_resource(Hobbies, '/hobbies')
#------------------------------------------------------------------------------------------------------------------------------

#------------------------------------Hobby by ID (Not USER) (GET, PATCH, DELETE) Routing ------------------------------------------

class HobbiesByID(Resource):

    #GET Hobbies by ID
    def get(self, id):
        hobby = Hobby.query.filter(Hobby.id == id).first()

        if hobby:
            response = make_response(hobby.to_dict(),200)
        else:
            response = make_response({
                "error": "Hobby not found"
            }, 404)
        return response
    
    #PATCH a Hobby by ID
    def patch(self, id):
        hobby = Hobby.query.filter(Hobby.id == id).first()

        if hobby:
            try:
                data = request.get_json()
                for key in data:
                    setattr(hobby, key, data[key])
                db.session.add(hobby)
                db.session.commit()

                response = make_response(hobby.to_dict(), 202)
            
            except ValueError:
                return make_response({"error": ["validations errors, check your input and try again"]} , 400)

        else:
            response = make_response({
                "error": "Hobby not found"
            }, 404)
        return response
    
    #DELETE Hobby by ID
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

    #GET ALL User Hobbies
    def get(self):
        user_hobbies = [hobby.to_dict() for hobby in UserHobby.query.all()]

        response = make_response(user_hobbies, 200)

        return response
    
    #POST a USER Hobby
    def post(self):
        try:
            data = request.get_json()
            new_user_hobby = UserHobby(
                expertise = data['expertise'],
                user_id = data['user_id'],
                hobby_id = data['hobby_id']
            )

            db.session.add(new_user_hobby)
            db.session.commit()

            return make_response(new_user_hobby.to_dict(), 201)
        
        except ValueError:
            return make_response({"error": ["validations errors, check your input and try again"]} , 400)

    
api.add_resource(UserHobbies, '/user-hobbies')
#------------------------------------------------------------------------------------------------------------------------------

#------------------------------------HobbyUSER BY ID (GET, PATCH, DELETE) Routing------------------------------------------

class UserHobbiesByID(Resource):

    #GET Users Hobby by ID
    def get(self, id):
        user_hobby = UserHobby.query.filter(UserHobby.id == id).first()

        if user_hobby:
            response = make_response(user_hobby.to_dict(rules = ('-hobby.id',)),200)
        else:
            response = make_response({
                "error": "Users Hobby not found"
            }, 404)
        return response
    
    #PATCH Users Hobby by ID
    def patch(self, id):
        user_hobby = UserHobby.query.filter(UserHobby.id == id).first()

        if user_hobby:
            try:
                data = request.get_json()
                for key in data:
                    setattr(user_hobby, key, data[key])
                db.session.add(user_hobby)
                db.session.commit()
                
                response = make_response(user_hobby.to_dict(), 202)
            except ValueError:
                return make_response({"error": ["validations errors, check your input and try again"]} , 400)

        else:
            response = make_response({
                "error": "Users Hobby not found"
            }, 404)
        return response
    
    #DELETE Users Hobby by ID
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

    #GET ALL Competitions
    def get(self):
        competitions = [competition.to_dict() for competition in Competition.query.all()]

        response = make_response(competitions, 200)

        return response 
    
    #POST a Competition
    def post(self):
        try:
            data = request.get_json()
            new_competition = Competition(
                title = data['title'],
                objective = data['objective'],
                description = data['description'],
                scoring = data['scoring'],
                cost_of_entry = data['cost_of_entry'],
                schedule = data['schedule'],
                contact = data['contact'],
                location = data['location'],
                requirements = data['requirements'],
                competition_tasks = data['competition_tasks'],
                safety_measures = data['safety_measures'],
                prize1 = data['prize1'],
                prize2 = data['prize2'],
                prize3 = data['prize3'],
                prize4 = data['prize4'],
                prize5 = data['prize5'],
                prize6 = data['prize6'],
                prize7 = data['prize7'],
                prize8 = data['prize8'],
                registration_schedule = data['registration_schedule'],
                user_id = data['user_id']
            )

            print(new_competition)
            print("these prints are on line 412")
            db.session.add(new_competition)
            db.session.commit()

            return make_response(new_competition.to_dict(), 201)
        except ValueError:
            return make_response({"error": ["validations errors, check your input and try again"]} , 400)


api.add_resource(Competitions,'/competitions')
#------------------------------------------------------------------------------------------------------------------------------

#------------------------------------CompetitionByID (GET, PATCH, DELETE) Routing----------------------------------------------

class CompetitionByID(Resource):

    #GET Competition by ID
    def get(self, id):
        competition = Competition.query.filter(Competition.id == id).first()

        if competition:
            response = make_response(competition.to_dict(), 200)
        else:
            response = make_response({
                "error": "Competition not found"
            }, 404)
        return response
    
    #PATCH Competition by ID
    def patch(self, id):
        competition = Competition.query.filter(Competition.id == id).first()

        if competition:
            try:
                data = request.get_json()
                for key in data:
                    setattr(competition, key, data[key])
                db.session.add(competition)
                db.session.commit()

                response = make_response(competition.to_dict(), 202)

            except ValueError:
                return make_response({"error": ["validations errors, check your input and try again"]} , 400)

        else:
            response = make_response({
                "error": "Competition not found"
            }, 404)
        return response
    
    #DELETE Competition by ID
    def delete(self,id):
        competition = Competition.query.filter(Competition.id == id).first()

        if competition:
            db.session.delete(competition)
            db.session.commit()

            response = make_response({"message":"Competition Succesfully deleted!"}, 204)
        else:
            response = make_response({
                "error": "Competition not found"
            }, 404)
        return response

    
api.add_resource(CompetitionByID, '/competition/<int:id>')

#------------------------------------------------------------------------------------------------------------------------------


#------------------------------------Result Routing------------------------------------------------------------------------------

class Results(Resource):

    #GET ALL Results
    def get(self):
        results = [result.to_dict() for result in Result.query.all()]

        response = make_response(results, 200)

        return response
    
    #POST a Result
    def post(self):
        try:
            data = request.get_json()
            result = Result(
                placement = data['placement'],
                user_id = data['user_id'],
                competition_id = data['competition_id'],
                entry_id = data['entry_id']
            )

            db.session.add(result)
            db.session.commit()

            return make_response(result.to_dict(), 201)
    
        except ValueError:
            return make_response({"error": ["validations errors, check your input and try again"]} , 400)

api.add_resource(Results, '/results')
#------------------------------------------------------------------------------------------------------------------------------

#------------------------------------ResultByID (GET, PATCH, DELETE) Routing------------------------------------------

class ResultsByID(Resource):

    #GET Result by ID
    def get(self, id):
        result = Result.query.filter(Result.id == id).first()

        if result:
            response = make_response(result.to_dict(), 200)
        else:
            response = make_response({
                "error": "Result not found"
            }, 404)
        return response
    
    #PATCH Result by ID
    def patch(self, id):
        result = Result.query.filter(Result.id == id).first()

        if result:
            try:
                data = request.get_json()
                for key in data:
                    setattr(result, key, data[key])
                db.session.add(result)
                db.session.commit()

                response = make_response(result.to_dict(), 202)

            except ValueError:
                return make_response({"error": ["validations errors, check your input and try again"]} , 400)

        else:
            response = make_response({
                "error": "Result not found"
            }, 404)
        return response
    
    #DELETE Result by ID
    def delete(self, id):
        result = Result.query.filter(Result.id == id).first()

        if result:
            db.session.delete(result)
            db.session.commit()

            response = make_response({"message":"Result Succesfully deleted!"}, 204)
        else:
            response = make_response({
                "error": "Result not found"
            }, 404)
        return response


api.add_resource(ResultsByID, '/result/<int:id>')
#------------------------------------------------------------------------------------------------------------------------------

# This might not be a bad idea to do with the entry ID if it matches the entry ID of the result for example
# class ResultsByUserID(Resource):
#     #GET Result by User ID?
#     def get(self, id):
#         result = Result.query.filter(Result.user_id == id).first()

#         if result:
#             response = make_response(result.to_dict(), 200)
#         else:
#             response = make_response({
#                 "error": "Result not found"
#             }, 404)
#         return response

# api.add_resource(ResultsByUserID, '/user/result/<int:id>')
#------------------------------------Entry Routing------------------------------------------------------------------------------

class Entries(Resource):

    #GET all Entries
    def get(self):
        entries = [entry.to_dict() for entry in Entry.query.all()]
        # description
        # submission
        response = make_response(entries, 200)

        return response
    
    #POST an Entry
    def post(self):
        try:
            data = request.get_json()
            entry = Entry(
                submission = data['submission'],
                description = data['description'],
                user_id = data['user_id'],
                competition_id = data['competition_id']
            )

            db.session.add(entry)
            db.session.commit()

            return make_response(entry.to_dict(), 201)
        
        except ValueError:
            return make_response({"error": ["validations errors, check your input and try again"]} , 400)

api.add_resource(Entries, '/entries')
#------------------------------------------------------------------------------------------------------------------------------

#------------------------------------EntriesByID (GET, PATCH, DELETE) Routing------------------------------------------

class EntriesByID(Resource):

    #GET Entry by ID
    def get(self,id):
        entry = Entry.query.filter(Entry.id == id).first()

        if entry:
            response = make_response(entry.to_dict(),200)
        else:
            response = make_response({
                "error": "Entry not found"
            }, 404)
        return response
    
    #PATCH an Entry
    def patch(self, id):
        entry = Entry.query.filter(Entry.id == id).first()

        if entry:
            try:
                data = request.get_json()
                for key in data:
                    setattr(entry, key, data[key])
                db.session.add(entry)
                db.session.commit()

                response = make_response(entry.to_dict(), 202)
            
            except ValueError:
                return make_response({"error": ["validations errors, check your input and try again"]} , 400)

        else:
            response = make_response({
                "error": "Entry not found"
            }, 404)
        return response
    
    #DELETE an Entry
    def delete(self,id):
        entry = Entry.query.filter(Entry.id == id).first()

        if entry:
            db.session.delete(entry)
            db.session.commit()

            response = make_response({"message":"Entry Succesfully deleted!"}, 204)
        else:
            response = make_response({
                "error": "Entry not found"
            }, 404)
        return response

api.add_resource(EntriesByID, '/entry/<int:id>')
#----------------------------------------------------Attempt at a leaderboard route--------------------------------------------------------------------------------

class Leaderboard(Resource):
    def get(self):
        leaderboard_entries = db.session.query(Result, Entry) \
                                        .join(Entry, Result.entry_id == Entry.id) \
                                        .filter(Result.competition_id == Entry.competition_id) \
                                        .order_by(asc(Result.placement)).all()

        data = []
        for result, entry in leaderboard_entries:
            data.append({
                "submission": entry.submission,
                "description": entry.description,
                "placement": result.placement
            })
        return jsonify(data)
    
        # response = make_response({data.to_dict()})

api.add_resource(Leaderboard, '/leaderboard')

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