import React from "react";
import { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";
import {useFormik} from "formik"
import { object, string, number} from 'yup'


function UserEdit({user, updateUser}){

    //display errors
    const [error, setError] = useState()

    //Handle navigation after submission, likely take to display page
    const navigate = useNavigate()

    //I may want to have them just navigate back to their user dashboard after all is said and done.

    const formSchema = object({
        firstName: string().required('You need a name'),
        username: string().required("You'll need a username to sign in"),
        email: string().required("You'll need an email address")
    })

    // console.log(user.username)

    //Takes the form and makes a patch request
    const formik = useFormik({
        initialValues: {
            firstName: " ",
            lastName: " ",
            username: " ",
            password: " ",
            age: " ",
            bio: " ",
            location: " ",
            phone: " ",
            email: " ",
            profileImg: " ", //this and the one below remain the same as the first time they were logged in.
            bannerImg: " " 
        },
        validationSchema: formSchema,
        onSubmit: (values) => {
            fetch(`/user/${user.id}` , {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(values)
            })
                .then(res => {
                    if (res.ok){
                        res.json().then(user =>{
                        updateUser(user)
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
        if (user && user.username){
        formik.setValues({
            firstName: user.firstName,
            lastName: user.lastName,
            username: user.username,
            password: user.password,
            age: user.age,
            bio: user.bio,
            location: user.location,
            phone: user.phone,
            email: user.email,
            profileImg: user.profileImg, //this and the one below remain the same as the first time they were logged in.
            bannerImg:user.bannerImg, 
        })
    }
      }, [user])


    return(
        // <div>
        //     <form className="signup-form" onSubmit={formik.handleSubmit}>
        //             {/* display errors from formik/yup */}
        //             { formik.errors && Object.values(formik.errors).map(e => <p>{e}</p>) }

        //             {/* display errors from backend */}
        //             {error && <p>{error}</p>}

        //             <div className="user-signup-input">
        //             <label> First Name </label>
        //             <input
        //             type="text"
        //             name="firstName"
        //             value={formik.values.firstName}
        //             onChange={formik.handleChange}
        //             />
        //             </div>

        //             <div className="user-signup-input">
        //             <label> Last Name </label>
        //             <input
        //             type="text"
        //             name="lastName"
        //             value={formik.values.lastName}
        //             onChange={formik.handleChange}
        //             />
        //             </div>

        //             <div className="user-signup-input">
        //             <label> Username </label>
        //             <input
        //             type="text"
        //             name="username"
        //             value={formik.values.username}
        //             onChange={formik.handleChange}
        //             />
        //             </div>

        //             <div className="user-signup-input">
        //             <label> Password </label>
        //             <input
        //             type="text"
        //             name="password"
        //             value={formik.values.password}
        //             onChange={formik.handleChange}
        //             />
        //             </div>

        //             <div className="user-signup-input">
        //             <label> age </label>
        //             <input
        //             type="text"
        //             name="age"
        //             value={formik.values.age}
        //             onChange={formik.handleChange}
        //             />
        //             </div>

        //             <div className="user-signup-input">
        //             <label> Bio </label>
        //             <textarea
        //             type="text"
        //             name="bio"
        //             value={formik.values.bio}
        //             onChange={formik.handleChange}
        //             />
        //             </div>

        //             <div className="user-signup-input">
        //             <label> Location </label>
        //             <input
        //             type="text"
        //             name="location"
        //             value={formik.values.location}
        //             onChange={formik.handleChange}
        //             />
        //             </div>

        //             <div className="user-signup-input">
        //             <label> Phone </label>
        //             <input
        //             type="text"
        //             name="phone"
        //             value={formik.values.phone}
        //             onChange={formik.handleChange}
        //             />
        //             </div>

        //             <div className="user-signup-input">
        //             <label> Email </label>
        //             <input
        //             type="text"
        //             name="email"
        //             value={formik.values.email}
        //             onChange={formik.handleChange}
        //             />
        //             </div>

        //             <div className="user-signup-input">
        //             <label> Profile Image  </label>
        //             <input
        //             type="text"
        //             name="profileImg"
        //             value={formik.values.profileImg}
        //             onChange={formik.handleChange}
        //             />
        //             </div>

        //             <div className="user-signup-input">
        //             <label> Banner Image </label>
        //             <input
        //             type="text"
        //             name="bannerImg"
        //             value={formik.values.bannerImg}
        //             onChange={formik.handleChange}
        //             />
        //             </div>
        //         <div>--------------------------------------</div>
        //         <button type="submit" className=""> Submit and return to my Dashboard </button>

        //     </form>
        //         <button onClick={backToDash}> Back </button>

        // </div>
    <div class="bg-white py-6 sm:py-8 lg:py-12">
        <div class="mx-auto max-w-screen-2xl px-4 md:px-8">

            <div class="mb-10 md:mb-16">
            <h2 class="mb-4 text-center text-2xl font-bold text-gray-800 md:mb-6 lg:text-3xl">Need to Edit your User Profile?</h2>

            <p class="mx-auto max-w-screen-md text-center text-gray-500 md:text-lg"> We've got you covered Adventurer!</p>
            </div>

            <form onSubmit={formik.handleSubmit} class="mx-auto grid max-w-screen-md gap-4 sm:grid-cols-2">
            <div>
                <label for="firstName" class="mb-2 inline-block text-sm text-gray-800 sm:text-base">First Name</label>
                <input type="text" name="firstName" value={formik.values.firstName} onChange={formik.handleChange} class="w-full rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none ring-indigo-300 transition duration-100 focus:ring" placeholder={formik.values.firstName}/>
            </div>

            <div>
                <label for="lastName" class="mb-2 inline-block text-sm text-gray-800 sm:text-base"> Last Name</label>
                <input type="text" name="lastName" value={formik.values.lastName} onChange={formik.handleChange} class="w-full rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none ring-indigo-300 transition duration-100 focus:ring" placeholder={formik.values.lastName}/>
            </div>

            <div class="sm:col-span-2">
                <label for="username" class="mb-2 inline-block text-sm text-gray-800 sm:text-base">Username*</label>
                <input type="text" name="username" value={formik.values.username} onChange={formik.handleChange} class="w-full rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none ring-indigo-300 transition duration-100 focus:ring" placeholder={formik.values.username}/>
            </div>

            <div class="sm:col-span-2">
                <label for="password" class="mb-2 inline-block text-sm text-gray-800 sm:text-base">Password*</label>
                <input type="text" name="password" value={formik.values.password} onChange={formik.handleChange} class="w-full rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none ring-indigo-300 transition duration-100 focus:ring" placeholder="We won't pre-enter your password, please have that written somewhere safe!"/>
            </div>

            <div class="sm:col-span-2">
                <label for="email" class="mb-2 inline-block text-sm text-gray-800 sm:text-base">Email</label>
                <input type="text" name="email" value={formik.values.email} onChange={formik.handleChange} class="w-full rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none ring-indigo-300 transition duration-100 focus:ring" placeholder={formik.values.email}/>
            </div>

            <div class="sm:col-span-2">
                <label for="phone" class="mb-2 inline-block text-sm text-gray-800 sm:text-base">Phone</label>
                <input type="text" name="phone" value={formik.values.phone} onChange={formik.handleChange} class="w-full rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none ring-indigo-300 transition duration-100 focus:ring" placeholder={formik.values.phone}/>
            </div>

            <div class="sm:col-span-2">
                <label for="age" class="mb-2 inline-block text-sm text-gray-800 sm:text-base">Age</label>
                <input type="text" name="age" value={formik.values.age} onChange={formik.handleChange} class="w-full rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none ring-indigo-300 transition duration-100 focus:ring" placeholder={formik.values.age}/>
            </div>

            <div class="sm:col-span-2">
                <label for="location" class="mb-2 inline-block text-sm text-gray-800 sm:text-base">Location</label>
                <input type="text" name="location" value={formik.values.location} onChange={formik.handleChange} class="w-full rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none ring-indigo-300 transition duration-100 focus:ring" placeholder={formik.values.location}/>
            </div>

            <div class="sm:col-span-2">
                <label for="profileImg" class="mb-2 inline-block text-sm text-gray-800 sm:text-base">Profile Image Link</label>
                <input type="text" name="profileImg" value={formik.values.profileImg} onChange={formik.handleChange} class="w-full rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none ring-indigo-300 transition duration-100 focus:ring" placeholder={formik.values.profileImg}/>
            </div>
            
            <div class="sm:col-span-2">
                <label for="bannerImg" class="mb-2 inline-block text-sm text-gray-800 sm:text-base">Banner Image Link</label>
                <input type="text" name="bannerImg" value={formik.values.bannerImg} onChange={formik.handleChange} class="w-full rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none ring-indigo-300 transition duration-100 focus:ring" placeholder={formik.values.bannerImg}/>
            </div>

            <div class="sm:col-span-2">
                <label for="bio" class="mb-2 inline-block text-sm text-gray-800 sm:text-base">Bio</label>
                <textarea type="text" name="bio" value={formik.values.bio} onChange={formik.handleChange} class="h-64 w-full rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none ring-indigo-300 transition duration-100 focus:ring" placeholder={formik.values.bio}/>
            </div>

            <div class="flex items-center justify-between sm:col-span-2">

                {/* NEED TO CHANGE COLOR */}
                <button type="submit" class="inline-block rounded-lg bg-indigo-500 px-8 py-3 text-center text-sm font-semibold text-white outline-none ring-indigo-300 transition duration-100 hover:bg-indigo-600 focus-visible:ring active:bg-indigo-700 md:text-base">Done Editing</button>
                
                <button onClick={backToDash} class="inline-block rounded-lg bg-indigo-500 px-8 py-3 text-center text-sm font-semibold text-white outline-none ring-indigo-300 transition duration-100 hover:bg-indigo-600 focus-visible:ring active:bg-indigo-700 md:text-base">Back</button>

                <span class="text-sm text-gray-500">*Required</span>
            </div>
            </form>

        </div>
        </div>
            //<button onClick={backToDash}> Back </button>
    )
}

export default UserEdit;


// It does not seem possible to edit a password?