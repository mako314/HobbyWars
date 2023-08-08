import React from 'react'
import { useEffect, useState } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'

function CompetitionSubmissions({user, setEntryID, setEditFromSubmissions, editFromSubmissions, setViewFromSubmissions, setCompID, setEntryResultID, setCompResultID, resultForEntryID, results, entries}){


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
        console.log(editFromSubmissions)
    }

    //Function to take you back to the competition display page
    function backToComp(id) {
        navigate(`/competition/${id}`)
    }

    //Takes you to a single display page for the submission, ENTRY DISPLAY
    function viewSubmission(id) {
        setViewFromSubmissions(true)
        setEntryID(id)
        navigate(`/entry/${id}`)
    }

    //Takes you to a page to declare result for that entry need a back button there to bring me back to this page.
    function navToSubmitResults (id, idForCompetition) {
        console.log(id)
        console.log(idForCompetition)

        setEntryResultID(id)
        setCompResultID(idForCompetition)
        //This above works!

        //This is where you you can determine if the declare a result button was clicked

        navigate(`/declare-results/`)
    }
//----------------------------------------------------------------------------------------------------------------------

    
    console.log(results)
    console.log(entries)

    // console.log(entry.result_id === results.entry_id)

//------------------------------------------------------------------ LOGIN CONDITIONALS----------------------------------------------------

    //once data is fetched, and if the data exists, map over it and display the submissions and entries for a logged in user
    //This one will populate the logged in display, the next useEffect has no edit button
    useEffect(() =>{
        if (entry && user && user_id){
            setUserMappedCompEntries(
                entry?.map((oneEntry) => {
                    return (
                        <div>
                            <br></br>
                            Entry
                            <br></br>

                            <div>
                                Submission:
                            <p>{oneEntry.submission}</p>
                            </div>

                            <br></br>

                            <div>
                                Description:
                            <p>{oneEntry.description}</p>
                            </div>

                            <br></br>

                            <button onClick={() => viewSubmission(oneEntry.id)}> View Submission</button>
                            
                            <br></br>

                            { user.id === oneEntry.user_id ? <button onClick={() => navSubmissionEdit(oneEntry.id)}> Edit this Entry</button> : ""}
                            
                            {
                            user.id === user_id ?  
                            <button onClick={() => navToSubmitResults(oneEntry.id, oneEntry.competition_id)}> Declare a result </button> 
                            : "working"
                            }
                            
                            {/* Can likely make that ternary "" = something if result.entry_id === entry id?  has been done ? */}
                            {/* 
                            entry.result_id === result.entry_id

                            entry.id === result.entry_id

                            can combine with and and -> && -> || 

                            && takes into account that BOTH MUST BE TRUE

                            && and || can usually make up your own version

                            if rain if cold I will wear a coat, 

                            if and else 
                            ^if needed

                            multi step -

                            grab entry first look through the array with that if you see result.entry_id make a boolean flag, indiciate true or false if the condition is met, set the boolean flag to true, intiially set to false, until proven otherwise

                            set up something to search through the array and find that

                            do the same for result

                            then stick in the conditional after the user stuff the boolean flag





                            console.log(results)
                            console.log(resultForEntryID) 
                            I have this to work with, I want that when a result exists, it takes into account the user.id matching the competition Id LIKE above, but if the results has an entry_id that matches the resultForEntryID I want it to then no longer say declare a result but RESULT DECLARED
                            */}
                        </div>
                    )
                })
                )
        }

      }, [entry, user])
    
    
    //This useEffect maps over the competitions entries, and it sets for a logged out user, there is no button to handle an edit for example.
    useEffect(() =>{
        if (entry){
            setLoMappedCompEntries(
                entry?.map((oneEntry) => {
                    return (
                        <div>
                            <br></br>
                            Entry:
                            <br></br>

                            <div>
                                Submission:
                            <p>{oneEntry.submission}</p>
                            </div>

                            <br></br>

                            <div>
                                Description:
                            <p>{oneEntry.description}</p>
                            </div>

                            <button onClick={() => viewSubmission(oneEntry.id)}> View Submission</button>
                        
                        </div>
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
        <div>
            wowowoowow
            {user ? loggedInDisplay : loMappedCompEntries}
            <br></br>
            <button onClick={() => backToComp(id)}> BACK BUTTON</button>

        </div>
    )
}


export default CompetitionSubmissions;