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

    //State grab HOBBIES and display them need to make a hobby poster
    // const [hobbies, setHobbies] = useState([]) // Moved this to userHobbyForms
    //-------------------------------------------------------------------------------


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
    // useEffect(() => {
    //   fetch("/hobbies")
    //     .then((resp) => resp.json())
    //     .then((data) => {
    //       setHobbies(data)
    //     })
    // }, [])

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

            {user ? loggedInDisplay : loggedOutDisplay }
            <Routes>

                {/* HOME PAGE ROUTING */}
                <Route path='/' element={<HomePage/>}/>

                {/* ALL COMPETITIONS ROUTING */}
                <Route path='/competitions' element={<CompetitionCollection competitions={competitions}/>}/>
                {/* COMPETITION ID ROUTE */}
                <Route path='/competition/:id' element={<CompetitionDisplay/>}/>
                {/* COMPETITION POST / DECLARATION OF WAR ROUTING */}
                <Route path='/war-declaration' element={<CompetitionCreation user={user} setCompetitions={setCompetitions} competitions={competitions}/>}/>

                {/* LOGIN FORM ROUTING */}
                <Route path='/login' element={<LoginForm user={user} setUser={setUser}/>}/>

                {/* USER SIGNUP ROUTING*/}
                <Route path='/enlist' element={<UserSignUpForm setNewUsers={setNewUsers} newUsers={newUsers}/>}/>
                {/* USER DASHBOARD BY ID? */}
                <Route path='/user-dashboard/:id' element={<UserDashboard user={user} setNewUsers={setNewUsers} newUsers={newUsers} setUser={setUser}/>}/>
                <Route path='/user-edit/:id' element={<UserEdit user={user} updateUser={updateUser}/>}/>

                {/* ALL USER HOBBY ROUTING  */}
                <Route path='' element ={<UserHobbyForm user={user} setUserHobbies={setUserHobbies} userHobbies={userHobbies}/>}/>

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


// const [user, setUser] = useState(null); // stores user on client-side

// console.log(user);

// // grabs current session from server-side and sets state
// function handleCheckSession() {
//     fetch("/check_session").then((resp) => {
//       if (resp.ok) {
//         resp.json().then((user) => setUser(user));
//       }
//     });
// }

// // LOGIN / sends information to server-side, sets session, and sets state
// function handleLogin(e) {
//     e.preventDefault();

//     let username = e.target.username.value;
//     let password = e.target.password.value;

//     fetch("/login", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify( { username, password } ), //, password
//       }).then((resp) => {
//         if (resp.ok) {
//           resp.json().then((user) => setUser(user));
//         }
//       });
// }

// // removes session, removes state
// function handleLogout() {
//     fetch("/logout", {
//         method: "DELETE"
//     }).then(setUser(null))
// }
// return (
//     <>
//         <h1>Login Form</h1>
//         <form onSubmit = {handleLogin}>
//             <label>Username: </label>
//             <input id = "username" type = "text" />
//             <label>Password: </label>
//             <input id = "password" type = "text" />
//             <button type = "submit">Login</button>
//         </form>

//         <h1>Logout Form</h1>
//         <button onClick = {handleLogout}>Logout</button>

//         <br />

//         <button onClick = {handleCheckSession}>Check Session</button>
//     </>
// )