import React from "react";

function LoginForm({user, setUser}){

    // Here I'll have to do somethings with the user, so I'd like to make sure my users can login first.
    // LOGIN / sends information to server-side, sets session, and sets state

    function handleCheckSession() {
    fetch("/check_session").then((resp) => {
      if (resp.ok) {
        resp.json().then((user) => setUser(user));
      }
    });
}

    // removes session, removes state
function handleLogout() {
    fetch("/logout", {
        method: "DELETE"
    }).then(setUser(null))
}
    //Basic login functionality.
    function handleLogin(e) {
        e.preventDefault();

        let username = e.target.username.value;
        let password = e.target.password.value;

        fetch("/login", {
            method: "POST",
            headers: {
            "Content-Type": "application/json",
            },
            body: JSON.stringify( { username, password } ), //, password
        }).then((resp) => {
            if (resp.ok) {
            resp.json().then((user) => setUser(user));
            }
        });
}
//Checks to see if user was logged in
console.log(user)



    return(
    <>
         <h1>Login Form</h1>
         <form onSubmit = {handleLogin}>
             <label>Username: </label>
             <input id = "username" type = "text" />
             <label>Password: </label>
             <input id = "password" type = "text" />
             <button type = "submit">Login</button>
         </form>

         <h1>Logout Form</h1>
         <button onClick = {handleLogout}>Logout</button>

         <br />

         <button onClick = {handleCheckSession}>Check Session</button>
    </>
    )
}

export default LoginForm;


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