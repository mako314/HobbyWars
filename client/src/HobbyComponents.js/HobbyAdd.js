import React from "react";
import { useEffect, useState } from 'react'
import { Link ,useNavigate } from "react-router-dom";
import {useFormik} from "formik"
import { object, string, number} from 'yup'

function HobbyAdd({user, hobbyAdder, setHobbyAdder}) {
    
    const [error, setError] = useState()
    
    const navigate = useNavigate()

    const formSchema = object({
        type_of_hobby: string().required('You need a short title of your hobby. Ex: Knitting, Surfing, Writing. The more specific the better!'),
        description: string().required('You need a short description of your hobby!')

    })

    const formik = useFormik({
        initialValues: {
            type_of_hobby: '',
            description: '',
        },
        validationSchema: formSchema,
        onSubmit: (values) =>{
            fetch('/hobbies' , {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(values)
            })
            .then(res => {
                if (res.ok){
                    res.json().then(newHobby => {
                        setHobbyAdder([...hobbyAdder, newHobby])
                        navigate('/user-hobby-selection')
                        //Add where you want it to go here / anything else you want it to do
                    })
                } else {
                    res.json().then(error => setError(error)) //for backend errors
                }
            })
        }
    })

    //Ideally I'd want this fire off after they're done adding a hobby, but I'd like to make it so they can add multiple at a time.
    // const navigateToSelection = () => {
    //     console.log("I fired")
    //     navigate('/user-hobby-selection')  
    // }

    const loggedInDisplay = (
        // <div>

        // <form onSubmit={formik.handleSubmit}>

        // <div className="user-signup-input">
        //     <label> What is your hobby? </label>
        //     <input
        //     type="text"
        //     name="type_of_hobby"
        //     value={formik.values.type_of_hobby}
        //     onChange={formik.handleChange}
        //     />
        // </div>

        // <div className="user-signup-input">
        //     <label> Please enter a short description of the hobby </label>
        //     <textarea
        //     type="text"
        //     name="description"
        //     value={formik.values.description}
        //     onChange={formik.handleChange}
        //     />
        // </div>
 
        // <button type="submit" className="" > Add my Hobby! </button>
        // {/* onSubmit={navigateToSelection} */}

        // </form>
    
        // </div>
        <div class="bg-white py-6 sm:py-8 lg:py-12">
        <div class="mx-auto max-w-screen-2xl px-4 md:px-8">

            <div class="mb-10 md:mb-16">
            <h2 class="mb-4 text-center text-2xl font-bold text-gray-800 md:mb-6 lg:text-3xl">Can't Find your Hobby? Add it Here!</h2>

            <p class="mx-auto max-w-screen-md text-center text-gray-500 md:text-lg"> Thanks for Contributing to the Cause! o7</p>
            </div>

            <form onSubmit={formik.handleSubmit} class="mx-auto grid max-w-screen-md gap-4 sm:grid-cols-2">

            <div class="sm:col-span-2">
                <label for="type_of_hobby" class="mb-2 inline-block text-sm text-gray-800 sm:text-base">What is your Hobby?</label>
                <input type="text" name="type_of_hobby" value={formik.values.type_of_hobby} onChange={formik.handleChange} class="w-full rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none ring-indigo-300 transition duration-100 focus:ring" />
            </div>

            <div class="sm:col-span-2">
                <label for="description" class="mb-2 inline-block text-sm text-gray-800 sm:text-base">Please Enter a Short Description of the Hobby</label>
                <textarea type="text" name="description" value={formik.values.description} onChange={formik.handleChange} class="h-64 w-full rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none ring-indigo-300 transition duration-100 focus:ring"></textarea>
            </div>

            <div class="flex items-center justify-between sm:col-span-2">

                {/* NEED TO CHANGE COLOR */}
                <button type="submit" class="inline-block rounded-lg bg-indigo-500 px-8 py-3 text-center text-sm font-semibold text-white outline-none ring-indigo-300 transition duration-100 hover:bg-indigo-600 focus-visible:ring active:bg-indigo-700 md:text-base">Submit Result</button>
                

                {/* NEED A BACK BUTTON */}
                {/* <button onClick={backToCompetition} class="inline-block rounded-lg bg-indigo-500 px-8 py-3 text-center text-sm font-semibold text-white outline-none ring-indigo-300 transition duration-100 hover:bg-indigo-600 focus-visible:ring active:bg-indigo-700 md:text-base"> Back </button> */}
                
                <span class="text-sm text-gray-500">*Required</span>
            </div>

            </form>

        </div>
        </div>
    )

    const loggedOutDisplay = (
    <div>
        <p> Please login to add any hobbies to our available hobby list.</p>
        <div></div>
        <Link to='/login'>
        <button> Login </button>
        </Link>
    </div>
    )



    return(
        <>
        
        {user ? loggedInDisplay : loggedOutDisplay}

        </>
    )
}

export default HobbyAdd;

{/* <div>
<form onSubmit={formik.handleSubmit}>

<div className="user-signup-input">
    <label> What is your hobby? </label>
    <input
    type="text"
    name="type_of_hobby"
    value={formik.values.type_of_hobby}
    onChange={formik.handleChange}
    />
</div>

<div className="user-signup-input">
    <label> Please enter a short description of the hobby </label>
    <textarea
    type="text"
    name="description"
    value={formik.values.description}
    onChange={formik.handleChange}
    />
</div>

<button type="submit" className=""> Add my Hobby! </button>

</form>
    

</div> */}