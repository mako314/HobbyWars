import React from "react";
import { useEffect, useState } from 'react'
import { Link, useNavigate } from "react-router-dom";
import {useFormik} from "formik"
import { object, string, number} from 'yup'

function CompetitionEdit({user, compID, updateCompetition}){

    // is there a cost to enter? == Is there an enlistment fee?

    //Just going to make a state to grab the stuff that comes in tbh
    const [oneCompEdit, setOneCompEdit] = useState([])

    // useEffect(() => {
    //     fetch("/check_session").then((response) => {
    //       if (response.ok) {
    //         response.json().then((user) => setUser(user));
    //       }
    //     });
    //   }, []);

    useEffect(() => {
        if(compID){
        fetch(`/competition/${compID}`)
          .then((resp) => resp.json())
          .then((data) => {
            setOneCompEdit(data)
          })}
      }, [compID, user])

    console.log(compID)



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
            contact: '', //user.firstName + " " + user.lastName,
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
            registration_schedule: '',
            user_id: '' //May need to do useEffect like we did for hobbyUser
        },
        validationSchema: formSchema,
        onSubmit: (values) => {
            fetch(`/competition/${compID}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(values)
            })
                .then(res =>{
                    if (res.ok){
                        res.json().then(competition => {
                            updateCompetition(competition) //May need to pass a function if I have to do other things with it
                            console.log(competition)
                            navigate(`/competition/${competition.id}`)
                        })
                    } else {
                        res.json().then(error => setError(error)) //for backend errors
                    }
                })
        }
    })

    // USE EFFECT TO INPUT THE DATA UPON ONECOMPEDIT AND USER EXISTING
    useEffect(() => {
        if (user && oneCompEdit){
        formik.setValues({
            title: oneCompEdit.firstName,
            objective: oneCompEdit.objective,
            description: oneCompEdit.description,
            scoring: oneCompEdit.scoring,
            cost_of_entry: oneCompEdit.cost_of_entry,
            schedule: oneCompEdit.schedule,
            user_id: oneCompEdit.id,
            contact: oneCompEdit.email,
            location: oneCompEdit.location,
            requirements: oneCompEdit.requirements, //this and the one below remain the same as the first time they were logged in.
            competition_tasks:oneCompEdit.competition_tasks, 
            safety_measures: oneCompEdit.safety_measures,
            prize1: oneCompEdit.prize1,
            prize2: oneCompEdit.prize2,
            prize3: oneCompEdit.prize3,
            prize4: oneCompEdit.prize4,
            prize5: oneCompEdit.prize5,
            prize6: oneCompEdit.prize6,
            prize7: oneCompEdit.prize7,
            prize8: oneCompEdit.prize8,
            registration_schedule: oneCompEdit.registration_schedule,
        })
    }
      }, [user, compID])

    //NAVIGATION BACK TO THE COMPETITION DISPLAY PAGE
      function backToComp(id) {
        navigate(`/competition/${id}`)
    }

    let loggedInDisplay 
    if(user){
     loggedInDisplay = (
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

                    <div className="war-entries">
                    <label> What is the schedule? </label>
                    <input
                    type="text"
                    name="schedule"
                    value={formik.values.schedule}
                    onChange={formik.handleChange}
                    />
                    </div>

                    <div className="war-entries">
                    <label> Contact information </label>
                    <input
                    type="text"
                    name="contact"
                    value={formik.values.contact}
                    onChange={formik.handleChange}
                    />
                    </div>

                    <div className="war-entries">
                    <label> Location? </label>
                    <input
                    type="text"
                    name="location"
                    value={formik.values.location}
                    onChange={formik.handleChange}
                    />
                    </div>

                    <div className="war-entries">
                    <label> Requirements </label>
                    <input
                    type="text"
                    name="requirements"
                    value={formik.values.requirements}
                    onChange={formik.handleChange}
                    />
                    </div>

                    <div className="war-entries">
                    <label> What are the tasks? </label>
                    <input
                    type="text"
                    name="competition_tasks"
                    value={formik.values.competition_tasks}
                    onChange={formik.handleChange}
                    />
                    </div>

                    <div className="war-entries">
                    <label> What safety measures are being taken? </label>
                    <input
                    type="text"
                    name="safety_measures"
                    value={formik.values.safety_measures}
                    onChange={formik.handleChange}
                    />
                    </div>

                    <div className="war-entries">
                    <label> Prize 1 </label>
                    <input
                    type="text"
                    name="prize1"
                    value={formik.values.prize1}
                    onChange={formik.handleChange}
                    />
                    </div>

                    <div className="war-entries">
                    <label> Prize 2 </label>
                    <input
                    type="text"
                    name="prize2"
                    value={formik.values.prize2}
                    onChange={formik.handleChange}
                    />
                    </div>

                    <div className="war-entries">
                    <label> Prize 3 </label>
                    <input
                    type="text"
                    name="prize3"
                    value={formik.values.prize3}
                    onChange={formik.handleChange}
                    />
                    </div>

                    <div className="war-entries">
                    <label> Prize 4 </label>
                    <input
                    type="text"
                    name="prize4"
                    value={formik.values.prize4}
                    onChange={formik.handleChange}
                    />
                    </div>

                    <div className="war-entries">
                    <label> Prize 5 </label>
                    <input
                    type="text"
                    name="prize5"
                    value={formik.values.prize5}
                    onChange={formik.handleChange}
                    />
                    </div>

                    <div className="war-entries">
                    <label> Prize 6 </label>
                    <input
                    type="text"
                    name="prize6"
                    value={formik.values.prize6}
                    onChange={formik.handleChange}
                    />
                    </div>

                    <div className="war-entries">
                    <label> Prize 7 </label>
                    <input
                    type="text"
                    name="prize7"
                    value={formik.values.prize7}
                    onChange={formik.handleChange}
                    />
                    </div>

                    <div className="war-entries">
                    <label> Prize 8 </label>
                    <input
                    type="text"
                    name="prize8"
                    value={formik.values.prize8}
                    onChange={formik.handleChange}
                    />
                    </div>

                    <div className="war-entries">
                    <label> What is the registration schedule? </label>
                    <input
                    type="text"
                    name="registration_schedule"
                    value={formik.values.registration_schedule}
                    onChange={formik.handleChange}
                    />
                    </div>
                
                <button type="submit" className=""> Submit! </button>
                <button onClick={() => backToComp(compID)}> BACK BUTTON</button>
                

            </form>

        </div>

    )}
    
    const loggedOutDisplay=(
        <div>
            <p> Sorry, but you must be logged in to edit a War!</p>
        
            <Link to='/login'>
            <button> Login </button>
            </Link>

        </div>
    )

    // console.log(user)



    return (
        <>
        {user && user.id === oneCompEdit.user_id ? loggedInDisplay : loggedOutDisplay }
        </>
    )
}

export default CompetitionEdit;