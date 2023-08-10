import React from 'react'
import { useEffect, useState } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'


function CompetitionDisplay({user, setCompetitions, competitions, setCompID, compID, viewedFromUser}){

//THIS PAGE DOES NOT LIKE TO BE REFRESEHD ???

    //Link you to another realm
    const navigate = useNavigate();

    //State to capture the competition that was clicked on,
    const [competition, setCompetition] = useState([])

    //Toggle to confirm deletion of competition
    const [toggleDelete, setToggleDelete] = useState(true)

    
    // props you'll need const {}
    const {
        user_id,
        title, 
        objective, 
        description, 
        scoring, 
        cost_of_entry, 
        schedule, 
        contact, 
        location, 
        requirements, 
        competition_tasks, 
        safety_measures, 
        prize1, 
        prize2, 
        prize3, 
        prize4, 
        prize5, 
        prize6, 
        prize7, 
        prize8, 
        registration_schedule,
        compImg
    } = competition 


    //call this before trying to use it in the useEffect. You get this data from the navigate inside of competitionCard
    const {id} = useParams()

    //use Params take the navigation portion and inputs that as string interpolation into our route. Taking us to that competitions page. This then grabs that pages data and properly displays it.
    useEffect(() => {
        fetch(`/competition/${id}`)
          .then((resp) => resp.json())
          .then((data) => {
            setCompetition(data)
            setCompID(id)
          })
      }, [])

    //   console.log(compID)


    //-----------------------------------DELETE PORTION--------------------------------
    //need a way for user to view the page if they hit logout while on a display page.
    //Breaks if a user is not signed in.
    

    //resets the competition state in a sense, basically makes sure the competition to delete does not exist in there, filtering it out
    const competitionDelete = (competitionToDelete) => {
        setCompetitions(setCompetitions =>
          setCompetitions.filter(competition => competition.id !== competitionToDelete.id))
      }
    
    
      //Handles the deletion of the competition on the back end
    const handleCompetitionDelete = (competition) => {
        // console.log(competition)
        fetch(`/competition/${competition.id}`, {
          method: "DELETE"
        })
          .then(() => {
            competitionDelete(competition)
            navigate('/competitions')
          })
      }
    

    //The first delete button that toggles into the confirm delete
    const deleteBtn = (
    <div>
        <button onClick={handleToggle}> Delete my competition </button>
    </div>
    )
    

    //Button to confirm that you'd like to delete the competition, this actually sends the delete request. Or you can go back.
    const confirmDelete = (
        <div>
        <button onClick={() => handleCompetitionDelete(competition)}> Yes DELETE my competition.</button>
        <div></div>
        <button onClick={handleToggle}> No it was a mistake</button>
        </div>
    )

    
    //This allows the USER to confirm if they are the correct user,
    const userConfirm = (toggleDelete ? deleteBtn : confirmDelete)
    
    //Tailwind user to confirm
    

    //Tailwind deleteBtn
    const twDeleteBtn = (
        <button
        className="bg-pink-500 active:bg-pink-600 uppercase text-white font-bold hover:shadow-md shadow text-xs px-4 py-2 rounded outline-none focus:outline-none sm:mr-2 mb-1"
        type="button"
        style={{ transition: "all .15s ease" }}
        onClick={handleToggle}
        >
        Delete my Competition
        </button>
    )

    //Button (TAILWIND) to confirm that you'd like to delete the competition, this actually sends the delete request. Or you can go back.
    const twConfirmDelete = (
        <>
        <button
        className="bg-pink-500 active:bg-pink-600 uppercase text-white font-bold hover:shadow-md shadow text-xs px-4 py-2 rounded outline-none focus:outline-none sm:mr-2 mb-1"
        type="button"
        style={{ transition: "all .15s ease" }}
        onClick={() => handleCompetitionDelete(competition)}
        >
        Yes DELETE my competition.
        </button>
        <br/>
        <button
        className="bg-pink-500 active:bg-pink-600 uppercase text-white font-bold hover:shadow-md shadow text-xs px-4 py-2 rounded outline-none focus:outline-none sm:mr-2 mb-1"
        type="button"
        style={{ transition: "all .15s ease" }}
        onClick={handleToggle}
        >
        No it was a Mistake.
        </button>

        </>
    )
    //This allows the USER to confirm if they are the correct user, FOR THE TAILWIND BUTTONS
    const twUserConfirm = ( toggleDelete ? twDeleteBtn : twConfirmDelete)



//-----------------------------------navigation PORTIONs--------------------------------

    //A button to take you to the submit entry page, you have to be logged in though
    const entryButton = (
        <div>
            <Link to='/submit-entry'>
            <button>
                Submit an Entry
            </button>
            </Link>
        </div>
    )
    
    //A button (TAILWIND) to take you to the submit entry page, you have to be logged in though 
    const twEntryButton = (
        <>
        <Link to='/submit-entry'>
        <button
        className="bg-pink-500 active:bg-pink-600 uppercase text-white font-bold hover:shadow-md shadow text-xs px-4 py-2 rounded outline-none focus:outline-none sm:mr-2 mb-1"
        type="button"
        style={{ transition: "all .15s ease" }}
        onClick={handleToggle}
        >
        Submit an Entry
        </button>
        </Link>
        </>

    )

    //This should take you to the submissions page for the competition, where you'll see all the entries
    function handleCompSubmissionNav(e) {
        navigate(`/competition-submissions/${id}`)
        setCompID(id)
    }

    //TAILWIND COMP SUBMISSIONS button for the above (handle comp sumbissions navigation)
    const twCompSubmissionNav = (
        <button
        className="bg-pink-500 active:bg-pink-600 uppercase text-white font-bold hover:shadow-md shadow text-xs px-4 py-2 rounded outline-none focus:outline-none sm:mr-2 mb-1"
        type="button"
        style={{ transition: "all .15s ease" }}
        onClick={() => handleCompSubmissionNav()}
        >
        View Submissions
        </button>

    )

    //Handle navigation back from the competition display page depening where u came from
    function handleBackNav() {
        if (viewedFromUser === true){
            navigate(`/user-dashboard/${user.id}`)
            } else if (viewedFromUser === false){
            navigate(`/competitions`)}
            else{
            navigate(`/competition-submissions/${id}`)
            setCompID(id)}
            
    }

    //TAILWIND back button for the above (handle back navigation)
    const twHandleBackNav = (
        <button
        className="bg-pink-500 active:bg-pink-600 uppercase text-white font-bold hover:shadow-md shadow text-xs px-4 py-2 rounded outline-none focus:outline-none sm:mr-2 mb-1"
        type="button"
        style={{ transition: "all .15s ease" }}
        onClick={() => handleBackNav()}
        >
        Back
        </button>

    )

    
    //Handles the toggling of the delete button, meaning it will let the user toggle between delete and then making sure they confirm.
    function handleToggle() {
        setToggleDelete(!toggleDelete)
    }

    //Takes you to the page to declare results
    // const navToSubmitResults = () => {
    //     navigate(`/declare-results/`)
    // }

    // let submitResultButton = <button onClick={navToSubmitResults}>Submit Results</button>



    //let you edit the competition if you're the owner of the competition
    function handleCompEdit(e) {
        navigate(`/competition/edit/${id}`)
        setCompID(id)
    }

    //actual edit button that takes you to the edit page
    const editCompetitionButton = <button onClick={() => handleCompEdit()}> Edit my Competition </button>


    const twEditCompetitionBtn = (
        <button
        className="bg-pink-500 active:bg-pink-600 uppercase text-white font-bold hover:shadow-md shadow text-xs px-4 py-2 rounded outline-none focus:outline-none sm:mr-2 mb-1"
        type="button"
        style={{ transition: "all .15s ease" }}
        onClick={() => handleCompEdit()}
        >
        Edit my Competition
        </button>

    )
    
    //--------------------------------------------LOGGED IN CONDITIONALS-------------------------

    // (TYLER) May want to put this stuff ABOVE the prop deconstruction, but when state is set it reloads the thing anyway
    // need to find a way to render this USER id stuff if only the user is logged in.
    let loggedInDisplay
    //SCOPE SCOPE SCOPE SCOPE SCOPE SCOPE SCOPE SCOPE SCOPE SCOPE SCOPE SCOPE SCOPE SCOPE SCOPE SCOPE SCOPE SCOPE SCOPE SCOPE 
    // not in use effect so the global scoping works here
    // if(user) {loggedInDisplay=(
    //     <div>
    //         <p>{title}</p>
    //         <p>{objective}</p>
    //         <p>{description}</p>
    //         <p>{scoring}</p>
    //         <p>{cost_of_entry}</p>
    //         <p>{schedule}</p>
    //         <p>{contact}</p>
    //         <p>{location}</p>
    //         <p>{requirements}</p>
    //         <p>{competition_tasks}</p>
    //         <p>{safety_measures}</p>
    //         <p>{prize1}</p>
    //         <p>{prize2}</p>
    //         <p>{prize3}</p>
    //         <p>{prize4}</p>
    //         <p>{prize5}</p>
    //         <p>{prize6}</p>
    //         <p>{prize7}</p>
    //         <p>{prize8}</p>
    //         <p>{registration_schedule}</p>

    //         <div>-------------------------</div>

    //         <button onClick={handleBackNav}> BACK BUTTON</button>


    //         <br></br>
    //         <button onClick={handleCompSubmissionNav}> VIEW SUBMISSIONS</button>

    //         <br></br>
    //         {user.id === user_id ? userConfirm : entryButton}
    //         {/* need a button to edit the competition */}

    //         {user.id === user_id ? editCompetitionButton : ""}

    //         {/* {user.id === user_id ? submitResultButton : ""} */} // < --  - - -i don think I used this tbh
            
    //         {/* double ternary, checks if user.id matches the id of the competition user_id, then allows them to delete the button with userConfirm */}
    //     </div>
    // )}
//------------------------------------------------------------------ LOGIN CONDITIONALS----------------------------------------------------

    if (user) {
        loggedInDisplay=(
            <>
                <div className="bg-white py-6 sm:py-8 lg:py-12">
                    <div className="mx-auto max-w-screen-md px-4 md:px-8">
                            <h1 className="mb-4 text-center text-2xl font-bold text-gray-800 sm:text-3xl md:mb-6">{title}</h1>

                            <blockquote className="mb-6 border-l-4 pl-4 italic text-gray-500 sm:text-lg md:mb-8 md:pl-6">{objective}</blockquote>

                            <div className="relative mb-6 overflow-hidden rounded-lg bg-gray-100 shadow-lg md:mb-8">
                            <img src={compImg} loading="lazy" alt="Photo by Minh Pham" className="h-full w-full object-cover object-center" />
                            </div>

                            <p className="mb-6 text-gray-500 sm:text-lg md:mb-8">
                                {description}                            
                            <br/><br/>

                            {/* {This is a section of some simple filler text, also known as placeholder text. It shares some characteristics of a real written text but is <a href="#" className="text-indigo-500 underline transition duration-100 hover:text-indigo-600 active:text-indigo-700">random</a> or otherwise generated. It may be used to display a sample of fonts or generate text for testing. Filler text is dummy text which has no meaning however looks very similar to real text.} */}
                            </p>

                            <h2 className="mb-2 text-xl font-semibold text-gray-800 sm:text-2xl md:mb-4">Competition Tasks</h2>

                            <p className="mb-6 text-gray-500 sm:text-lg md:mb-8">{competition_tasks}</p>

                            <ul className="mb-6 list-inside list-disc text-gray-500 sm:text-lg md:mb-8">
                            <li>Location: {location}</li>
                            <li>Contact: {contact}</li>
                            <li>{safety_measures}</li>
                            </ul>



                        <h2 className="mb-2 text-xl font-semibold text-gray-800 sm:text-2xl md:mb-4"> Scoring </h2>

                        <p className="text-gray-500 sm:text-lg"> {scoring}</p>
                        <br/>

                        <h3 className="mb-2 text-xl font-semibold text-gray-800 sm:text-2xl md:mb-4"> Prizes </h3>

                        <ol type="1" className="mb-6 list-inside list-disc text-gray-500 sm:text-lg md:mb-8" >
                            <li>{prize1}</li>
                            <li>{prize2}</li>
                            <li>{prize3}</li>
                            <li>{prize4}</li>
                            <li>{prize5}</li>
                            <li>{prize6}</li>
                            <li>{prize7}</li>
                            <li>{prize8}</li>
                        </ol>
                        {twHandleBackNav}
                        {twCompSubmissionNav}
                        {user.id === user_id ? twEditCompetitionBtn : ""}
                        {user.id === user_id ? twUserConfirm : twEntryButton}
                      
                    </div>
                </div>
            </>
        )
    }




    // const loggedOutDisplay=(
    //     <div>
    //         <p>{title}</p>
    //         <p>{objective}</p>
    //         <p>{description}</p>
    //         <p>{scoring}</p>
    //         <p>{cost_of_entry}</p>
    //         <p>{schedule}</p>
    //         <p>{contact}</p>
    //         <p>{location}</p>
    //         <p>{requirements}</p>
    //         <p>{competition_tasks}</p>
    //         <p>{safety_measures}</p>
    //         <p>{prize1}</p>
    //         <p>{prize2}</p>
    //         <p>{prize3}</p>
    //         <p>{prize4}</p>
    //         <p>{prize5}</p>
    //         <p>{prize6}</p>
    //         <p>{prize7}</p>
    //         <p>{prize8}</p>
    //         <p>{registration_schedule}</p>
    //         <br></br>
            
    //         <div>-------------------------</div>
    //         <button onClick={handleBackNav}> BACK BUTTON</button>

    //         <br></br>
    //         <button onClick={handleCompSubmissionNav}> VIEW SUBMISSIONS</button>
    //     </div>
    // )

    let loggedOutDisplay
    if (!user) {
        loggedOutDisplay=(
            <>
                <div className="bg-white py-6 sm:py-8 lg:py-12">
                    <div className="mx-auto max-w-screen-md px-4 md:px-8">
                            <h1 className="mb-4 text-center text-2xl font-bold text-gray-800 sm:text-3xl md:mb-6">{title}</h1>

                            <blockquote className="mb-6 border-l-4 pl-4 italic text-gray-500 sm:text-lg md:mb-8 md:pl-6">{objective}</blockquote>

                            <div className="relative mb-6 overflow-hidden rounded-lg bg-gray-100 shadow-lg md:mb-8">
                            <img src="https://images.unsplash.com/photo-1593508512255-86ab42a8e620?auto=format&q=75&fit=crop&w=600&h=350" loading="lazy" alt="Photo by Minh Pham" className="h-full w-full object-cover object-center" />
                            </div>

                            <p className="mb-6 text-gray-500 sm:text-lg md:mb-8">
                                {description}                            
                            <br/><br/>

                            {/* {This is a section of some simple filler text, also known as placeholder text. It shares some characteristics of a real written text but is <a href="#" className="text-indigo-500 underline transition duration-100 hover:text-indigo-600 active:text-indigo-700">random</a> or otherwise generated. It may be used to display a sample of fonts or generate text for testing. Filler text is dummy text which has no meaning however looks very similar to real text.} */}
                            </p>

                            <h2 className="mb-2 text-xl font-semibold text-gray-800 sm:text-2xl md:mb-4">Competition Tasks</h2>

                            <p className="mb-6 text-gray-500 sm:text-lg md:mb-8">{competition_tasks}</p>

                            <ul className="mb-6 list-inside list-disc text-gray-500 sm:text-lg md:mb-8">
                            <li>Location: {location}</li>
                            <li>Contact: {contact}</li>
                            <li>{safety_measures}</li>
                            </ul>



                        <h2 className="mb-2 text-xl font-semibold text-gray-800 sm:text-2xl md:mb-4"> Scoring </h2>

                        <p className="text-gray-500 sm:text-lg"> {scoring}</p>
                        <br/>

                        <h3 className="mb-2 text-xl font-semibold text-gray-800 sm:text-2xl md:mb-4"> Prizes </h3>

                        <ol type="1" className="mb-6 list-inside list-disc text-gray-500 sm:text-lg md:mb-8" >
                            <li>{prize1}</li>
                            <li>{prize2}</li>
                            <li>{prize3}</li>
                            <li>{prize4}</li>
                            <li>{prize5}</li>
                            <li>{prize6}</li>
                            <li>{prize7}</li>
                            <li>{prize8}</li>
                        </ol>
                        {twHandleBackNav}
                        {twCompSubmissionNav}
                      
                    </div>
                </div>
            </>
        )
    }


    return(
        <>
        {user ? loggedInDisplay : loggedOutDisplay}
        {/* so many freaking ternaries */}
        </>
        
    )
}

export default CompetitionDisplay;