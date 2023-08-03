import React from "react";
import { useEffect, useState } from 'react'
import { Link ,useNavigate } from "react-router-dom";
// import {useFormik} from "formik"
// import { object, string, number} from 'yup'
import UserHobbyForm from "./UserHobbyForm";

function MasterUserHobbyForm({user, setUserHobbies, userHobbies}) {
    
    //Handle navigation
    const navigate = useNavigate()

    const [hobbyAmount, setHobbyAmount] = useState(0)
    const [formsGenerated, setFormsGenerated] = useState(false)

 //map over hobbies to generate radio buttons? Let them select however many hobbies they'd like?

    console.log(hobbyAmount)

    const handleAmount = (event) => {
        setHobbyAmount(event.target.value)
    }

    const hobbiesToAdd = () => {
        let hobbyForms = [];
        for (let i =0; i< hobbyAmount; i++){
            hobbyForms.push(
            <div key={i}>
                <UserHobbyForm user={user} setUserHobbies={setUserHobbies} userHobbies={userHobbies}/>
            </div>
        )
        }
        return hobbyForms
    }
    
    const toggleButtons = () => {
        setFormsGenerated(!formsGenerated)
    }

    console.log(formsGenerated)

//---------------------------------------LOGIN CONDITIONALS----------------------------------------------------
    const loggedInDisplay = (
        <>
        <div>
        
            <select
            className="text-black"
            name="hobbyAmount"
            value={hobbyAmount}
            onChange={handleAmount}
            onClick={toggleButtons}
            >
                <option> How many hobbies would you like to add?</option>
                <option value={1}> 1 </option>
                <option value={2}> 2 </option>
                <option value={3}> 3 </option>
                <option value={4}> 4 </option>
                <option value={5}> 5 </option>
            </select>
            
            {
            hobbiesToAdd()
            
            }
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