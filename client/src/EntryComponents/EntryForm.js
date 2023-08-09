import React from "react";
import { useEffect, useState } from 'react'
import { Link ,useNavigate } from "react-router-dom";
import {useFormik} from "formik"
import { object, string, number} from 'yup'

function EntryForm({user, setEntries, entries, compID, setEntryID}) {
    
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
                        // navigate(`/competition-submissions/${compID}`)
                        setEntryID(entry.id)
                        console.log(entry.id)
                        navigate(`/entry/${entry.id}`)
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

    //can probably use this to grab the competition and display the title, and maybe the scoring stuff in the form

// //---------------------------------------LOGIN CONDITIONALS----------------------------------------------------

    const loggedInDisplay = (
        // <div>

        // <form onSubmit={formik.handleSubmit}>

        // <div className="user-signup-input">
        //     <label> Enter your submission? </label>
        //     <input
        //     type="text"
        //     name="submission"
        //     value={formik.values.submission}
        //     onChange={formik.handleChange}
        //     />
        // </div>

        // <div className="user-signup-input">
        //     <label> Please enter a short description of your submission </label>
        //     <textarea
        //     type="text"
        //     name="description"
        //     value={formik.values.description}
        //     onChange={formik.handleChange}
        //     />
        // </div>
        
        // {/* adding buttons to go back and for a submission to take you back to the page */}
        // <button type="submit" className="" > Submit my entry! </button>
        // <br></br>
        // <button onClick={backToCompetition}> Back </button>
        

        // </form>
    
        // </div>

        <div class="bg-white py-6 sm:py-8 lg:py-12">
  <div class="mx-auto max-w-screen-2xl px-4 md:px-8">

    <div class="mb-10 md:mb-16">
      <h2 class="mb-4 text-center text-2xl font-bold text-gray-800 md:mb-6 lg:text-3xl">I'm Ready to Enter!</h2>

      <p class="mx-auto max-w-screen-md text-center text-gray-500 md:text-lg"> display the title, and maybe the scoring stuff in the form </p>
    </div>

    <form onSubmit={formik.handleSubmit} class="mx-auto grid max-w-screen-md gap-4 sm:grid-cols-2">

      <div class="sm:col-span-2">
        <label for="submission" class="mb-2 inline-block text-sm text-gray-800 sm:text-base">Enter your Submission!</label>
        <input type="text" name="submission" value={formik.values.submission} onChange={formik.handleChange} class="w-full rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none ring-indigo-300 transition duration-100 focus:ring" />
      </div>

      <div class="sm:col-span-2">
        <label for="description" class="mb-2 inline-block text-sm text-gray-800 sm:text-base"> Please Enter a Short Description of your Submission</label>
        <textarea type="text" name="description" value={formik.values.description} onChange={formik.handleChange} class="h-64 w-full rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none ring-indigo-300 transition duration-100 focus:ring"/>
      </div>

      <div class="flex items-center justify-between sm:col-span-2">

        {/* NEED TO CHANGE COLOR */}
        <button type="submit" class="inline-block rounded-lg bg-indigo-500 px-8 py-3 text-center text-sm font-semibold text-white outline-none ring-indigo-300 transition duration-100 hover:bg-indigo-600 focus-visible:ring active:bg-indigo-700 md:text-base">Submit Entry</button>

        <button onClick={backToCompetition} class="inline-block rounded-lg bg-indigo-500 px-8 py-3 text-center text-sm font-semibold text-white outline-none ring-indigo-300 transition duration-100 hover:bg-indigo-600 focus-visible:ring active:bg-indigo-700 md:text-base"> Back </button>
        <span class="text-sm text-gray-500">*Required</span>
      </div>

    </form>

  </div>
</div>
    )
    // <button onClick={backToCompetition}> Back </button>

    const loggedOutDisplay = (
    <div>
        <p> Please login to submit any entries to this competition.</p>
        <div></div>
        <Link to='/login'>
        <button> Login </button>
        </Link>
    </div>
    )
    

    //Set FORMIK values upon user existing
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