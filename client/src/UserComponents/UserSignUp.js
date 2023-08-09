import React from "react";
import { useState } from 'react'
import { useNavigate } from "react-router-dom";
import {useFormik} from "formik"
import { object, string, number} from 'yup'


//-----------------Import UserHobby Form----------------------------
import UserHobbyForm from "./UserHobbyForm";


function UserSignUpForm({setUser, setNewUsers, newUsers, user}){

    //display errors
    const [error, setError] = useState()

    //Handle navigation after submission, likely take to display page atm takes user home, could take them to their display page if anything with /user-dashboard/user.id
    const navigate = useNavigate()

    //-------------------------------Login after SignUP-----------------------------------------
    function handleLogin() {
        // e.preventDefault();
        // Was passing in (e)

        let username = formik.values.username;
        let password = formik.values.password;

        fetch("/login", {
            method: "POST",
            headers: {
            "Content-Type": "application/json",
            },
            body: JSON.stringify( { username, password } ), //, password
        }).then((resp) => {
            if (resp.ok) {
            resp.json().then((user) => {
                setUser(user)
                // navigate(`/user-dashboard/${user.id}`)
            });
        }
        });
}


    //Formik stuff --------------------------------------------
    const formSchema = object({
        firstName: string().required('You need a name'),
        username: string().required("You'll need a username to sign in"),
        email: string().required("You'll need an email address")
    })

    const formik = useFormik({
        initialValues: {
            firstName: '',
            lastName: '',
            username: '',
            password: '',
            age: '',
            bio: '',
            location: '',
            phone: '',
            email: '',
            profileImg: '',
            bannerImg:'',
        },
        validationSchema: formSchema,
        onSubmit: (values) => {
            fetch('/users' , {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(values)
            })
                .then(res => {
                    if (res.ok){
                        res.json().then(user => {
                        setNewUsers([...newUsers, user])
                        //If I want the user to login after the account is created, I can pass the login function and call it here with ()
                        handleLogin()
                        navigate('/')
                        console.log(user)
                        })
                    } else {
                        res.json().then(error => setError(error)) //for backend errors
                    }
                })
        }
    })



    //------------------------------------------------------------------ LOGIN CONDITIONALS----------------------------------------------------


    
    const loggedOutDisplay = (
      <div class="bg-white py-6 sm:py-8 lg:py-12">
  <div class="mx-auto max-w-screen-2xl px-4 md:px-8">

    <div class="mb-10 md:mb-16">
      <h2 class="mb-4 text-center text-2xl font-bold text-gray-800 md:mb-6 lg:text-3xl">Enlist in the Hobby Wars Campaign</h2>

      <p class="mx-auto max-w-screen-md text-center text-gray-500 md:text-lg"> Are you ready to join the ranks? Engage with fellow enthusiasts, unleash your creativity, and be a part of the vibrant Hobby Wars movement. Embrace the exhilarating rush of challenges, the thrill of friendly rivalries, and the forging of profound bonds with fellow adventurers!</p>
    </div>

    <form onSubmit={formik.handleSubmit} class="mx-auto grid max-w-screen-md gap-4 sm:grid-cols-2">
      <div>
        <label for="firstName" class="mb-2 inline-block text-sm text-gray-800 sm:text-base">First Name</label>
        <input type="text" name="firstName" value={formik.values.firstName} onChange={formik.handleChange} class="w-full rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none ring-indigo-300 transition duration-100 focus:ring" />
      </div>

      <div>
        <label for="lastName" class="mb-2 inline-block text-sm text-gray-800 sm:text-base"> Last Name</label>
        <input type="text" name="lastName" value={formik.values.lastName} onChange={formik.handleChange} class="w-full rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none ring-indigo-300 transition duration-100 focus:ring" />
      </div>

      <div class="sm:col-span-2">
        <label for="username" class="mb-2 inline-block text-sm text-gray-800 sm:text-base">Username*</label>
        <input type="text" name="username" value={formik.values.username} onChange={formik.handleChange} class="w-full rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none ring-indigo-300 transition duration-100 focus:ring" />
      </div>

      <div class="sm:col-span-2">
        <label for="password" class="mb-2 inline-block text-sm text-gray-800 sm:text-base">Password*</label>
        <input type="text" name="password" value={formik.values.password} onChange={formik.handleChange} class="w-full rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none ring-indigo-300 transition duration-100 focus:ring" />
      </div>

      <div class="sm:col-span-2">
        <label for="email" class="mb-2 inline-block text-sm text-gray-800 sm:text-base">Email</label>
        <input type="text" name="email" value={formik.values.email} onChange={formik.handleChange} class="w-full rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none ring-indigo-300 transition duration-100 focus:ring" />
      </div>

      <div class="sm:col-span-2">
        <label for="phone" class="mb-2 inline-block text-sm text-gray-800 sm:text-base">Phone</label>
        <input type="text" name="phone" value={formik.values.phone} onChange={formik.handleChange} class="w-full rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none ring-indigo-300 transition duration-100 focus:ring" />
      </div>

      <div class="sm:col-span-2">
        <label for="age" class="mb-2 inline-block text-sm text-gray-800 sm:text-base">Age</label>
        <input type="text" name="age" value={formik.values.age} onChange={formik.handleChange} class="w-full rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none ring-indigo-300 transition duration-100 focus:ring" />
      </div>

      <div class="sm:col-span-2">
        <label for="location" class="mb-2 inline-block text-sm text-gray-800 sm:text-base">Location</label>
        <input type="text" name="location" value={formik.values.location} onChange={formik.handleChange} class="w-full rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none ring-indigo-300 transition duration-100 focus:ring" />
      </div>

      <div class="sm:col-span-2">
        <label for="profileImg" class="mb-2 inline-block text-sm text-gray-800 sm:text-base">Profile Image Link</label>
        <input type="text" name="profileImg" value={formik.values.profileImg} onChange={formik.handleChange} class="w-full rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none ring-indigo-300 transition duration-100 focus:ring" />
      </div>
      
      <div class="sm:col-span-2">
        <label for="bannerImg" class="mb-2 inline-block text-sm text-gray-800 sm:text-base">Banner Image Link</label>
        <input type="text" name="bannerImg" value={formik.values.bannerImg} onChange={formik.handleChange} class="w-full rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none ring-indigo-300 transition duration-100 focus:ring" />
      </div>

      <div class="sm:col-span-2">
        <label for="bio" class="mb-2 inline-block text-sm text-gray-800 sm:text-base">Bio</label>
        <textarea type="text" name="bio" value={formik.values.bio} onChange={formik.handleChange} class="h-64 w-full rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none ring-indigo-300 transition duration-100 focus:ring"/>
      </div>

      <div class="flex items-center justify-between sm:col-span-2">

        {/* NEED TO CHANGE COLOR */}
        <button type="submit" class="inline-block rounded-lg bg-indigo-500 px-8 py-3 text-center text-sm font-semibold text-white outline-none ring-indigo-300 transition duration-100 hover:bg-indigo-600 focus-visible:ring active:bg-indigo-700 md:text-base">Take Me There!</button>

        <span class="text-sm text-gray-500">*Required</span>
      </div>
    </form>

  </div>
</div>
    )


    function UserDashClick() {
      navigate(`/user-dashboard/${user.id}`)
  }
    const loggedInDisplay = (
      <>
      <p> You're already signed in silly head, would you like to be taken to your dashboard?</p>
      <button onClick={UserDashClick} class="inline-block rounded-lg bg-indigo-500 px-8 py-3 text-center text-sm font-semibold text-white outline-none ring-indigo-300 transition duration-100 hover:bg-indigo-600 focus-visible:ring active:bg-indigo-700 md:text-base">Sign Up</button>
      </>
    )


    return(
        // <div>
        //     <form className="signup-form" onSubmit={formik.handleSubmit}>
        //             {/* display errors from formik/yup */}
        //             { formik.errors && Object.values(formik.errors).map(e => <p>{e}</p>) }

        //             {/* display errors from backend */}
        //             {error && <p>{error}</p>}

        //             <div className="user-signup-input">
        //                 <label> First Name </label>
        //                 <input
        //                 type="text"
        //                 name="firstName"
        //                 value={formik.values.firstName}
        //                 onChange={formik.handleChange}
        //                 />
        //             </div>

        //             <div className="user-signup-input">
        //                 <label> Last Name </label>
        //                 <input
        //                 type="text"
        //                 name="lastName"
        //                 value={formik.values.lastName}
        //                 onChange={formik.handleChange}
        //                 />
        //             </div>

        //             <div className="user-signup-input">
        //                 <label> Username </label>
        //                 <input
        //                 type="text"
        //                 name="username"
        //                 value={formik.values.username}
        //                 onChange={formik.handleChange}
        //                 />
        //             </div>

        //             <div className="user-signup-input">
        //                 <label> Password </label>
        //                 <input
        //                 type="text"
        //                 name="password"
        //                 value={formik.values.password}
        //                 onChange={formik.handleChange}
        //                 />
        //             </div>

        //             <div className="user-signup-input">
        //                 <label> age </label>
        //                 <input
        //                 type="text"
        //                 name="age"
        //                 value={formik.values.age}
        //                 onChange={formik.handleChange}
        //                 />
        //             </div>

        //             <div className="user-signup-input">
        //                 <label> Bio </label>
        //                 <textarea
        //                 type="text"
        //                 name="bio"
        //                 value={formik.values.bio}
        //                 onChange={formik.handleChange}
        //                 />
        //             </div>

        //             <div className="user-signup-input">
        //                 <label> Location </label>
        //                 <input
        //                 type="text"
        //                 name="location"
        //                 value={formik.values.location}
        //                 onChange={formik.handleChange}
        //                 />
        //             </div>

        //             <div className="user-signup-input">
        //                 <label> Phone </label>
        //                 <input
        //                 type="text"
        //                 name="phone"
        //                 value={formik.values.phone}
        //                 onChange={formik.handleChange}
        //                 />
        //             </div>

        //             <div className="user-signup-input">
        //                 <label> Email </label>
        //                 <input
        //                 type="text"
        //                 name="email"
        //                 value={formik.values.email}
        //                 onChange={formik.handleChange}
        //                 />
        //             </div>

        //             <div className="user-signup-input">
        //                 <label> Profile Image  </label>
        //                 <input
        //                 type="text"
        //                 name="profileImg"
        //                 value={formik.values.profileImg}
        //                 onChange={formik.handleChange}
        //                 />
        //             </div>

        //             <div className="user-signup-input">
        //                 <label> Banner Image </label>
        //                 <input
        //                 type="text"
        //                 name="bannerImg"
        //                 value={formik.values.bannerImg}
        //                 onChange={formik.handleChange}
        //                 />
        //             </div>

        //             {/* <UserHobbyForm/> */}
        //             {/* I STILL NEED TO MAKE A FORM FOR THE  ACTUAL USERHOBBY THIS IS JUST HOBBy SELECTION. MAN... */}
        //             {/* This is going to be removed ^ */}


        //         <button type="submit" className=""> Submit! </button>

        //     </form>

        // </div>
        <>

        {user ? loggedInDisplay : loggedOutDisplay}
        
        </>
        
    )
}

export default UserSignUpForm;


//Confirmation password ? How would I even? basically write if password && password confirmation password = password? IDK

//Should I take them to the sign in page afterwards? Or should I just have it automatically sign them in?