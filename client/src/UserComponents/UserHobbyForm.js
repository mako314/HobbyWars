import React from "react";
import { useEffect, useState } from 'react'
import { Link ,useNavigate } from "react-router-dom";
import {useFormik} from "formik"
import { object, string, number} from 'yup'

function UserHobbyForm({user, setUserHobbies, userHobbies}) {
    
    //Handle navigation
    const navigate = useNavigate()

 //map over hobbies to generate radio buttons? Let them select however many hobbies they'd like?
    
 //generate errors Please grab the error code portion and input into the userdisplay div
    const [error, setError] = useState()

// Grab ALL Hobbies
    const [hobbies, setHobbies] = useState([])

//Grab hobby descriptions?
    const [hobbyDescription, setHobbyDescription] = useState([])
//Grab hobby ID
    const [hobbyID, setHobbyID] = useState([])

//This useEffect grabs the data for the hobbies itself, there's probably a way to filter the descriptions out to display them on a div but alas.
    useEffect(() => {
        if (user)
        fetch("/hobbies")
          .then((resp) => resp.json())
          .then((data) => {
            setHobbies(data)
          })
      }, [])


//wait for hobby id to be set and then use it to pull out data for that hobby, just description.
    // const FetchHobbyDescriptions = () => {
    //     useEffect(() => {
    //     fetch(`/hobby/${hobbyID}`)
    //       .then((resp) => resp.json())
    //       .then((data) => {
    //         setHobbyDescription(data)
    //       })
    //   }, [hobbyID])}

      useEffect(() => {
        fetch(`/hobby/${hobbyID}`)
          .then((resp) => resp.json())
          .then((data) => {
            setHobbyDescription(data)
          })
      }, [hobbyID]) 

      //I'd like to add some if (users) around the useEffects, maybe group them together for cleaner code and less error. ATM if a person visits the site and is not signed in, they still fire off.
//FRICK, THIS DANG FORMIK IS FOR USER-HOBBY, SO I REALLY NEED TO THINK ABOUT HOW TO DO THIS.

    console.log(user)

    const formSchema = object({
        expertise: number().positive().required('You need an expertise level 1-10'),
    })
  // I can probably just do this three times? <UserHobbyForm/> inside of my user sign up to make three?
    const formik = useFormik({
        initialValues: {
            expertise: '',
            user_id: user.id,
            hobby_id: ''
        }, 
        validationSchema: formSchema,
        onSubmit: (values) => {
            console.log("here")
            fetch('/user-hobbies' , {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(values)
            })
                .then(res => {
                    if (res.ok){
                        res.json().then(userHobby =>{
                        setUserHobbies([...userHobbies, userHobby]) //spreads and updates our userHobby state in APP.js allowing it to post
                        console.log(userHobby)
                        })
                    } else {
                        res.json().then(error => setError(error)) //for backend errors
                    }
                })
        }
    })
    
    //map over description data
    const mappedHobby = hobbies.map((hobby) =>(
        <option key={hobby.id} value={hobby.id}> Hobby: {hobby.type_of_hobby}</option>
    ))

    //Description: {hobby.description}


    //This will handle conditional rendering and making it where we can update the id / fetch the description data
    const handleHobbyDisplay = (event) => {
        formik.handleChange(event);
        setHobbyID(event.target.value); //this can grab the ID
    }

    const backToDash =  () => {
        navigate(`/user-dashboard/${user.id}`)
    }


    //Map over hobby descriptions that were set above and solely take out the descriptions,
   //Originally I had a map over here, but hobbyDescription returns me one piece of data. I can't map over one piece of data...


    // formik.values.user_id = user.id
    // console.log(user.id)

    // console.log(hobbyDescription)
    // console.log(hobbyID)
    

//---------------------------------------LOGIN CONDITIONALS----------------------------------------------------
    const loggedInDisplay = (
        <>

        {/* display errors from formik/yup */}
        { formik.errors && Object.values(formik.errors).map(e => <p>{e}</p>) }

        {/* display errors from backend */}

        <form onSubmit={formik.handleSubmit}>
        {/* {formik.values.user_id = user.id} */}
        <div>
            <select
            className="text-black"
            name="hobby_id"
            value={formik.values.hobby_id}
            onChange={handleHobbyDisplay}>
                <option> Select from the Hobbies below</option>
                {mappedHobby}
            </select>
        </div>

        <div>
        Description
        <p>{hobbyDescription.description} </p>
        </div>

        <div className="user-signup-input">
            <label> Expertise Level? </label>
            <input
            type="text"
            name="expertise"
            value={formik.values.expertise}
            onChange={formik.handleChange}
            />
        </div>

        <button type="submit" className=""> Submit! </button> 
        {/* ^This button can take them to a new page */}

        <div> </div>

        </form>

        <button onClick={backToDash}> Back </button>
        {/* working now */}

        <div> </div>
        <button>
            Don't see your hobby from the drop down? Add It here!
        </button>
        </>
    )

    const loggedOutDisplay = (
        <>
        <div>
        Please Log in to access this data
        </div>
        <Link to='/login'>
        <button> Login </button>
        </Link>
        </>
        
    )



    return (
        <>
        {user ? loggedInDisplay : loggedOutDisplay}
        </>

    )
}

export default UserHobbyForm;

{/* <>
<div>
    <select
    className="text-black"
    name="hobby_id"
    value={formik.values.hobby_id}
    onChange={handleHobbyDisplay}>
        <option> Select from the Hobbies below</option>
        {mappedHobby}
    </select>
</div>

<div>
Description
<p>{hobbyDescription.description} </p>
</div>

<div className="user-signup-input">
    <label> Expertise Level? </label>
    <input
    type="text"
    name="expertise"
    value={formik.values.expertise}
    onChange={formik.handleChange}
    />
</div>
</> */}