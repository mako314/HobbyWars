import React from 'react';
import { useNavigate } from "react-router-dom";


function LeaderBoardCards({id,title, objective, setLeaderBoardID}){

  //Will need this bad boy later
  const navigate = useNavigate();

  //Once you click on a card it takes you to the display page of said card it is called on the whole div.
  function handleClick(e) {
    setLeaderBoardID(id)
    navigate(`/leaderboard/${id}`)
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

export default LeaderBoardCards;


<section>
  <div class="pb-4 border-b border-gray-600">
    <h3 class="text-xl font-semibold leading-6 text-gray-800">Latest Entries</h3>
  </div>

  <div class="relative mx-auto max-w-7xl">
    <div class="grid max-w-lg gap-12 mx-auto mt-12 lg:grid-cols-3 lg:max-w-none">
      <div class="flex flex-col mb-12 overflow-hidden cursor-pointer">
        <a href="/blog-post">
          <div class="flex-shrink-0">
            <img class="object-cover w-full h-48 rounded-lg" src="/assets/images/placeholders/neon-1.jpg" alt="">
          </div>
        </a>
        <div class="flex flex-col justify-between flex-1">
          <a href="/blog-post"></a>
          <div class="flex-1">
            <a href="/blog-post">
              <div class="flex pt-6 space-x-1 text-sm text-gray-500">
                <time datetime="2020-03-10"> Mar 10, 2020 </time>
                <span aria-hidden="true"> · </span>
                <span> 4 min read </span>
              </div>
            </a>
            <a href="#" class="block mt-2 space-y-6">
              <h3 class="text-2xl font-semibold leading-none tracking-tighter text-neutral-600">Typography on app.</h3>
              <p class="text-lg font-normal text-gray-500">Filling text so you can see how it looks like with text. Did I said text?</p>
            </a>
          </div>
        </div>
      </div>



      <div class="flex flex-col mb-12 overflow-hidden cursor-pointer">
        <a href="/blog-post">
          <div class="flex-shrink-0">
            <img class="object-cover w-full h-48 rounded-lg" src="/assets/images/placeholders/neon-3.jpg" alt="">
          </div>
        </a>
        <div class="flex flex-col justify-between flex-1">
          <a href="/blog-post"></a>
          <div class="flex-1">
            <a href="/blog-post">
              <div class="flex pt-6 space-x-1 text-sm text-gray-500">
                <time datetime="2020-03-10"> Mar 10, 2020 </time>
                <span aria-hidden="true"> · </span>
                <span> 4 min read </span>
              </div>
            </a>
            <a href="#" class="block mt-2 space-y-6">
              <h3 class="text-2xl font-semibold leading-none tracking-tighter text-neutral-600">Typography on app.</h3>
              <p class="text-lg font-normal text-gray-500">Filling text so you can see how it looks like with text. Did I said text?</p>
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>