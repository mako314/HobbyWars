import React from 'react';
import { useEffect, useState } from 'react'
import { Link ,useParams, useNavigate } from 'react-router-dom'

function UserDashboard({user, setNewUsers, newUsers, setUser, setEntryID, setUserHobbyID}) { //newUsers Don't think I'll need this prop

    //This is used for getting to the edit form portion
    const navigate = useNavigate();

    //This user being passed in as a prop is the state of our logged in user like we have done prior. 
    //The newUsers comment is way in App.js to fetch ALL users and POST a new USER.

    //State to hold the selected fetched user
    const [selectedUser, setSelectedUser] = useState([])

    //State to confirm deletion (makes a button appear?)
    const [toggleDelete, setToggleDelete] = useState(true)

    //State to keep track of the users mapped entries:
    const [mappedEntries, setMappedEntries] = useState([]);

    //State to track and display a usersHobbies
    const [mappedUserHobbies, setMappedUserHobbies] = useState([])

    // //State to set results to map over
    // const[userResults, setUserResults] = useState([])

    //State to keep track and display a users Results
    // const[mappedUserResults, setMappedUserResults] = useState([])
   
   
    // I think I remember why I had this, because if you click the header, i wanted it to carry the uSER.ID but it definitely already does, I could potentially take out my use state for selected user and such
    const {id} = useParams()

    //use Params take the navigation portion and inputs that as string interpolation into our route. Taking us to that competitions page. This then grabs that pages data and properly displays it.
    useEffect(() => {
        fetch(`/user/${id}`)
          .then((resp) => resp.json())
          .then((data) => {
            setSelectedUser(data)
          })
      }, [])

    //Destructure for props
    const {
        firstName, 
        lastName, 
        username, 
        password, 
        age, 
        bio, 
        location, 
        phone, 
        email, 
        profileImg, 
        bannerImg,
        competitions,
        entry, // Fix in the backend 
        user_hobby,
        results
    } = selectedUser;


    console.log(results)
    // console.log(user_hobby)
    console.log(selectedUser)
    // console.log(competitions)
    // console.log(entry)

//--------------------------------------------------------Hosted Competitions-----------------------------------
    //Display the competitions the user hosts on their dashboard
    const mappedCompetitions = competitions?.map((competition) => {
        return <>
        <div onClick={() => navigateToCompetition(competition.id)}>{competition.title}</div>
        </>
    })
    
    // Now that entry has the competition information allowed, I can probably just pull that entry.competition.id
    // and also navigate to it
    //click and navigate to the competition display page
    function navigateToCompetition(id) {
        console.log(user.id)
        navigate(`/competition/${id}`)
    }

//--------------------------------------------------------------------------------------------------------
//---------------------------------------------User Hobby Info ./ Button to edit it-----------------------------------------------

//Had to put this mapping of user hobbies inside of a useEffect that only fires off when the data is made available in user_hobby (destructured prop), always need a ? in map now

//Navigate to the edit user hobby page, and then set the ID to be used to fetch data there
function navUserHobby(id) {
    navigate(`/edit/userhobby/${id}`)
    setUserHobbyID(id)
}

//Map over a users hobbies and display them all
useEffect(()=>{
    setMappedUserHobbies(
        user_hobby?.map((userHobby) =>{
            return(
            <div>
                {/* {console.log(userHobby)} */}
                <p>
                    Hobby: {userHobby.hobby.type_of_hobby}
                </p>
                <p>
                    Level: {userHobby.expertise}
                </p>

                <button onClick={() => navUserHobby(userHobby.id)}> Edit this hobby</button>

            </div>

            )
        })
    )

},[user_hobby])

//setUserHobbyID Need this in a navigation button


//--------------------------------Submission / Entry information / code----------------------------------
    //Button to navigate to submission edit
    function navSubmissionEdit(id) {
        navigate(`/edit-entry/${id}`)
        setEntryID(id)
    }

    //Display users entries

    //SCOPE SCOPE SCOPE SCOPESCOPE SCOPE SCOPE SCOPESCOPE SCOPE SCOPE SCOPESCOPE SCOPE SCOPE SCOPESCOPE SCOPE SCOPE SCOPESCOPE SCOPE SCOPE SCOPE
    
    //This portion handles displaying a users entry on their dashboard
    // use effect to map over users entries, since it's in useEffect I needed a state to hold the data that gets put out 
    useEffect(() => {
        if (entry){
            setMappedEntries(
                entry?.map((oneEntry) => {
                return (
                <div>
                    {/* {console.log(oneEntry)} */}
                    
                    
                    <button onClick={() => navigateToCompetition(oneEntry.competitions.id)}> {oneEntry.competitions.title} </button>
                    {/* maybe something like "clicked from dash state?" 
                    it would be nice if after hitting this button and hitting back it takes them back to user dashboard */}
                    <br></br>
                    <br></br>
                    {oneEntry.submission}
                    {oneEntry.description}
                    {/* need an edit entry button here to take you to edit entry page */}
                    <br></br>
                    <br></br>
                    <button onClick={() => navSubmissionEdit(oneEntry.id)}> Edit this Entry</button>
                </div>)
                })
            )
        }
      }, [entry])


    // console.log(mappedCompetitions)
//--------------------------------------------------------------------------------------------------------
//-----------------------------------------------USER RESULTS / DOUBLE BUTTON-------------------------------------------------

const mappedUserResults = results?.map((result) => {
    return (
    <div>
        <p> COMPETITION: {result.competitions.title} </p>
        <p> Placement: {result.placement}</p>
    </div>)
    
})

console.log(mappedUserResults)

//--------------------------------------------------------------------------------------------------------

//-----------------------------------------------USER DELETE PORTION / DOUBLE CONFIRM BUTTON-------------------------------------------------



    //Time to make a delete for the user, will e a 2 point confirmation. We'll start with a button that is toggled
    //This goes in and resets our user data, basically checking all users id to not match up with the user ID that is deleted, meaning it's gone.
    const userDelete = (userToDelete) => {
        setNewUsers(newUsers =>
          newUsers.filter(users => users.id !== userToDelete.id))
      }
    
    //This SHOULD LOG OUT the user after deletion. Could this go inside of the delete itself?
    function handleLogout() {
        fetch("/logout", {
            method: "DELETE"
        }).then(setUser(null))
    }

    //Actual DELETE request to the backend.
    const handleUserDelete = (user) => {
        console.log(user)
        fetch(`/user/${user.id}`, {
          method: "DELETE"
        })
          .then(() => {
            userDelete(user)
            handleLogout() // By calling log out here, after the account is deleted, the user is then logged out.
            navigate('/')
          })
      }

    // Button toggle to confirm that the user is wanting to delete their account. 
    function handleToggle() {
        setToggleDelete(!toggleDelete)
    }


    //This button allows you to confirm deletion
    const deleteBtn = (
        <button onClick={handleToggle}> Delete my account </button>
    )
    
    //maybe confirmation modal after?
    const confirmDelete = (
        <div>
        <button onClick={() => handleUserDelete(user)}> Yes DELETE my account.</button>
        <div></div>
        <button onClick={handleToggle}> No it was a mistake</button>
        </div>
    )

//--------------------------------------------------------------------------------------------------------

    //---------------------------------------LOGIN CONDITIONALS----------------------------------------------------
    
    //To handle going to the edit page 
    function handleEdit(e) {
        console.log(user.id)
        navigate(`/user-edit/${user.id}`)
    }

    const loggedInDisplay=(
        <div>
            <p>{firstName}</p>
            <p>{lastName}</p>
            <p>{username}</p>
            <p>{password}</p>
            <p>{age}</p>
            <p>{bio}</p>
            <p>{location}</p>
            <p>{phone}</p>
            <p>{email}</p>
            <p>{profileImg}</p>
            <p>{bannerImg}</p>

            <br></br>
            <p>---------------------------------Competitions You Currently Host------------------------</p>
            
            <div> {mappedCompetitions} </div>

            <br></br>

            <p>---------------------------------Entries------------------------</p>

            <div>{mappedEntries}</div>
            
            <br></br>

            <p>---------------------------------Results------------------------</p>

            <div>{mappedUserResults}</div>
            
            <br></br>

            <p>---------------------------------Users Hobbies------------------------</p>

            <div>{mappedUserHobbies}</div>
            


            <div>-------------buttons!---------------</div>
            <Link to='/user-hobby-selection'>
            <button> Add more hobbies!</button>
            </Link>
            <div></div>
            <button className="" onClick={handleEdit} > Edit my information. </button>
            <div></div>
            {toggleDelete ? deleteBtn : confirmDelete}

        </div>
    )

    const loggedOutDisplay=(
        <div>
            <p> Sorry, but you must be logged in to view this page.</p>
            {/* Maybe a button here that takes them to login? */}
            {/* Or I could incorporate the functionality here and also allow for them to login here? */}
            <Link to='/login'>
            <button> Login </button>
            </Link>
        </div>
    )

    return (
        <div>
        {user ? loggedInDisplay : loggedOutDisplay }
        </div>
    )
}

export default UserDashboard