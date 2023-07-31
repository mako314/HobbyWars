import './App.css';
import React, { useState, useEffect } from "react";
import HomePage from './HomePage';
import { useNavigate, Route, Routes } from 'react-router-dom';


function App() {

    useEffect(() => {
        fetch("//competitions")
          .then((resp) => resp.json())
          .then((data) => {
            setEquipmentArray(data)
          })
      }, [])
    

    return (
        <>
           <HomePage/>
        </>
    )
}

export default App;



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