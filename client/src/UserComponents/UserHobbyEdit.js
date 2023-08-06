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


    return(
        <div>
            <form className="signup-form" onSubmit={formik.handleSubmit}>
                    {/* display errors from formik/yup */}
                    { formik.errors && Object.values(formik.errors).map(e => <p>{e}</p>) }

                    {/* display errors from backend */}
                    {error && <p>{error}</p>}

                    <div className="user-signup-input">
                    <label> New Expertise Level </label>
                    <input
                    type="text"
                    name="expertise"
                    value={formik.values.expertise}
                    onChange={formik.handleChange}
                    />
                    </div>

                <div>--------------------------------------</div>
                <button type="submit" className=""> Submit and return to my Dashboard </button>

            </form>
                <button onClick={backToDash}> Back </button>

        </div>
    )
}


export default UserHobbyEdit;