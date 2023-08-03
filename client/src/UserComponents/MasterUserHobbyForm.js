import React from "react";
import { useEffect, useState } from 'react'
import { Link ,useNavigate } from "react-router-dom";
import {useFormik} from "formik"
import { object, string, number} from 'yup'
import UserHobbyForm from "./UserHobbyForm";

function MasterUserHobbyForm({user, setUserHobbies, userHobbies}) {
    
    //Handle navigation
    const navigate = useNavigate()

    //handle Errors
    const [error, setError] = useState()
    
    //set the amount of hobby forms to render
    const [hobbyAmount, setHobbyAmount] = useState(0)

    //toggle buttons
    const [buttonsGenerated, setButtonsGenerated] = useState(true)

    console.log(user)
//-------------------------------Trying it with formik... XD---------------------------------------------------------------------------------
    const formSchema = object({
        expertise: number().positive().required('You need an expertise level 1-10'),
    })

    const formik = useFormik({
        initialValues: {
            expertise: '',
            user_id: '',
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
                        userHobby.user_id = user.id
                        setUserHobbies([...userHobbies, userHobby]) //spreads and updates our userHobby state in APP.js allowing it to post
                        console.log(userHobby)
                        })
                    } else {
                        res.json().then(error => setError(error)) //for backend errors
                    }
                })
        }
    })
//---------------------------------------Can Delete this stuff likely------------------------------------------------------------------------
    
    //set the amount of hobby addition forms to populate. 
    //I may not even need this, I can just pass it to the mega function.
    // const handleAmount = (event) => {
    //     setHobbyAmount(event.target.value)
    //     hobbiesToAdd()
    // }

    //Toggle to display submit, back, and hobby add button. This might not be needed if I can just find a way to toggle the buttons after an event value has been declared
    //Toggle was not the way to do it.
    // const toggleButtons = (event) => {
    //     setButtonsGenerated(!buttonsGenerated)
    // }

//-------------------------------------------------------------------------------------------------------------------------------

    //Function to fire off other functions above.
    const handleChanges = (event) =>{
        // hold the number of forms to populate
        let selectedValue = Number(event.target.value)

        //Set the amount of hobby values i.e 5 hobby forms, this gets used in hobbieToADD
        setHobbyAmount(selectedValue)

        if (selectedValue){
            setButtonsGenerated(false)
        } else if (selectedValue === 0){
            setButtonsGenerated(true)
        }

        //Takes the hobbyAmount and Adds x amount of user hobby forms
        hobbiesToAdd()
    }

    //display as many hobby additions as the user 
    const hobbiesToAdd = () => {
        let hobbyForms = [];
        for (let i =0; i< hobbyAmount; i++){
            hobbyForms.push(
            <div key={i}>
                <UserHobbyForm user={user} setUserHobbies={setUserHobbies} userHobbies={userHobbies}/>
            </div>
            
        )}
        return hobbyForms
    }

    console.log(hobbyAmount)
    console.log(buttonsGenerated)



    //--------------------------BUTTONS---------------------------
    //take user back to their dashboard
    const backToDash =  () => {
        navigate(`/user-dashboard/${user.id}`)
    }


    //Need to add this button to link to adding a hobby.
    // <Link to='/add-a-hobby'>
    // <button>
    //     Don't see your hobby from the drop down? Add It here!
    // </button>
    // </Link>

    // <button type="submit" className=""> Submit! </button> 
    {/* ^This button can take them to a new page */}
    // Regular submit button

    const displayButtons = (
        <>

        <Link to='/add-a-hobby'>
            <button>
                Don't see your hobby from the drop down? Add It here!
            </button>
        </Link>

        <button onClick={backToDash}> Back </button>

        <button type="submit" className=""> Submit! </button> 
        
        </>
    )

    const noButtons = (
        <div>
            no buttons
        </div>
    )

//---------------------------------------LOGIN CONDITIONALS----------------------------------------------------
    const loggedInDisplay = (
        <>
        <div>
        
            <select
            className="text-black"
            name="hobbyAmount"
            value={hobbyAmount}
            onChange={handleChanges}
            >
                <option value={0}> How many hobbies would you like to add?</option>
                <option value={1}> 1 </option>
                <option value={2}> 2 </option>
                <option value={3}> 3 </option>
                <option value={4}> 4 </option>
                <option value={5}> 5 </option>
            </select>

            <form onSubmit={formik.handleSubmit}>
            {hobbiesToAdd()}

            {buttonsGenerated ? noButtons : displayButtons} 
            </form>

        </div>

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

export default MasterUserHobbyForm;