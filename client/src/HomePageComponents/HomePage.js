import React from 'react';

//-------------------HomePage Component Props-------------------------
import HomePageGallery from './HomePageGallery';
import WarSteps from './WarSteps';

function HomePage({}) {

    //Basic home page stuff, it is called inside of app.js

    return (
        <div>
            {/* <HomePageGallery/> */}
            <section className="text-gray-400 bg-gray-900 body-font">
            <div className="container px-5 py-24 mx-auto flex flex-col">
                <div className="lg:w-4/6 mx-auto">
                <div className="rounded-lg h-64 overflow-hidden">
                    <img alt="content" className="object-cover object-center h-full w-full" src="https://i.imgur.com/dtGpn8v.png"/>
                </div>
                </div>
            </div>
        </section>

        <WarSteps/>

    </div>
    )
}

export default HomePage