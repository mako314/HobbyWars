import React from "react";
import { useState } from 'react'
import { useNavigate } from "react-router-dom";
import {useFormik} from "formik"
import { object, string, number} from 'yup'

function CompetitionCreation({setCompetitions, competitions}){

    //display errors
    const [error, setError] = useState()

    //Handle navigation after submission, likely take to display page
    const navigate = useNavigate()

    //Yup handling
    const formSchema = object({
        title: string().required('Please enter a title'),
        location: string().required('You cannot declare a war with no location.'),
        competition_tasks: string().required('You must include some tasks')
    })

    const formik = useFormik({
        initialValues: {
            title: '',
            objective: '',
            description: '',
            scoring: '',
            cost_of_entry: '',
            schedule: '',
            contact: '',
            location: '',
            requirements: '',
            competition_tasks: '',
            safety_measures: '',
            prize1: '', 
            prize2: '', 
            prize3: '', 
            prize4: '', 
            prize5: '', 
            prize6: '', 
            prize7: '', 
            prize8: '', 
            registration_schedule: ''
        },
        validationSchema: formSchema,
        onSubmit: (values) => {
            fetch('/competitions', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(values)
            })
                .then(res =>{
                    if (res.ok){
                        res.json().then(competition => {
                            setCompetitions([...competitions, competition]) //May need to pass a function if I have to do other things with it
                            navigate(`/competition/${competition.id}`)
                        })
                    } else {
                        res.json().then(error => setError(error)) //for backend errors
                    }
                })
        }
    })



    return (
        <div>
            <form className="war-form" onSubmit={formik.handleSubmit}>
                    {/* display errors from formik/yup */}
                    { formik.errors && Object.values(formik.errors).map(e => <p>{e}</p>) }

                    {/* display errors from backend */}
                    {error && <p>{error}</p>}

                    <div className="war-entries">
                    <label> War Title </label>
                    <input
                    type="text"
                    name="title"
                    value={formik.values.title}
                    onChange={formik.handleChange}
                    />
                    </div>

                    <div className="war-entries">
                    <label> The Objective? </label>
                    <input
                    type="text"
                    name="objective"
                    value={formik.values.objective}
                    onChange={formik.handleChange}
                    />
                    </div>

                    <div className="war-entries">
                    <label> Description </label>
                    <input
                    type="text"
                    name="description"
                    value={formik.values.description}
                    onChange={formik.handleChange}
                    />
                    </div>

                    <div className="war-entries">
                    <label> How will it be scored? </label>
                    <input
                    type="text"
                    name="scoring"
                    value={formik.values.scoring}
                    onChange={formik.handleChange}
                    />
                    </div>

                    <div className="war-entries">
                    <label> Is there a cost to enter? </label>
                    <input
                    type="text"
                    name="cost_of_entry"
                    value={formik.values.cost_of_entry}
                    onChange={formik.handleChange}
                    />
                    </div>

            </form>

        </div>
    )
}

export default CompetitionCreation;


// is there a cost to enter? == Is there an enlistment fee?