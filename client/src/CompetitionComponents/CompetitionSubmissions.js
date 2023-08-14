import React from 'react'
import { useEffect, useState } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'

function CompetitionSubmissions({user, setEntryID, setEditFromSubmissions, editFromSubmissions, setViewFromSubmissions, setCompID, setEntryResultID, setCompResultID, resultForEntryID, results, entries, setViewedFromUser={setViewedFromUser}, compID={compID}}){


    //resultForEntryID and setEntryResultID are going to help make a toggle to see whether or not a user has submitted a result then removing the button

//------------------------------------------------------------------ STATE PORTIONS----------------------------------------------------

    //setCompID
    const navigate = useNavigate();

    //Grab all the comp entries
    const [compEntries, setCompEntries] = useState([])
   
    //Map competition entries for logged in user
    const [userMappedCompEntries, setUserMappedCompEntries] = useState([])

    //Map competition entries for logged out user
    const [loMappedCompEntries, setLoMappedCompEntries] = useState([])

    //Maybe a state to indicate whether or not you came from this page? That way you do not get navigated back to userDashboard if you hit back

//------------------------------------------------------------------ use effect PORTIONS----------------------------------------------------

    //take the params from when you click on VIEW SUBMISSIONS button
    const {id} = useParams()

    // use the params to fetch data from the backend for the competition
    useEffect(() => {
        fetch(`/competition/${id}`)
          .then((resp) => resp.json())
          .then((data) => {
            setCompEntries(data)
          })
      }, [])

    //   console.log(compEntries.entry)

//------------------------------------------------------------------ NAVIGATION PORTIONS----------------------------------------------------


    //Destrcuture the entries from competiton, needs to be ENTRY
      const {
        user_id,
        entry
      } = compEntries
      
    //   console.log(entry)
    //   console.log(compEntries)
    
    //Function to take you to the edit
    function navSubmissionEdit(id) {
        navigate(`/edit-entry/${id}`)
        setEntryID(id)
        setEditFromSubmissions(true)
        // console.log(editFromSubmissions)
    }

    //Function to take you back to the competition display page
    function backToComp(id) {
        navigate(`/competition/${id}`)
    }

    //Takes you to a single display page for the submission, ENTRY DISPLAY
    function viewSubmission(id) {
        setViewFromSubmissions(true)
        setViewedFromUser(false)
        setEntryID(id)
        navigate(`/entry/${id}`)
    }


    // I PUT THIS INTO THE ACTUAL DIV AND STUFF -----
    // const twBtnForViewSubmission = (
    //     <button
    //     className="bg-pink-500 active:bg-pink-600 uppercase text-white font-bold hover:shadow-md shadow text-xs px-4 py-2 rounded outline-none focus:outline-none sm:mr-2 mb-1"
    //     type="button"
    //     style={{ transition: "all .15s ease" }}
    //     onClick={() => viewSubmission(id)}
    //     >
    //     View Submission
    //     </button>

    // )

    //Takes you to a page to declare result for that entry need a back button there to bring me back to this page.
    function navToSubmitResults (id, idForCompetition) {
        // console.log(id)
        // console.log(idForCompetition)

        setEntryResultID(id)
        setCompResultID(idForCompetition)
        //This above works!

        //This is where you you can determine if the declare a result button was clicked

        navigate(`/declare-results/`)
    }
//----------------------------------------------------------------------------------------------------------------------



//------------------------------------------------------------------ LOGIN CONDITIONALS----------------------------------------------------

    //once data is fetched, and if the data exists, map over it and display the submissions and entries for a logged in user
    //This one will populate the logged in display, the next useEffect has no edit button

    // let resultFlag = false


    // results.forEach((result) =>{
    //     // console.log(result)
    //     entries.forEach((entry)=>{
    //         // console.log(entry)
    //         if (result.entry_id === entry.id){
    //             resultFlag = true
    //         }
    //     })
    // })

    //make a list of what I need
    // result.entry_id === entry.id 


    // console.log(resultFlag)
    // console.log(entryFlag)

    // can do two for eachs...

    // console.log(results)
    // console.log(entries)

    // console.log(entry.result_id === results.entry_id)

    // let resultFlag = false
    // results.forEach((result) =>{
    //     entries.forEach((oneEntry)=>{
    //     if (result.entry_id === oneEntry.id){
    //         resultFlag = true}})
    //     })

    


    // useEffect(() =>{
    //     if (entry && user && user_id){
    //         setUserMappedCompEntries(
    //             entry?.map((oneEntry) => {
    //             // Initialize resultFlag to false for each oneEntry
    //             let resultFlag = false

    //             // Check if there exists a result with a matching entry_id for the current oneEntry
    //             results.forEach(result => {
    //                 if (result.entry_id === oneEntry.id) {
    //                     resultFlag = true
    //                 }
    //             })

    //             let userOwnedComp = user.id === user_id && !resultFlag ? <button onClick={() => navToSubmitResults(oneEntry.id, oneEntry.competition_id)}> Declare a result </button> : " You've already submitted an entry for this table"

    //             console.log(resultFlag)

    //                 return (
    //                     <div>
    //                         <br></br>
    //                         Entry
    //                         <br></br>

    //                         <div>
    //                             Submission:
    //                         <p>{oneEntry.submission}</p>
    //                         </div>

    //                         <br></br>

    //                         <div>
    //                             Description:
    //                         <p>{oneEntry.description}</p>
    //                         </div>

    //                         <br></br>

    //                         <button onClick={() => viewSubmission(oneEntry.id)}> View Submission</button>
                            
    //                         <br></br>

    //                         { user.id === oneEntry.user_id ? <button onClick={() => navSubmissionEdit(oneEntry.id)}> Edit this Entry</button> : ""}
                            
    //                         {user.id === user_id ? userOwnedComp : ""}
                            
    //                     </div>
    //                 )
    //             })
    //             )
    //     }

    //   }, [entry, user])



      useEffect(() => {
        if (entry && user && user_id){
            setUserMappedCompEntries(
                entry?.map((oneEntry) =>{
                    let resultFlag = false
                    // console.log(oneEntry)
                    setCompID(oneEntry.competition_id)

                    results.forEach(result =>{
                        if (result.entry_id === oneEntry.id) {
                            resultFlag = true
                        }
                    })

                    let userOwnedComp = user.id === user_id && !resultFlag ? 
                    <button
                    className="bg-pink-500 active:bg-pink-600 uppercase text-white font-bold hover:shadow-md shadow text-xs px-4 py-2 rounded outline-none focus:outline-none sm:mr-2 mb-1"
                    type="button"
                    style={{ transition: "all .15s ease" }}
                    onClick={() => navToSubmitResults(oneEntry.id, oneEntry.competition_id)}
                    >
                    Declare Results
                    </button>
                    :
                    <button
                    className="bg-pink-500 active:bg-pink-600 uppercase text-white font-bold hover:shadow-md shadow text-xs px-4 py-2 rounded outline-none focus:outline-none sm:mr-2 mb-1"
                    type="button"
                    style={{ transition: "all .15s ease" }}
                    >
                    RESULT ALREADY SUBMITTED
                    </button>
                    
  
                    return(
                <section>
                    <div className="relative">
                        {/* <div className="relative flex justify-start">
                        </div> */}
                    </div>
                    <div className="space-y-8 lg:divide-y lg:divide-gray-100">
                        <div className="pt-8 sm:flex lg:items-end group">
                        
                            <div className="flex-shrink-0 mb-4 sm:mb-0 sm:mr-4">
                                <img className="w-full rounded-md h-32 lg:w-32 object-cover" src={oneEntry.submission} alt={oneEntry.submission}/>
                            </div>
                            
                            <div>
                                {/* <span className="text-sm text-gray-500">{oneEntry.submission}</span> */}
                                <p className="mt-3 text-lg font-medium leading-6">
                                <span className="text-xl text-gray-800 group-hover:text-gray-500 lg:text-2xl">{oneEntry.user.username} </span>
                                </p>
                                <p className="mt-2 text-lg text-gray-500">{oneEntry.description}</p>

                                <button
                                className="bg-pink-500 active:bg-pink-600 uppercase text-white font-bold hover:shadow-md shadow text-xs px-4 py-2 rounded outline-none focus:outline-none sm:mr-2 mb-1"
                                type="button"
                                style={{ transition: "all .15s ease" }}
                                onClick={() => viewSubmission(oneEntry.id)}
                                >
                                View Submission 
                                </button>

                                { user.id === oneEntry.user_id ? 
                                
                                <button
                                className="bg-pink-500 active:bg-pink-600 uppercase text-white font-bold hover:shadow-md shadow text-xs px-4 py-2 rounded outline-none focus:outline-none sm:mr-2 mb-1"
                                type="button"
                                style={{ transition: "all .15s ease" }}
                                onClick={() => navSubmissionEdit(oneEntry.id)}
                                >
                                Edit this Entry
                                </button>
                                : " " }


                                {user.id === user_id ? userOwnedComp : ""}

                            </div>
                        
                        </div>
                        
            
                    </div>
                </section>
                    )
                })
            )

        }
      }, [entry, user])
      
    
    
    //This useEffect maps over the competitions entries, and it sets for a logged out user, there is no button to handle an edit for example.
    // useEffect(() =>{
    //     if (entry){
    //         setLoMappedCompEntries(
    //             entry?.map((oneEntry) => {
    //                 return (
    //                     <div>
    //                         <br></br>
    //                         Entry:
    //                         <br></br>

    //                         <div>
    //                             Submission:
    //                         <p>{oneEntry.submission}</p>
    //                         </div>

    //                         <br></br>

    //                         <div>
    //                             Description:
    //                         <p>{oneEntry.description}</p>
    //                         </div>

    //                         <button onClick={() => viewSubmission(oneEntry.id)}> View Submission</button>
                        
    //                     </div>
    //                 )
    //             })
    //             )
    //     }

    //   }, [entry, user])

      useEffect(() => {
        if (entry && !user){
            setLoMappedCompEntries(
                entry?.map((oneEntry) =>{
                    return(
                <section>
                    <div className="relative">
                    </div>
                    <div className="space-y-8 lg:divide-y lg:divide-gray-100">
                        <div className="pt-8 sm:flex lg:items-end group">
                        
                            <div className="flex-shrink-0 mb-4 sm:mb-0 sm:mr-4">
                                <img className="w-full rounded-md h-32 lg:w-32 object-cover" src={oneEntry.submission} alt={oneEntry.submission}/>
                            </div>
                            
                            <div>
                                {/* <span className="text-sm text-gray-500">{oneEntry.submission}</span> */}
                                <p className="mt-3 text-lg font-medium leading-6">
                                <span className="text-xl text-gray-800 group-hover:text-gray-500 lg:text-2xl">{oneEntry.user.username} </span>
                                </p>
                                <p className="mt-2 text-lg text-gray-500">{oneEntry.description}</p>

                                <button
                                className="bg-pink-500 active:bg-pink-600 uppercase text-white font-bold hover:shadow-md shadow text-xs px-4 py-2 rounded outline-none focus:outline-none sm:mr-2 mb-1"
                                type="button"
                                style={{ transition: "all .15s ease" }}
                                onClick={() => viewSubmission(oneEntry.id)}
                                >
                                View Submission 
                                </button>

                            </div>
                        
                        </div>
                        
            
                    </div>
                </section>
                    )
                })
            )

        }
      }, [entry, user])
    
    //--------------------------------------------LOGGED IN CONDITIONALS-------------------------

    let loggedInDisplay
    if (user){ loggedInDisplay= (
        <div>
        {userMappedCompEntries}
        {/* {user.id === user_id ? userLoggedEditButton : " "} */}
        </div>

    )}
    
    // const loggedOutDisplay= (
    //     {loMappedCompEntries}
    // )

    //Tbh I can probably make it where a user can edit this if their ID matches the ID of the COMPETITION USER ID

    return(
<div className="relative flex flex-col justify-between h-full">
        <div>
            {/* Your main content */}
            {user ? loggedInDisplay : loMappedCompEntries}
        </div>

        <button
            className="bg-pink-500 active:bg-pink-600 uppercase text-white font-bold hover:shadow-md shadow text-xs px-4 py-2 rounded outline-none focus:outline-none sm:mr-2 mb-1 self-end"
            type="button"
            style={{ transition: "all .15s ease" }}
            onClick={() => backToComp(compID)}
        >
            BACK BUTTON 
        </button>
    </div>
    )
}


export default CompetitionSubmissions;