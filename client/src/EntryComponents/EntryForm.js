import React from "react";
import { useEffect, useState } from 'react'
import { Link ,useNavigate } from "react-router-dom";
import {useFormik} from "formik"
import { object, string, number} from 'yup'

function EntryForm({user, setEntries, entries, compID}) {
    
    const [error, setError] = useState()
    
    const navigate = useNavigate()

    const formSchema = object({
        submission: string().required('You need a submission!'),
        description: string().required('You need a short description of your submission!')

    })

    const formik = useFormik({
        initialValues: {
            submission: '',
            description: '',
            user_id: '',
            competition_id: ''
        },
        validationSchema: formSchema,
        onSubmit: (values) =>{
            fetch('/entries' , {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(values)
            })
            .then(res => {
                if (res.ok){
                    res.json().then(entry => {
                        setEntries([...entries, entry])
                        // navigate('/user-hobby-selection')
                        //Add where you want it to go here / anything else you want it to do
                    })
                } else {
                    res.json().then(error => setError(error)) //for backend errors
                }
            })
        }
    })

    const loggedInDisplay = (
        <div>

        <form onSubmit={formik.handleSubmit}>

        <div className="user-signup-input">
            <label> Enter your submission? </label>
            <input
            type="text"
            name="submission"
            value={formik.values.submission}
            onChange={formik.handleChange}
            />
        </div>

        <div className="user-signup-input">
            <label> Please enter a short description of your submission </label>
            <textarea
            type="text"
            name="description"
            value={formik.values.description}
            onChange={formik.handleChange}
            />
        </div>
 
        <button type="submit" className="" > Submit my entry! </button>
        {/* onSubmit={navigateToSelection} */}

        </form>
    
        </div>
    )

    const loggedOutDisplay = (
    <div>
        <p> Please login to submit any entries to this competition.</p>
        <div></div>
        <Link to='/login'>
        <button> Login </button>
        </Link>
    </div>
    )

    useEffect(() => {
        if (user && user.id && compID){
        formik.setValues({
          user_id: user.id,
          competition_id: compID
        })
    }
      }, [user])

    // console.log(user.id)
    // console.log(compID)



    return(
        <>
        
        {user ? loggedInDisplay : loggedOutDisplay}

        </>
    )
}

export default EntryForm;