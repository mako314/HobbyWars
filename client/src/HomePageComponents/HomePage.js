import React from 'react';

//-------------------HomePage Component Props-------------------------
import HomePageGallery from './HomePageGallery';
import WarSteps from './WarSteps';

function HomePage({}) {

    //Basic home page stuff, it is called inside of app.js

    return (
        <div>
            {/* <HomePageGallery/>
            <section className="text-gray-400 bg-gray-900 body-font">
            <div className="container px-5 py-24 mx-auto flex flex-col">
                <div className="lg:w-4/6 mx-auto">
                <div className="rounded-lg h-64 overflow-hidden">
                    <img alt="content" className="object-cover object-center h-full w-full" src="https://i.imgur.com/dtGpn8v.png"/>
                </div>
                </div>
            </div>
        </section> */}
  <br></br>
<div class="bg-white pb-6 sm:pb-8 lg:pb-12">
  <div class="mx-auto max-w-screen-2xl px-4 md:px-8">


    <section class="min-h-96 relative flex flex-1 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-gray-100 py-16 shadow-lg md:py-20 xl:py-48">
      <img src="https://i.imgur.com/dtGpn8v.png" loading="lazy" alt="Hobby war logo" class="absolute inset-0 h-full w-full object-cover object-center" />

 
      <div class="absolute inset-0"></div>  
      {/* bg-indigo-500 mix-blend-multiply THIS MAKES IT PURPLE */}


      <div class="relative flex flex-col items-center p-4 sm:max-w-xl">
        <p class="mb-4 text-center text-lg text-indigo-200 sm:text-xl md:mb-8">WELCOME TO THE BATTLE GROUNDS</p>
        <h1 class="mb-8 text-center text-4xl font-bold text-white sm:text-5xl md:mb-12 md:text-6xl">HOBBY WARS</h1>

        <div class="flex w-full flex-col gap-2.5 sm:flex-row sm:justify-center">
            
            {/* NEED TO MAKE THIS A BUTTON TO SEE WARS */}
          <a href="#" class="inline-block rounded-lg bg-indigo-500 px-8 py-3 text-center text-sm font-semibold text-white outline-none ring-indigo-300 transition duration-100 hover:bg-indigo-600 focus-visible:ring active:bg-indigo-700 md:text-base">WARS</a>
            {/* NEED TO MAKE THIS A BUTTON TO GO TO LOGIN PAGE */}
          <a href="#" class="inline-block rounded-lg bg-gray-200 px-8 py-3 text-center text-sm font-semibold text-gray-500 outline-none ring-indigo-300 transition duration-100 hover:bg-gray-300 focus-visible:ring active:text-gray-700 md:text-base">LOGIN</a>
        </div>
      </div>
    </section>
    <br></br>
    <WarSteps/>
  </div>
</div>

        

        

    </div>
    )
}

export default HomePage