import React from "react";
import { Link, useNavigate } from "react-router-dom"

function LoginForm({user, setUser}){
    //Take me to my page scotty,
    const navigate = useNavigate();

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

    //Basic login functionality. Send them back to the homepage or dashboard
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
            resp.json().then((user) => {
                setUser(user)
                navigate(`/user-dashboard/${user.id}`)}); // <-------- navigates to the dashboard
        }
        });
}

    //Navigation back to homepage or dashboard

    // function handleNavigation(user){
    //     navigate(`/user-dashboard/${user.id}`)
    // }

//Checks to see if user was logged in
console.log(user)


//------------------------------------------------------------------ LOGIN CONDITIONALS----------------------------------------------------



function UserDashClick() {
  navigate(`/user-dashboard/${user.id}`)
}
const loggedInDisplay = (
  <>
  <p> You're already signed in silly head, would you like to be taken to your dashboard?</p>
  <button onClick={UserDashClick} class="inline-block rounded-lg bg-indigo-500 px-8 py-3 text-center text-sm font-semibold text-white outline-none ring-indigo-300 transition duration-100 hover:bg-indigo-600 focus-visible:ring active:bg-indigo-700 md:text-base">Take Me There!</button>
  </>
)

const loggedOutDisplay = (
  <section>
  <div class="px-4 py-12 mx-auto max-w-7xl sm:px-6 md:px-12 lg:px-24 lg:py-24">
    <div class="justify-center mx-auto text-left align-bottom transition-all transform bg-white rounded-lg sm:align-middle sm:max-w-2xl sm:w-full">
      <div class="grid flex-wrap items-center justify-center grid-cols-1 mx-auto shadow-xl lg:grid-cols-2 rounded-xl">
        <div class="w-full px-6 py-3">
          <div>
            <div class="mt-3 text-left sm:mt-5">
              <div class="inline-flex items-center w-full">
                <h3 class="text-lg font-bold text-neutral-600 l eading-6 lg:text-5xl">Sign in</h3>
              </div>
              <div class="mt-4 text-base text-gray-500">
                <p>Here we go again!</p>
              </div>
            </div>
          </div>

          <div class="mt-6 space-y-2">
              <form onSubmit = {handleLogin}>
            <div>
              <label for="username" class="sr-only">Username</label>
              <input type="text" name="username" id="username" class="block w-full px-5 py-3 text-base text-neutral-600 placeholder-gray-300 transition duration-500 ease-in-out transform border border-transparent rounded-lg bg-gray-50 focus:outline-none focus:border-transparent focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-300" placeholder="Enter your username"/>
            </div>
            <br></br>
            <div>
              <label for="password" class="sr-only">Password</label>
              <input type="text" name="password" id="password" class="block w-full px-5 py-3 text-base text-neutral-600 placeholder-gray-300 transition duration-500 ease-in-out transform border border-transparent rounded-lg bg-gray-50 focus:outline-none focus:border-transparent focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-300" placeholder="Enter your password"/>
            </div>
            <div class="flex flex-col mt-4 lg:space-y-2">

               {/* LOG IN BUTTON TO THIS */}
              <button type="submit" class="flex items-center justify-center w-full px-10 py-4 text-base font-medium text-center text-white transition duration-500 ease-in-out transform bg-blue-600 rounded-xl hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">Sign in</button>

            </div>
            </form>
          </div>
        </div>
        <div class="order-first hidden w-full lg:block">
          <img class="object-cover h-full bg-cover rounded-l-lg" src="https://images.unsplash.com/photo-1491933382434-500287f9b54b?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;ixlib=rb-1.2.1&amp;auto=format&amp;fit=crop&amp;w=1000&amp;q=80" alt=""/>
        </div>
      </div>
    </div>
  </div>
</section>
)



    return(
    // <>
    //      <h1>Login Form</h1>
    //      <form onSubmit = {handleLogin}>
    //          <label>Username: </label>
    //          <input id = "username" type = "text" />
    //          <label>Password: </label>
    //          <input id = "password" type = "text" />
    //          <button type = "submit">Login</button>
    //      </form>

    //      <h1>Logout Form</h1>
    //      <button onClick = {handleLogout}>Logout</button>

    //      <br />

    //      <button onClick = {handleCheckSession}>Check Session</button>
    // </>

      <>
        {user ? loggedInDisplay : loggedOutDisplay}
      </>
    )
}

export default LoginForm;




{/* <div>
<label for="email" class="sr-only">Email</label>
<input type="text" name="email" id="email" class="block w-full px-5 py-3 text-base text-neutral-600 placeholder-gray-300 transition duration-500 ease-in-out transform border border-transparent rounded-lg bg-gray-50 focus:outline-none focus:border-transparent focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-300" placeholder="Enter your email">
</div>
<div>
<label for="password" class="sr-only">Password</label>
<input type="text" name="password" id="password" class="block w-full px-5 py-3 text-base text-neutral-600 placeholder-gray-300 transition duration-500 ease-in-out transform border border-transparent rounded-lg bg-gray-50 focus:outline-none focus:border-transparent focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-300" placeholder="Enter your password">
</div>
<div class="flex flex-col mt-4 lg:space-y-2">
<button type="button" class="flex items-center justify-center w-full px-10 py-4 text-base font-medium text-center text-white transition duration-500 ease-in-out transform bg-blue-600 rounded-xl hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">Sign up</button>
<a href="#" type="button" class="inline-flex justify-center py-4 text-base font-medium text-gray-500 focus:outline-none hover:text-neutral-600 focus:text-blue-600 sm:text-sm"> Forgot your Password? </a>
</div> */}
