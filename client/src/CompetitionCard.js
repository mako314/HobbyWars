import React from 'react':

function CompetitionCard({}){



    return(  
    <div
        class="mx-3 mt-6 flex flex-col self-start rounded-lg bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700 sm:shrink-0 sm:grow sm:basis-0">
        <a href="#!">
          <img
            class="rounded-t-lg"
            src="https://tecdn.b-cdn.net/img/new/standard/city/041.webp"
            alt="Hollywood Sign on The Hill" />
        </a>
        <div class="p-6">
          <h5
            class="mb-2 text-xl font-medium leading-tight text-neutral-800 dark:text-neutral-50">
            Card title
          </h5>
          <p class="mb-4 text-base text-neutral-600 dark:text-neutral-200">
            This is a longer card with supporting text below as a natural
            lead-in to additional content. This content is a little bit
            longer.
          </p>
        </div>
      </div>
      )
}
