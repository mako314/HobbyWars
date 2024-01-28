import React from "react";
import { Link, useNavigate } from "react-router-dom"
import { ReactComponent as HobbyWarLogo } from '../Logo/HobbyWarLogo.svg'

function Header({user, setUser}){

    // const {id} = user // Destructure the ID so I can use it in useParams

    const navigate = useNavigate();
    // Here I'll have to do somethings with the user, so I'd like to make sure my users can login first.

    //Handle a USER LOGGING OUT, IF they are LOGGED IN
    function handleLogout() {
        fetch("/api/logout", {
            method: "DELETE"
        }).then(setUser(null))
    }

    //Navigates a user to their dashboard
    function UserDashClick(e) {
        const {id} = user
        navigate(`/user-dashboard/${user.id}`)
    }


    
    //---------------------------------------LOGIN CONDITIONALS----------------------------------------------------
    //Change hovers to see better
    const loggedInDisplay = (
        <>
            <nav className="md:ml-auto flex flex-wrap items-center text-base justify-center">

            <Link to='/war-declaration'>
            <a className="mr-5 hover:text-white">Declare War</a>
            </Link>

            <Link to='/leaderboard/competitions'>
            <a className="mr-5 hover:text-white">LeaderBoards</a>
            </Link>

            {/* Link to all wars / existing and current */}
            <Link to='/competitions'>
            <a className="mr-5 hover:text-white">Wars</a>
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
            
            
            <Link to='/war-declaration'>
            <span className="mr-5 text-white hover:text-blue-500">Declare War</span>
            </Link>

            <Link to='/leaderboard/competitions'>
            <span className="mr-5 text-white hover:text-blue-500">LeaderBoards</span>
            </Link>
            
            {/* Link to all wars / existing and current */}
            <Link to='/competitions'>
            <span className="mr-5 text-white hover:text-blue-500">Wars</span>
            </Link>
            
            {/* Link for logged OUT user to sign up */}
            <Link to='/enlist'>
            <span className="mr-5 text-white hover:text-blue-500">Enlist</span>
            </Link>

            </nav>

            {/* Links to user login and prompts them to login */}
            <Link to='/login'>
            <button className="inline-flex items-center bg-gray-800 border-0 py-1 px-3 focus:outline-none hover:bg-white rounded text-base mt-4 md:mt-0"> Login </button>
            </Link>
            
        </>
    )

    // console.log(user)

    return(
        <header className="text-gray-400 bg-gray-900 body-font">
        <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
            
            {/* Links to homepage */}
            <Link to='/'>
            <div className="flex title-font font-medium items-center text-white mb-4 md:mb-0">
            <HobbyWarLogo/>
            <span className="ml-3 text-xl">HobbyWars</span>
            </div>
            </Link>

            {user ? loggedInDisplay : loggedOutDisplay}


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
            // <Link to='/enlist'>
            // <button className="inline-flex items-center bg-gray-800 border-0 py-1 px-3 focus:outline-none hover:bg-gray-700 rounded text-base mt-4 md:mt-0"> Enlist </button>
            // </Link>

    //Could there possibly be nested <a> </a>?