import React from 'react'
import { useEffect, useState } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'


function EntryDisplay({user, entryID}){

    const navigate = useNavigate();

    const [singleEntry, setSingleEntry] = useState([])

    const [mappedEntry, setMappedEntry] = useState([])

    //I can likely use the code inside of the userdashboard (the code from competition submission to get here)

        // //Takes you to a single display page for the submission, ENTRY DISPLAY
        // function viewSubmission(id) {
        //     navigate(`/entry/${id}`)
        //     setEntryID(id)
        // }
    


    //Use effect to grab the data when you initially load into this page
    useEffect(() => {
        fetch(`/entry/${entryID}`)
        .then((resp) => resp.json())
        .then((data) => {
            // console.log("Ive fired")
            setSingleEntry(data)
          })
      }, [entryID])

      console.log(entryID)
      console.log(singleEntry)
    


    //No need to map, it's a singular object.
    useEffect(() => {
        if (singleEntry){
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

                </div>
            )
        }
    }, [singleEntry])

    function returnToSubmission(id){
        navigate(`/competition-submissions/${id}`)
    }


    return (
        <div>
            {mappedEntry}
        </div>
    )
}

export default EntryDisplay;