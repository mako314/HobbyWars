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
    bio = db.Column(db.String)
    location = db.Column(db.String)
    phone = db.Column(db.String)
    email = db.Column(db.String)
    # hobbies = db.Column(db.String)
    profileImg = db.Column(db.String)
    bannerImg = db.Column(db.String)

    competitions = db.relationship('Competition', backref="users" )
    hobbies = db.relationship('Hobby', backref="users")
    result = db.relationship('Result', backref="users")
    entries = db.relationship('Entry', backref="users")

class Hobby(db.Model, SerializerMixin):
    __tablename__ = "hobbies"
    id = db.Column(db.Integer, primary_key = True)
    hobby = db.Column(db.String)
    expertise = db.Column(db.Integer) #1-10 or 1-5?

    #Foreign Keys
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))



class Competition(db.Model, SerializerMixin):
    __tablename__ = "competitions"
    #Columns
    id = db.Column(db.Integer, primary_key = True)
    requirements = db.Column(db.String) #This would be hobby
    description = db.Column(db.String)
    cost_of_entry = db.Column(db.Integer)
    schedule = db.Column(db.String)
    contact = db.Column(db.String)
    location = db.Column(db.String)

    prize1 = db.Column(db.String)
    prize2 = db.Column(db.String)
    prize3 = db.Column(db.String)
    prize4 = db.Column(db.String)
    prize5 = db.Column(db.String)
    prize6 = db.Column(db.String)
    prize7 = db.Column(db.String)
    prize8 = db.Column(db.String)
    #Need to find prizing information

    registration_schedule = db.Column(db.String) # I really want this to use DateTime but likely not

    users = db.relationship('User', backref="competitions")
    entries = db.relationship('Entry', backref="competitions")
    result = db.relationship('Result', backref="competitions")


class Result(db.Model, SerializerMixin):
    __tablename__ = "results"
    #Columns
    id = db.Column(db.Integer, primary_key = True)
    placement = db.Column(db.Integer)

    #Foreign Keys
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    competition_id = db.Column(db.Integer, db.ForeignKey('competitions.id'))

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
