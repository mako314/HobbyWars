import React from 'react'
import { useEffect, useState } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'


function EntryDisplay({user, entryID, viewedFromUser, viewFromSubmissions, setEntryID, entryCompID}){

    const navigate = useNavigate();

    const [singleEntry, setSingleEntry] = useState([])

    const [mappedEntry, setMappedEntry] = useState([])

    const [loMappedEntry, setLoMappedEntry] = useState([])

    //Use effect to grab the data when you initially load into this page
    useEffect(() => {
        fetch(`/entry/${entryID}`)
        .then((resp) => resp.json())
        .then((data) => {
            // console.log(data)
            setSingleEntry(data)
          })
      }, [entryID, viewFromSubmissions])


    //   if(entryID){}
    //   if (entryID){}

    //   console.log(viewFromSubmissions)
    //   console.log(entryID)
    //   console.log(singleEntry)

    //navigate to the submission edit page if you are the signed in user
    // function navSubmissionEdit(id) {
    // navigate(`/edit-entry/${id}`)
    // }

    //Going to make two back buttons,

    //No need to map, it's a singular object.
    // useEffect(() => {
    //     if (singleEntry && user && entryID){
            
    //         function navSubmissionEdit(id) {
    //         navigate(`/edit-entry/${id}`)
            
    //         }
    //         // I added these in to see if it'd fix anything, and alas, it did not.
    //         function returnToSubmission(id){
    //             navigate(`/competition-submissions/${id}`)
    //         }

    //         let submissionsBackBtn = <button onClick={() => returnToSubmission(singleEntry.competition_id)}> Back </button>

    //         //Return to userdashboard if the view button was clicked from the user dash
    //         function backBtn(singleEntry){
    //             if (viewedFromUser === true){
    //             navigate(`/user-dashboard/${user.id}`)
    //             }else {
    //                 navigate(`/competition-submissions/${singleEntry.id}`)
    //             }
    //         }

    //         // let userDashBackBtn = <button onClick={() => returnToUserDash(user)}> Back </button>



    //         setMappedEntry(
    //             <div>
    //                 <p>
    //                     {singleEntry.submission}
    //                 </p>

    //                 <p>
    //                     {singleEntry.description}
    //                 </p>
                    
    //                 <br></br>
                    
    //                 <button onClick={() => backBtn(user, singleEntry.competition_id)}> Back </button>                    
    //                 <br></br>

    //                 { user.id === singleEntry.user_id ? <button onClick={() => navSubmissionEdit(singleEntry.id)}> Edit this Entry</button> : ""}
    //             </div>
    //         )
    //     }
    // }, [singleEntry, entryID])



    
//------------------------------------------------------------------ LOGIN CONDITIONALS----------------------------------------------------



    useEffect(() => {
        if (singleEntry && user && entryID && singleEntry.user){
            
            function navSubmissionEdit(id) {
            setEntryID(id)
            navigate(`/edit-entry/${id}`)
            }
            // I added these in to see if it'd fix anything, and alas, it did not.
            // function returnToSubmission(id){
            //     navigate(`/competition-submissions/${id}`)
            // }

            //Return to userdashboard if the view button was clicked from the user dash
            function backBtn(singleEntry){
                if (viewedFromUser === true){
                navigate(`/user-dashboard/${user.id}`)
                } else if (viewedFromUser === false){
                    navigate(`/competition-submissions/${entryCompID}`)
                } else {
                    navigate(`/competition-submissions/${singleEntry.id}`)
                }
            }
            setMappedEntry(
                <>
                <section className="text-gray-600 body-font">
                <div className="container px-5 py-24 mx-auto flex flex-wrap">
                        <div className="flex flex-wrap -mx-4 mt-auto mb-auto lg:w-1/2 sm:w-2/3 content-start sm:pr-10">
                    <div className="w-full sm:p-4 px-4 mb-6">
                            <h1 className="title-font font-medium text-xl mb-2 text-gray-900">{singleEntry.user.username}</h1>
                                <div className="leading-relaxed">{singleEntry.description}
                                </div>

                                <button
                                className="bg-pink-500 active:bg-pink-600 uppercase text-white font-bold hover:shadow-md shadow text-xs px-4 py-2 rounded outline-none focus:outline-none sm:mr-2 mb-1"
                                type="button"
                                style={{ transition: "all .15s ease" }}
                                onClick={() => backBtn(user, singleEntry.competition_id)}
                                >
                                Back
                                </button>

                                { user.id === singleEntry.user_id ? 
                                <button
                                className="bg-pink-500 active:bg-pink-600 uppercase text-white font-bold hover:shadow-md shadow text-xs px-4 py-2 rounded outline-none focus:outline-none sm:mr-2 mb-1"
                                type="button"
                                style={{ transition: "all .15s ease" }}
                                onClick={() => navSubmissionEdit(singleEntry.id)}
                                >
                                Edit this Entry
                                </button> 
                                : ""}
                    </div>
                        </div>
                    <div className="lg:w-1/2 sm:w-1/3 w-full rounded-lg overflow-hidden mt-6 sm:mt-0">
                        <img className="object-cover object-center w-full h-full" src="https://dummyimage.com/600x300" alt="stats"/>
                    </div>
                </div>
                </section>
                </>
            )
        }
    }, [singleEntry, entryID])


    useEffect(() => {
        if(entryID && singleEntry.user && singleEntry){
    function backBtn(id){
        navigate(`/competition-submissions/${id}`)
    }
            setLoMappedEntry(
                <>
                <section className="text-gray-600 body-font">
                <div className="container px-5 py-24 mx-auto flex flex-wrap">
                        <div className="flex flex-wrap -mx-4 mt-auto mb-auto lg:w-1/2 sm:w-2/3 content-start sm:pr-10">
                    <div className="w-full sm:p-4 px-4 mb-6">
                            <h1 className="title-font font-medium text-xl mb-2 text-gray-900">{singleEntry.user.username}</h1>
                                <div className="leading-relaxed">{singleEntry.description}
                                </div>

                                <button
                                className="bg-pink-500 active:bg-pink-600 uppercase text-white font-bold hover:shadow-md shadow text-xs px-4 py-2 rounded outline-none focus:outline-none sm:mr-2 mb-1"
                                type="button"
                                style={{ transition: "all .15s ease" }}
                                onClick={() => backBtn(singleEntry.competition_id)}
                                >
                                Back
                                </button>

                                {/* { user.id === singleEntry.user_id ? 
                                <button
                                className="bg-pink-500 active:bg-pink-600 uppercase text-white font-bold hover:shadow-md shadow text-xs px-4 py-2 rounded outline-none focus:outline-none sm:mr-2 mb-1"
                                type="button"
                                style={{ transition: "all .15s ease" }}
                                onClick={() => navSubmissionEdit(singleEntry.id)}
                                >
                                Edit this Entry
                                </button> 
                                : ""} */}
                    </div>
                        </div>
                    <div className="lg:w-1/2 sm:w-1/3 w-full rounded-lg overflow-hidden mt-6 sm:mt-0">
                        <img className="object-cover object-center w-full h-full" src="https://dummyimage.com/600x300" alt="stats"/>
                    </div>
                </div>
                </section>
                </>
            )}
}, [singleEntry])

    // console.log(singleEntry)
    // if (singleEntry){}

    //Return to the submissions page
    // function returnToSubmission(id){
    //     navigate(`/competition-submissions/${id}`)
    // }


    return (
        <div>
            {user ? mappedEntry : loMappedEntry}
        </div>
    )
}

export default EntryDisplay;