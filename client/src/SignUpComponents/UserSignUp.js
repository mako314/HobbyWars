import React from "react";
import { useState } from 'react'
import { useNavigate } from "react-router-dom";
import {useFormik} from "formik"
import { object, string, number} from 'yup'


function UserSignUpForm({setNewUsers, newUsers}){

    //display errors
    const [error, setError] = useState()

    //Handle navigation after submission, likely take to display page
    const navigate = useNavigate()

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

                    <div className="war-entries">
                    <label> First Name </label>
                    <input
                    type="text"
                    name="firstName"
                    value={formik.values.firstName}
                    onChange={formik.handleChange}
                    />
                    </div>

                    <div className="war-entries">
                    <label> Last Name </label>
                    <input
                    type="text"
                    name="lastName"
                    value={formik.values.lastName}
                    onChange={formik.handleChange}
                    />
                    </div>

                    <div className="war-entries">
                    <label> Username </label>
                    <input
                    type="text"
                    name="username"
                    value={formik.values.username}
                    onChange={formik.handleChange}
                    />
                    </div>


            </form>

        </div>
    )
}

export default UserSignUpForm;