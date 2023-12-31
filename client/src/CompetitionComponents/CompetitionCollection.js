import React from "react";

//------IMPORT CARDS TO MAP------
import CompetitionCard from "./CompetitionCard"

function CompetitionCollection({competitions, setViewedFromUser}){

    // console.log(competitions)
    
    //Simply mapping over the competitions we fetched in APP.js and making competition cards with the data for all competitions.
    const competitionCards = competitions.map((competition) =>{
        return <CompetitionCard key={competition.id} 
        id={competition.id}
        title={competition.title}
        objective={competition.objective}
        description={competition.description}
        scoring={competition.scoring}
        cost_of_entry={competition.cost_of_entry}
        schedule={competition.schedule}
        contact={competition.contact}
        location={competition.location}
        requirements={competition.requirements}
        competition_tasks={competition.competition_tasks}
        safety_measures={competition.safety_measures}
        prize1={competition.prize1}
        prize2={competition.prize2}
        prize3={competition.prize3}
        prize4={competition.prize4}
        prize5={competition.prize5}
        prize6={competition.prize6}
        prize7={competition.prize7}
        prize8={competition.prize8}
        registration_schedule={competition.registration_schedule}
        setViewedFromUser={setViewedFromUser}
        compImg={competition.compImg}/>   
    })




    return (
        <div className="grid-cols-1 sm:grid md:grid-cols-3 ">
            {competitionCards}
        </div>
    )
}

export default CompetitionCollection;