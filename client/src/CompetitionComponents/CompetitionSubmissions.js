import React from 'react'
import { useEffect, useState } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'

function CompetitionSubmissions(){

    const navigate = useNavigate();

    const [compEntries, setCompEntries] = useState([])

    const [mappedCompEntries, setMappedCompEntries] = useState([])



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
        entry
      } = compEntries
      
      console.log(entry)

    //once data is fetched, and if the data exists, map over it and display the submissions and entries
    useEffect(() =>{
        if (entry){
            setMappedCompEntries(
                entry.map((oneEntry) => {
                    return (
                        <div>
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

      }, [entry])

    //Tbh I can probably make it where a user can edit this if their ID matches the ID of the COMPETITION USER ID

    return(
        <div>
            lets see if this works!
            {mappedCompEntries}

        </div>
    )
}


export default CompetitionSubmissions;