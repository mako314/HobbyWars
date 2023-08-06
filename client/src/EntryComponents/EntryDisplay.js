import React from 'react'
import { useEffect, useState } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'


function EntryDisplay({user, entryID,}){

    const navigate = useNavigate();

    const [singleEntry, setSingleEntry] = useState([])

    const [mappedEntry, setMappedEntry] = useState([])

    const [loMappedEntry, setLoMappedEntry] = useState([])

    //Use effect to grab the data when you initially load into this page
    useEffect(() => {
        fetch(`/entry/${entryID}`)
        .then((resp) => resp.json())
        .then((data) => {
            console.log(data)
            setSingleEntry(data)
          })
      }, [entryID])

      console.log(entryID)
      console.log(singleEntry)

    //navigate to the submission edit page if you are the signed in user
    // function navSubmissionEdit(id) {
    // navigate(`/edit-entry/${id}`)
    // }

    //No need to map, it's a singular object.
    useEffect(() => {
        if (singleEntry){

            function navSubmissionEdit(id) {
            navigate(`/edit-entry/${id}`)
            }
            // I added these in to see if it'd fix anything, and alas, it did not.
            function returnToSubmission(id){
                navigate(`/competition-submissions/${id}`)
            }

            setMappedEntry(
                <div>
                    <p>
                        {singleEntry.submission}
                    </p>

                    <p>
                        {singleEntry.description}
                    </p>
                    
                    <br></br>
                    
                    <button onClick={() => returnToSubmission(singleEntry.competition_id)}> Back </button>
                    
                    <br></br>

                    { user.id === singleEntry.user_id ? <button onClick={() => navSubmissionEdit(singleEntry.id)}> Edit this Entry</button> : ""}
                </div>
            )
        }
    }, [singleEntry])


    useEffect(() => {
    function returnToSubmission(id){
        navigate(`/competition-submissions/${id}`)
    }
            setLoMappedEntry(
                <div>
                    <p>
                        {singleEntry.submission}
                    </p>

                    <p>
                        {singleEntry.description}
                    </p>
                    
                    <br></br>
                    
                    <button onClick={() => returnToSubmission(singleEntry.competition_id)}> Back </button>
                    
                    <br></br>
                </div>
            )
    }, [singleEntry])

    //Return to the submissions page
    // function returnToSubmission(id){
    //     navigate(`/competition-submissions/${id}`)
    // }


    return (
        <div>
            {user ? mappedEntry : loMappedEntry}
        </div>
    )
}

export default EntryDisplay;