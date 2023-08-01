from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import MetaData
from sqlalchemy.orm import validates
from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.hybrid import hybrid_property
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

    #Serialize rules
    # serialize_rules = ('-competitions.user','-hobby.users', '-result.users', '-entry.user', '-user_hobby.user') #WHAT I'VE TRIED
    serialize_rules = ( #Result rules, subtract competitions.entry to remove ALL entries, but I still want user entries.
                        #The third rule here should remove all the competitions results which get populated for some reason
                       '-results.user',
                       '-results.competitions.entry',
                       '-results.competitions.result',
                       #User_Hobby Rules. Remove recursiong with user, remove userID because we have it. Remove hobby_id because user hobby has it.
                       '-user_hobby.user_id',
                       '-user_hobby.user',
                      #'-user_hobby.hobby', #Can uncomment this if you DONT want to see the users hobby description / type
                       #Entry rules
                       '-entry.user', #Removes recursion back to our user
                       '-entry.user_id' #Removes recursion back to our user
                       #'-results.competitions', #This one removes competitions from appearing with all their clutter
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


class Competition(db.Model, SerializerMixin):
    __tablename__ = "competitions"
    #Columns
    id = db.Column(db.Integer, primary_key = True)

    #-----Obj, Description, Tasks, and CoE-----
    title = db.Column(db.String)
    objective = db.Column(db.String)
    description = db.Column(db.String)
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
    # user_id = db.Column(db.Integer, db.ForeignKey('users.id')) <- UNSURE IF NEEDED
    # entry_id = db.Column(db.Integer, db.ForeignKey('entries.id'))

    #Relationships
    # user = db.relationship('User', back_populates="competitions") COMMENTED OUT NOT SURE IF NEEDED
    entry = db.relationship('Entry', back_populates="competitions")
    result = db.relationship('Result', back_populates="competitions")

    #Serialize Rules
    serialize_rules = (#remove recursing back to competitions from entry
                       '-entry.competitions',
                       #remove user from entry portion
                       '-entry.user',
                       #remove recursing back to competitions from result
                       '-result.competitions',
                       #remove user from result portion
                       '-result.user'
                       )
    #'-user.competitions'

    #The way I see it, all of our user information is readily available within the entries and results. Meaning no user information technically has to appear. You can access it with entry.user_id and results.user_id?


class Result(db.Model, SerializerMixin):
    __tablename__ = "results"
    #Columns
    id = db.Column(db.Integer, primary_key = True)
    placement = db.Column(db.Integer)

    #Foreign Keys
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    competition_id = db.Column(db.Integer, db.ForeignKey('competitions.id'))

    #Relationships
    user = db.relationship('User', back_populates="results")
    competitions = db.relationship('Competition', back_populates="result")

    #Serialize Rules
    #this first serliazer removes all the user information. I remove competitions.result so no infinite recursion. 
    #May be a good idea to just remove competitions as it should be accesible via the competition.id, so I could even get the entries with competition.id.entry?
    serialize_rules = ('-user','-competitions') #'-competitions.result'

    #'-competitions.result', taking this out for now, it stops infinite recursion but I am just going to remove all of the competitions information.

class Entry(db.Model, SerializerMixin):
    __tablename__ = "entries"
    #Columns
    id = db.Column(db.Integer, primary_key = True)
    submission = db.Column(db.String)
    description = db.Column(db.String)
    #tools_utilized = db.Column(db.String) <- do I need this?

    #Foreign Keys
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    competition_id = db.Column(db.Integer, db.ForeignKey('competitions.id'))

    #Relationships
    user = db.relationship('User', back_populates="entry")
    competitions = db.relationship('Competition', back_populates="entry" )

    #Serialize Rules
    serialize_rules = ('-user','-competitions', )

    #originally had this '-user.entry' switching to just '-user'
    # This likely looks the cleanest, or else I'd have to have a bunch of to_dict rules. You can still access things I believe with entry.user_id.name for example



    #might need an image for my competitions >.< devil emoji 2x