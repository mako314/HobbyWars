import React from 'react'
import { useEffect, useState } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'

function CompetitionDisplay(){

    const navigate = useNavigate();

    const [compEntries, setCompEntries] = useState([])

    const {id} = useParams()

    useEffect(() => {
        fetch(`/competition/${id}`)
          .then((resp) => resp.json())
          .then((data) => {
            setCompEntries(data)
          })
      }, [])

    return(
        <div>

        </div>
    )
}


export default CompetitionDisplay;