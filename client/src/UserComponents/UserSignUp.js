import React from "react";
import { useState } from 'react'
import { useNavigate } from "react-router-dom";
import {useFormik} from "formik"
import { object, string, number} from 'yup'


//-----------------Import UserHobby Form----------------------------
import UserHobbyForm from "./UserHobbyForm";


function UserSignUpForm({setUser, setNewUsers, newUsers}){

    //display errors
    const [error, setError] = useState()

    //Handle navigation after submission, likely take to display page atm takes user home, could take them to their display page if anything with /user-dashboard/user.id
    const navigate = useNavigate()

    //-------------------------------Login after SignUP-----------------------------------------
    function handleLogin(e) {
        e.preventDefault();

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
                        res.json().then(user =>{
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


    return(
        <div>
            <form className="signup-form" onSubmit={formik.handleSubmit}>
                    {/* display errors from formik/yup */}
                    { formik.errors && Object.values(formik.errors).map(e => <p>{e}</p>) }

                    {/* display errors from backend */}
                    {error && <p>{error}</p>}

                    <div className="user-signup-input">
                    <label> First Name </label>
                    <input
                    type="text"
                    name="firstName"
                    value={formik.values.firstName}
                    onChange={formik.handleChange}
                    />
                    </div>

                    <div className="user-signup-input">
                    <label> Last Name </label>
                    <input
                    type="text"
                    name="lastName"
                    value={formik.values.lastName}
                    onChange={formik.handleChange}
                    />
                    </div>

                    <div className="user-signup-input">
                    <label> Username </label>
                    <input
                    type="text"
                    name="username"
                    value={formik.values.username}
                    onChange={formik.handleChange}
                    />
                    </div>

                    <div className="user-signup-input">
                    <label> Password </label>
                    <input
                    type="text"
                    name="password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    />
                    </div>

                    <div className="user-signup-input">
                    <label> age </label>
                    <input
                    type="text"
                    name="age"
                    value={formik.values.age}
                    onChange={formik.handleChange}
                    />
                    </div>

                    <div className="user-signup-input">
                    <label> Bio </label>
                    <textarea
                    type="text"
                    name="bio"
                    value={formik.values.bio}
                    onChange={formik.handleChange}
                    />
                    </div>

                    <div className="user-signup-input">
                    <label> Location </label>
                    <input
                    type="text"
                    name="location"
                    value={formik.values.location}
                    onChange={formik.handleChange}
                    />
                    </div>

                    <div className="user-signup-input">
                    <label> Phone </label>
                    <input
                    type="text"
                    name="phone"
                    value={formik.values.phone}
                    onChange={formik.handleChange}
                    />
                    </div>

                    <div className="user-signup-input">
                    <label> Email </label>
                    <input
                    type="text"
                    name="email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    />
                    </div>

                    <div className="user-signup-input">
                    <label> Profile Image  </label>
                    <input
                    type="text"
                    name="profileImg"
                    value={formik.values.profileImg}
                    onChange={formik.handleChange}
                    />
                    </div>

                    <div className="user-signup-input">
                    <label> Banner Image </label>
                    <input
                    type="text"
                    name="bannerImg"
                    value={formik.values.bannerImg}
                    onChange={formik.handleChange}
                    />
                    </div>

                    <UserHobbyForm/>



                <button type="submit" className=""> Submit! </button>

            </form>

        </div>
    )
}

export default UserSignUpForm;


//Confirmation password ? How would I even? basically write if password && password confirmation password = password? IDK

//Should I take them to the sign in page afterwards? Or should I just have it automatically sign them in?