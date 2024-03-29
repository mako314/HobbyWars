import './App.css';
import React, { useState, useEffect } from "react";
import { useNavigate, Route, Routes } from 'react-router-dom';

//-------HomePage Imports-------
import HomePage from './HomePageComponents/HomePage'
import Header from './NavbarAndHeader/Header';
import Footer from './NavbarAndHeader/Footer';

//-------Competition Imports--------
import CompetitionCollection from './CompetitionComponents/CompetitionCollection';
import CompetitionDisplay from './CompetitionComponents/CompetitionDisplay';
import CompetitionCreation from './CompetitionComponents/CompetitionCreation';
import CompetitionSubmissions from './CompetitionComponents/CompetitionSubmissions';
import CompetitionEdit from './CompetitionComponents/CompetitionEdit';

//-------Leaderboard Imports--------
import LeaderBoardCollection from './LeaderBoardComponents/LeaderBoardCollection';
import LeaderBoard from './LeaderBoardComponents/LeaderBoard';

//-------Login / Logout  / Signup Imports--------
import LoginForm from './LoginComponents/LoginForm';
import UserSignUpForm from './UserComponents/UserSignUp';

//--------------------User Imports---------------------
import UserDashboard from './UserComponents/UserDashboard';
import UserEdit from './UserComponents/UserEdit';
import UserHobbyForm from './UserComponents/UserHobbyForm';
// import MasterUserHobbyForm from './UserComponents/MasterUserHobbyForm';
import UserHobbyEdit from './UserComponents/UserHobbyEdit';

//--------------------Hobby Imports---------------------
import HobbyAdd from './HobbyComponents.js/HobbyAdd';

//--------------------Entry Imports---------------------
import EntryForm from './EntryComponents/EntryForm';
import EntryEdit from './EntryComponents/EditEntry';
import EntryDisplay from './EntryComponents/EntryDisplay';

//--------------------Result Imports---------------------
import ResultForm from './ResultComponents/ResultForm';
import ResultCollection from './ResultComponents/ResultCollection';


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

    //State to grab RESULTS and display them, working on post:
    const [results, setResults] = useState([])

    //State to grab the competition ID to be pasased to Entry Post
    //Need something to grab the competition ID when it's been clicked, gets called in useEffect inside of competition display:
    const [compID, setCompID] = useState([])

    //Grab the entry ID and send it to edit for the data to prepopulate the form
    const [entryID, setEntryID] = useState(0)

    //State to grab hobby ID and send it to edit for the data to prepopulate the form
    const [userHobbyID, setUserHobbyID] = useState(0)

    //State to determine where edit Entries was clicked from
    const [editFromSubmissions, setEditFromSubmissions] = useState(false)

    //State to determine if the view was from the USER DASH
    const [viewedFromUser, setViewedFromUser] = useState(false)

    //State to determine if it was viewed from submissions
    const [viewFromSubmissions, setViewFromSubmissions] = useState(false)

    //State to capture entry ID for results
    const [entryResultID, setEntryResultID] = useState(0)
    
    //State to capture competition ID for results
    const [compResultID, setCompResultID] = useState(0)

    //State to determine whether or not a result for that competition has been declared
    const [resultForEntryID, setResultForEntryID] = useState(0)

    //State to determine the competition ID for the LEADERBOARD
    const [leaderBoardID, setLeaderBoardID] = useState(0)

    const [entryCompID, setEntryCompID] = useState(0)

    //setEntryResultID={setEntryResultID} setCompResultID={setCompResultID} this was in compsubmission page, but I think I just failed to pass the props to the wrong place...
    //compID={compID} entryID={entryID} this was in the /results route

    //-------------------------------------------- CHECK SESSION TO STAY LOGGED IN ON REFRESH--------------------------
    
    useEffect(() => {
      fetch("/api/check_session").then((response) => {
        if (response.ok) {
          response.json().then((user) => setUser(user));
        }
      });
    }, []);

    // console.log("app")
    
    //-------------------------------------------- COMPETITION FETCH / CODE--------------------------
    //Competition Fetching, used to DISPLAY Competition and POST to Competition//
    useEffect(() => {
        fetch("/api/competitions")
          .then((resp) => resp.json())
          .then((data) => {
            setCompetitions(data)
          })
      }, [])

      console.log("COMPETITIONS:", competitions)

      const updateCompetition = (competitionToUpdate) =>{
        setCompetitions(competitions => competitions.map(competition =>{
          if (competition.id === competitionToUpdate.id) {
            return competitionToUpdate
          } else {
            return competition
          }
        }))
      }
    //-------------------------------------------------------------------------------
    
    //-------------------------------------------- ENTRY FETCH / PATCH ALSO CODE--------------------------
    
    //Fetch entries
    useEffect(() => {
        fetch("/api/entries")
          .then((resp) => resp.json())
          .then((data) => {
            setEntries(data)
            console.log(data)
          })
      }, [])

      // console.log(entries)
      // console.log(results)



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

    //-------------------------------------------------------------------------------

    //-------------------------------------------- USER FETCH /  PATCH, CODE--------------------------
    
    //USER Fetching, used to DISPLAY USERS(There is no display) and POST to USERS//
    useEffect(() => {
        fetch("/api/users")
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

    //-------------------------------------------- USER HOBBIES FETCH /  PATCH CODE--------------------------
    useEffect(() => {
      fetch("/api/user-hobbies")
        .then((resp) => resp.json())
        .then((data) => {
          setUserHobbies(data)
        })
    }, [])

    const updateUserHobby = (hobbyToUpdate) =>{
      setUserHobbies(userHobbies => userHobbies.map(userHobby =>{
        if (userHobby.id === hobbyToUpdate.id) {
          return hobbyToUpdate
        } else {
          return userHobby
        }
      }))
    }

    //-------------------------------------------- HOBBY FETCH / CODE--------------------------
    useEffect(() => {
      fetch("/api/hobbies")
        .then((resp) => resp.json())
        .then((data) => {
          setHobbyAdder(data)
        })
    }, [])

    //Moved to userHobbyForm
    //hobbies={hobbies}

      //-------------------------------------------- Result FETCH / CODE--------------------------
      useEffect(() => {
        fetch("/api/results")
          .then((resp) => resp.json())
          .then((data) => {
            setResults(data)
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


    return (
        <div>
            <Header user={user} setUser={setUser}/>

            {/* {user ? loggedInDisplay : loggedOutDisplay } */}
            <Routes>

                {/* HOME PAGE ROUTING */}
                <Route path='/' element={<HomePage user={user}/>}/>

                {/* ALL COMPETITIONS ROUTING */}
                <Route path='/competitions' element={<CompetitionCollection competitions={competitions} setViewedFromUser={setViewedFromUser}/>}/>
                {/* COMPETITION ID ROUTE */}
                <Route path='/competition/:id' element={<CompetitionDisplay user={user} setCompetitions={setCompetitions} competitions={competitions} setCompID={setCompID} compID={compID} viewedFromUser={viewedFromUser}/>}/>
                {/* COMPETITION POST / DECLARATION OF WAR ROUTING */}
                <Route path='/war-declaration' element={<CompetitionCreation user={user} setCompetitions={setCompetitions} competitions={competitions}/>}/>
                {/* COMPETITION SEE ALL SUBMISSIONS */}
                <Route path='/competition-submissions/:id' element={<CompetitionSubmissions user={user} setEntryID={setEntryID} setEditFromSubmissions={setEditFromSubmissions} editFromSubmissions={editFromSubmissions} setViewFromSubmissions={setViewFromSubmissions} setCompID={setCompID} setEntryResultID={setEntryResultID} setCompResultID={setCompResultID} resultForEntryID={resultForEntryID} results={results} entries={entries} setViewedFromUser={setViewedFromUser} compID={compID}/>}/>
                {/* COMPETITION EDIT ROUTE */}
                <Route path='/competition/edit/:id' element={<CompetitionEdit user={user} compID={compID} competitions={competitions} updateCompetition={updateCompetition}/>}/>
                
                {/* WRITE LEADERBOARD COLLECTION ROUTE/ */}
                <Route path='/leaderboard/competitions' element={<LeaderBoardCollection competitions={competitions} setLeaderBoardID={setLeaderBoardID} user={user}/>}/>
                {/* Actual leaderboard ROUTE */}
                <Route path='/leaderboard/:competition_id' element={<LeaderBoard user={user} competitions={competitions} leaderBoardID={leaderBoardID}/>}/>
                
                {/* LOGIN FORM ROUTING */}
                <Route path='/login' element={<LoginForm user={user} setUser={setUser}/>}/>

                {/* USER SIGNUP ROUTING*/}
                <Route path='/enlist' element={<UserSignUpForm setUser={setUser} setNewUsers={setNewUsers} newUsers={newUsers} user={user}/>}/>
                
                {/* USER DASHBOARD BY ID? */}
                <Route path='/user-dashboard/:id' element={<UserDashboard user={user} setNewUsers={setNewUsers} newUsers={newUsers} setUser={setUser} setEntryID={setEntryID} setUserHobbyID={setUserHobbyID} setEntries={setEntries} entries={entries} setEditFromSubmissions={setEditFromSubmissions} setViewedFromUser={setViewedFromUser}/>}/>
                {/* EDIT USER BY ID, BUTTONS FOUND IN DASHBOARD */}
                <Route path='/user-edit/:id' element={<UserEdit user={user} updateUser={updateUser}/>}/>

                {/* ALL USER HOBBY ROUTING  */}
                <Route path='/user-hobby-selection' element ={<UserHobbyForm user={user} setUserHobbies={setUserHobbies} userHobbies={userHobbies}/>}/>
                
                {/* <Route path='/add-my-hobbies' element ={<MasterUserHobbyForm user={user}/>}/> */}
                
                {/* EDIT USER HOBBY BY ID */}
                <Route path='/edit/userhobby/:id' element ={<UserHobbyEdit user={user} updateUserHobby={updateUserHobby} userHobbyID={userHobbyID}/>}/>
                
                {/* ADD A HOBBY ROUTE */}
                <Route path='/add-a-hobby' element={<HobbyAdd user={user} hobbyAdder={hobbyAdder} setHobbyAdder={setHobbyAdder}/>}/>

                  {/* ENTRY ROUTES */}
                {/* ADD AN ENTRY ROUTE */}
                <Route path='/submit-entry' element={<EntryForm user={user} setEntries={setEntries} entries={entries} compID={compID} setEntryID={setEntryID} setViewedFromUser={setViewedFromUser} setEntryCompID={setEntryCompID}/>}/>
                {/* EDIT ENTRY BY ID ROUTE */}
                <Route path='/edit-entry/:id' element={<EntryEdit user={user} compID={compID} updateEntry={updateEntry} entryID={entryID} editFromSubmissions={editFromSubmissions}/>}/>
                {/* DISPLAY ENTRY SINGLE PAGE DISPLAY */}
                <Route path='/entry/:id' element={<EntryDisplay user={user} entryID={entryID} viewedFromUser={viewedFromUser} viewFromSubmissions={viewFromSubmissions} setEntryID={setEntryID} entryCompID={entryCompID}/>}/>

                {/* RESULT ROUTES */}
                <Route path='/declare-results/' element={<ResultForm user={user} setResults={setResults} results={results} compID={compID} entryID={entryID} entryResultID={entryResultID} compResultID={compResultID} setResultForEntryID={setResultForEntryID}/>}/>
                <Route path='/results' element={<ResultCollection results={results} />}/>

            
            </Routes>
            
            <Footer user={user} />

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
