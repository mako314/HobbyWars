import React from 'react';
import HomePageGallery from './HomePageGallery';
import WarSteps from './WarSteps';

function HomePage({}) {


    return (
        <div>
            {/* <HomePageGallery/> */}
            <section className="text-gray-400 bg-gray-900 body-font">
            <div className="container px-5 py-24 mx-auto flex flex-col">
                <div className="lg:w-4/6 mx-auto">
                <div className="rounded-lg h-64 overflow-hidden">
                    <img alt="content" className="object-cover object-center h-full w-full" src="/home/mako77/code/Flatiron/Projects/HobbyWars/client/public/hobby.png"/>
                </div>
                </div>
            </div>
        </section>

        <WarSteps/>

    </div>
    )
}

export default HomePage