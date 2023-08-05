import React from 'react'
import { useEffect, useState } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'

function CompetitionSubmissions({user, setEntryID}){

    const navigate = useNavigate();

    const [compEntries, setCompEntries] = useState([])

    const [userMappedCompEntries, setUserMappedCompEntries] = useState([])

    const [loMappedCompEntries, setLoMappedCompEntries] = useState([])



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


    //Destrcuture the entries from competiton, needs to be ENTRY
      const {
        user_id,
        entry
      } = compEntries
      
    //   console.log(entry)
    
    //Function to take you to the edit
    function navSubmissionEdit(id) {
        navigate(`/edit-entry/${id}`)
        setEntryID(id)
    }

    //Function to take you back to the competition display page
    function backToComp(id) {
        navigate(`/competition/${id}`)
    }
    //Button to take user to edit their entry, 
    // let userLoggedEditButton = <button onClick={() => navSubmissionEdit(oneEntry.id)}> Edit this Entry</button>  

    //once data is fetched, and if the data exists, map over it and display the submissions and entries
    // This one will populate the logged in display, the next useEffect has no edit button
    
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
                            { user.id === oneEntry.user_id ? <button onClick={() => navSubmissionEdit(oneEntry.id)}> Edit this Entry</button> : ""} 
                        </div>
                    )
                })
                )
        }

      }, [entry || user])

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
                        </div>
                    )
                })
                )
        }

      }, [entry || user])
    
    //--------------------------------------------LOGGED IN CONDITIONALS-------------------------

    let loggedInDisplay
    if (user){ loggedInDisplay= (
        <div>
        {userMappedCompEntries}
        {/* {user.id === user_id ? userLoggedEditButton : " "} */}
        </div>

    )}

    const loggedOutDisplay= (
        {loMappedCompEntries}
    )

    //Tbh I can probably make it where a user can edit this if their ID matches the ID of the COMPETITION USER ID

    return(
        <div>
            wowowoowow
            {user ? loggedInDisplay : loggedOutDisplay}
            <br></br>
            <button onClick={() => backToComp(id)}> BACK BUTTON</button>

        </div>
    )
}


export default CompetitionSubmissions;