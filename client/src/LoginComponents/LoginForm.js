import React from "react";
import { Link, useNavigate } from "react-router-dom"

function LoginForm({user, setUser}){
    //Take me to my page scotty,
    const navigate = useNavigate();

    // Here I'll have to do somethings with the user, so I'd like to make sure my users can login first.
    // LOGIN / sends information to server-side, sets session, and sets state

    function handleCheckSession() {
    fetch("/api/check_session").then((resp) => {
      if (resp.ok) {
        resp.json().then((user) => setUser(user));
      }
    });
}

    // removes session, removes state
    function handleLogout() {
        fetch("/api/logout", {
            method: "DELETE"
        }).then(setUser(null))
    }

    //Basic login functionality. Send them back to the homepage or dashboard
    function handleLogin(e) {
        e.preventDefault();

        let username = e.target.username.value;
        let password = e.target.password.value;

        fetch("/api/login", {
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


//Checks to see if user was logged in
// console.log(user)


//------------------------------------------------------------------ LOGIN CONDITIONALS----------------------------------------------------


//Navigation back to dashboard + button under it
function UserDashClick() {
  navigate(`/user-dashboard/${user.id}`)
}


function TakeMeHome(){
  navigate(`/`)
}


// const loggedInDisplay = (
//   <>
//   <p> You're already signed in silly head, would you like to be taken to your dashboard?</p>
//   <button onClick={UserDashClick} className="inline-block rounded-lg bg-indigo-500 px-8 py-3 text-center text-sm font-semibold text-white outline-none ring-indigo-300 transition duration-100 hover:bg-indigo-600 focus-visible:ring active:bg-indigo-700 md:text-base">Take Me There!</button>
//   </>
// )

const loggedInDisplay = (
  <>
        <div className="bg-white py-6 sm:py-8 lg:py-12">
          <div className="mx-auto max-w-screen-lg px-4 md:px-8">
            <div className="grid gap-8 sm:grid-cols-2">

              <div className="h-80 overflow-hidden rounded-lg bg-gray-100 shadow-lg md:h-auto">
                <img src="https://images.unsplash.com/photo-1626790680787-de5e9a07bcf2?auto=format&q=75&fit=crop&w=600" loading="lazy" alt="Photo by Theo Crazzolara" className="h-full w-full object-cover object-center" />
              </div>

              <div className="flex flex-col items-center justify-center sm:items-start md:py-24 lg:py-32">
                <p className="mb-4 text-sm font-semibold uppercase text-indigo-500 md:text-base">Error</p>
                <h1 className="mb-2 text-center text-2xl font-bold text-gray-800 sm:text-left md:text-3xl"> You're already signed in!</h1>

                <p className="mb-4 text-center text-gray-500 sm:text-left md:mb-8 md:text-lg">The page you’re looking for doesn’t exist, would you like to go somewhere else?</p>

                <nav className="flex gap-4 sm:block sm:space-y-1 md:space-y-2">
                  
                  <button onClick={TakeMeHome} className="inline-block rounded-lg bg-indigo-500 px-8 py-3 text-center text-sm font-semibold text-white outline-none ring-indigo-300 transition duration-100 hover:bg-indigo-600 focus-visible:ring active:bg-indigo-700 md:text-base">Take me Home!</button>


                  <br/>

                  <button onClick={UserDashClick} className="inline-block rounded-lg bg-indigo-500 px-8 py-3 text-center text-sm font-semibold text-white outline-none ring-indigo-300 transition duration-100 hover:bg-indigo-600 focus-visible:ring active:bg-indigo-700 md:text-base">Take me to my Profile!</button>
                
                </nav>
              </div>
            </div>
          </div>
        </div>
  </>
)


const loggedOutDisplay = (
  <section>
  <div className="px-4 py-12 mx-auto max-w-7xl sm:px-6 md:px-12 lg:px-24 lg:py-24">
    <div className="justify-center mx-auto text-left align-bottom transition-all transform bg-white rounded-lg sm:align-middle sm:max-w-2xl sm:w-full">
      <div className="grid flex-wrap items-center justify-center grid-cols-1 mx-auto shadow-xl lg:grid-cols-2 rounded-xl">
        <div className="w-full px-6 py-3">
          <div>
            <div className="mt-3 text-left sm:mt-5">
              <div className="inline-flex items-center w-full">
                <h3 className="text-lg font-bold text-neutral-600 l eading-6 lg:text-5xl">Sign in</h3>
              </div>
              <div className="mt-4 text-base text-gray-500">
                <p>Here we go again!</p>
              </div>
            </div>
          </div>

          <div className="mt-6 space-y-2">
              <form onSubmit = {handleLogin}>
            <div>
              <label htmlFor="username" className="sr-only">Username</label>
              <input type="text" name="username" id="username" className="block w-full px-5 py-3 text-base text-neutral-600 placeholder-gray-300 transition duration-500 ease-in-out transform border border-transparent rounded-lg bg-gray-50 focus:outline-none focus:border-transparent focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-300" placeholder="Enter your username"/>
            </div>
            <br></br>
            <div>
              <label htmlFor="password" className="sr-only">Password</label>
              <input type="text" name="password" id="password" className="block w-full px-5 py-3 text-base text-neutral-600 placeholder-gray-300 transition duration-500 ease-in-out transform border border-transparent rounded-lg bg-gray-50 focus:outline-none focus:border-transparent focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-300" placeholder="Enter your password"/>
            </div>
            <div className="flex flex-col mt-4 lg:space-y-2">

               {/* LOG IN BUTTON TO THIS */}
              <button type="submit" className="flex items-center justify-center w-full px-10 py-4 text-base font-medium text-center text-white transition duration-500 ease-in-out transform bg-blue-600 rounded-xl hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">Sign in</button>

            </div>
            </form>
          </div>
        </div>
        <div className="order-first hidden w-full lg:block">
          <img className="object-cover h-full bg-cover rounded-l-lg" src="https://art.pixilart.com/thumb/13112a9bd876.png" alt=""/>
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
<label htmlFor="email" className="sr-only">Email</label>
<input type="text" name="email" id="email" className="block w-full px-5 py-3 text-base text-neutral-600 placeholder-gray-300 transition duration-500 ease-in-out transform border border-transparent rounded-lg bg-gray-50 focus:outline-none focus:border-transparent focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-300" placeholder="Enter your email">
</div>
<div>
<label htmlFor="password" className="sr-only">Password</label>
<input type="text" name="password" id="password" className="block w-full px-5 py-3 text-base text-neutral-600 placeholder-gray-300 transition duration-500 ease-in-out transform border border-transparent rounded-lg bg-gray-50 focus:outline-none focus:border-transparent focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-300" placeholder="Enter your password">
</div>
<div className="flex flex-col mt-4 lg:space-y-2">
<button type="button" className="flex items-center justify-center w-full px-10 py-4 text-base font-medium text-center text-white transition duration-500 ease-in-out transform bg-blue-600 rounded-xl hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">Sign up</button>
<a href="#" type="button" className="inline-flex justify-center py-4 text-base font-medium text-gray-500 focus:outline-none hover:text-neutral-600 focus:text-blue-600 sm:text-sm"> Forgot your Password? </a>
</div> */}
