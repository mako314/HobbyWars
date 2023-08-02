import React from "react";
import { useState } from 'react'
import { useNavigate } from "react-router-dom";
import {useFormik} from "formik"
import { object, string, number} from 'yup'

function UserHobbyForm({hobbies, user, setUserHobbies, userHobbies}) {
 //map over hobbies to generate radio buttons? Let them select however many hobbies they'd like?
    const [error, setError] = useState()

    const formSchema = object({
        expertise: number().required('You need an expertise level'),
    })
  // I can probably just do this three times? <userHobbyForm/> inside of my user sign up to make three?
    const formik = useFormik({
        initialValues: {
            expertise: '',
            user_id: user.id,
            hobby_id: ''
        }, 
        validationSchema: formSchema,
        onSubmit: (values) => {
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
                        setUserHobbies([...userHobbies, userHobby])
                        console.log(userHobby)
                        })
                    } else {
                        res.json().then(error => setError(error)) //for backend errors
                    }
                })
        }
    })

    const mappedHobby = hobbies.map((hobby) =>(
        <option value={hobby.id}> Hobby: {hobby.type_of_hobby}  Description: {hobby.description}</option>
    ))


    return (
        <select
        className="text-black"
        name="equipment_id"
        value={formik.values.hobby_id}
        onChange={formik.handleChange}>
            <option> Select from the Hobbies below</option>
            {mappedHobby}
        </select>
    )
}

export default UserHobbyForm;