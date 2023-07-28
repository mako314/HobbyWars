from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import MetaData
from sqlalchemy.orm import validates
from sqlalchemy_serializer import SerializerMixin

metadata = MetaData(naming_convention={
    "fk": "fk_%(table_name)s_%(column_0_name)s_%(referred_table_name)s",
})

db = SQLAlchemy()

class User(db.Model, SerializerMixin):
    __tablename__ = "users"
    #Columns
    id = db.Column(db.Integer, primary_key = True)
    firstName = db.Column(db.String)
    lastName = db.Column(db.String)
    username = db.Column(db.String)
    age = db.Column(db.Integer) # Would like to swap this to one of the calendars where you select your age.
    bio = db.Column(db.String)
    location = db.Column(db.String)
    phone = db.Column(db.String)
    email = db.Column(db.String)
    # hobbies = db.Column(db.String)
    profileImg = db.Column(db.String)
    bannerImg = db.Column(db.String)

    #Relationships
    competitions = db.relationship('Competition', back_populates="user" ) 
    # hobby = db.relationship('Hobby', back_populates="user")
    result = db.relationship('Result', back_populates="user")
    entry = db.relationship('Entry', back_populates="user")
    user_hobby = db.relationship('UserHobby', back_populates="user")

    #Serialize rules
    serialize_rules = ('-competitions.user','-hobby.users', '-result.users', '-entry.user')

class Hobby(db.Model, SerializerMixin):
    __tablename__ = "hobbies"
    id = db.Column(db.Integer, primary_key = True)
    hobby = db.Column(db.String)
    description = db.Column(db.String)
    #Foreign Keys
    # user_id = db.Column(db.Integer, db.ForeignKey('users.id'))

    #Relationships
    # user = db.relationship('User', back_populates="hobby")


    #Serialize Rules
class UserHobby(db.Model, SerializerMixin):
    __tablename__= "user_hobbies"
    id = db.Column(db.Integer, primary_key = True)
    expertise = db.Column(db.Integer) #1-10 or 1-5?

    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    hobby_id = db.Column(db.Integer, db.ForeignKey('hobbies.id'))

    user = db.relationship('User', back_populates="user_hobby")


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
    # user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    # entry_id = db.Column(db.Integer, db.ForeignKey('entries.id'))

    #Relationships
    user = db.relationship('User', back_populates="competitions")
    entry = db.relationship('Entry', back_populates="competitions")
    result = db.relationship('Result', back_populates="competitions")

    #Serialize Rules
    serialize_rules = ('-user.competitions', '-entry.competitions', '-result.competitions')


class Result(db.Model, SerializerMixin):
    __tablename__ = "results"
    #Columns
    id = db.Column(db.Integer, primary_key = True)
    placement = db.Column(db.Integer)

    #Foreign Keys
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    competition_id = db.Column(db.Integer, db.ForeignKey('competitions.id'))

    #Relationships
    user = db.relationship('User', back_populates="result")
    competitions = db.relationship('Competition', back_populates="result" )

    
    #Serialize Rules
    serialize_rules = ('-user.results','-competitions.result')


class Entry(db.Model, SerializerMixin):
    __tablename__ = "entries"
    #Columns
    id = db.Column(db.Integer, primary_key = True)
    submission = db.Column(db.String)
    description = db.Column(db.String)
    tools_utilized = db.Column(db.String)

    #Foreign Keys
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    competition_id = db.Column(db.Integer, db.ForeignKey('competitions.id'))

    #Relationships
    user = db.relationship('User', back_populates="entry")
    competitions = db.relationship('Competition', back_populates="entry" )

    #Serialize Rules
    serialize_rules = ('-users.entry','competitions.entry')


#table for user hobbies so they can put experience etc