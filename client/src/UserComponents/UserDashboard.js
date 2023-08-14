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
    // const [entryToDelete, setEntryToDelete] = useState([])

    //State for setting user results for their entries:
    const [usersResults, setUsersResults] = useState([])

    //State for setting user result placements for their entries:
    // const [userPlacements, setUserPlacements] = useState([])

   const [twMappedCompetitions, setTwMappedCompetitions] = useState([])

   //State to re-fire useEffect and update the page
   const [deleteRefresh, setDeleteRefresh] = useState(false)


   
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
    // TAILWIND MAPPED NOW WORKING TO DISPLAY AND USER WITH WORKING ABCK
    useEffect(() => {
        setTwMappedCompetitions(selectedUser.competitions?.map((competition) =>{
        if (selectedUser){
          console.log(competition)
        return(
            <>
            <section onClick={() => navigateToCompetition(competition.id)} className="">
                <div className="flex w-full">
                    <div className="relative flex flex-col items-start m-1 transition duration-300 ease-in-out delay-150 transform bg-white shadow-2xl rounded-xl md:w-80 md:-ml-16 md:hover:-translate-x-16 md:hover:-translate-y-8">
                    <img className="object-cover object-center w-full rounded-t-xl lg:h-48 md:h-36" src={competition.compImg} alt={competition.title}/>
                    <div className="px-6 py-8">
                        <h4 className="mt-4 text-2xl font-semibold text-neutral-600">
                        <span className="">{competition.title}</span>
                        </h4>
                        <p className="mt-4 text-base font-normal text-gray-500 leading-relax">{competition.description}</p>
                    </div>
                    </div>
                </div>
            </section>
            
            </>
        )}
    }))}, [selectedUser])

    
    
    // Now that entry has the competition information allowed, I can probably just pull that entry.competition.id
    // and also navigate to it
    //click and navigate to the competition display page
    function navigateToCompetition(id) {
        // console.log(user.id)
        navigate(`/competition/${id}`)
        setViewedFromUser(true)
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
// useEffect(()=>{
//     setMappedUserHobbies(
//         user_hobby?.map((userHobby) =>{
//             return(
//             <div>
//                 {/* {console.log(userHobby)} */}
//                 <p>
//                     Hobby: {userHobby.hobby.type_of_hobby}
//                 </p>
//                 <p>
//                     Level: {userHobby.expertise}
//                 </p>

//                 <button onClick={() => navUserHobby(userHobby.id)}> Edit this hobby</button>

//             </div>

//             )
//         })
//     )

// },[user_hobby])

//setUserHobbyID Need this in a navigation button


// useEffect(() => {
//   if(user_hobby){
//     setMappedUserHobbies(
//       user_hobby?.map((userHobby) =>{
//         return(
//           <>
//             <section>
//               <div className="relative items-center w-full px-5 py-12 mx-auto md:px-12 lg:px-24 max-w-7xl">
//                 <div className="grid grid-cols-1">
//                   <div className="w-full max-w-lg mx-auto my-4 bg-white shadow-xl rounded-xl">
//                     <div className="p-6 lg:text-center">
//                       <span className="mb-8 text-xs font-semibold tracking-widest text-blue-600 uppercase"> User Hobby</span>
//                       <h4 className="mt-8 text-2xl font-semibold leading-none tracking-tighter text-neutral-600 lg:text-3xl">{userHobby.hobby.type_of_hobby}</h4>
//                       <p className="mt-3 text-base leading-relaxed text-gray-500">{userHobby.hobby.description}</p>
//                       <div className="mt-3">
//                         <span className="flex items-center justify-center w-full px-4 py-2 text-base font-bold text-center text-white transition duration-500 ease-in-out transform bg-blue-600 rounded-xl hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">{userHobby.expertise}</span>
//                       </div>
//                       <br/>
//                       <button
//                         className="bg-pink-500 active:bg-pink-600 uppercase text-white font-bold hover:shadow-md shadow text-xs px-4 py-2 rounded outline-none focus:outline-none sm:mr-2 mb-1"
//                         type="button"
//                         style={{ transition: "all .15s ease" }}
//                         onClick={() => navUserHobby(userHobby.id)}
//                         >
//                         Edit this Hobby
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </section>
//           </>
//         )
//       })
//     )
//   }

// },[user_hobby])

useEffect(() => {
  if (user_hobby) {
    setMappedUserHobbies(
      user_hobby.map((userHobby) => (
        <div className="relative items-center w-full px-5 py-12 mx-auto md:px-12 lg:px-24 max-w-lg">
          <div className="w-full bg-white shadow-xl rounded-xl">
            <div className="p-6 lg:text-center">
              <span className="mb-8 text-xs font-semibold tracking-widest text-blue-600 uppercase"> User Hobby</span>
              <h4 className="mt-8 text-2xl font-semibold leading-none tracking-tighter text-neutral-600 lg:text-3xl">{userHobby.hobby.type_of_hobby}</h4>
              <p className="mt-3 text-base leading-relaxed text-gray-500">{userHobby.hobby.description}</p>
              <div className="mt-3">
                <span className="flex items-center justify-center w-full px-4 py-2 text-base font-bold text-center text-white transition duration-500 ease-in-out transform bg-blue-600 rounded-xl hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">{userHobby.expertise}</span>
              </div>
              <br/>
              <button
                className="bg-pink-500 active:bg-pink-600 uppercase text-white font-bold hover:shadow-md shadow text-xs px-4 py-2 rounded outline-none focus:outline-none sm:mr-2 mb-1"
                type="button"
                style={{ transition: "all .15s ease" }}
                onClick={() => navUserHobby(userHobby.id)}
              >
                Edit this Hobby
              </button>
            </div>
          </div>
        </div>
      ))
    );
  }
}, [user_hobby]);



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
        // console.log(id)
        // setEntryID(id)
    }

    //This portion handles displaying a users entry on their dashboard
    // use effect to map over users entries, since it's in useEffect I needed a state to hold the data that gets put out 
    // useEffect(() => {
    //     if (entry){
    //         setMappedEntries(
    //             entry?.map((oneEntry) => {
    //             return (
    //             <div>
    //                 {/* {console.log(oneEntry.user_id)} */}
    //                 <br></br>
    //                 <button onClick={() => navigateToCompetition(oneEntry.competitions.id)}> Competition: {oneEntry.competitions.title} </button>
    //                 {/* maybe something like "clicked from dash state?" 
    //                 it would be nice if after hitting this button and hitting back it takes them back to user dashboard */}
    //                 <br></br>
    //                 <br></br>
    //                 <p>Submission: {oneEntry.submission}</p>
    //                 <br></br>
    //                 <br></br>
    //                 <p>Description: {oneEntry.description}</p>
    //                 <br></br>
    //                 <br></br>
    //                 <button onClick={() => navSubmissionEdit(oneEntry.id)}> Edit this Entry</button>
    //                 <br></br>

    //                 {toggleEntryDelete ? entryDeleteBtn : 
    //                 <div>
    //                     <button onClick={() => handleEntryDelete(oneEntry)}> Yes DELETE my ENTRY.</button>
    //                     <br></br>
    //                     <button onClick={handleEntryToggle}> No it was a mistake</button>
    //                     {/* seems I had to move this stuff to inside of the ternary instead? */}
    //                 </div>
    //                 }
    //                 <br></br>
    //                 <button onClick={() => viewSubmission(oneEntry.id)}> View Submission</button>
    //             </div>)
    //             })
    //         )
    //     }
    //   }, [entry, toggleEntryDelete])


      useEffect(()=> {
        if (entry && user){
            setMappedEntries(entry?.map((oneEntry) =>{
                return(
            <div className="p-6">
            <header className="mb-4">
              <h3 className="text-xl font-medium text-slate-700">
              {oneEntry.submission}
              </h3>
              <p className="text-sm text-slate-400">By {user.username}</p>
            </header>
            <p>
            {oneEntry.description}
            </p>
            <br></br>
            {toggleEntryDelete ? twEntryDeleteBtn : 
            <>
            <button
            className="bg-pink-500 active:bg-pink-600 uppercase text-white font-bold hover:shadow-md shadow text-xs px-4 py-2 rounded outline-none focus:outline-none sm:mr-2 mb-1"
            type="button"
            style={{ transition: "all .15s ease" }}
            onClick={() => handleEntryDelete(oneEntry)}
            >
            Yes DELETE my ENTRY.
            </button>
            <br></br>
            <button
            className="bg-pink-500 active:bg-pink-600 uppercase text-white font-bold hover:shadow-md shadow text-xs px-4 py-2 rounded outline-none focus:outline-none sm:mr-2 mb-1"
            type="button"
            style={{ transition: "all .15s ease" }}
            onClick={handleEntryToggle}
            >
            No, Whoops!.
            </button>
            </>
            }

            <button
            className="bg-pink-500 active:bg-pink-600 uppercase text-white font-bold hover:shadow-md shadow text-xs px-4 py-2 rounded outline-none focus:outline-none sm:mr-2 mb-1"
            type="button"
            style={{ transition: "all .15s ease" }}
            onClick={() => viewSubmission(oneEntry.id)}
            >
            View Submission
            </button>
            </div>
        
        )}
        )
        )
        }
      }, [entry, toggleEntryDelete, user, deleteRefresh])

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
            // console.log(entryToDelete)
            // console.log(entryToDelete.user_id)
            deleteEntry(entryToDelete.id)
            // navigate(`/user-dashboard/${entryToDelete.user_id}`)
            // Page still doesn't refresh
          })
      }

    // Button toggle to confirm that the user is wanting to delete their entry  just a basic toggle. 
    function handleEntryToggle() {
        setToggleEntryDelete(!toggleEntryDelete)
        setDeleteRefresh(!deleteRefresh)
    }

    // console.log(toggleEntryDelete)


    //This button allows you to toggle and see confirm deletion of the entry
    const entryDeleteBtn = (
        <button onClick={handleEntryToggle}> Delete my entry </button>
    )
    
    //This button (TAILWIND CSS) allows you to toggle and see confirm deletion of the entry
    const twEntryDeleteBtn = (
    <button
        className="bg-pink-500 active:bg-pink-600 uppercase text-white font-bold hover:shadow-md shadow text-xs px-4 py-2 rounded outline-none focus:outline-none sm:mr-2 mb-1"
        type="button"
        style={{ transition: "all .15s ease" }}
        onClick={handleEntryToggle}
        >
        Delete my entry
    </button>)
    
    
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


// let placement
//==================== SOS
// useEffect(() => {
//     if (entry){
//         setUsersResults(entry?.map((entryResult)=>{
//             // if (entryResult){
//             //     entryResult.results?.map((resultP) =>{
//             //         console.log(resultP)
//             //     })
//             //     console.log(userPlacements)
//             // }
//             return(  
//             <div>
//                 {/* {console.log(entryResult.results)} */}
//                 <p>COMPETITION: {entryResult.competitions.title} </p>
//                 <p>Submission: {entryResult.submission}</p>
//                 <p>Placement: {entryResult.results?.map((resultP) =>{
//                     return(resultP.placement)
//                 })}</p>
//             </div>)
//         }))
// }
//   }, [entry])


  useEffect(() => {
    if (entry){
        setUsersResults(entry?.map((entryResult)=>{
        if (entryResult){
            return(
        <div className="p-6">
            <header className="mb-4">
            <h3 className="text-xl font-medium text-slate-700">
            {entryResult.competitions.title}
            </h3>
            <p className="text-lg text-slate-400"> Submission: {entryResult.submission}</p>
            </header>           
            <span className="flex items-center justify-center w-1/2 px-4 py-2 text-base font-bold text-center text-white transition duration-500 ease-in-out transform bg-blue-600 rounded-xl hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"> Placement :   
                {entryResult.results?.map((resultP) =>{
                    return(" " + resultP.placement)
                })}</span>
        </div>)
        }}))
}
  }, [entry])

  // console.log(usersResults)



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
        // console.log(user)
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

//------------------------------------------TAILWIND DELETE------------------------------------------

//TAILWIND PROMPT DELETE BUTTON
const twDeleteBtn = (
    <button
        className="bg-pink-500 active:bg-pink-600 uppercase text-white font-bold hover:shadow-md shadow text-xs px-4 py-2 rounded outline-none focus:outline-none sm:mr-2 mb-1"
        type="button"
        style={{ transition: "all .15s ease" }}
        onClick={handleToggle}
        >
        Delete MY ACCOUNT
    </button>
)

//TAILWIND confirm DELETE BUTTON
const twConfirmDelete = (
    <>
    <button
        className="bg-pink-500 active:bg-pink-600 uppercase text-white font-bold hover:shadow-md shadow text-xs px-4 py-2 rounded outline-none focus:outline-none sm:mr-2 mb-1"
        type="button"
        style={{ transition: "all .15s ease" }}
        onClick={() => handleUserDelete(user)}
        >
        CONFIRM DELETE
    </button>

    <button
        className="bg-pink-500 active:bg-pink-600 uppercase text-white font-bold hover:shadow-md shadow text-xs px-4 py-2 rounded outline-none focus:outline-none sm:mr-2 mb-1"
        type="button"
        style={{ transition: "all .15s ease" }}
        onClick={handleToggle}
        >
        Whoops, accident!
    </button>

    
    </>
)

//------------------------------------------TAILWIND ADD MORE HOBY BUTTON------------------------------------------

//TAILWIND add more HOBBIES button
const twAddMoreHobbiesBtn = (    
    <>
    <Link to='/user-hobby-selection'>
    <button
        className="bg-pink-500 active:bg-pink-600 uppercase text-white font-bold hover:shadow-md shadow text-xs px-4 py-2 rounded outline-none focus:outline-none sm:mr-2 mb-1"
        type="button"
        style={{ transition: "all .15s ease" }}
        >
        Add more Hobbies!
    </button>
    </Link>
    </>
    )
//------------------------------------------TAILWIND enty cards ------------------------------------------






//---------------------------------------LOGIN CONDITIONALS----------------------------------------------------
    
    //To handle going to the edit page 
    function handleEdit(e) {
        // console.log(user.id)
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



    //------------------------------------------------------------------ LOGIN CONDITIONALS----------------------------------------------------

    
    loggedInDisplay = (
        <>
        <section className="relative block" style={{ height: "500px" }}>
          <div
            className="absolute top-0 w-full h-full bg-center bg-cover"
            style={{
              backgroundImage:
              `url(${bannerImg})`
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
                        alt={username + " 's" + "image"}
                        src={profileImg}
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
                        onClick={handleEdit}
                      >
                        Edit
                      </button>

                      {toggleDelete ? twDeleteBtn : twConfirmDelete}
                      {twAddMoreHobbiesBtn}

                      
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
                        <span className="text-sm text-gray-500">Entries</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="text-center mt-12">
                  <h3 className="text-4xl font-semibold leading-normal mb-2 text-gray-800 mb-2">
                  {firstName} {lastName}
                  </h3>
                  <div className="text-sm leading-normal mt-0 mb-2 text-gray-500 font-bold uppercase">
                    <i className="fas fa-map-marker-alt mr-2 text-base text-gray-500">{location}</i>
                  </div>
                  <div className="text-sm leading-normal mt-0 mb-2 text-gray-500 font-bold uppercase">
                    <p className="fas fa-map-marker-alt mr-2 text-base text-gray-500">{username}</p>
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
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        <div className="flex flex-wrap mx-56 md:flex-nowrap p-12">
        {twMappedCompetitions}
        </div>

        <div className="grid grid-cols-4 gap-1">
          {mappedUserHobbies}
        </div>

        <div className="overflow: auto; items-start m-auto bg-white rounded shadow-lg text-slate-500 shadow-slate-200 p-1">
        {mappedEntries}
        </div>

        {/* <div className="overflow: auto; items-start m-auto bg-white rounded shadow-lg text-slate-500 shadow-slate-200 p-1">
        {usersResults}
        </div> 
        the one below looks nicer
        */}

        <div className="grid grid-cols-5 gap-1">
        {usersResults}
        </div>
        
        
        </>
        
    )




    // const loggedOutDisplay=(
    //     <div>
    //         <p> Sorry, but you must be logged in to view this page.</p>
    //         {/* Maybe a button here that takes them to login? */}
    //         {/* Or I could incorporate the functionality here and also allow for them to login here? */}
    //         <Link to='/login'>
    //         <button> Login </button>
    //         </Link>
    //     </div>
    // )


    
  function TakeMeToLogin() {
    navigate(`/login`)
  }

  function TakeMeHome(){
    navigate(`/`)
  }

  const loggedOutDisplay = (

      <div className="bg-white py-6 sm:py-8 lg:py-12">
      <div className="mx-auto max-w-screen-lg px-4 md:px-8">
        <div className="grid gap-8 sm:grid-cols-2">

          <div className="h-80 overflow-hidden rounded-lg bg-gray-100 shadow-lg md:h-auto">
            <img src="https://images.unsplash.com/photo-1626790680787-de5e9a07bcf2?auto=format&q=75&fit=crop&w=600" loading="lazy" alt="Photo by Theo Crazzolara" className="h-full w-full object-cover object-center" />
          </div>

          <div className="flex flex-col items-center justify-center sm:items-start md:py-24 lg:py-32">
            <p className="mb-4 text-sm font-semibold uppercase text-indigo-500 md:text-base">Error</p>
            <h1 className="mb-2 text-center text-2xl font-bold text-gray-800 sm:text-left md:text-3xl"> Sorry, but you must be logged in to view your profile!</h1>

            <p className="mb-4 text-center text-gray-500 sm:text-left md:mb-8 md:text-lg">Please Login to see your profile! If you believe this to be an error, check your route and try again.</p>

            <nav className="flex gap-4 sm:block sm:space-y-1 md:space-y-2">
              
              <button onClick={TakeMeHome} className="inline-block rounded-lg bg-indigo-500 px-8 py-3 text-center text-sm font-semibold text-white outline-none ring-indigo-300 transition duration-100 hover:bg-indigo-600 focus-visible:ring active:bg-indigo-700 md:text-base">Take me Home!</button>


              <br/>

              <button onClick={TakeMeToLogin} className="inline-block rounded-lg bg-indigo-500 px-8 py-3 text-center text-sm font-semibold text-white outline-none ring-indigo-300 transition duration-100 hover:bg-indigo-600 focus-visible:ring active:bg-indigo-700 md:text-base">Login</button>
            
            </nav>
          </div>
        </div>
      </div>
    </div>

  )


    return (
        <div>
        {user ? loggedInDisplay : loggedOutDisplay }
        </div>
        // {loggedInDisplay}

       

    )
}

export default UserDashboard;