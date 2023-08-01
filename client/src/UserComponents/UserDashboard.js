import React from 'react';
import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

function UserDashboard({}) { //newUsers Don't think I'll need this prop

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

    return (
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
        </div>
    )
}

export default UserDashboard