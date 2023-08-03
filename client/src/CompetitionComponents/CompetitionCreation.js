import React from "react";
import { useState } from 'react'
import { useNavigate } from "react-router-dom";
import {useFormik} from "formik"
import { object, string, number} from 'yup'

function CompetitionCreation({user, setCompetitions, competitions}){

    // is there a cost to enter? == Is there an enlistment fee?

    // need way to grab the key

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
            contact: user.email, //user.firstName + " " + user.lastName,
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
            user_id: user.id
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
                            console.log(competition)
                        })
                    } else {
                        res.json().then(error => setError(error)) //for backend errors
                    }
                })
        }
    })

    const loggedInDisplay = (
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

            </form>

        </div>

    )

    const loggedOutDisplay=(
        <div>
            <p> Sorry, but you must be logged in to declare a War!</p>
            {/* Maybe a button here that takes them to login? */}
            {/* Or I could incorporate the functionality here and also allow for them to login here? */}
        </div>
    )



    return (
        <>
        {user ? loggedInDisplay : loggedOutDisplay }
        </>
    )
}

export default CompetitionCreation;


// <div>
//             <form className="war-form" onSubmit={formik.handleSubmit}>
                
//                     {/* display errors from formik/yup */}
//                     { formik.errors && Object.values(formik.errors).map(e => <p>{e}</p>) }

//                     {/* display errors from backend */}
//                     {error && <p>{error}</p>}

//                     <div className="war-entries">
//                     <label> War Title </label>
//                     <input
//                     type="text"
//                     name="title"
//                     value={formik.values.title}
//                     onChange={formik.handleChange}
//                     />
//                     </div>

//                     <div className="war-entries">
//                     <label> The Objective? </label>
//                     <input
//                     type="text"
//                     name="objective"
//                     value={formik.values.objective}
//                     onChange={formik.handleChange}
//                     />
//                     </div>

//                     <div className="war-entries">
//                     <label> Description </label>
//                     <input
//                     type="text"
//                     name="description"
//                     value={formik.values.description}
//                     onChange={formik.handleChange}
//                     />
//                     </div>

//                     <div className="war-entries">
//                     <label> How will it be scored? </label>
//                     <input
//                     type="text"
//                     name="scoring"
//                     value={formik.values.scoring}
//                     onChange={formik.handleChange}
//                     />
//                     </div>

//                     <div className="war-entries">
//                     <label> Is there a cost to enter? </label>
//                     <input
//                     type="text"
//                     name="cost_of_entry"
//                     value={formik.values.cost_of_entry}
//                     onChange={formik.handleChange}
//                     />
//                     </div>

//                     <div className="war-entries">
//                     <label> What is the schedule? </label>
//                     <input
//                     type="text"
//                     name="schedule"
//                     value={formik.values.schedule}
//                     onChange={formik.handleChange}
//                     />
//                     </div>

//                     <div className="war-entries">
//                     <label> Contact information </label>
//                     <input
//                     type="text"
//                     name="contact"
//                     value={formik.values.contact}
//                     onChange={formik.handleChange}
//                     />
//                     </div>

//                     <div className="war-entries">
//                     <label> Location? </label>
//                     <input
//                     type="text"
//                     name="location"
//                     value={formik.values.location}
//                     onChange={formik.handleChange}
//                     />
//                     </div>

//                     <div className="war-entries">
//                     <label> Requirements </label>
//                     <input
//                     type="text"
//                     name="requirements"
//                     value={formik.values.requirements}
//                     onChange={formik.handleChange}
//                     />
//                     </div>

//                     <div className="war-entries">
//                     <label> What are the tasks? </label>
//                     <input
//                     type="text"
//                     name="competition_tasks"
//                     value={formik.values.competition_tasks}
//                     onChange={formik.handleChange}
//                     />
//                     </div>

//                     <div className="war-entries">
//                     <label> What safety measures are being taken? </label>
//                     <input
//                     type="text"
//                     name="safety_measures"
//                     value={formik.values.safety_measures}
//                     onChange={formik.handleChange}
//                     />
//                     </div>

//                     <div className="war-entries">
//                     <label> Prize 1 </label>
//                     <input
//                     type="text"
//                     name="prize1"
//                     value={formik.values.prize1}
//                     onChange={formik.handleChange}
//                     />
//                     </div>

//                     <div className="war-entries">
//                     <label> Prize 2 </label>
//                     <input
//                     type="text"
//                     name="prize2"
//                     value={formik.values.prize2}
//                     onChange={formik.handleChange}
//                     />
//                     </div>

//                     <div className="war-entries">
//                     <label> Prize 3 </label>
//                     <input
//                     type="text"
//                     name="prize3"
//                     value={formik.values.prize3}
//                     onChange={formik.handleChange}
//                     />
//                     </div>

//                     <div className="war-entries">
//                     <label> Prize 4 </label>
//                     <input
//                     type="text"
//                     name="prize4"
//                     value={formik.values.prize4}
//                     onChange={formik.handleChange}
//                     />
//                     </div>

//                     <div className="war-entries">
//                     <label> Prize 5 </label>
//                     <input
//                     type="text"
//                     name="prize5"
//                     value={formik.values.prize5}
//                     onChange={formik.handleChange}
//                     />
//                     </div>

//                     <div className="war-entries">
//                     <label> Prize 6 </label>
//                     <input
//                     type="text"
//                     name="prize6"
//                     value={formik.values.prize6}
//                     onChange={formik.handleChange}
//                     />
//                     </div>

//                     <div className="war-entries">
//                     <label> Prize 7 </label>
//                     <input
//                     type="text"
//                     name="prize7"
//                     value={formik.values.prize7}
//                     onChange={formik.handleChange}
//                     />
//                     </div>

//                     <div className="war-entries">
//                     <label> Prize 8 </label>
//                     <input
//                     type="text"
//                     name="prize8"
//                     value={formik.values.prize8}
//                     onChange={formik.handleChange}
//                     />
//                     </div>

//                     <div className="war-entries">
//                     <label> What is the registration schedule? </label>
//                     <input
//                     type="text"
//                     name="registration_schedule"
//                     value={formik.values.registration_schedule}
//                     onChange={formik.handleChange}
//                     />
//                     </div>
                
//                 <button type="submit" className=""> Submit! </button>

//             </form>

//         </div>