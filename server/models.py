from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import MetaData
from sqlalchemy.orm import validates
from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.hybrid import hybrid_property

from datetime import datetime

# from app import bcrypt #<--- this is giving me the circular import error ImportError: cannot import name 'db' from partially initialized module 'models' (most likely due to a circular import)
from config import db, bcrypt

# metadata = MetaData(naming_convention={
#     "fk": "fk_%(table_name)s_%(column_0_name)s_%(referred_table_name)s",
# })

# db = SQLAlchemy() #<- I had not commented this or ^ that out, maybe that was what was giving me issues.

class User(db.Model, SerializerMixin):
    __tablename__ = "users"
    #Columns
    id = db.Column(db.Integer, primary_key = True)
    firstName = db.Column(db.String)
    lastName = db.Column(db.String)
    username = db.Column(db.String, unique = True)
    _password_hash = db.Column(db.String, nullable=False)
    age = db.Column(db.Integer) # Would like to swap this to one of the calendars where you select your age.
    bio = db.Column(db.String)
    location = db.Column(db.String)
    phone = db.Column(db.String)
    email = db.Column(db.String)
    profileImg = db.Column(db.String)
    bannerImg = db.Column(db.String)

    #Relationships
    results = db.relationship('Result', back_populates="user")
    entry = db.relationship('Entry', back_populates="user")
    user_hobby = db.relationship('UserHobby', back_populates="user")
    competitions = db.relationship('Competition', back_populates='user')

    #Serialize rules
    # serialize_rules = ('-competitions.user','-hobby.users', '-result.users', '-entry.user', '-user_hobby.user') #WHAT I'VE TRIED
    serialize_rules = ( #Result rules, subtract competitions.entry to remove ALL entry, but I still want user entry.
                        #The third rule here should remove all the competitions results which get populated for some reason
                       '-results.user',
                    #    '-results.competitions.entry', # had to change everything to entry so it doesn't take the object.entries reserved word
                    #    '-results.competitions.results',
                    #    '-results.competitions', #Just removing all of the competitions stuff instead of just results and entry now that I'm including a competitions relationship I have competition data.
                       '-results.competitions.entry' # I needed the results competition information in user for the dashboard
                       #User_Hobby Rules. Remove recursiong with user, remove userID because we have it. Remove hobby_id because user hobby has it.
                       '-user_hobby.user_id',
                       '-user_hobby.user',
                      #'-user_hobby.hobby', #Can uncomment this if you DONT want to see the users hobby description / type
                       #Entry rules
                       '-entry.user', #Removes recursion back to our user # had to change everything to entry so it doesn't take the object.entries reserved word
                    #    '-entry.user_id', #Removes recursion back to our user # had to change everything to entry so it doesn't take the object.entries reserved word
                       '-competitions.user',
                       ) 
    
    #Random serialize rules that could've been done
    #'-entry.user','-user_hobby.user' #'-results.user_id',
    #'-user_hobby.hobby_id', <- This would remove the hobby id from the user hobby in the user data. I want the hobby id though.


    # #PROPERTIES
    @hybrid_property
    def password_hash(self):
        return self._password_hash

    @password_hash.setter
    def password_hash(self, password):
        # utf-8 encoding and decoding is required in python 3
        password_hash = bcrypt.generate_password_hash(
            password.encode('utf-8'))
        self._password_hash = password_hash.decode('utf-8')

    def authenticate(self, password):
        return bcrypt.check_password_hash(
            self._password_hash, password.encode('utf-8'))

   #Validations ( need to add one to make sure user has username > 3 characters)
    @validates("email")
    def validates_email(self, key, email):
        if len(email) > 0 and "@"  in email:
            return email
        else:
            raise ValueError("Please check that you entered your email correctly")
        
    @validates("age")
    def validates_age(self, key, age):
        age = int(age)
        if age >= 18:
            return age
        else:
            raise ValueError("Sorry, but you must be 18 years or older to sign up.")
    
    # @validates("username")
    # def validate_username(self, key, username):
    #     if not username or len(username) <= 0:
    #         raise ValueError("Username is required.")
    #     else:
    #         user = User.query.filter(User.username == username).first()
    #         if user:
    #             raise ValueError("Sorry, but this username is already taken.")
    #     return username
    #This kind of breaks my patch
    
    @validates(" _password_hash")
    def validate_password(self, key,  _password_hash):
        if  not _password_hash and len( _password_hash) <= 6:
            raise ValueError("A Password greater than 6 characters is required")
        else:
            return _password_hash



# class User(db.Model, SerializerMixin):
#     __tablename__ = 'users'

#     id = db.Column(db.Integer, primary_key = True)
#     name = db.Column(db.String)
#     age = db.Column(db.Integer)
#     location = db.Column(db.String)
#     email = db.Column(db.String)
#     phone = db.Column(db.Integer)
#     movie_preferences = db.Column(db.String)

#     #Foreign Key

#     #Relationships
#     movie_favorite = db.relationship('MovieFavorite', back_populates='user')

#     #Serialize Rules

# class Movie(db.Model, SerializerMixin):
#     __tablename__ = 'movies'
#     id = db.Column(db.Integer, primary_key = True)
#     title = db.Column(db.String)
#     director = db.Column(db.String)
#     length = db.Column(db.Integer)
#     awards = db.Column(db.String)
#     genre = db.Column(db.String)
#     changed_at = db.Column(db.DateTime, default=datetime.utcnow)
#     updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

#     #Foreign Key

#     #Relationships
#     movie_favorite = db.relationship('MovieFavorite', back_populates='movie')

#     #Serialize Rules

# class MovieFavorite(db.Model, SerializerMixin):
#     __tablename__ = 'movie_favorites'

#     id = db.Column(db.Integer, primary_key = True)

#     #Foreign Keys
#     user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
#     movie_id = db.Column(db.Integer, db.ForeignKey('movies.id'))

#     #Relationships
#     user = db.relationship('User', back_populates='movie_favorite')
#     movie = db.relationship('Movie', back_populates='movie_favorites')

#     #Serialize Rules





class Hobby(db.Model, SerializerMixin):
    __tablename__ = "hobbies"
    #Columns
    id = db.Column(db.Integer, primary_key = True)
    type_of_hobby = db.Column(db.String)
    description = db.Column(db.String)

    #Foreign Keys

    #Relationships
    user_hobby = db.relationship('UserHobby', back_populates="hobby")

    #Serialize Rules
    #user_hobby.hobby removes the recursion back to hobby.
    #user_hobby.user removes user data that gets populated from user_hobby
    serialize_rules = ('-user_hobby.hobby', '-user_hobby.user') # SHOULD I ADD THIS -> ('-user_hobby.user')

    #Validations
    @validates("type_of_hobby")
    def validate_type_of_hobby(self, key, type_of_hobby):
        if not type_of_hobby or len( type_of_hobby) <= 3:
            raise ValueError("A hobby requires more than 3 characters, the more specific the better")
        else:
            hobby = Hobby.query.filter(Hobby.type_of_hobby == type_of_hobby).first()
            if hobby:
                raise ValueError("Sorry, but this hobby already exists.")
        return type_of_hobby
        
    @validates("description")
    def validate_description(self, key, description):
        if description and len(description) >= 10:
            return description
        else:
            raise ValueError("A description is required to better understand the hobby you are adding. A minimum of 10 characters.")


class UserHobby(db.Model, SerializerMixin):
    __tablename__= "user_hobbies"
    id = db.Column(db.Integer, primary_key = True)
    expertise = db.Column(db.Integer) #1-10 or 1-5?

    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    hobby_id = db.Column(db.Integer, db.ForeignKey('hobbies.id'))

    #Relationships
    user = db.relationship('User', back_populates="user_hobby")
    hobby = db.relationship('Hobby', back_populates="user_hobby")
    
    #Serialize Rules
    serialize_rules = ('-user','-hobby.user_hobby',) #'-user_hobby.user', 'user_hobby.hobby'

    #Validations
    @validates("expertise")
    def validate_expertise(self, key, expertise):
        expertise = int(expertise)
        if expertise and 0 <= expertise < 10:
            return expertise
        else:
            raise ValueError("An expertise level is required, the acceptable levels are 1-10.")



class Competition(db.Model, SerializerMixin):
    __tablename__ = "competitions"
    #Columns
    id = db.Column(db.Integer, primary_key = True)

    #-----Obj, Description, Tasks, and CoE-----
    title = db.Column(db.String)
    objective = db.Column(db.String)
    description = db.Column(db.String)
    compImg = db.Column(db.String)
    scoring = db.Column(db.String)
    cost_of_entry = db.Column(db.Integer)

    #----Logistics Info----
    schedule = db.Column(db.String)
    contact = db.Column(db.String)
    location = db.Column(db.String)

    #----Req, Tasks, and Safety Measures----
    #may need to add scoring as a gauge, and then result can hold their score + result
    requirements = db.Column(db.String) #This would be hobby
    competition_tasks = db.Column(db.String)
    safety_measures = db.Column(db.String)

    #---Prizes!!!----
    prize1 = db.Column(db.String)
    prize2 = db.Column(db.String)
    prize3 = db.Column(db.String)
    prize4 = db.Column(db.String)
    prize5 = db.Column(db.String)
    prize6 = db.Column(db.String)
    prize7 = db.Column(db.String)
    prize8 = db.Column(db.String)
    #Need to find prizing information


    #Registration schedule and or maybe limit?
    registration_schedule = db.Column(db.String) # I really want this to use DateTime but likely not

    # notes = db.Column(db.String) # May incldue this as an editable text area

    # #Foreign Keys Likely will link this to entries and results instead of a user id
    user_id = db.Column(db.Integer, db.ForeignKey('users.id')) #<- INCORPORATE
    # entry_id = db.Column(db.Integer, db.ForeignKey('entries.id'))

    #Relationships
    user = db.relationship('User', back_populates="competitions") #COMMENTED OUT NOT SURE IF NEEDED
    entry = db.relationship('Entry', back_populates="competitions") #CHANGE TO ENTRY DUE TO FREAKING OBJECT.ENTRIES
    results = db.relationship('Result', back_populates="competitions")

    #Serialize Rules
    serialize_rules = (#remove recursing back to competitions from entry
                       '-entry.competitions',
                       #remove user from entry portion ## NEED TO CHANGE entry TO ENTRY UNFORTUNATELY
                    #  # '-entry.user', IF ANY DATA ISSUES BETWEEN NOW AND LATER IT IS THIS -------------------------------------------------------------------------------READ ME
                       #remove recursing back to competitions from result
                       '-results.competitions',
                       #remove user from result portion
                       '-results.user',
                       #Remove users competitions from the user table to avoid maximum recursion (FIRST ONE)
                       '-user.competitions',
                       '-user.results',
                       '-user.entry',         #These 3 remove unnecessary information we'd already have available to us with the ID and such, I just want some basic information from the user.
                       '-user.user_hobby',       #competitions already holds the entries and results, shouldn't need that from our users. Just basic info
                       '-user._password_hash'   #Remove hashed passwords.
                       )
    #'-user.competitions'

    #The way I see it, all of our user information is readily available within the entries and results. Meaning no user information technically has to appear. You can access it with entry.user_id and results.user_id?

    #Validations
    @validates("title")
    def validate_title(self, key, title):
        if title and len(title) > 0:
            return title
        else:
            raise ValueError("A title is required.")
        
    @validates("objective")
    def validate_objective(self, key, objective):
        if objective and len(objective) > 0:
            return objective
        else:
            raise ValueError("An objective is required.")
        
    # @validates("scoring")
    # def validate_scoring(self, key, scoring):
    #     if scoring and len(scoring) > 0:
    #         return scoring
    #     else:
    #         raise ValueError("A scoring system is required.")
        
    # # @validates("schedule")
    # def validate_schedule(self, key, schedule):
    #     if schedule and len(schedule) > 0:
    #         return schedule
    #     else:
    #         raise ValueError("A schedule system is required.")
    
    @validates("prize1")
    def validate_prize1(self, key, prize1):
        if prize1 and len(prize1) > 0:
            return prize1
        else:
            raise ValueError("You need a minimum of three prizes, they do not have to be significant.")

    @validates("prize2")
    def validate_prize2(self, key, prize2):
        if prize2 and len(prize2) > 0:
            return prize2
        else:
            raise ValueError("You need a minimum of three prizes, they do not have to be significant.")

    @validates("prize3")
    def validate_prize3(self, key, prize3):
        if prize3 and len(prize3) > 0:
            return prize3
        else:
            raise ValueError("You need a minimum of three prizes, they do not have to be significant.")
        
    # @validates("requirements")
    # def validate_requirements(self, key, requirements):
    #     if requirements and len(requirements) > 0:
    #         return requirements
    #     else:
    #         raise ValueError("You need to set some basic requirements")

class Result(db.Model, SerializerMixin):
    __tablename__ = "results"
    #Columns
    id = db.Column(db.Integer, primary_key = True)
    placement = db.Column(db.Integer)

    #Foreign Keys
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    competition_id = db.Column(db.Integer, db.ForeignKey('competitions.id'))
    entry_id = db.Column(db.Integer, db.ForeignKey('entry.id')) # <- maybe I can replace this with ? Or leave it
    #Maybe a entry ID to tie it to the users entry

    #Relationships
    user = db.relationship('User', back_populates="results")
    competitions = db.relationship('Competition', back_populates="results")
    entry = db.relationship('Entry', back_populates="results")

    #Serialize Rules
    #this first serliazer removes all the user information. I remove competitions.result so no infinite recursion. 
    #May be a good idea to just remove competitions as it should be accesible via the competition.id, so I could even get the entries with competition.id.entry?
    serialize_rules = ('-user.results',
                       '-user.competitions',
                       '-user.entry',
                       '-competitions.results',
                       '-competitions.entry',
                       '-competitions.user',
                       '-entry.competitions',
                       #'-entry.user',       #These three are new because of my new relationship to entries so I can get entry information.
                       '-entry.results',) #Had result here instead of results
    #'-competitions.results', '-competitions.entry
    #'-competitions.result', taking this out for now, it stops infinite recursion but I am just going to remove all of the competitions information.

    #Validations
    @validates("placement")
    def validate_placement(self, key, placement):
        placement = int(placement)
        if placement and placement > 0:
            return placement
        else:
            raise ValueError("You need to have placements for your results.")


class Entry(db.Model, SerializerMixin):
    __tablename__ = "entry"
    #Columns
    id = db.Column(db.Integer, primary_key = True)
    submission = db.Column(db.String)
    description = db.Column(db.String)
    #tools_utilized = db.Column(db.String) <- do I need this?

    #Foreign Keys
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    competition_id = db.Column(db.Integer, db.ForeignKey('competitions.id'))

    #Relationships
    user = db.relationship('User', back_populates="entry") #need to change this to something better becuase object.entries is reserved
    competitions = db.relationship('Competition', back_populates="entry" )
    results = db.relationship('Result', back_populates="entry")

    #Serialize Rules                                                            
    serialize_rules = ('-user.results',
                       '-user.entry',
                       '-user.competitions',
                       '-user.user_hobby',
                       '-competitions.entry',
                       '-competitions.results',
                    #    '-competitions.user', 
                       '-results.entry',            #These three are new because of the new relationship
                       '-results.competitions', 
                       '-results.user' )

    #originally had this '-user.entry' switching to just '-user'
    # This likely looks the cleanest, or else I'd have to have a bunch of to_dict rules. You can still access things I believe with entry.user_id.name for example

    #Validations
    # @validates("submission")
    # def validate_submission(self, key, submission):
    #     if submission and len(submission) > 0:
    #         return submission
    #     else:
    #         raise ValueError("To submit an entry, you need a submission.")




















    #might need an image for my competitions >.< devil emoji 2x

    #may need to include a host ID and track it with user ID to decide who can close / delete the competitions

    #include validations for email on user end