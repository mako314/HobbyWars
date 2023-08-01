import React from 'react';
import { useNavigate } from "react-router-dom";


function CompetitionCard({id,title, objective}){

  //Will need this bad boy later
  const navigate = useNavigate();

  function handleClick(e) {
    navigate(`/competition/${id}`)
}

    return(  
    <div
        className="mx-3 mt-6 flex flex-col self-start rounded-lg bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700 sm:shrink-0 sm:grow sm:basis-0"
        onClick={handleClick}
        >
        {/* don't know if i want this href */}
          <img
            className="rounded-t-lg"
            src="https://tecdn.b-cdn.net/img/new/standard/city/041.webp"
            alt="Hollywood Sign on The Hill" />
        <div className="p-6">
          <h5
            className="mb-2 text-xl font-medium leading-tight text-neutral-800 dark:text-neutral-50">
            {title}
          </h5>
          <p className="mb-4 text-base text-neutral-600 dark:text-neutral-200">
            {objective}
          </p>
        </div>
      </div>
      )
}

export default CompetitionCard;

// <a href="#!">
// </a>