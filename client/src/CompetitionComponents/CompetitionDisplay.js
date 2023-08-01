import React from 'react'
import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'


function CompetitionDisplay(){
    const [competition, setCompetition] = useState([])
    
    // props you'll need const {}
    const { 
        title, 
        objective, 
        description, 
        scoring, 
        cost_of_entry, 
        schedule, 
        contact, 
        location, 
        requirements, 
        competition_tasks, 
        safety_measures, 
        prize1, 
        prize2, 
        prize3, 
        prize4, 
        prize5, 
        prize6, 
        prize7, 
        prize8, 
        registration_schedule
    } = competition 


    const {id} = useParams()

    useEffect(() => {
        fetch(`/competition/${id}`)
          .then((resp) => resp.json())
          .then((data) => {
            setCompetition(data)
          })
      }, [])


    return(
        <div>
            <p>{title}</p>
            <p>{objective}</p>
            <p>{description}</p>
            <p>{scoring}</p>
            <p>{cost_of_entry}</p>
            <p>{schedule}</p>
            <p>{contact}</p>
            <p>{location}</p>
            <p>{requirements}</p>
            <p>{competition_tasks}</p>
            <p>{safety_measures}</p>
            <p>{prize1}</p>
            <p>{prize2}</p>
            <p>{prize3}</p>
            <p>{prize4}</p>
            <p>{prize5}</p>
            <p>{prize6}</p>
            <p>{prize7}</p>
            <p>{prize8}</p>
            <p>{registration_schedule}</p>

        </div>
    )
}

export default CompetitionDisplay;