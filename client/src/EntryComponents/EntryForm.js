import React from "react";
import { useEffect, useState } from 'react'
import { Link ,useNavigate } from "react-router-dom";
import {useFormik} from "formik"
import { object, string, number} from 'yup'

function EntryForm({user, setEntries, entries, updateEntry}) {
    
    const [error, setError] = useState()
    
    const navigate = useNavigate()

    const formSchema = object({
        type_of_hobby: string().required('You need a short title of your hobby. Ex: Knitting, Surfing, Writing. The more specific the better!'),
        description: string().required('You need a short description of your hobby!')

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

    //Ideally I'd want this fire off after they're done adding a hobby, but I'd like to make it so they can add multiple at a time.
    // const navigateToSelection = () => {
    //     console.log("I fired")
    //     navigate('/user-hobby-selection')  
    // }

    const loggedInDisplay = (
        <div>

        <form onSubmit={formik.handleSubmit}>

        <div className="user-signup-input">
            <label> What is your hobby? </label>
            <input
            type="text"
            name="type_of_hobby"
            value={formik.values.type_of_hobby}
            onChange={formik.handleChange}
            />
        </div>

        <div className="user-signup-input">
            <label> Please enter a short description of the hobby </label>
            <textarea
            type="text"
            name="description"
            value={formik.values.description}
            onChange={formik.handleChange}
            />
        </div>
 
        <button type="submit" className="" > Add my Hobby! </button>
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



    return(
        <>
        
        {user ? loggedInDisplay : loggedOutDisplay}

        </>
    )
}

export default EntryForm;