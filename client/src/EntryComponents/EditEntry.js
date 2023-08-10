import React from "react";
import { useEffect, useState } from 'react'
import { Link, useNavigate } from "react-router-dom";
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

    console.log(entryID)


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
                        console.log(editFromSubmissions)
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

    //COMMENTED OUT FOR TIME BEING, TRYING TO SEE COMPLEXITY
    //function that lets you go back to the entry display page instead of straight back to the dash from the display page, then the next back in the display page lets you go back to the USER DASH
    // const backToEntryDisplay = () => {
    //     navigate(`/entry/${entryInfo.id}`)
    // }

    // //button for the above
    // let backToDisplayPageBtn = <button onClick={backToEntryDisplay}> Back </button>
    
    //Takes the user back to the dashboard if they didn't want to click it IF YOU CAME FROM USER DASH
    const backToDash =  () => {
        navigate(`/user-dashboard/${user.id}`)
    }
    
    //Button to return to the userdash board, conditionally rendered
    let userDashButton
    // let userDashButton = <button onClick={backToDash}> Back </button>
    userDashButton = <button onClick={backToDash} className="inline-block rounded-lg bg-indigo-500 px-8 py-3 text-center text-sm font-semibold text-white outline-none ring-indigo-300 transition duration-100 hover:bg-indigo-600 focus-visible:ring active:bg-indigo-700 md:text-base"> Back to Profile </button>


    //takes you back to submissions if you came from submissions
    const backToSubmissions = () => {
        navigate(`/competition-submissions/${entryInfo.competition_id}`)
    }

    //Button to return to the submissions board, conditionally rendered
    let submissionsReturnbtn
    // let submissionsReturnbtn = <button onClick={backToSubmissions}> Back </button>

    submissionsReturnbtn = <button onClick={backToSubmissions} className="inline-block rounded-lg bg-indigo-500 px-8 py-3 text-center text-sm font-semibold text-white outline-none ring-indigo-300 transition duration-100 hover:bg-indigo-600 focus-visible:ring active:bg-indigo-700 md:text-base"> Back to Submissions </button>

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
      }, [user, entryID])

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
      }, [user, entryInfo, entryID])
//------------------------------------------------------------------ LOGIN CONDITIONALS----------------------------------------------------
 
    // Console logs, 
    // Page breaks on reload and by breaks I mean the inputs no longer linger, can probably move some stuff around but I'll see
    // console.log(entryInfo.competition_id)
    // console.log(user.id)
    console.log(entryInfo)
    // console.log(entryID)
      
    let loggedInDisplay
    if(user && entryInfo && entryInfo.competitions && entryID){
     loggedInDisplay = (
      <div className="bg-white py-6 sm:py-8 lg:py-12">
      <div className="mx-auto max-w-screen-2xl px-4 md:px-8">
    
        <div className="mb-10 md:mb-16">
          <h2 className="mb-4 text-center text-2xl font-bold text-gray-800 md:mb-6 lg:text-3xl">I'm Ready to Edit!</h2>
    
          <p className="mx-auto max-w-screen-md text-center text-gray-500 md:text-lg"> {entryInfo.competitions.title} </p>
        </div>
    
        <form onSubmit={formik.handleSubmit} className="mx-auto grid max-w-screen-md gap-4 sm:grid-cols-2">
          
          {/* display errors from formik/yup */}
          { formik.errors && Object.values(formik.errors).map(e => <p>{e}</p>) }
          {/* display errors from backend */}
          {error && <p>{error}</p>}
          
          <div className="sm:col-span-2">
            <label for="submission" className="mb-2 inline-block text-sm text-gray-800 sm:text-base">Enter your Submission!</label>
            <input type="text" name="submission" value={formik.values.submission} onChange={formik.handleChange} className="w-full rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none ring-indigo-300 transition duration-100 focus:ring" placeholder={formik.values.submission}/>
          </div>
    
          <div className="sm:col-span-2">
            <label for="description" className="mb-2 inline-block text-sm text-gray-800 sm:text-base"> Please Enter a Short Description of your Submission</label>
            <textarea type="text" name="description" value={formik.values.description} onChange={formik.handleChange} className="h-64 w-full rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none ring-indigo-300 transition duration-100 focus:ring" placeholder={formik.values.description}/>
          </div>
    
          <div className="flex items-center justify-between sm:col-span-2">
    
            {/* NEED TO CHANGE COLOR */}
            <button type="submit" className="inline-block rounded-lg bg-indigo-500 px-8 py-3 text-center text-sm font-semibold text-white outline-none ring-indigo-300 transition duration-100 hover:bg-indigo-600 focus-visible:ring active:bg-indigo-700 md:text-base">Finished Editing Entry</button>
    
            {editFromSubmissions ? submissionsReturnbtn : userDashButton}
            
          </div>
    
        </form>
    
      </div>
    </div>

    )}
  //   const loggedOutDisplay=(
  //     <div>
  //         <p> Sorry, but you do not seem to be the owner of that entry. If you think this is a mistake, check your route and try again.</p>
      
  //         <Link to='/login'>
  //         <button> Login </button>
  //         </Link>

  //     </div>
  // )

  function TakeMeToLogin() {
    navigate(`/login`)
  }

  function TakeMeHome(){
    navigate(`/`)
  }

  const loggedOutDisplay = (

      <div class="bg-white py-6 sm:py-8 lg:py-12">
      <div class="mx-auto max-w-screen-lg px-4 md:px-8">

        <div class="grid gap-8 sm:grid-cols-2">

          <div class="h-80 overflow-hidden rounded-lg bg-gray-100 shadow-lg md:h-auto">
            <img src="https://images.unsplash.com/photo-1626790680787-de5e9a07bcf2?auto=format&q=75&fit=crop&w=600" loading="lazy" alt="Photo by Theo Crazzolara" class="h-full w-full object-cover object-center" />
          </div>

          <div class="flex flex-col items-center justify-center sm:items-start md:py-24 lg:py-32">
            <p class="mb-4 text-sm font-semibold uppercase text-indigo-500 md:text-base">Error</p>
            <h1 class="mb-2 text-center text-2xl font-bold text-gray-800 sm:text-left md:text-3xl"> Sorry, but you do not seem to be the owner of this entry. Are you signed in?</h1>

            <p class="mb-4 text-center text-gray-500 sm:text-left md:mb-8 md:text-lg">You do not seem to be the owner of that entry. If you think this is a mistake, check your route and try again.</p>

            <nav class="flex gap-4 sm:block sm:space-y-1 md:space-y-2">
              
              <button onClick={TakeMeHome} class="inline-block rounded-lg bg-indigo-500 px-8 py-3 text-center text-sm font-semibold text-white outline-none ring-indigo-300 transition duration-100 hover:bg-indigo-600 focus-visible:ring active:bg-indigo-700 md:text-base">Take me Home!</button>


              <br/>

              <button onClick={TakeMeToLogin} class="inline-block rounded-lg bg-indigo-500 px-8 py-3 text-center text-sm font-semibold text-white outline-none ring-indigo-300 transition duration-100 hover:bg-indigo-600 focus-visible:ring active:bg-indigo-700 md:text-base">Login</button>
            
            </nav>
          </div>
        </div>
      </div>
    </div>
  )
  
  

    return(
      <>
      {user &&  user.id === entryInfo.user_id ? loggedInDisplay : loggedOutDisplay}
      </>
  
    )
}

export default EntryEdit;



      // <div>
        //     <form className="signup-form" onSubmit={formik.handleSubmit}>
        //             {/* display errors from formik/yup */}
        //             { formik.errors && Object.values(formik.errors).map(e => <p>{e}</p>) }

        //             {/* display errors from backend */}
        //             {error && <p>{error}</p>}

        //             <div className="user-signup-input">
        //             <label>  Enter your submission </label>
        //             <input
        //             type="text"
        //             name="submission"
        //             value={formik.values.submission}
        //             onChange={formik.handleChange}
        //             />
        //             </div>

        //             <div className="user-signup-input">
        //             <label> Edit your description </label>
        //             <input
        //             type="text"
        //             name="description"
        //             value={formik.values.description}
        //             onChange={formik.handleChange}
        //             />
        //             </div>

        //         <div>--------------------------------------</div>
        //         <button type="submit" className=""> Submit and return to my Dashboard </button>

        //         <br></br>

        //         {/* working toggle button, if they came from submission, return them to submissions 
        //             or if they came from the userDashBoard, I give them the userDashboard button
        //         */}
        //         {editFromSubmissions ? submissionsReturnbtn : userDashButton}

        //     </form>
                

        // </div>



//         <div className="bg-white py-6 sm:py-8 lg:py-12">
//   <div className="mx-auto max-w-screen-2xl px-4 md:px-8">

//     <div className="mb-10 md:mb-16">
//       <h2 className="mb-4 text-center text-2xl font-bold text-gray-800 md:mb-6 lg:text-3xl">I'm Ready to Enter!</h2>

//       <p className="mx-auto max-w-screen-md text-center text-gray-500 md:text-lg"> display the title, and maybe the scoring stuff in the form </p>
//     </div>

//     <form onSubmit={formik.handleSubmit} className="mx-auto grid max-w-screen-md gap-4 sm:grid-cols-2">

//       <div className="sm:col-span-2">
//         <label for="submission" className="mb-2 inline-block text-sm text-gray-800 sm:text-base">Enter your Submission!</label>
//         <input type="text" name="submission" value={formik.values.submission} onChange={formik.handleChange} className="w-full rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none ring-indigo-300 transition duration-100 focus:ring" placeholder={formik.values.submission}/>
//       </div>

//       <div className="sm:col-span-2">
//         <label for="description" className="mb-2 inline-block text-sm text-gray-800 sm:text-base"> Please Enter a Short Description of your Submission</label>
//         <textarea type="text" name="description" value={formik.values.description} onChange={formik.handleChange} className="h-64 w-full rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none ring-indigo-300 transition duration-100 focus:ring" placeholder={formik.values.description}/>
//       </div>

//       <div className="flex items-center justify-between sm:col-span-2">

//         {/* NEED TO CHANGE COLOR */}
//         <button type="submit" className="inline-block rounded-lg bg-indigo-500 px-8 py-3 text-center text-sm font-semibold text-white outline-none ring-indigo-300 transition duration-100 hover:bg-indigo-600 focus-visible:ring active:bg-indigo-700 md:text-base">Finished Editing Entry</button>

//         {editFromSubmissions ? submissionsReturnbtn : userDashButton}
        
//       </div>

//     </form>

//   </div>
// </div>