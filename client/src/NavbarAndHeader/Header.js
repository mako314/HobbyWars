import React from "react";
import { Link, useNavigate } from "react-router-dom"

function Header({user, setUser}){

    const {id} = user // Destructure the ID so I can use it in useParams

    const navigate = useNavigate();
    // Here I'll have to do somethings with the user, so I'd like to make sure my users can login first.

    //Handle a USER LOGGING OUT, IF they are LOGGED IN
    function handleLogout() {
        fetch("/logout", {
            method: "DELETE"
        }).then(setUser(null))
    }

    //Navigates a user to their dashboard
    function UserDashClick(e) {
        navigate(`/user-dashboard/${id}`)
    }


    const loggedInDisplay = (
        <>
            <nav className="md:ml-auto flex flex-wrap items-center text-base justify-center">

            <a className="mr-5 hover:text-white"> Declare War </a>

            <a className="mr-5 hover:text-white">Placeholder</a>

            {/* Link to all wars / existing and current */}
            <Link to='/competitions'>
            <a className="mr-5 hover:text-white">Previous Wars</a>
            </Link>

            <a className="mr-5 hover:text-white" onClick={UserDashClick}>User Dashboard</a>

            {/* So it seems I can either use UserDashClick or find a way to make link to take me there */}

            </nav>


            {/* Logs a user OUT IF they are logged IN */}
            <button className="inline-flex items-center bg-gray-800 border-0 py-1 px-3 focus:outline-none hover:bg-gray-700 rounded text-base mt-4 md:mt-0" onClick = {handleLogout}> Logout </button>
        </>
    )

    const loggedOutDisplay = (

        
        <>
            <nav className="md:ml-auto flex flex-wrap items-center text-base justify-center">

            {/* May have to login for this */}
            <a className="mr-5 hover:text-white">Declare War</a>

            <a className="mr-5 hover:text-white">Placeholder</a>
            
            {/* Link to all wars / existing and current */}
            <Link to='/competitions'>
            <a className="mr-5 hover:text-white">Previous Wars</a>
            </Link>
            
            {/* Link for logged OUT user to sign up */}
            <Link to='/user-signup'>
            <a className="mr-5 hover:text-white">Enlist</a>
            </Link>

            </nav>

            {/* Links to user login and prompts them to login */}
            <Link to='/login'>
            <button className="inline-flex items-center bg-gray-800 border-0 py-1 px-3 focus:outline-none hover:bg-gray-700 rounded text-base mt-4 md:mt-0"> Login </button>
            </Link>
            
        </>
    )

    console.log(user)

    return(
        <header className="text-gray-400 bg-gray-900 body-font">
        <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
            
            {/* Links to homepage */}
            <Link to='/'>
            <div className="flex title-font font-medium items-center text-white mb-4 md:mb-0">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-10 h-10 text-white p-2 bg-indigo-500 rounded-full" viewBox="0 0 24 24">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
            </svg>
            <span className="ml-3 text-xl">HobbyWars</span>
            </div>
            </Link>

            {user ? loggedInDisplay : loggedOutDisplay }


        </div>
        </header>
    )
}

export default Header;

    //temporary holding cell

            // {/* This will hold other links */}
            // <nav className="md:ml-auto flex flex-wrap items-center text-base justify-center">
            // <a className="mr-5 hover:text-white"> Declare War </a>
            // <a className="mr-5 hover:text-white"> </a>
            // <a className="mr-5 hover:text-white">Third Link</a>
            // <a className="mr-5 hover:text-white">Previous Wars</a>
            // </nav>

            // {/* Links to user-signup */}
            // <Link to='/user-signup'>
            // <button className="inline-flex items-center bg-gray-800 border-0 py-1 px-3 focus:outline-none hover:bg-gray-700 rounded text-base mt-4 md:mt-0"> Enlist </button>
            // </Link>