import React from "react";
import { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";
import {useFormik} from "formik"
import { object, string, number} from 'yup'

function EntryEdit({user, updateEntry, entryID, editFromSubmissions}){

    //display errors
    const [error, setError] = useState()

    //grab entry info to display, check the useeffect at the bottom
    const [entryInfo, setEntryInfo] = useState([])


    //Handle navigation after submission, likely take to display page
    const navigate = useNavigate()

    //I may want to have them just navigate back to their user dashboard after all is said and done.


    const formSchema = object({
        submission: string().required('You need a submission!'),
        description: string().required('You need a short description of your submission!')

    })

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
            fetch(`/entry/${entryID}` , {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(values)
            })
            .then(res => {
                if (res.ok){
                    res.json().then(entry => {
                        console.log("shooting")
                        updateEntry(entry)
                        if (editFromSubmissions === true){
                            navigate(`/competition-submissions/${entry.competition_id}`)
                        } else {
                        navigate(`/user-dashboard/${user.id}`)
                        //Add where you want it to go here / anything else you want it to do
                        }
                    })
                } else {
                    res.json().then(error => setError(error)) //for backend errors
                }
            })
        }
    })

//---------------------------------------------------------------------------------BACK BUTTON NAVIGATIONS-----------------------------------------------------------------------

    // I need to capture the entries ID with state
    // console.log(entryID)

    //Takes the user back to the dashboard if they didn't want to click it IF YOU CAME FROM USER DASH
    const backToDash =  () => {
        navigate(`/user-dashboard/${user.id}`)
    }
    //Button to return to the userdash board, conditionally rendered
    let userDashButton = <button onClick={backToDash}> Back </button>

    //takes you back to submissions if you came from submissions
    const backToSubmissions = () => {
        navigate(`/competition-submissions/${entryInfo.competition_id}`)
    }
    //Button to return to the submissions board, conditionally rendered
    let submissionsReturnbtn = <button onClick={backToSubmissions}> Back </button>

//---------------------------------------------------------------------------------USE EFFECTS FOR PREPOPULATING DATA -----------------------------------------------------------------------

    //Use effect waiting for user to load, then afterwards if user exists, comp id exists, and entry ID all exist, it fetches the entries information such as description and submission.
    useEffect(() => {
        if (user && entryID){ 
        fetch(`/entry/${entryID}`)
        .then((resp) => resp.json())
        .then((data) => {
            // console.log("Ive fired")
            setEntryInfo(data)
          })
    }
      }, [user])

    //This useEffect waits for EntryInfo to be populated, then it uses formik.setValues to input the existing information in the patch.
      useEffect(() => {
        if (entryInfo && user){
            formik.setValues({
                submission: entryInfo.submission,
                description: entryInfo.description,
                user_id: user.id,
                competition_id: entryInfo.competition_id
            })
    }
      }, [entryInfo])
    
    // Console logs, 
    // Page breaks on reload and by breaks I mean the inputs no longer linger, can probably move some stuff around but I'll see
    // console.log(entryInfo.competition_id)
    // console.log(user.id)
    // console.log(entryInfo)
    // console.log(entryID)

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

                <br></br>

                {/* working toggle button, if they came from submission, return them to submissions 
                    or if they came from the userDashBoard, I give them the userDashboard button
                */}
                {editFromSubmissions ? submissionsReturnbtn : userDashButton}

            </form>
                

        </div>
    )
}

export default EntryEdit;