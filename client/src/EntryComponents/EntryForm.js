import React from "react";
import { useEffect, useState } from 'react'
import { Link ,useNavigate } from "react-router-dom";
import {useFormik} from "formik"
import { object, string, number} from 'yup'

function EntryForm({user, setEntries, entries, compID, setEntryID, setViewedFromUser, setEntryCompID}) {
    
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
                        setEntryCompID(entry.competitions.id)
                        // console.log(entry.id)
                        setViewedFromUser(false)
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

        <div className="bg-white py-6 sm:py-8 lg:py-12">
  <div className="mx-auto max-w-screen-2xl px-4 md:px-8">

    <div className="mb-10 md:mb-16">
      <h2 className="mb-4 text-center text-2xl font-bold text-gray-800 md:mb-6 lg:text-3xl">I'm Ready to Enter!</h2>

      <p className="mx-auto max-w-screen-md text-center text-gray-500 md:text-lg"> display the title, and maybe the scoring stuff in the form </p>
    </div>

    <form onSubmit={formik.handleSubmit} className="mx-auto grid max-w-screen-md gap-4 sm:grid-cols-2">


          {/* display errors from formik/yup */}
          { formik.errors && Object.values(formik.errors).map(e => <p>{e}</p>) }
          {/* display errors from backend */}
          {error && <p>{error}</p>}

      <div className="sm:col-span-2">
        <label htmlFor="submission" className="mb-2 inline-block text-sm text-gray-800 sm:text-base">Enter your Submission!</label>
        <input type="text" name="submission" value={formik.values.submission} onChange={formik.handleChange} className="w-full rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none ring-indigo-300 transition duration-100 focus:ring" />
      </div>

      <div className="sm:col-span-2">
        <label htmlFor="description" className="mb-2 inline-block text-sm text-gray-800 sm:text-base"> Please Enter a Short Description of your Submission</label>
        <textarea type="text" name="description" value={formik.values.description} onChange={formik.handleChange} className="h-64 w-full rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none ring-indigo-300 transition duration-100 focus:ring"/>
      </div>

      <div className="flex items-center justify-between sm:col-span-2">

        {/* NEED TO CHANGE COLOR */}
        <button type="submit" className="inline-block rounded-lg bg-indigo-500 px-8 py-3 text-center text-sm font-semibold text-white outline-none ring-indigo-300 transition duration-100 hover:bg-indigo-600 focus-visible:ring active:bg-indigo-700 md:text-base">Submit Entry</button>

        <button onClick={backToCompetition} className="inline-block rounded-lg bg-indigo-500 px-8 py-3 text-center text-sm font-semibold text-white outline-none ring-indigo-300 transition duration-100 hover:bg-indigo-600 focus-visible:ring active:bg-indigo-700 md:text-base"> Back </button>
        <span className="text-sm text-gray-500">*Required</span>
      </div>

    </form>

  </div>
</div>
    )
    // <button onClick={backToCompetition}> Back </button>

    // const loggedOutDisplay = (
    // <div>
    //     <p> Please login to submit any entries to this competition.</p>
    //     <div></div>
    //     <Link to='/login'>
    //     <button> Login </button>
    //     </Link>
    // </div>
    // )

    function TakeMeToLogin() {
      navigate(`/login`)
    }
  
    function TakeMeHome(){
      navigate(`/`)
    }
  
    const loggedOutDisplay = (
  
        <div className="bg-white py-6 sm:py-8 lg:py-12">
        <div className="mx-auto max-w-screen-lg px-4 md:px-8">

          <div className="grid gap-8 sm:grid-cols-2">
  
            <div className="h-80 overflow-hidden rounded-lg bg-gray-100 shadow-lg md:h-auto">
              <img src="https://images.unsplash.com/photo-1626790680787-de5e9a07bcf2?auto=format&q=75&fit=crop&w=600" loading="lazy" alt="Photo by Theo Crazzolara" className="h-full w-full object-cover object-center" />
            </div>
  
            <div className="flex flex-col items-center justify-center sm:items-start md:py-24 lg:py-32">
              <p className="mb-4 text-sm font-semibold uppercase text-indigo-500 md:text-base">Error</p>
              <h1 className="mb-2 text-center text-2xl font-bold text-gray-800 sm:text-left md:text-3xl"> Sorry, but you must be logged in to submit an entry</h1>
  
              <p className="mb-4 text-center text-gray-500 sm:text-left md:mb-8 md:text-lg">Please login to submit any entries to this competition. If you believe this to be an error, check your route and try again.</p>
  
              <nav className="flex gap-4 sm:block sm:space-y-1 md:space-y-2">
                
                <button onClick={TakeMeHome} className="inline-block rounded-lg bg-indigo-500 px-8 py-3 text-center text-sm font-semibold text-white outline-none ring-indigo-300 transition duration-100 hover:bg-indigo-600 focus-visible:ring active:bg-indigo-700 md:text-base">Take me Home!</button>
  
  
                <br/>
  
                <button onClick={TakeMeToLogin} className="inline-block rounded-lg bg-indigo-500 px-8 py-3 text-center text-sm font-semibold text-white outline-none ring-indigo-300 transition duration-100 hover:bg-indigo-600 focus-visible:ring active:bg-indigo-700 md:text-base">Login</button>
              
              </nav>
            </div>
          </div>
        </div>
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