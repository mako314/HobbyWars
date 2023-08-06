# HobbyWars
Hobby Wars - Friendly Competition Platform

Hobby Wars - Friendly Competition Platform:
Objective: The Hobby Wars platform aims to bring together hobbyists and enthusiasts from various fields to engage in friendly competitions, showcase their skills, and celebrate their creativity. By providing a space for users to participate, vote, and connect with like-minded individuals, the platform fosters a positive and supportive community for hobbyists of all levels.
Key Features and Functionality:
Hobby Categories and Challenges:
The platform offers a diverse range of hobby categories, such as art, cooking, gardening, crafts, photography, music, writing, and more.
Each category hosts regular challenges or themed competitions, inspiring participants to explore new ideas and techniques.
Submission Platform:
Hobbyists can submit their creations to the relevant category challenges.
The submission process allows users to upload images, videos, or written descriptions of their work.
Community Voting and Judging:
The platform encourages community engagement by allowing users to vote on their favorite submissions in each challenge.
Additionally, expert judges may be invited to evaluate and provide feedback for certain challenges.
Leaderboard and Ranking:
A dynamic leaderboard showcases top contributors and winners in each hobby category and overall.
Users can track their progress and see how their skills compare to others.
Prizes and Rewards:
To recognize and incentivize participation, winners of each challenge may receive rewards such as certificates, badges, or sponsored prizes.
Virtual rewards, badges, and titles can be awarded to top contributors and winners.
Regular Competitions:
The platform hosts regular challenges, with new themes or topics announced periodically to keep users engaged and motivated to participate.
Creative Challenges and Workshops:
Occasionally, special creative challenges or workshops can be organized by partnering with experts in specific hobby fields.
These workshops aim to teach new skills and techniques to participants, further enriching the community's knowledge.
Community Interaction:
Users can engage with each other's submissions through comments, likes, and sharing.
Encourage a positive and constructive atmosphere, where users can provide feedback and support to fellow hobbyists.
Social Media Integration:
Enable easy sharing of submissions on social media platforms to increase exposure and attract a broader audience.
Moderation and Guidelines:
Implement moderation to ensure submissions align with the theme and rules of each challenge.
Clearly communicate guidelines to maintain the platform's integrity and foster a respectful community.
User Profiles and Portfolios:
Each user has a profile showcasing their submissions, challenges they have participated in, and any accolades received.
Users can build a portfolio of their work within the platform.
Featured Creators and Interviews:
Highlight outstanding hobbyists and their contributions through featured creator sections and interviews.


Hobby involving volunteering


User <  Competition > Host
Users will have creations and such may need to be another table 

<results table for competitions?>

i think the competition will have rankings / rewards

competition needs location, maybe let users search by near them

teams / yes or no?
upcoming/ in progress/ finished 
attendees amount of people expected
cost ? 
registration
Status


Open
Closing Soon


Type
Competitor
Spectator






user
Prefix
An organization or sponsor prefix that shows with your Gamertag.




Details
Schedule
Leagues
Results
Teams






Competition Columns:
Competitor requirements
description
Pricing to enter
tournament Schedule
Rules to tournament
Contact
Location
Max Entries? Total Entries?
Prizing info might be best to do percentage rewards.
registration dates


eventually has results


Result table / columns
Placement (1,2,3,4) ? 
user ID
competition ID


user columns
First
Last
username
prefix (C9, Walmart for example)
Bio
Location
Contact info (phone #)
Birthday
profile image
banner image


Host columns
First
These 2 above and below can be incorporated into organization, unless we want users to be able to host
Last
Bio
Location
Contact info (phone #)
Birthday / Org Created date
profile image / logo
banner image






---Possible other additional things ---

Site wide search?


I may still need to add passwords for users and other things as I get to it.

Ideally I want the birthday to be a date selection and math to get the correct birthday /birthday reminders

registration limits / maybe requirements to register also? like user_hobby expertise level? Two layers?

entries may need more than just a submission? but submission can be anything, text, video, mail, etc



7-31-23
BackEnd basically done. Few things left to add:
------------------------------------------------
Validations:
USER 
thinking required email, some password requirements, firstname at least.


hobby:
cannot be an existing hobby,
!hasattr?

competitions:
need a schedule, location, contact, scoring information, objective, prizing. + registration schedule

result:
a result must exist for competitions. <- this will probably be the trickiest one>
would need a placement


entry:

NEED submission < entry kind of done>
need competition ID, user ID should be already logged from being logged in'


should freaking make it where you can't submit the same exact hobby like in validations
^ done I think


need to make more front end validations with yup for competitions and other things.





need to make a way to submit entries + get results and such


need to go through and make sure I have logged in and logged out displays



results

need to see flow, like what takes me where, how do I want to get back to x y or z?
need edit competition page

Maybe a state to indicate whether or not you came from this page? That way you do not get navigated back to userDashboard if you hit back
This can go for each and every 1 of the thingamajiggies (pages)


Pretty good day so far in terms of work,
submission page ??? what is that I think I did an entry form so that is the submission page.

Yes it exists inside of the competition display page

            I still need to do everything for results except the ability to edit them (maybe unless you are the competition user_id associated with the result _user id? will have to see)

            but for example:
            post a result
            see an individual result?
            see results on userdashboard


There's definitely some issues with refreshes


also need to include a User-hobby-edit form -------- DONE


NEED A DELETE FOR USER HOBBIES -------------- NEEED DISSSSSS CHECK HOW YOU DID USER DELETES