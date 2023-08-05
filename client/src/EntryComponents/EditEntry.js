import React from "react";
import { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";
import {useFormik} from "formik"
import { object, string, number} from 'yup'

function EntryEdit({user, updateEntry, compID}){

    //display errors
    const [error, setError] = useState()

    //Handle navigation after submission, likely take to display page
    const navigate = useNavigate()

    //I may want to have them just navigate back to their user dashboard after all is said and done.

    const formSchema = object({
        submission: string().required('You need a submission!'),
        description: string().required('You need a short description of your submission!')

    })

    // console.log(user.username)

    //Takes the form and makes a patch request
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
                        updateEntry(entry)
                        // navigate('/user-hobby-selection')
                        //Add where you want it to go here / anything else you want it to do
                    })
                } else {
                    res.json().then(error => setError(error)) //for backend errors
                }
            })
        }
    })

    // I need to capture the entries ID with state


    //Takes the user back to the dashboard if they didn't want to click it
    const backToDash =  () => {
        navigate(`/user-dashboard/${user.id}`)
    }

    //Magic code, waits for the user data to be populates, and then allows for setting the values.
    useEffect(() => {
        if (user && compID){
        formik.setValues({
            submission: '',
            description: '',
            user_id: user.id,
            competition_id: compID , 
        })
    }
      }, [user])


    return(
        <div>
            <form className="signup-form" onSubmit={formik.handleSubmit}>
                    {/* display errors from formik/yup */}
                    { formik.errors && Object.values(formik.errors).map(e => <p>{e}</p>) }

                    {/* display errors from backend */}
                    {error && <p>{error}</p>}

                    <div className="user-signup-input">
                    <label>  Enter your submission </label>
                    <input
                    type="text"
                    name="submission"
                    value={formik.values.submission}
                    onChange={formik.handleChange}
                    />
                    </div>

                    <div className="user-signup-input">
                    <label> Edit your description </label>
                    <input
                    type="text"
                    name="description"
                    value={formik.values.description}
                    onChange={formik.handleChange}
                    />
                    </div>

                <div>--------------------------------------</div>
                <button type="submit" className=""> Submit and return to my Dashboard </button>

            </form>
                <button onClick={backToDash}> Back </button>

        </div>
    )
}

export default EntryEdit;