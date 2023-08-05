import './App.css';
import React, { useState, useEffect } from "react";
import { useNavigate, Route, Routes } from 'react-router-dom';

//-------HomePage Imports-------
import HomePage from './HomePageComponents/HomePage'
import Header from './NavbarAndHeader/Header';

//-------Competition Imports--------
import CompetitionCollection from './CompetitionComponents/CompetitionCollection';
import CompetitionDisplay from './CompetitionComponents/CompetitionDisplay';
import CompetitionCreation from './CompetitionComponents/CompetitionCreation'

//-------Login / Logout  / Signup Imports--------
import LoginForm from './LoginComponents/LoginForm';
import UserSignUpForm from './UserComponents/UserSignUp';

//--------------------User Imports---------------------
import UserDashboard from './UserComponents/UserDashboard';
import UserEdit from './UserComponents/UserEdit';
import UserHobbyForm from './UserComponents/UserHobbyForm';
import MasterUserHobbyForm from './UserComponents/MasterUserHobbyForm';

//--------------------Hobby Imports---------------------
import HobbyAdd from './HobbyComponents.js/HobbyAdd';

//--------------------Entry Imports---------------------
import EntryForm from './EntryComponents/EntryForm';
import EntryEdit from './EntryComponents/EditEntry';


// I may want to edit my form components, userSignUp and competitionCreation to be in my signUpComponents folder
// So There are definitely some questions I have, they are littered amongst my components. Will continue though. Lets see what else I can really get doing

//Things left to do include:
// 1 : CSS of course,
// 2: Make the competitions hold a user id or something of the sort to make it easy for them to create a competition?
// 3: Do slight more edits of whether a user is logged in, for example, modify the home page
// 4: Possibly after signing up either log the user in immediately, or direct them to the login page for them to login. (Preference)
// 5: Find an additional link to include in the header or remove the place holder
// 6: Work on the sites theme
// 7: Possibly make a leaderboard? ( I can use the results table)
// 8: Actually flesh out validations and such in the backend (@validates)
// 9: Quite frankly, I'm not sure what much else is required. Likely a lot of the work is going to be in comparisons inside of the user dashboard, so I'll need to throw more things in there or remove things.
// 11: Delete for competitions, user deletion but confirmation prior to deletion, like a delete button becomes an are you sure with state?
// 12: Edit for competitions, so users can edit the information inside of the competitions.
// 13: a way to declare results and entries for a competition. So entries should come in, and competitions should give them a result. This will be once again seeing who is logged in, matching it with an ID for the competitions host ID and allowing them to assign placements and look at entries.

//It's gotten late, so for now this list will have to suffice.


//3:02 8/2/23: going to work on doing the post properly for a user that is logged in, having his data already populated. 

// Stretch goals
// 10: Comments under competitions? Also not required

// succesfully logged out page?


function App() {

    //---------------------------------USE STATES----------------------------

    //Can't forget this so I'll need to include it now absolutely
    const navigate = useNavigate()

    //User Login state capturing
    const [user, setUser] = useState(null)

    //Create a new user State
    const [newUsers, setNewUsers] = useState([])

    //State grab competitions and display competitions
    const [competitions, setCompetitions] = useState([])

    //State grab user_hobbies and display them
    const [userHobbies, setUserHobbies] = useState([])

    //State grab HOBBIES and display them need to make a hobby post, 
    const [hobbyAdder, setHobbyAdder] = useState([])

    //State to grab ENTRIES and display them, working on post:
    const [entries, setEntries] = useState([])
    //State to grab the competition ID to be pasased to Entry Post
    const [compID, setCompID] = useState([])
    

    //-------------------------------------------- CHECK SESSION TO STAY LOGGED IN ON REFRESH--------------------------
    
    useEffect(() => {
      fetch("/check_session").then((response) => {
        if (response.ok) {
          response.json().then((user) => setUser(user));
        }
      });
    }, []);

    // console.log("app")
    
    //-------------------------------------------- COMPETITION FETCH / CODE--------------------------
    //Competition Fetching, used to DISPLAY Competition and POST to Competition//
    useEffect(() => {
        fetch("/competitions")
          .then((resp) => resp.json())
          .then((data) => {
            setCompetitions(data)
          })
      }, [])
    //-------------------------------------------------------------------------------
    
    //-------------------------------------------- ENTRY FETCH / CODE--------------------------
    
    useEffect(() => {
        fetch("/entries")
          .then((resp) => resp.json())
          .then((data) => {
            setEntries(data)
          })
      }, [])


      //This handles updating the ENTRY [PATCH]
    const updateEntry = (entryToUpdate) =>{
      setEntries(entries => entries.map(entry =>{
        if (entry.id === entryToUpdate.id) {
          return entryToUpdate
        } else {
          return entry
        }
      }))
    }

    //Need something to grab the competition ID when it's been clicked:
    
    const grabCompId = (id) =>{
      setCompID(id)
    }

    //-------------------------------------------------------------------------------

    //-------------------------------------------- USER FETCH / CODE--------------------------
    
    //USER Fetching, used to DISPLAY USERS(There is no display) and POST to USERS//
    useEffect(() => {
        fetch("/users")
          .then((resp) => resp.json())
          .then((data) => {
            setNewUsers(data)
          })
      }, [])

    //This handles updating the user, PATCH
    const updateUser = (userToUpdate) =>{
      setNewUsers(newUsers => newUsers.map(nUser =>{
        if (nUser.id === userToUpdate.id) {
          return userToUpdate
        } else {
          return nUser
        }
      }))
    }

    //-------------------------------------------- USER HOBBIES FETCH / CODE--------------------------
    useEffect(() => {
      fetch("/user-hobbies")
        .then((resp) => resp.json())
        .then((data) => {
          setUserHobbies(data)
        })
    }, [])

    //-------------------------------------------- HOBBY FETCH / CODE--------------------------
    useEffect(() => {
      fetch("/hobbies")
        .then((resp) => resp.json())
        .then((data) => {
          setHobbyAdder(data)
        })
    }, [])

    //Moved to userHobbyForm
    //hobbies={hobbies}

    //---------------------------------------LOGIN CONDITIONALS----------------------------------------------------

      const loggedInDisplay = (
        <div>
          testing if user is logged in
        </div>
      )

      const loggedOutDisplay = (
        <div>
          testing if user is logged out 
        </div>
      )

      // console.log(user)
    return (
        <div>
            <Header user={user} setUser={setUser}/>

            {user ? loggedInDisplay : loggedOutDisplay }
            <Routes>

                {/* HOME PAGE ROUTING */}
                <Route path='/' element={<HomePage/>}/>

                {/* ALL COMPETITIONS ROUTING */}
                <Route path='/competitions' element={<CompetitionCollection competitions={competitions}/>}/>
                {/* COMPETITION ID ROUTE */}
                <Route path='/competition/:id' element={<CompetitionDisplay user={user} setCompetitions={setCompetitions} competitions={competitions} grabCompId={grabCompId} compID={compID}/>}/>
                {/* COMPETITION POST / DECLARATION OF WAR ROUTING */}
                <Route path='/war-declaration' element={<CompetitionCreation user={user} setCompetitions={setCompetitions} competitions={competitions}/>}/>

                {/* LOGIN FORM ROUTING */}
                <Route path='/login' element={<LoginForm user={user} setUser={setUser}/>}/>

                {/* USER SIGNUP ROUTING*/}
                <Route path='/enlist' element={<UserSignUpForm setUser={setUser} setNewUsers={setNewUsers} newUsers={newUsers}/>}/>
                
                {/* USER DASHBOARD BY ID? */}

                <Route path='/user-dashboard/:id' element={<UserDashboard user={user} setNewUsers={setNewUsers} newUsers={newUsers} setUser={setUser}/>}/>
                <Route path='/user-edit/:id' element={<UserEdit user={user} updateUser={updateUser}/>}/>

                {/* ALL USER HOBBY ROUTING  */}
                <Route path='/user-hobby-selection' element ={<UserHobbyForm user={user} setUserHobbies={setUserHobbies} userHobbies={userHobbies}/>}/>
                <Route path='/add-my-hobbies' element ={<MasterUserHobbyForm user={user}/>}/>
                
                {/* ADD A HOBBY ROUTE */}
                <Route path='/add-a-hobby' element={<HobbyAdd user={user} hobbyAdder={hobbyAdder} setHobbyAdder={setHobbyAdder}/>}/>


                {/* ADD AN ENTRY ROUTE */}
                <Route path='/submit-entry' element={<EntryForm user={user} setEntries={setEntries} entries={entries} compID={compID} />}/>
                <Route path='/edit-entry' element={<EntryEdit user={user} />}/>

            </Routes>

            {/* <CompetitionCollection competitions={competitions}/> */}
            {/* <HomePage/> */}
            
        </div>
    )
}

export default App;

//May need to ask Tyler, I'm sure i took equipment by type and such, but I wonder if i can make routes by type like I did ID above, just use params and take in whatever I'm looking for?

//Error with Permissions-Policy header: Origin trial controlled feature not enabled: 'browsing-topics'. I keep getting this damn error

//Pass user around through props, so this will be it's own state, then do like if user: 
// load account page, if we have a user show this otherwise show a signup form
