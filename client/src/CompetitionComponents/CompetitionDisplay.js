import React from 'react'
import { useEffect, useState } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'


function CompetitionDisplay({user, setCompetitions, competitions, grabCompId, compID}){

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
        registration_schedule
    } = competition 


    //call this before trying to use it in the useEffect. You get this data from the navigate inside of competitionCard
    const {id} = useParams()

    //use Params take the navigation portion and inputs that as string interpolation into our route. Taking us to that competitions page. This then grabs that pages data and properly displays it.
    useEffect(() => {
        fetch(`/competition/${id}`)
          .then((resp) => resp.json())
          .then((data) => {
            setCompetition(data)
            grabCompId(id)
          })
      }, [])

      console.log(compID)


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
        console.log(competition)
        fetch(`/competition/${competition.id}`, {
          method: "DELETE"
        })
          .then(() => {
            competitionDelete(competition)
            navigate('/competitions')
          })
      }
    
    const deleteBtn = (
    <div>
        <button onClick={handleToggle}> Delete my competition </button>
    </div>
    )

    const confirmDelete = (
        <div>
        <button onClick={() => handleCompetitionDelete(competition)}> Yes DELETE my competition.</button>
        <div></div>
        <button onClick={handleToggle}> No it was a mistake</button>
        </div>
    )

    const entryButton = (
        <div>
            <Link to='/submit-entry'>
            <button>
                Submit an Entry
            </button>
            </Link>
        </div>
    )

    function handleToggle() {
        setToggleDelete(!toggleDelete)
    }
 

    //This allows the USER to confirm if they are the correct user,
    const userConfirm = (toggleDelete ? deleteBtn : confirmDelete)
    
    //-----------------------------------------------------------------------------------

    // (TYLER) May want to put this stuff ABOVE the prop deconstruction, but when state is set it reloads the thing anyway
    // need to find a way to render this USER id stuff if only the user is logged in.
    let loggedInDisplay
    //SCOPE SCOPE SCOPE SCOPE SCOPE SCOPE SCOPE SCOPE SCOPE SCOPE SCOPE SCOPE SCOPE SCOPE SCOPE SCOPE SCOPE SCOPE SCOPE SCOPE 
    // not in use effect so the global scoping works here
    if(user) {loggedInDisplay=(
        <div>
            <p>{title}</p>
            <p>{objective}</p>
            <p>{description}</p>
            <p>{scoring}</p>
            <p>{cost_of_entry}</p>
            <p>{schedule}</p>
            <p>{contact}</p>
            <p>{location}</p>
            <p>{requirements}</p>
            <p>{competition_tasks}</p>
            <p>{safety_measures}</p>
            <p>{prize1}</p>
            <p>{prize2}</p>
            <p>{prize3}</p>
            <p>{prize4}</p>
            <p>{prize5}</p>
            <p>{prize6}</p>
            <p>{prize7}</p>
            <p>{prize8}</p>
            <p>{registration_schedule}</p>

            <div>-------------------------</div>
            <Link to='/competitions'>
            <button> BACK BUTTON</button>
            </Link>
            <div></div>
            {user.id === user_id ? userConfirm : entryButton} 
            {/* double ternary, checks if user.id matches the id of the competition user_id, then allows them to delete the button with userConfirm */}
        </div>
    )}
    const loggedOutDisplay=(
        <div>
            <p>{title}</p>
            <p>{objective}</p>
            <p>{description}</p>
            <p>{scoring}</p>
            <p>{cost_of_entry}</p>
            <p>{schedule}</p>
            <p>{contact}</p>
            <p>{location}</p>
            <p>{requirements}</p>
            <p>{competition_tasks}</p>
            <p>{safety_measures}</p>
            <p>{prize1}</p>
            <p>{prize2}</p>
            <p>{prize3}</p>
            <p>{prize4}</p>
            <p>{prize5}</p>
            <p>{prize6}</p>
            <p>{prize7}</p>
            <p>{prize8}</p>
            <p>{registration_schedule}</p>
        </div>
    )

    return(
        <>
        {user ? loggedInDisplay : loggedOutDisplay}
        {/* so many freaking ternaries */}
        </>
        
    )
}

export default CompetitionDisplay;