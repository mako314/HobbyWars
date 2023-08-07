import React from "react";

//------IMPORT CARDS TO MAP------
import ResultCards from "./ResultCards";

function ResultCollection({results}){

    console.log(results)
    
    //Simply mapping over the competitions we fetched in APP.js and making competition cards with the data for all competitions.
    const resultCards = results.map((result) =>{
        return <ResultCards 
        key={result.id}
        competition = {result.competitions}
        placement = {result.placement}
        userResult={result.user}
        />   
    })




    return (
        <div className="grid-cols-1 sm:grid md:grid-cols-3 ">
            {resultCards}
        </div>
    )
}

export default ResultCollection;