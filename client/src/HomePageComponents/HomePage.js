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
<div className="bg-white pb-6 sm:pb-8 lg:pb-12">
  <div className="mx-auto max-w-screen-2xl px-4 md:px-8">


    <section className="min-h-96 relative flex flex-1 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-gray-100 py-16 shadow-lg md:py-20 xl:py-48">
      <img src="https://i.imgur.com/EtpAdUF.png" loading="lazy" alt="Hobby war logo" className="absolute inset-0 h-full w-full object-cover object-center" />

 
      <div className="absolute inset-0"></div>  
      {/* bg-indigo-500 mix-blend-multiply THIS MAKES IT PURPLE */}


      <div className="relative flex flex-col items-center p-4 sm:max-w-xl">
        <p className="mb-4 text-center text-lg text-white sm:text-xl md:mb-8">WELCOME TO THE BATTLE GROUNDS</p>
        <h1 className="mb-8 text-center text-4xl font-bold text-white sm:text-5xl md:mb-12 md:text-6xl">HOBBY WARS</h1>

        <div className="flex w-full flex-col gap-2.5 sm:flex-row sm:justify-center">
            
            {/* NEED TO MAKE THIS A BUTTON TO SEE WARS */}
          <a href="#" className="inline-block rounded-lg bg-indigo-500 px-8 py-3 text-center text-sm font-semibold text-white outline-none ring-indigo-300 transition duration-100 hover:bg-indigo-600 focus-visible:ring active:bg-indigo-700 md:text-base">WARS</a>
            {/* NEED TO MAKE THIS A BUTTON TO GO TO LOGIN PAGE */}
          <a href="#" className="inline-block rounded-lg bg-gray-200 px-8 py-3 text-center text-sm font-semibold text-gray-500 outline-none ring-indigo-300 transition duration-100 hover:bg-gray-300 focus-visible:ring active:text-gray-700 md:text-base">LOGIN</a>
        </div>
      </div>
    </section>
    <br></br>
    <section className="text-gray-600 body-font">
    <div className="container px-5 py-24 mx-auto">
        <div className="flex flex-col text-center w-full mb-20">
            <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">Exploring Hobby Wars</h1>
            <p className="lg:w-2/3 mx-auto leading-relaxed text-base">Embark on a journey into the heart of Hobby Wars' influence on our dynamic community. Traverse the realms of accomplishment, unity, and innovative achievements that mark our path.</p>
        </div>
        <div className="flex flex-wrap -m-4 text-center">
            <div className="p-4 md:w-1/4 sm:w-1/2 w-full">
                <div className="border-2 border-gray-200 px-4 py-6 rounded-lg">
                    <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="text-indigo-500 w-12 h-12 mb-3 inline-block" viewBox="0 0 24 24">
                        <path d="M8 17l4 4 4-4m-4-5v9"></path>
                        <path d="M20.88 18.09A5 5 0 0018 9h-1.26A8 8 0 103 16.29"></path>
                    </svg>
                    <h2 className="title-font font-medium text-3xl text-gray-900">3.5K</h2>
                    <p className="leading-relaxed">Entries</p>
                </div>
            </div>
            <div className="p-4 md:w-1/4 sm:w-1/2 w-full">
                <div className="border-2 border-gray-200 px-4 py-6 rounded-lg">
                    <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="text-indigo-500 w-12 h-12 mb-3 inline-block" viewBox="0 0 24 24">
                        <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"></path>
                        <circle cx="9" cy="7" r="4"></circle>
                        <path d="M23 21v-2a4 4 0 00-3-3.87m-4-12a4 4 0 010 7.75"></path>
                    </svg>
                    <h2 className="title-font font-medium text-3xl text-gray-900">2.1K</h2>
                    <p className="leading-relaxed">Results</p>
                </div>
            </div>
            <div className="p-4 md:w-1/4 sm:w-1/2 w-full">
                <div className="border-2 border-gray-200 px-4 py-6 rounded-lg">
                    <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="text-indigo-500 w-12 h-12 mb-3 inline-block" viewBox="0 0 24 24">
                        <path d="M3 18v-6a9 9 0 0118 0v6"></path>
                        <path d="M21 19a2 2 0 01-2 2h-1a2 2 0 01-2-2v-3a2 2 0 012-2h3zM3 19a2 2 0 002 2h1a2 2 0 002-2v-3a2 2 0 00-2-2H3z"></path>
                    </svg>
                    <h2 className="title-font font-medium text-3xl text-gray-900">132</h2>
                    <p className="leading-relaxed">Competitions</p>
                </div>
            </div>
            <div className="p-4 md:w-1/4 sm:w-1/2 w-full">
                <div className="border-2 border-gray-200 px-4 py-6 rounded-lg">
                    <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="text-indigo-500 w-12 h-12 mb-3 inline-block" viewBox="0 0 24 24">
                        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                    </svg>
                    <h2 className="title-font font-medium text-3xl text-gray-900">98</h2>
                    <p className="leading-relaxed">Places</p>
                </div>
            </div>
        </div>
    </div>
</section>

    <WarSteps/>
  </div>
</div>

        

        

    </div>
    )
}

export default HomePage