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

        fetch("/api/login", {
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
        email: string().required("You need an email address")
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
            fetch('/api/users' , {
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
                        // console.log(user)
                        })
                    } else {
                        res.json().then(error => setError(error)) //for backend errors
                    }
                })
        }
    })



    //------------------------------------------------------------------ LOGIN CONDITIONALS----------------------------------------------------



    const loggedOutDisplay = (
      <div className="bg-white py-6 sm:py-8 lg:py-12">
  <div className="mx-auto max-w-screen-2xl px-4 md:px-8">

    <div className="mb-10 md:mb-16">
      <h2 className="mb-4 text-center text-2xl font-bold text-gray-800 md:mb-6 lg:text-3xl">Enlist in the Hobby Wars Campaign</h2>

      <p className="mx-auto max-w-screen-md text-center text-gray-500 md:text-lg"> Are you ready to join the ranks? Engage with fellow enthusiasts, unleash your creativity, and be a part of the vibrant Hobby Wars movement. Embrace the exhilarating rush of challenges, the thrill of friendly rivalries, and the forging of profound bonds with fellow adventurers!</p>
    </div>

    <form onSubmit={formik.handleSubmit} className="mx-auto grid max-w-screen-md gap-4 sm:grid-cols-2">
      
          {/* display errors from formik/yup */}
          { formik.errors && Object.values(formik.errors).map(e => <p>{e}</p>) }
          {/* display errors from backend */}
          {error && <p>{error}</p>}
      
      <div>
        <label htmlFor="firstName" className="mb-2 inline-block text-sm text-gray-800 sm:text-base">First Name</label>
        <input type="text" name="firstName" value={formik.values.firstName} onChange={formik.handleChange} className="w-full rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none ring-indigo-300 transition duration-100 focus:ring" />
      </div>

      <div>
        <label htmlFor="lastName" className="mb-2 inline-block text-sm text-gray-800 sm:text-base"> Last Name</label>
        <input type="text" name="lastName" value={formik.values.lastName} onChange={formik.handleChange} className="w-full rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none ring-indigo-300 transition duration-100 focus:ring" />
      </div>

      <div className="sm:col-span-2">
        <label htmlFor="username" className="mb-2 inline-block text-sm text-gray-800 sm:text-base">Username*</label>
        <input type="text" name="username" value={formik.values.username} onChange={formik.handleChange} className="w-full rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none ring-indigo-300 transition duration-100 focus:ring" />
      </div>

      <div className="sm:col-span-2">
        <label htmlFor="password" className="mb-2 inline-block text-sm text-gray-800 sm:text-base">Password*</label>
        <input type="text" name="password" value={formik.values.password} onChange={formik.handleChange} className="w-full rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none ring-indigo-300 transition duration-100 focus:ring" />
      </div>

      <div className="sm:col-span-2">
        <label htmlFor="email" className="mb-2 inline-block text-sm text-gray-800 sm:text-base">Email</label>
        <input type="text" name="email" value={formik.values.email} onChange={formik.handleChange} className="w-full rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none ring-indigo-300 transition duration-100 focus:ring" />
      </div>

      <div className="sm:col-span-2">
        <label htmlFor="phone" className="mb-2 inline-block text-sm text-gray-800 sm:text-base">Phone</label>
        <input type="text" name="phone" value={formik.values.phone} onChange={formik.handleChange} className="w-full rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none ring-indigo-300 transition duration-100 focus:ring" />
      </div>

      <div className="sm:col-span-2">
        <label htmlFor="age" className="mb-2 inline-block text-sm text-gray-800 sm:text-base">Age</label>
        <input type="text" name="age" value={formik.values.age} onChange={formik.handleChange} className="w-full rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none ring-indigo-300 transition duration-100 focus:ring" />
      </div>

      <div className="sm:col-span-2">
        <label htmlFor="location" className="mb-2 inline-block text-sm text-gray-800 sm:text-base">Location</label>
        <input type="text" name="location" value={formik.values.location} onChange={formik.handleChange} className="w-full rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none ring-indigo-300 transition duration-100 focus:ring" />
      </div>

      <div className="sm:col-span-2">
        <label htmlFor="profileImg" className="mb-2 inline-block text-sm text-gray-800 sm:text-base">Profile Image Link</label>
        <input type="text" name="profileImg" value={formik.values.profileImg} onChange={formik.handleChange} className="w-full rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none ring-indigo-300 transition duration-100 focus:ring" />
      </div>
      
      <div className="sm:col-span-2">
        <label htmlFor="bannerImg" className="mb-2 inline-block text-sm text-gray-800 sm:text-base">Banner Image Link</label>
        <input type="text" name="bannerImg" value={formik.values.bannerImg} onChange={formik.handleChange} className="w-full rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none ring-indigo-300 transition duration-100 focus:ring" />
      </div>

      <div className="sm:col-span-2">
        <label htmlFor="bio" className="mb-2 inline-block text-sm text-gray-800 sm:text-base">Bio</label>
        <textarea type="text" name="bio" value={formik.values.bio} onChange={formik.handleChange} className="h-64 w-full rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none ring-indigo-300 transition duration-100 focus:ring"/>
      </div>

      <div className="flex items-center justify-between sm:col-span-2">

        {/* NEED TO CHANGE COLOR */}
        <button type="submit" className="inline-block rounded-lg bg-indigo-500 px-8 py-3 text-center text-sm font-semibold text-white outline-none ring-indigo-300 transition duration-100 hover:bg-indigo-600 focus-visible:ring active:bg-indigo-700 md:text-base"> Sign Up!</button>

        <span className="text-sm text-gray-500">*Required</span>
      </div>
    </form>

  </div>
</div>
    )




//Navigation back to dashboard + home button under it
    function UserDashClick() {
      navigate(`/user-dashboard/${user.id}`)
  }

  function TakeMeHome(){
    navigate(`/`)
  }
    // const loggedInDisplay = (
    //   <>
    //   <p> You're already signed in silly head, would you like to be taken to your dashboard?</p>
    //   <button onClick={UserDashClick} className="inline-block rounded-lg bg-indigo-500 px-8 py-3 text-center text-sm font-semibold text-white outline-none ring-indigo-300 transition duration-100 hover:bg-indigo-600 focus-visible:ring active:bg-indigo-700 md:text-base">Beam me up Scotty!</button>
    //   </>
    // )

    const loggedInDisplay = (
      <>
        <div className="bg-white py-6 sm:py-8 lg:py-12">
          <div className="mx-auto max-w-screen-lg px-4 md:px-8">
            <div className="grid gap-8 sm:grid-cols-2">

              <div className="h-80 overflow-hidden rounded-lg bg-gray-100 shadow-lg md:h-auto">
                <img src="https://images.unsplash.com/photo-1626790680787-de5e9a07bcf2?auto=format&q=75&fit=crop&w=600" loading="lazy" alt="Photo by Theo Crazzolara" className="h-full w-full object-cover object-center" />
              </div>

              <div className="flex flex-col items-center justify-center sm:items-start md:py-24 lg:py-32">
                <p className="mb-4 text-sm font-semibold uppercase text-indigo-500 md:text-base">Error</p>
                <h1 className="mb-2 text-center text-2xl font-bold text-gray-800 sm:text-left md:text-3xl"> You're already signed in!</h1>

                <p className="mb-4 text-center text-gray-500 sm:text-left md:mb-8 md:text-lg">The page you’re looking for doesn’t exist, would you like to go somewhere else? If you believe this to be an error, check your route and try again.</p>

                <nav className="flex gap-4 sm:block sm:space-y-1 md:space-y-2">
                  
                  <button onClick={TakeMeHome} className="inline-block rounded-lg bg-indigo-500 px-8 py-3 text-center text-sm font-semibold text-white outline-none ring-indigo-300 transition duration-100 hover:bg-indigo-600 focus-visible:ring active:bg-indigo-700 md:text-base">Take me Home!</button>


                  <br/>

                  <button onClick={UserDashClick} className="inline-block rounded-lg bg-indigo-500 px-8 py-3 text-center text-sm font-semibold text-white outline-none ring-indigo-300 transition duration-100 hover:bg-indigo-600 focus-visible:ring active:bg-indigo-700 md:text-base">Take me to my Profile!</button>
                
                </nav>
              </div>
            </div>
          </div>
        </div>
    </>
    )


    return(

        <>

        {user ? loggedInDisplay : loggedOutDisplay}
        
        </>
        
    )
}

export default UserSignUpForm;


//Confirmation password ? How would I even? basically write if password && password confirmation password = password? IDK

//Should I take them to the sign in page afterwards? Or should I just have it automatically sign them in?



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