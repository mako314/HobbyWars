import React from "react";
import { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";
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
        {loggedInDisplay}
        </>
    )
}


export default UserHobbyEdit;