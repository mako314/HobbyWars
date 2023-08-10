import React from "react";
import { useEffect, useState } from 'react'
import { Link, useNavigate } from "react-router-dom";
import {useFormik} from "formik"
import { object, string, number} from 'yup'

function UserHobbyEdit({user, updateUserHobby, userHobbyID}){
    
    
    //display errors
    const [error, setError] = useState()

    //user Hobby info?
    const [userHobbyInfo, setUserHobbyInfo] = useState([])

    //Handle navigation after submission, likely take to display page
    const navigate = useNavigate()

    useEffect(() => {
        fetch(`/user/hobbies/${userHobbyID}`)
          .then((resp) => resp.json())
          .then((data) => {
            setUserHobbyInfo(data)
          })
      }, [userHobbyID]) 

    // Only really changing expertise level
    const formSchema = object({
        expertise: number().positive().required('You need an expertise level 1-10'),
    })

    // console.log(user.username)

    //Takes the form and makes a patch request
    const formik = useFormik({
        initialValues: {
            expertise: '',
            user_id: '',
            hobby_id: ''
        },
        validationSchema: formSchema,
        onSubmit: (values) => {
            fetch(`/user/hobbies/${user.id}` , {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(values)
            })
                .then(res => {
                    if (res.ok){
                        res.json().then(user =>{
                        updateUserHobby(user)
                        navigate(`/user-dashboard/${user.id}`) // Return to dashboard
                        console.log(user)
                        })
                    } else {
                        res.json().then(error => setError(error)) //for backend errors
                    }
                })
        }
    })


    //Takes the user back to the dashboard if they didn't want to click it
    const backToDash =  () => {
        navigate(`/user-dashboard/${user.id}`)
    }

    //Magic code, waits for the user data to be populates, and then allows for setting the values.
    //For some reason, they still see their old username
    useEffect(() => {
        if (user && userHobbyInfo){
        formik.setValues({
            expertise: userHobbyInfo.expertise,
            user_id: userHobbyInfo.user_id,
            hobby_id: userHobbyInfo.hobby_id
        })
    }
      }, [userHobbyInfo])

      let loggedInDisplay




      //------------------------------------------------------------------ LOGIN CONDITIONALS----------------------------------------------------

      loggedInDisplay = (
        <div class="bg-white py-6 sm:py-8 lg:py-12">
        <div class="mx-auto max-w-screen-2xl px-4 md:px-8">

            <div class="mb-10 md:mb-16">
            <h2 class="mb-4 text-center text-2xl font-bold text-gray-800 md:mb-6 lg:text-3xl"> Need to make an edit? Do it here! </h2>

            <p class="mx-auto max-w-screen-md text-center text-gray-500 md:text-lg"> Improvement? Congrats! Mistake in Entering? Human!</p>
            </div>

            <form onSubmit={formik.handleSubmit} class="mx-auto grid max-w-screen-md gap-4 sm:grid-cols-2">

            <div class="sm:col-span-2">
                <label for="expertise" class="mb-2 inline-block text-sm text-gray-800 sm:text-base">Expertise Level?</label>
                <input type="text" name="expertise" value={formik.values.expertise} onChange={formik.handleChange} class="w-full rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none ring-indigo-300 transition duration-100 focus:ring" placeholder={formik.values.expertise}/>
            </div>

            <div class="flex items-center justify-between sm:col-span-2">

                {/* NEED TO CHANGE COLOR */}
                <button type="submit" class="inline-block rounded-lg bg-indigo-500 px-8 py-3 text-center text-sm font-semibold text-white outline-none ring-indigo-300 transition duration-100 hover:bg-indigo-600 focus-visible:ring active:bg-indigo-700 md:text-base">Finish Editing</button>
                
                {/* NEED A BACK BUTTON */}
                <button onClick={backToDash} class="inline-block rounded-lg bg-indigo-500 px-8 py-3 text-center text-sm font-semibold text-white outline-none ring-indigo-300 transition duration-100 hover:bg-indigo-600 focus-visible:ring active:bg-indigo-700 md:text-base"> Back </button>
                
            </div>

            </form>

        </div>
        </div>
      )

    //   const loggedOutDisplay = (
    //     <div>
    //         <p> You must either login, or be affiliated with that User Hobby to edit it.</p>
    //         <div></div>
    //         <Link to='/login'>
    //         <button> Login </button>
    //         </Link>
    //     </div>
    //     )
    


    //Navigation back to dashboard + home button under it
        function TakeMeToLogin() {
            navigate(`/login`)
        }
      
        function TakeMeHome(){
          navigate(`/`)
        }

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
    
                  <p class="mb-4 text-center text-gray-500 sm:text-left md:mb-8 md:text-lg">You must either Login, or be affiliated with that User Hobby to edit it. If you believe this to be an error, check your route and try again.</p>
    
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


    return(
        // <div>
        //     <form className="signup-form" onSubmit={formik.handleSubmit}>
        //             {/* display errors from formik/yup */}
        //             { formik.errors && Object.values(formik.errors).map(e => <p>{e}</p>) }

        //             {/* display errors from backend */}
        //             {error && <p>{error}</p>}

        //             <div className="user-signup-input">
        //             <label> New Expertise Level </label>
        //             <input
        //             type="text"
        //             name="expertise"
        //             value={formik.values.expertise}
        //             onChange={formik.handleChange}
        //             />
        //             </div>

        //         <div>--------------------------------------</div>
        //         <button type="submit" className=""> Submit and return to my Dashboard </button>

        //     </form>
        //         <button onClick={backToDash}> Back </button>

        // </div>
        <>
        {user && user.id === userHobbyInfo.user_id ? loggedInDisplay : loggedOutDisplay}
        </>
    )
}


export default UserHobbyEdit;