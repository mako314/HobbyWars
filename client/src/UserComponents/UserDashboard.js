import React from 'react';
import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

function UserDashboard({user}) { //newUsers Don't think I'll need this prop

    //This is used for getting to the edit form portion
    const navigate = useNavigate();

    //This user being passed in as a prop is the state of our logged in user like we have done prior. 
    //The newUsers comment is way in App.js to fetch ALL users and POST a new USER.

    //State to hold the selected fetched user
    const [selectedUser, setSelectedUser] = useState([])

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


    //---------------------------------------LOGIN CONDITIONALS----------------------------------------------------
    
    //To handle going to the edit page 
    function handleEdit(e) {
        const {user_id } = user
        navigate(`/user-edit/${user_id}`)
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

            <button className="" onClick={handleEdit} > Edit my information. </button>

        </div>
    )

    const loggedOutDisplay=(
        <div>
            <p> Sorry, but you must be logged in to view this page.</p>
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