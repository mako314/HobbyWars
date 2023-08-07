import React from "react";

//------IMPORT CARDS TO MAP------
import ResultCards from "./ResultCards";

function ResultCollection({results}){

    // console.log(results)

    //Changed my serialziation to allow for the userEntries... don't even ask how because jesus helped me
    
    //Simply mapping over the competitions we fetched in APP.js and making competition cards with the data for all competitions.
    const resultCards = results.map((result) =>{
        // console.log(result)
        return <ResultCards 
        key={result.id}
        competition = {result.competitions}
        placement = {result.placement}
        userEntry={result.entry}
        submission={result.entry.submission}
        />   
    })


    //would it be a better idea to take the entry user ID and fetch that data to then populate this with that users entry information?



    return (
        <div className="grid-cols-1 sm:grid md:grid-cols-3 ">
            {resultCards}
        </div>
    )
}

export default ResultCollection;