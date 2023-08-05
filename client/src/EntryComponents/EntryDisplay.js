import React from 'react'
import { useEffect, useState } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'


function EntryDisplay({user, entryID}){

    const [singleEntry, setSingleEntry] = useState([])

    const [mappedEntry, setMappedEntry] = useState([])

    //Use effect to grab the data when you initially load into this page
    useEffect(() => {
        fetch(`/entry/${entryID}`)
        .then((resp) => resp.json())
        .then((data) => {
            // console.log("Ive fired")
            setSingleEntry(data)
          })
      }, [])

    useEffect(() => {
        if (singleEntry){
            singleEntry.map((oneEntry) => {
                return(
                    <div>
                        <p>
                            {oneEntry.submission}
                        </p>

                        <p>
                            {oneEntry.description}
                        </p>

                    </div>
                )
            })

    }
      }, [singleEntry])


    return (
        <div>

        </div>
    )
}

export default EntryDisplay;