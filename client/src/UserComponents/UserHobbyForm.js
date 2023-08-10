import React from "react";
import { useEffect, useState } from 'react'
import { Link ,useNavigate } from "react-router-dom";
import {useFormik} from "formik"
import { object, string, number} from 'yup'

function UserHobbyForm({user, setUserHobbies, userHobbies}) {
    
//THIS PAGE DOES NOT LIKE TO BE REFRESEHD ???
//THIS PAGE DOES NOT LIKE TO BE REFRESEHD ???



//Handle navigation
const navigate = useNavigate()

 //map over hobbies to generate radio buttons? Let them select however many hobbies they'd like?
    
 //generate errors Please grab the error code portion and input into the userdisplay div
    const [error, setError] = useState()

// Grab ALL Hobbies
    const [hobbies, setHobbies] = useState([])

//Grab hobby descriptions?
    const [hobbyDescription, setHobbyDescription] = useState([])
//Grab hobby ID
    const [hobbyID, setHobbyID] = useState([])

//This useEffect grabs the data for the hobbies itself, there's probably a way to filter the descriptions out to display them on a div but alas.
    useEffect(() => {
        if (user)
        fetch("/hobbies")
          .then((resp) => resp.json())
          .then((data) => {
            setHobbies(data)
          })
      }, [])


//wait for hobby id to be set and then use it to pull out data for that hobby, just description.
      useEffect(() => {
        fetch(`/hobby/${hobbyID}`)
          .then((resp) => resp.json())
          .then((data) => {
            setHobbyDescription(data)
          })
      }, [hobbyID]) 

    //I'd like to add some if (users) around the useEffects, maybe group them together for cleaner code and less error. ATM if a person visits the site and is not signed in, they still fire off.
    
    // console.log(user)

    const formSchema = object({
        expertise: number().positive().required('You need an expertise level 1-10'),
    })
  // I can probably just do this three times? <UserHobbyForm/> inside of my user sign up to make three?
    const formik = useFormik({
        initialValues: {
            expertise: '',
            user_id: '',
            hobby_id: ''
        }, 
        validationSchema: formSchema,
        onSubmit: (values) => {
            console.log("here")
            fetch('/user-hobbies' , {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(values)
            })
                .then(res => {
                    if (res.ok){
                        res.json().then(userHobby =>{
                        setUserHobbies([...userHobbies, userHobby]) //spreads and updates our userHobby state in APP.js allowing it to post
                        console.log(userHobby)
                        navigate(`/user-dashboard/${user.id}`)
                        })
                    } else {
                        res.json().then(error => setError(error)) //for backend errors
                    }
                })
        }
    })
    
    //map over description data
    const mappedHobby = hobbies.map((hobby) =>(
        <option key={hobby.id} value={hobby.id}> Hobby: {hobby.type_of_hobby}</option>
    ))


    //This will handle conditional rendering and making it where we can update the id / fetch the description data
    const handleHobbyDisplay = (event) => {
        formik.handleChange(event);
        setHobbyID(event.target.value); //this can grab the ID
    }


    // ----- NAVIGATION BACK TO DASH AFTER HITTING BACK BUTTON-------
    const backToDash =  () => {
        navigate(`/user-dashboard/${user.id}`)
    }


    //Magic code, waits for the user data to be populates, and then allows for setting the values.
    useEffect(() => {
        if (user && user.id){
        formik.setValues({
          user_id: user.id
        })
    }
      }, [user])


    //Map over hobby descriptions that were set above and solely take out the descriptions,

    // console.log(user.id)

    // console.log(hobbyDescription)
    // console.log(hobbyID)
    

///------------------------------------------------------------------ LOGIN CONDITIONALS----------------------------------------------------

// Going to try and remove the form portion here and add it to MasterUserHobbyForm
    const loggedInDisplay = (
        // <>
        
        // {/* display errors from formik/yup */}
        // { formik.errors && Object.values(formik.errors).map(e => <p>{e}</p>) }

        // {/* display errors from backend */}
        // {error && <p>{error}</p>}

        // <form onSubmit={formik.handleSubmit}>
        // <div>
        //     <select
        //     className="text-black"
        //     name="hobby_id"
        //     value={formik.values.hobby_id}
        //     onChange={handleHobbyDisplay}>
        //         <option> Select from the Hobbies below</option>
        //         {mappedHobby}
        //     </select>
        // </div>

        // <div>
        // Description
        // <p>{hobbyDescription.description} </p>
        // </div>

        // <div className="user-signup-input">
        //     <label> Expertise Level? </label>
        //     <input
        //     type="text"
        //     name="expertise"
        //     value={formik.values.expertise}
        //     onChange={formik.handleChange}
        //     />
        // </div>

        // <button type="submit" className=""> Submit! </button> 
        // {/* ^ UNCOMMENT THIS IT WORKS ///This button can take them to a new page */}
        // <div> </div>
        // {/* UNCOMMENT THIS DIV this top div right here is just for spacing purposes */}
        // </form>

        // <button onClick={backToDash}> Back </button>
        // {/* UNCOMMENT BUTTON TO HAVE IT WORKING working now */}

        // <div> </div>
        // {/* UNCOMMENT THESE DIVS this top div right here is just for spacing purposes */}

        // <Link to='/add-a-hobby'>
        // <button>
        //     Don't see your hobby from the drop down? Add It here!
        // </button>
        // </Link>
        // {/* UNCOMMENT THIS BUTTON IT IS FUNCTIONING, EDITING TO TEST */}
        // </>

        <div class="bg-white py-6 sm:py-8 lg:py-12">
        <div class="mx-auto max-w-screen-2xl px-4 md:px-8">

            <div class="mb-10 md:mb-16">
            <h2 class="mb-4 text-center text-2xl font-bold text-gray-800 md:mb-6 lg:text-3xl"> To Set a New Hobby, Just Select from the Dropdown!</h2>

            <p class="mx-auto max-w-screen-md text-center text-gray-500 md:text-lg"> An Advanced Congratulations from the Hobby Wars Team!</p>
            </div>

            <form onSubmit={formik.handleSubmit} class="mx-auto grid max-w-screen-md gap-4 sm:grid-cols-2">

            <div class="sm:col-span-2">
                <label for="hobby_id" class="mb-2 inline-block text-sm text-gray-800 sm:text-base">What is your Hobby?</label>
                <select type="text" name="hobby_id" value={formik.values.hobby_id} onChange={handleHobbyDisplay} class="w-full rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none ring-indigo-300 transition duration-100 focus:ring">

                <option name="hobby_id" class="w-full rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none ring-indigo-300 transition duration-100 focus:ring" > Select from the Hobbies Below </option>
                {mappedHobby}

                </select>
                
            </div>
            <div class="sm:col-span-2">
                <div name="description" class="h-64 w-full rounded border bg-gray-50 px-3 py-0 text-gray-800 outline-none ring-indigo-300 transition duration-100 focus:ring"> {hobbyDescription.description} </div>
            </div>

            <div class="sm:col-span-2">
                <label for="expertise" class="mb-2 inline-block text-sm text-gray-800 sm:text-base">Expertise Level?</label>
                <input type="text" name="expertise" value={formik.values.expertise} onChange={formik.handleChange} class="w-full rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none ring-indigo-300 transition duration-100 focus:ring" />
            </div>

            <div class="flex items-center justify-between sm:col-span-2">

                {/* NEED TO CHANGE COLOR */}
                <button type="submit" class="inline-block rounded-lg bg-indigo-500 px-8 py-3 text-center text-sm font-semibold text-white outline-none ring-indigo-300 transition duration-100 hover:bg-indigo-600 focus-visible:ring active:bg-indigo-700 md:text-base"> Add this Hobby to my Profile!</button>
                

                {/* MAKE AN ONCLICK THAT IF YOU CLICK THIS IT SETS STATE SAYING YOU CLICKED FROM HERE, FROM THERE, ADD A HOBBY SHOULD TAKE YOU BACK STILL TO USER DASH i THINK? */}
                <Link to='/add-a-hobby'>
                <button class="inline-block rounded-lg bg-indigo-500 px-8 py-3 text-center text-sm font-semibold text-white outline-none ring-indigo-300 transition duration-100 hover:bg-indigo-600 focus-visible:ring active:bg-indigo-700 md:text-base">Add a new Hobby!</button>
                </Link>
                
                {/* NEED A BACK BUTTON */}
                <button onClick={backToDash} class="inline-block rounded-lg bg-indigo-500 px-8 py-3 text-center text-sm font-semibold text-white outline-none ring-indigo-300 transition duration-100 hover:bg-indigo-600 focus-visible:ring active:bg-indigo-700 md:text-base"> Back </button>
                
            </div>

            </form>

        </div>
        </div>
    )
    
//Navigation back to login + home button under it

    function TakeMeToLogin() {
        navigate(`/login`)
    }

    function TakeMeHome(){
        navigate(`/`)
      }

    // const loggedOutDisplay = (
    //     <>
    //     <div>
    //     Please Log in to add new Hobbies to our List!
    //     </div>
    //     <Link to='/login'>
    //     <button> Login </button>
    //     </Link>
    //     </>
        
    // )

    const loggedOutDisplay = (

        <div class="bg-white py-6 sm:py-8 lg:py-12">
        <div class="mx-auto max-w-screen-lg px-4 md:px-8">
          <div class="grid gap-8 sm:grid-cols-2">

            <div class="h-80 overflow-hidden rounded-lg bg-gray-100 shadow-lg md:h-auto">
              <img src="https://images.unsplash.com/photo-1626790680787-de5e9a07bcf2?auto=format&q=75&fit=crop&w=600" loading="lazy" alt="Photo by Theo Crazzolara" class="h-full w-full object-cover object-center" />
            </div>

            <div class="flex flex-col items-center justify-center sm:items-start md:py-24 lg:py-32">
              <p class="mb-4 text-sm font-semibold uppercase text-indigo-500 md:text-base">Error</p>
              <h1 class="mb-2 text-center text-2xl font-bold text-gray-800 sm:text-left md:text-3xl"> You have to be signed in to access this page!</h1>

              <p class="mb-4 text-center text-gray-500 sm:text-left md:mb-8 md:text-lg">Please Log in to add new Hobbies to our List!</p>

              <nav class="flex gap-4 sm:block sm:space-y-1 md:space-y-2">
                
                <button onClick={TakeMeHome} class="inline-block rounded-lg bg-indigo-500 px-8 py-3 text-center text-sm font-semibold text-white outline-none ring-indigo-300 transition duration-100 hover:bg-indigo-600 focus-visible:ring active:bg-indigo-700 md:text-base">Take me Home!</button>


                <br/>

                <button onClick={TakeMeToLogin} class="inline-block rounded-lg bg-indigo-500 px-8 py-3 text-center text-sm font-semibold text-white outline-none ring-indigo-300 transition duration-100 hover:bg-indigo-600 focus-visible:ring active:bg-indigo-700 md:text-base">Login</button>
              
              </nav>
            </div>
          </div>
        </div>
      </div>

    )



    return (
        <>
        {user ? loggedInDisplay : loggedOutDisplay}
        </>

        //I can either add the buttons in here depending on the state buttonsGenerated

    )
}

export default UserHobbyForm;