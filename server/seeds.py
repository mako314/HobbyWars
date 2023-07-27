from random import choice as rc, randrange

from app import app
from models import db, User, Hobby, Competition, Result, Entry

from random import randint, choice as rc
import pandas as pd

if __name__ == '__main__':
    with app.app_context():
        #Clear dbs
        print("Clearing db...")
        User.query.delete()
        Hobby.query.delete()
        Competition.query.delete()
        Result.query.delete()
        Entry.query.delete()
#-----------------------------------------------------------------------------------------
        #Seed users
        print("Seeding potential Users...")
        users = [
            User(
                firstName="",
                lastName="",
                age="",
                bio="",
                location="",
                phone="",
                email="",
                profileImg="",
                bannerImg="",
            ),
        ]

    # id = db.Column(db.Integer, primary_key = True)
    # firstName = db.Column(db.String)
    # lastName = db.Column(db.String)
    # bio = db.Column(db.String)
    # location = db.Column(db.String)
    # phone = db.Column(db.String)
    # email = db.Column(db.String)
    # # hobbies = db.Column(db.String)
    # profileImg = db.Column(db.String)
    # bannerImg = db.Column(db.String)