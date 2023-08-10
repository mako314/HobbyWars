import React from 'react';
import { useNavigate } from "react-router-dom";


function LeaderBoardCards({id,title, objective, setLeaderBoardID, username, firstName, lastName, profileImg, description, competition_tasks, compImg}){

  //Will need this bad boy later
  const navigate = useNavigate();

  //Once you click on a card it takes you to the display page of said card it is called on the whole div.
  function handleClick(e) {
    setLeaderBoardID(id)
    navigate(`/leaderboard/${id}`)
}   

    return(
      <>
<section className="text-gray-600 body-font">
  <div className="container px-5 py-24 mx-auto flex flex-col">
    <div className="lg:w-4/6 mx-auto">
      <div className="rounded-lg h-64 overflow-hidden">
        <img alt={title} className="object-cover object-center h-full w-full" src={compImg}/>
      </div>
      <div className="flex flex-col sm:flex-row mt-10">
        <div className="sm:w-1/3 text-center sm:pr-8 sm:py-8">
          <div className="w-20 h-20 rounded-full inline-flex items-center justify-center bg-gray-200 text-gray-400">
          <img src={profileImg} alt="Profile" class="w-20 h-20 rounded-full" />
          </div>
          <div className="flex flex-col items-center text-center justify-center">
            <h2 className="font-medium title-font mt-4 text-gray-900 text-lg">{firstName} {lastName}</h2>
            <div className="w-12 h-1 bg-indigo-500 rounded mt-2 mb-4"></div>
            <h5
            className="mb-2 text-xl font-medium leading-tight text-neutral-800 dark:text-neutral-50">
            {title}
          </h5>
          <div className="w-12 h-1 bg-indigo-500 rounded mt-2 mb-4"></div>
            <p className="text-base">{objective}</p>
          </div>
        </div>
        <div className="sm:w-2/3 sm:pl-8 sm:py-8 sm:border-l border-gray-200 sm:border-t-0 border-t mt-4 pt-4 sm:mt-0 text-center sm:text-left">
          <p className="leading-relaxed text-lg mb-4">{competition_tasks}</p>
          <button className="bg-pink-500 active:bg-pink-600 uppercase text-white font-bold hover:shadow-md shadow text-xs px-4 py-2 rounded outline-none focus:outline-none sm:mr-2 mb-1" type="button"
           style={{ transition: "all .15s ease" }}
           onClick={handleClick}>View LeaderBoard
          </button>
        </div>
      </div>
    </div>
  </div>
</section>     
    </>

      
    )
}

export default LeaderBoardCards;