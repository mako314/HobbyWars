import React from 'react';
import { useNavigate } from "react-router-dom";


function ResultCards({competition, placement, userEntry, submission}){

  //Will need this bad boy later
  const navigate = useNavigate();

  //Once you click on a card it takes you to the display page of said card it is called on the whole div.
//   function handleClick(e) {
//     navigate(`/competition/${id}`)
// }

  console.log(userEntry)
    let prizeReward = placement

    const{
      user
    } = userEntry

    return(  
    <div
        className="mx-3 mt-6 flex flex-col self-start rounded-lg bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700 sm:shrink-0 sm:grow sm:basis-0"
        // onClick={handleClick}
        >
        
        {/* don't know if i want this href */}

        <p>Competition: {competition.title}</p>
        <p>Submission: {submission} </p>
        <p>User: {user.username}</p>
        <p>Placement: {placement}</p>
        {/* <p>Reward: {competition.prize1}</p> */}


      </div>
      )
}

export default ResultCards;