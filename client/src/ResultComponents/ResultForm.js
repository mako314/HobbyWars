import React from "react";
import { useEffect, useState } from 'react'
import { Link ,useNavigate } from "react-router-dom";
import {useFormik} from "formik"
import { object, string, number} from 'yup'

function ResultForm({user, setResults, results, compID, compResultID, entryResultID, setResultForEntryID}) {
    
    // I could do something where this ties with the entry tbh.

    const [error, setError] = useState()
    
    const navigate = useNavigate()

    //Make sure I'm getting the right comp ID and entry ID
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
                        setResultForEntryID(result.entry_id)
                        // console.log(result.entry_id) // This works, now lets make it a state variable that fires off and change competition submission to indicate such
                        //A result declartion here maybe?
                        
                        navigate(`/competition-submissions/${compID}`)
                        
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
        //Maybe I go back to that entries display page?
        navigate(`/competition-submissions/${compID}`)
        // navigate(`/competition/${compID}`)
    }

// //---------------------------------------LOGIN CONDITIONALS----------------------------------------------------

    const loggedInDisplay = (
        // <div>

        // <form onSubmit={formik.handleSubmit}>

        // <div className="user-signup-input">
        //     <label> What is the placement of this entry? </label>
        //     <input
        //     type="text"
        //     name="placement"
        //     value={formik.values.placement}
        //     onChange={formik.handleChange}
        //     />
        // </div>

        // {/* adding buttons to go back and for a submission to take you back to the page */}
        // <button type="submit" className="" > Submit my result! </button>
        // <br></br>

        // <button onClick={backToCompetition}> Back </button>
        

        // </form>
    
        // </div>

        <div class="bg-white py-6 sm:py-8 lg:py-12">
  <div class="mx-auto max-w-screen-2xl px-4 md:px-8">

    <div class="mb-10 md:mb-16">
      <h2 class="mb-4 text-center text-2xl font-bold text-gray-800 md:mb-6 lg:text-3xl">Submission Here</h2>

      <p class="mx-auto max-w-screen-md text-center text-gray-500 md:text-lg"> Submission description here</p>
    </div>

    <form onSubmit={formik.handleSubmit} class="mx-auto grid max-w-screen-md gap-4 sm:grid-cols-2">

      <div class="sm:col-span-2">
        <label for="placement" class="mb-2 inline-block text-sm text-gray-800 sm:text-base">What is the Placement of this Entry?</label>
        <input type="text" name="placement" value={formik.values.placement} onChange={formik.handleChange} class="w-full rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none ring-indigo-300 transition duration-100 focus:ring" />
      </div>

      <div class="flex items-center justify-between sm:col-span-2">

        {/* NEED TO CHANGE COLOR */}
        <button type="submit" class="inline-block rounded-lg bg-indigo-500 px-8 py-3 text-center text-sm font-semibold text-white outline-none ring-indigo-300 transition duration-100 hover:bg-indigo-600 focus-visible:ring active:bg-indigo-700 md:text-base">Submit Result</button>

        <button onClick={backToCompetition} class="inline-block rounded-lg bg-indigo-500 px-8 py-3 text-center text-sm font-semibold text-white outline-none ring-indigo-300 transition duration-100 hover:bg-indigo-600 focus-visible:ring active:bg-indigo-700 md:text-base"> Back </button>
        <span class="text-sm text-gray-500">*Required</span>
      </div>

    </form>

  </div>
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