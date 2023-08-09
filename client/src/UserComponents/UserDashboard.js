import React from 'react';
import { useEffect, useState } from 'react'
import { Link ,useParams, useNavigate } from 'react-router-dom'

function UserDashboard({user, setNewUsers, newUsers, setUser, setEntryID, setUserHobbyID, setEntries, setEditFromSubmissions, setViewedFromUser}) { //newUsers Don't think I'll need this prop

    //This is used for getting to the edit form portion
    const navigate = useNavigate();

    //This user being passed in as a prop is the state of our logged in user like we have done prior. 
    //The newUsers comment is way in App.js to fetch ALL users and POST a new USER.

    //State to hold the selected fetched user
    const [selectedUser, setSelectedUser] = useState([])

    //State to USER confirm deletion (makes a button appear?)
    const [toggleDelete, setToggleDelete] = useState(true)

    const [toggleEntryDelete, setToggleEntryDelete] = useState(true)

    //State to keep track of the users mapped entries:
    const [mappedEntries, setMappedEntries] = useState([]);

    //State to track and display a usersHobbies
    const [mappedUserHobbies, setMappedUserHobbies] = useState([])

    //Setting entry to delete?
    const [entryToDelete, setEntryToDelete] = useState([])

    //State for setting user results for their entries:
    const [usersResults, setUserResults] = useState([])

    //State for setting user result placements for their entries:
    const [userPlacements, setUserPlacements] = useState([])
   

   
    // I think I remember why I had this, because if you click the header, i wanted it to carry the uSER.ID but it definitely already does, I could potentially take out my use state for selected user and such
    const {id} = useParams()

    //use Params take the navigation portion and inputs that as string interpolation into our route. Taking us to that competitions page. This then grabs that pages data and properly displays it.
    useEffect(() => {
        fetch(`/user/${id}`)
          .then((resp) => resp.json())
          .then((data) => {
            setSelectedUser(data)
          })
      }, [])

    //Destructure for props
    const {
        firstName, 
        lastName, 
        username, 
        password, 
        age, 
        bio, 
        location, 
        phone, 
        email, 
        profileImg, 
        bannerImg,
        competitions,
        entry, // Fix in the backend 
        user_hobby,
    } = selectedUser;


    // console.log(results)
    // console.log(user_hobby)
    // console.log(selectedUser)
    // console.log(competitions)
    // console.log(entry)

    // if (entry){
    // let resultsEntry = entry?.map((entryResult)=>{
    //     let testResults = entryResult.results?.map((singleResult) =>{
    //         console.log(singleResult.placement)
    //     })
    // })
    // }

//--------------------------------------------------------Hosted Competitions-----------------------------------
    //Display the competitions the user hosts on their dashboard
    const mappedCompetitions = competitions?.map((competition) => {
        return <>
        <div onClick={() => navigateToCompetition(competition.id)}>{competition.title}</div>
        </>
    })
    
    // Now that entry has the competition information allowed, I can probably just pull that entry.competition.id
    // and also navigate to it
    //click and navigate to the competition display page
    function navigateToCompetition(id) {
        console.log(user.id)
        navigate(`/competition/${id}`)
    }

//--------------------------------------------------------------------------------------------------------
//---------------------------------------------User Hobby Info ./ Button to edit it-----------------------------------------------

//Had to put this mapping of user hobbies inside of a useEffect that only fires off when the data is made available in user_hobby (destructured prop), always need a ? in map now

//Navigate to the edit user hobby page, and then set the ID to be used to fetch data there
function navUserHobby(id) {
    navigate(`/edit/userhobby/${id}`)
    setUserHobbyID(id)
}

//Map over a users hobbies and display them all
useEffect(()=>{
    setMappedUserHobbies(
        user_hobby?.map((userHobby) =>{
            return(
            <div>
                {/* {console.log(userHobby)} */}
                <p>
                    Hobby: {userHobby.hobby.type_of_hobby}
                </p>
                <p>
                    Level: {userHobby.expertise}
                </p>

                <button onClick={() => navUserHobby(userHobby.id)}> Edit this hobby</button>

            </div>

            )
        })
    )

},[user_hobby])

//setUserHobbyID Need this in a navigation button


//--------------------------------Submission / Entry information / code----------------------------------
    //Button to navigate to submission edit // also sets setEditFromSubmissions to false, meaning I came from the userDash
    function navSubmissionEdit(id) {
        setEntryID(id)
        setEditFromSubmissions(false)
        navigate(`/edit-entry/${id}`)
    }

    //Display users entries

    //SCOPE SCOPE SCOPE SCOPESCOPE SCOPE SCOPE SCOPESCOPE SCOPE SCOPE SCOPESCOPE SCOPE SCOPE SCOPESCOPE SCOPE SCOPE SCOPESCOPE SCOPE SCOPE SCOPE
    
    //navigate to entry display page for that entry going to have to do some working, maybe put it in a useEffect
    function viewSubmission(id) {
        setEntryID(id)
        setViewedFromUser(true)
        navigate(`/entry/${id}`)
        console.log(id)
        // setEntryID(id)
    }

    //This portion handles displaying a users entry on their dashboard
    // use effect to map over users entries, since it's in useEffect I needed a state to hold the data that gets put out 
    useEffect(() => {
        if (entry){
            setMappedEntries(
                entry?.map((oneEntry) => {
                return (
                <div>
                    {/* {console.log(oneEntry.user_id)} */}
                    <br></br>
                    <button onClick={() => navigateToCompetition(oneEntry.competitions.id)}> Competition: {oneEntry.competitions.title} </button>
                    {/* maybe something like "clicked from dash state?" 
                    it would be nice if after hitting this button and hitting back it takes them back to user dashboard */}
                    <br></br>
                    <br></br>
                    <p>Submission: {oneEntry.submission}</p>
                    <br></br>
                    <br></br>
                    <p>Description: {oneEntry.description}</p>
                    <br></br>
                    <br></br>
                    <button onClick={() => navSubmissionEdit(oneEntry.id)}> Edit this Entry</button>
                    <br></br>

                    {toggleEntryDelete ? entryDeleteBtn : 
                    <div>
                        <button onClick={() => handleEntryDelete(oneEntry)}> Yes DELETE my ENTRY.</button>
                        <br></br>
                        <button onClick={handleEntryToggle}> No it was a mistake</button>
                        {/* seems I had to move this stuff to inside of the ternary instead? */}
                    </div>
                    }
                    <br></br>
                    <button onClick={() => viewSubmission(oneEntry.id)}> View Submission</button>
                </div>)
                })
            )
        }
      }, [entry, toggleEntryDelete])

    //Why on earth did ^ this fix it lol, it allowed 
    

    //delete entry filter to make sure the ID no longer exists
    const deleteEntry = (entryToDelete) => {
        setEntries(entries =>
          entries.filter(entry => entry.id !== entryToDelete.id))
      }
    
    //Actual DELETE request to the backend.
    const handleEntryDelete = (entryToDelete) => {
        fetch(`/entry/${entryToDelete.id}`, {
          method: "DELETE"
        })
          .then(() => {
            console.log(entryToDelete)
            console.log(entryToDelete.user_id)
            deleteEntry(entryToDelete.id)
            // navigate(`/user-dashboard/${entryToDelete.user_id}`)
            // Page still doesn't refresh
          })
      }

    // Button toggle to confirm that the user is wanting to delete their entry  just a basic toggle. 
    function handleEntryToggle() {
        setToggleEntryDelete(!toggleEntryDelete)
    }

    // console.log(toggleEntryDelete)


    //This button allows you to toggle and see confirm deletion of the entry
    const entryDeleteBtn = (
        <button onClick={handleEntryToggle}> Delete my entry </button>
    )
    
    
    //confirm entry deletion button refuses to display
    // const confirmEntryDelete = (
    //     <div>
    //     <button onClick={() => handleEntryDelete(entryToDelete)}> Yes DELETE my ENTRY.</button>
    //     <br></br>
    //     <button onClick={handleEntryToggle}> No it was a mistake</button>
    //     </div>)

//--------------------------------------------------------------------------------------------------------
//-----------------------------------------------USER RESULTS / DOUBLE BUTTON-------------------------------------------------


// I think I just need help wit this part tbh




// Need help getting my results to properly display in this persons results


    // if (entry){
    // let resultsEntry = entry?.map((entryResult)=>{
    //     let testResults = entryResult.results?.map((singleResult) =>{
    //         console.log(singleResult.placement)
    //     })
    // })
    // }


let placement
//==================== SOS
useEffect(() => {
    if (entry){
        setUserResults(entry?.map((entryResult)=>{
            // if (entryResult){
            //     entryResult.results?.map((resultP) =>{
            //         console.log(resultP)
            //     })
            //     console.log(userPlacements)
            // }
            return(  
            <div>
                {/* {console.log(entryResult.results)} */}
                <p>COMPETITION: {entryResult.competitions.title} </p>
                <p>Submission: {entryResult.submission}</p>
                <p>Placement: {entryResult.results?.map((resultP) =>{
                    return(resultP.placement)
                })}</p>
            </div>)
        }))
}
  }, [entry])



//   console.log(usersResults)



// const mappedUserResults = selectedUser?.map((selectedUserResult) => {
    
//     console.log(results)
    
//     return (
    // <div>
    //     {/* {console.log(entryResult.results)} */}
    //     <p>COMPETITION: {selectedUserResult.entry.competitions.title} </p>
    //     <p>Submission: {selectedUserResult.entry.submission}</p>
    //     <p> Placement: {selectedUserResult.entry.results.placement}</p>
    // </div>)
    
// })

// console.log(mappedUserResults)

//--------------------------------------------------------------------------------------------------------

//-----------------------------------------------USER DELETE PORTION / DOUBLE CONFIRM BUTTON-------------------------------------------------



    //Time to make a delete for the user, will e a 2 point confirmation. We'll start with a button that is toggled
    //This goes in and resets our user data, basically checking all users id to not match up with the user ID that is deleted, meaning it's gone.
    const userDelete = (userToDelete) => {
        setNewUsers(newUsers =>
          newUsers.filter(users => users.id !== userToDelete.id))
      }
    
    //This SHOULD LOG OUT the user after deletion. Could this go inside of the delete itself?
    function handleLogout() {
        fetch("/logout", {
            method: "DELETE"
        }).then(setUser(null))
    }

    //Actual DELETE request to the backend.
    const handleUserDelete = (user) => {
        console.log(user)
        fetch(`/user/${user.id}`, {
          method: "DELETE"
        })
          .then(() => {
            userDelete(user)
            handleLogout() // By calling log out here, after the account is deleted, the user is then logged out.
            navigate('/')
          })
      }

    // Button toggle to confirm that the user is wanting to delete their account. 
    function handleToggle() {
        setToggleDelete(!toggleDelete)
    }


    //This button allows you to confirm deletion
    const deleteBtn = (
        <button onClick={handleToggle}> Delete my account </button>
    )
    
    //maybe confirmation modal after?
    const confirmDelete = (
        <div>
        <button onClick={() => handleUserDelete(user)}> Yes DELETE my account.</button>
        <div></div>
        <button onClick={handleToggle}> No it was a mistake</button>
        </div>
    )

//--------------------------------------------------------------------------------------------------------

    //---------------------------------------LOGIN CONDITIONALS----------------------------------------------------
    
    //To handle going to the edit page 
    function handleEdit(e) {
        console.log(user.id)
        navigate(`/user-edit/${user.id}`)
    }
    let loggedInDisplay
    // loggedInDisplay=(
    //     <div>
    //         <p>{firstName}</p>
    //         <p>{lastName}</p>
    //         <p>{username}</p>
    //         <p>{password}</p>
    //         <p>{age}</p>
    //         <p>{bio}</p>
    //         <p>{location}</p>
    //         <p>{phone}</p>
    //         <p>{email}</p>
    //         <p>{profileImg}</p>
    //         <p>{bannerImg}</p>

    //         <br></br>
    //         <p>---------------------------------Competitions You Currently Host------------------------</p>
            
    //         <div> {mappedCompetitions} </div>

    //         <br></br>

    //         <p>---------------------------------Entries------------------------</p>

    //         <div>{mappedEntries}</div>
            
    //         <br></br>

    //         <p>---------------------------------Results------------------------</p>

    //         <div>{usersResults}</div>
            
    //         <br></br>

    //         <p>---------------------------------Users Hobbies------------------------</p>

    //         <div>{mappedUserHobbies}</div>
            


    //         <div>-------------buttons!---------------</div>
    //         <Link to='/user-hobby-selection'>
    //         <button> Add more hobbies!</button>
    //         </Link>
    //         <div></div>
    //         <button className="" onClick={handleEdit} > Edit my information. </button>
    //         <div></div>
    //         {toggleDelete ? deleteBtn : confirmDelete}

    //     </div>
    // )

    
    loggedInDisplay = (
        <>
        <section className="relative block" style={{ height: "500px" }}>
          <div
            className="absolute top-0 w-full h-full bg-center bg-cover"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1499336315816-097655dcfbda?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2710&q=80')"
            }}
          >
            <span
              id="blackOverlay"
              className="w-full h-full absolute opacity-50 bg-black"
            ></span>
          </div>
          <div
            className="top-auto bottom-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden"
            style={{ height: "70px" }}
          >
            <svg
              className="absolute bottom-0 overflow-hidden"
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="none"
              version="1.1"
              viewBox="0 0 2560 100"
              x="0"
              y="0"
            >
              <polygon
                className="text-gray-300 fill-current"
                points="2560 0 2560 100 0 100"
              ></polygon>
            </svg>
          </div>
        </section>
        <section className="relative py-16 bg-gray-300">
          <div className="container mx-auto px-4">
            <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg -mt-64">
              <div className="px-6">
                <div className="flex flex-wrap justify-center">
                  <div className="w-full lg:w-3/12 px-4 lg:order-2 flex justify-center">
                    <div className="relative">
                      <img
                        alt="..."
                        src='https://avatarfiles.alphacoders.com/107/thumb-107309.png'
                        className="shadow-xl rounded-full h-auto align-middle border-none absolute -m-16 -ml-20 lg:-ml-16"
                        style={{ maxWidth: "150px" }}
                      />
                    </div>
                  </div>
                  <div className="w-full lg:w-4/12 px-4 lg:order-3 lg:text-right lg:self-center">
                    <div className="py-6 px-3 mt-32 sm:mt-0">
                      <button
                        className="bg-pink-500 active:bg-pink-600 uppercase text-white font-bold hover:shadow-md shadow text-xs px-4 py-2 rounded outline-none focus:outline-none sm:mr-2 mb-1"
                        type="button"
                        style={{ transition: "all .15s ease" }}
                      >
                        Connect
                      </button>
                    </div>
                  </div>
                  <div className="w-full lg:w-4/12 px-4 lg:order-1">
                    <div className="flex justify-center py-4 lg:pt-4 pt-8">
                      <div className="mr-4 p-3 text-center">
                        <span className="text-xl font-bold block uppercase tracking-wide text-gray-700">
                          22
                        </span>
                        <span className="text-sm text-gray-500">Friends</span>
                      </div>
                      <div className="mr-4 p-3 text-center">
                        <span className="text-xl font-bold block uppercase tracking-wide text-gray-700">
                          10
                        </span>
                        <span className="text-sm text-gray-500">Photos</span>
                      </div>
                      <div className="lg:mr-4 p-3 text-center">
                        <span className="text-xl font-bold block uppercase tracking-wide text-gray-700">
                          89
                        </span>
                        <span className="text-sm text-gray-500">Comments</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="text-center mt-12">
                  <h3 className="text-4xl font-semibold leading-normal mb-2 text-gray-800 mb-2">
                  {firstName} {lastName}
                  </h3>
                  <div className="text-sm leading-normal mt-0 mb-2 text-gray-500 font-bold uppercase">
                    <i className="fas fa-map-marker-alt mr-2 text-lg text-gray-500"></i>{" "}
                    {location}
                  </div>
                  <div className="mb-2 text-gray-700 mt-10">
                    <i className="fas fa-briefcase mr-2 text-lg text-gray-500"></i>
                    {email}
                  </div>
                  <div className="mb-2 text-gray-700">
                    <i className="fas fa-university mr-2 text-lg text-gray-500"></i>
                    {phone}
                  </div>
                </div>
                <div className="mt-10 py-10 border-t border-gray-300 text-center">
                  <div className="flex flex-wrap justify-center">
                    <div className="w-full lg:w-9/12 px-4">
                      <p className="mb-4 text-lg leading-relaxed text-gray-800">
                      {bio}
                      </p>
                      <a
                        href="#pablo"
                        className="font-normal text-pink-500"
                        onClick={e => e.preventDefault()}
                      >
                        Show more
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        </>
        
    )




    const loggedOutDisplay=(
        <div>
            <p> Sorry, but you must be logged in to view this page.</p>
            {/* Maybe a button here that takes them to login? */}
            {/* Or I could incorporate the functionality here and also allow for them to login here? */}
            <Link to='/login'>
            <button> Login </button>
            </Link>
        </div>
    )

    return (
        <div>
        {user ? loggedInDisplay : loggedOutDisplay }
        </div>
        // {loggedInDisplay}

       

    )
}

export default UserDashboard

// loggedInDisplay

{/* <>
<section className="relative block" style={{ height: "500px" }}>
  <div
    className="absolute top-0 w-full h-full bg-center bg-cover"
    style={{
      backgroundImage:
        "url('https://images.unsplash.com/photo-1499336315816-097655dcfbda?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2710&q=80')"
    }}
  >
    <span
      id="blackOverlay"
      className="w-full h-full absolute opacity-50 bg-black"
    ></span>
  </div>
  <div
    className="top-auto bottom-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden"
    style={{ height: "70px" }}
  >
    <svg
      className="absolute bottom-0 overflow-hidden"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="none"
      version="1.1"
      viewBox="0 0 2560 100"
      x="0"
      y="0"
    >
      <polygon
        className="text-gray-300 fill-current"
        points="2560 0 2560 100 0 100"
      ></polygon>
    </svg>
  </div>
</section>
<section className="relative py-16 bg-gray-300">
  <div className="container mx-auto px-4">
    <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg -mt-64">
      <div className="px-6">
        <div className="flex flex-wrap justify-center">
          <div className="w-full lg:w-3/12 px-4 lg:order-2 flex justify-center">
            <div className="relative">
              <img
                alt="..."
                src='https://avatarfiles.alphacoders.com/107/thumb-107309.png'
                className="shadow-xl rounded-full h-auto align-middle border-none absolute -m-16 -ml-20 lg:-ml-16"
                style={{ maxWidth: "150px" }}
              />
            </div>
          </div>
          <div className="w-full lg:w-4/12 px-4 lg:order-3 lg:text-right lg:self-center">
            <div className="py-6 px-3 mt-32 sm:mt-0">
              <button
                className="bg-pink-500 active:bg-pink-600 uppercase text-white font-bold hover:shadow-md shadow text-xs px-4 py-2 rounded outline-none focus:outline-none sm:mr-2 mb-1"
                type="button"
                style={{ transition: "all .15s ease" }}
              >
                Connect
              </button>
            </div>
          </div>
          <div className="w-full lg:w-4/12 px-4 lg:order-1">
            <div className="flex justify-center py-4 lg:pt-4 pt-8">
              <div className="mr-4 p-3 text-center">
                <span className="text-xl font-bold block uppercase tracking-wide text-gray-700">
                  22
                </span>
                <span className="text-sm text-gray-500">Friends</span>
              </div>
              <div className="mr-4 p-3 text-center">
                <span className="text-xl font-bold block uppercase tracking-wide text-gray-700">
                  10
                </span>
                <span className="text-sm text-gray-500">Photos</span>
              </div>
              <div className="lg:mr-4 p-3 text-center">
                <span className="text-xl font-bold block uppercase tracking-wide text-gray-700">
                  89
                </span>
                <span className="text-sm text-gray-500">Comments</span>
              </div>
            </div>
          </div>
        </div>
        <div className="text-center mt-12">
          <h3 className="text-4xl font-semibold leading-normal mb-2 text-gray-800 mb-2">
            Jenna Stones
          </h3>
          <div className="text-sm leading-normal mt-0 mb-2 text-gray-500 font-bold uppercase">
            <i className="fas fa-map-marker-alt mr-2 text-lg text-gray-500"></i>{" "}
            Los Angeles, California
          </div>
          <div className="mb-2 text-gray-700 mt-10">
            <i className="fas fa-briefcase mr-2 text-lg text-gray-500"></i>
            Solution Manager - Creative Tim Officer
          </div>
          <div className="mb-2 text-gray-700">
            <i className="fas fa-university mr-2 text-lg text-gray-500"></i>
            University of Computer Science
          </div>
        </div>
        <div className="mt-10 py-10 border-t border-gray-300 text-center">
          <div className="flex flex-wrap justify-center">
            <div className="w-full lg:w-9/12 px-4">
              <p className="mb-4 text-lg leading-relaxed text-gray-800">
                An artist of considerable range, Jenna the name taken by
                Melbourne-raised, Brooklyn-based Nick Murphy writes,
                performs and records all of his own music, giving it a
                warm, intimate feel with a solid groove structure. An
                artist of considerable range.
              </p>
              <a
                href="#pablo"
                className="font-normal text-pink-500"
                onClick={e => e.preventDefault()}
              >
                Show more
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section> 

</>*/}
