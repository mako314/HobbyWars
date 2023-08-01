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

//-------Login / Logout Imports--------
import LoginForm from './LoginComponents/LoginForm';

function App() {

    //Can't forget this so I'll need to include it now absolutely
    const navigate = useNavigate()

    const [user, setUser] = useState(null)
    const [competitions, setCompetitions] = useState([])

    useEffect(() => {
        fetch("/competitions")
          .then((resp) => resp.json())
          .then((data) => {
            setCompetitions(data)
          })
      }, [])
    

    return (
        <div>
            <Header/>
            <Routes>
                {/* HOME PAGE ROUTING */}
                <Route path='/' element={<HomePage/>}/>

                {/* COMPETITION ROUTING */}
                <Route path='/competitions' element={<CompetitionCollection competitions={competitions}/>}/>

                {/* COMPETITION ID ROUTE */}
                <Route path='/competition/:id' element={<CompetitionDisplay/>}/>

                {/* COMPETITION POST / DECLARATION OF WAR ROUTING */}
                <Route path='/competition-declaration' element={<CompetitionCreation setCompetitions={setCompetitions} competitions={competitions}/>}/>

                {/* LOGIN FORM ROUTING */}
                <Route path='/login' element={<LoginForm user={user} setUser={setUser}/>}/>

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