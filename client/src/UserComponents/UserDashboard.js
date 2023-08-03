import React from 'react';
import { useEffect, useState } from 'react'
import { Link ,useParams, useNavigate } from 'react-router-dom'

function UserDashboard({user, setNewUsers, newUsers, setUser}) { //newUsers Don't think I'll need this prop

    //This is used for getting to the edit form portion
    const navigate = useNavigate();

    //This user being passed in as a prop is the state of our logged in user like we have done prior. 
    //The newUsers comment is way in App.js to fetch ALL users and POST a new USER.

    //State to hold the selected fetched user
    const [selectedUser, setSelectedUser] = useState([])

    //State to confirm deletion (makes a button appear?)
    const [toggleDelete, setToggleDelete] = useState(true)

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
        bannerImg 
    } = selectedUser;

    const {id} = useParams()

    //use Params take the navigation portion and inputs that as string interpolation into our route. Taking us to that competitions page. This then grabs that pages data and properly displays it.
    useEffect(() => {
        fetch(`/user/${id}`)
          .then((resp) => resp.json())
          .then((data) => {
            setSelectedUser(data)
          })
      }, [])


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


    //This button allows you to confirm
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

    // console.log(toggleDelete)
    console.log(user)


    //---------------------------------------LOGIN CONDITIONALS----------------------------------------------------
    
    //To handle going to the edit page 
    function handleEdit(e) {
        // const {user_id } = user <- don't need to do this
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
        </div>
    )

    return (
        <div>
        {user ? loggedInDisplay : loggedOutDisplay }
        </div>
    )
}

export default UserDashboard


{/* <div>
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
</div> */}

// stuff that was in the return prior