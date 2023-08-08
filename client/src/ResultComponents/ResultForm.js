import React from "react";
import { useEffect, useState } from 'react'
import { Link ,useNavigate } from "react-router-dom";
import {useFormik} from "formik"
import { object, string, number} from 'yup'

function ResultForm({user, setResults, results, compID, entryID, compResultID, entryResultID}) {
    
    // I could do something where this ties with the entry tbh.

    const [error, setError] = useState()
    
    const navigate = useNavigate()

    //Make sure I'm getting the right comp ID and entryID
    // console.log(compResultID)
    // console.log(entryResultID)

    const formSchema = object({
        placement: string().required('You need a submission!'),
    })

    const formik = useFormik({
        initialValues: {
            placement: '',
            user_id: '',
            competition_id: '',
            entry_id: ''
        },
        validationSchema: formSchema,
        onSubmit: (values) =>{
            fetch('/results' , {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(values)
            })
            .then(res => {
                if (res.ok){
                    res.json().then(result => { 
                        setResults([...results, result])
                        // console.log(result.entry_id) // This works, now lets make it a state variable that fires off and change competition submission to indicate such
                        //A result declartion here maybe?
                        // navigate(`/entry/${entry.id}`)
                        //can add state here to say it came from user entry submission
                        //Add where you want it to go here / anything else you want it to do
                    })
                } else {
                    res.json().then(error => setError(error)) //for backend errors
                }
            })
        }
    })

    //Takes you back to the competition ID if you hit the back button
    const backToCompetition =  () => {
        navigate(`/competition/${compID}`)
    }

// //---------------------------------------LOGIN CONDITIONALS----------------------------------------------------

    const loggedInDisplay = (
        <div>

        <form onSubmit={formik.handleSubmit}>

        <div className="user-signup-input">
            <label> What is the placement of this entry? </label>
            <input
            type="text"
            name="placement"
            value={formik.values.placement}
            onChange={formik.handleChange}
            />
        </div>

        {/* adding buttons to go back and for a submission to take you back to the page */}
        <button type="submit" className="" > Submit my result! </button>
        <br></br>

        <button onClick={backToCompetition}> Back </button>
        

        </form>
    
        </div>
    )

    const loggedOutDisplay = (
    <div>
        <p> Please login to declare any results to this competition.</p>
        <div></div>
        <Link to='/login'>
        <button> Login </button>
        </Link>
    </div>
    )
    

    //Set FORMIK values upon user existing
    useEffect(() => {
        if (user && user.id && compResultID && entryResultID){
        formik.setValues({
          user_id: user.id,
          competition_id: compResultID,
          entry_id: entryResultID
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

export default ResultForm;