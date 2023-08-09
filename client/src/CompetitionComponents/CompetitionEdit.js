import React from "react";
import { useEffect, useState } from 'react'
import { Link, useNavigate } from "react-router-dom";
import {useFormik} from "formik"
import { object, string, number} from 'yup'

function CompetitionEdit({user, compID, updateCompetition}){

    // is there a cost to enter? == Is there an enlistment fee?

    //Page breaking on refresh

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

    
    //NAVIGATION BACK TO THE COMPETITION DISPLAY PAGE
    function backToComp(id) {
        navigate(`/competition/${id}`)
    }

    // USE EFFECT TO INPUT THE DATA UPON ONECOMPEDIT AND USER EXISTING
    useEffect(() => {
        if (user && oneCompEdit){
        formik.setValues({
            title: oneCompEdit.title,
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
      }, [user, compID, oneCompEdit])


    let loggedInDisplay 
    if(user && formik && oneCompEdit){
     loggedInDisplay = (
        // <div>
        //     <form className="war-form" onSubmit={formik.handleSubmit}>
                
        //             {/* display errors from formik/yup */}
        //             { formik.errors && Object.values(formik.errors).map(e => <p>{e}</p>) }

        //             {/* display errors from backend */}
        //             {error && <p>{error}</p>}

        //             <div className="war-entries">
        //             <label> War Title </label>
        //             <input
        //             type="text"
        //             name="title"
        //             value={formik.values.title}
        //             onChange={formik.handleChange}
        //             />
        //             </div>

        //             <div className="war-entries">
        //             <label> The Objective? </label>
        //             <input
        //             type="text"
        //             name="objective"
        //             value={formik.values.objective}
        //             onChange={formik.handleChange}
        //             />
        //             </div>

        //             <div className="war-entries">
        //             <label> Description </label>
        //             <input
        //             type="text"
        //             name="description"
        //             value={formik.values.description}
        //             onChange={formik.handleChange}
        //             />
        //             </div>

        //             <div className="war-entries">
        //             <label> How will it be scored? </label>
        //             <input
        //             type="text"
        //             name="scoring"
        //             value={formik.values.scoring}
        //             onChange={formik.handleChange}
        //             />
        //             </div>

        //             <div className="war-entries">
        //             <label> Is there a cost to enter? </label>
        //             <input
        //             type="text"
        //             name="cost_of_entry"
        //             value={formik.values.cost_of_entry}
        //             onChange={formik.handleChange}
        //             />
        //             </div>

        //             <div className="war-entries">
        //             <label> What is the schedule? </label>
        //             <input
        //             type="text"
        //             name="schedule"
        //             value={formik.values.schedule}
        //             onChange={formik.handleChange}
        //             />
        //             </div>

        //             <div className="war-entries">
        //             <label> Contact information </label>
        //             <input
        //             type="text"
        //             name="contact"
        //             value={formik.values.contact}
        //             onChange={formik.handleChange}
        //             />
        //             </div>

        //             <div className="war-entries">
        //             <label> Location? </label>
        //             <input
        //             type="text"
        //             name="location"
        //             value={formik.values.location}
        //             onChange={formik.handleChange}
        //             />
        //             </div>

        //             <div className="war-entries">
        //             <label> Requirements </label>
        //             <input
        //             type="text"
        //             name="requirements"
        //             value={formik.values.requirements}
        //             onChange={formik.handleChange}
        //             />
        //             </div>

        //             <div className="war-entries">
        //             <label> What are the tasks? </label>
        //             <input
        //             type="text"
        //             name="competition_tasks"
        //             value={formik.values.competition_tasks}
        //             onChange={formik.handleChange}
        //             />
        //             </div>

        //             <div className="war-entries">
        //             <label> What safety measures are being taken? </label>
        //             <input
        //             type="text"
        //             name="safety_measures"
        //             value={formik.values.safety_measures}
        //             onChange={formik.handleChange}
        //             />
        //             </div>

        //             <div className="war-entries">
        //             <label> Prize 1 </label>
        //             <input
        //             type="text"
        //             name="prize1"
        //             value={formik.values.prize1}
        //             onChange={formik.handleChange}
        //             />
        //             </div>

        //             <div className="war-entries">
        //             <label> Prize 2 </label>
        //             <input
        //             type="text"
        //             name="prize2"
        //             value={formik.values.prize2}
        //             onChange={formik.handleChange}
        //             />
        //             </div>

        //             <div className="war-entries">
        //             <label> Prize 3 </label>
        //             <input
        //             type="text"
        //             name="prize3"
        //             value={formik.values.prize3}
        //             onChange={formik.handleChange}
        //             />
        //             </div>

        //             <div className="war-entries">
        //             <label> Prize 4 </label>
        //             <input
        //             type="text"
        //             name="prize4"
        //             value={formik.values.prize4}
        //             onChange={formik.handleChange}
        //             />
        //             </div>

        //             <div className="war-entries">
        //             <label> Prize 5 </label>
        //             <input
        //             type="text"
        //             name="prize5"
        //             value={formik.values.prize5}
        //             onChange={formik.handleChange}
        //             />
        //             </div>

        //             <div className="war-entries">
        //             <label> Prize 6 </label>
        //             <input
        //             type="text"
        //             name="prize6"
        //             value={formik.values.prize6}
        //             onChange={formik.handleChange}
        //             />
        //             </div>

        //             <div className="war-entries">
        //             <label> Prize 7 </label>
        //             <input
        //             type="text"
        //             name="prize7"
        //             value={formik.values.prize7}
        //             onChange={formik.handleChange}
        //             />
        //             </div>

        //             <div className="war-entries">
        //             <label> Prize 8 </label>
        //             <input
        //             type="text"
        //             name="prize8"
        //             value={formik.values.prize8}
        //             onChange={formik.handleChange}
        //             />
        //             </div>

        //             <div className="war-entries">
        //             <label> What is the registration schedule? </label>
        //             <input
        //             type="text"
        //             name="registration_schedule"
        //             value={formik.values.registration_schedule}
        //             onChange={formik.handleChange}
        //             />
        //             </div>
                
        //         <button type="submit" className=""> Submit! </button>
        //         <button onClick={() => backToComp(compID)}> BACK BUTTON</button>
                

        //     </form>

        // </div>

        <div class="bg-white py-6 sm:py-8 lg:py-12">
  <div class="mx-auto max-w-screen-2xl px-4 md:px-8">

    <div class="mb-10 md:mb-16">
      <h2 class="mb-4 text-center text-2xl font-bold text-gray-800 md:mb-6 lg:text-3xl">Edit your Competition</h2>

      <p class="mx-auto max-w-screen-md text-center text-gray-500 md:text-lg"> Made a mistake when declaring your War? Worry not, you change the details at any time!</p>
    </div>

    <form onSubmit={formik.handleSubmit} class="mx-auto grid max-w-screen-md gap-4 sm:grid-cols-2">

      <div class="sm:col-span-2">
        <label for="title" class="mb-2 inline-block text-sm text-gray-800 sm:text-base">War Title</label>
        <input type="text" name="title" value={formik.values.title} onChange={formik.handleChange} class="w-full rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none ring-indigo-300 transition duration-100 focus:ring" placeholder={formik.values.title}/>
      </div>

      <div class="sm:col-span-2">
        <label for="objective" class="mb-2 inline-block text-sm text-gray-800 sm:text-base"> The Objective?</label>
        <textarea type="text" name="objective" value={formik.values.objective} onChange={formik.handleChange} class="h-64 w-full rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none ring-indigo-300 transition duration-100 focus:ring" placeholder={formik.values.objective}/>
      </div>

      <div class="sm:col-span-2">
        <label for="description" class="mb-2 inline-block text-sm text-gray-800 sm:text-base">Description*</label>
        <textarea type="text" name="description" value={formik.values.description} onChange={formik.handleChange} class="h-64 w-full rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none ring-indigo-300 transition duration-100 focus:ring" placeholder={formik.values.description}/>
      </div>

      <div class="sm:col-span-2">
        <label for="scoring" class="mb-2 inline-block text-sm text-gray-800 sm:text-base">How will it be scored?*</label>
        <textarea type="text" name="scoring" value={formik.values.scoring} onChange={formik.handleChange} class="h-64 w-full rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none ring-indigo-300 transition duration-100 focus:ring" placeholder={formik.values.scoring}/>
      </div>

      <div class="sm:col-span-2">
        <label for="cost_of_entry" class="mb-2 inline-block text-sm text-gray-800 sm:text-base">Is there a cost to enter?</label>
        <input type="text" name="cost_of_entry" value={formik.values.cost_of_entry} onChange={formik.handleChange} class="w-full rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none ring-indigo-300 transition duration-100 focus:ring" placeholder={formik.values.cost_of_entry}/>
      </div>

      <div class="sm:col-span-2">
        <label for="schedule" class="mb-2 inline-block text-sm text-gray-800 sm:text-base">What is the schedule?</label>
        <input type="text" name="schedule" value={formik.values.schedule} onChange={formik.handleChange} class="w-full rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none ring-indigo-300 transition duration-100 focus:ring" placeholder={formik.values.schedule}/>
      </div>

      <div class="sm:col-span-2">
        <label for="contact" class="mb-2 inline-block text-sm text-gray-800 sm:text-base">Contact information</label>
        <input type="text" name="contact" value={formik.values.contact} onChange={formik.handleChange} class="w-full rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none ring-indigo-300 transition duration-100 focus:ring" placeholder={formik.values.contact}/>
      </div>

      <div class="sm:col-span-2">
        <label for="location" class="mb-2 inline-block text-sm text-gray-800 sm:text-base">Location</label>
        <input type="text" name="location" value={formik.values.location} onChange={formik.handleChange} class="w-full rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none ring-indigo-300 transition duration-100 focus:ring" placeholder={formik.values.location}/>
      </div>

      <div class="sm:col-span-2">
        <label for="requirements" class="mb-2 inline-block text-sm text-gray-800 sm:text-base">Requirements</label>
        <input type="text" name="requirements" value={formik.values.requirements} onChange={formik.handleChange} class="w-full rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none ring-indigo-300 transition duration-100 focus:ring" placeholder={formik.values.requirements}/>
      </div>
      
      <div class="sm:col-span-2">
        <label for="competition_tasks" class="mb-2 inline-block text-sm text-gray-800 sm:text-base">What are the tasks?</label>
        <input type="text" name="competition_tasks" value={formik.values.competition_tasks} onChange={formik.handleChange} class="w-full rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none ring-indigo-300 transition duration-100 focus:ring" placeholder={formik.values.competition_tasks}/>
      </div>

      <div class="sm:col-span-2">
        <label for="safety_measures" class="mb-2 inline-block text-sm text-gray-800 sm:text-base">What safety measures are being taken?</label>
        <textarea type="text" name="safety_measures" value={formik.values.safety_measures} onChange={formik.handleChange} class="h-64 w-full rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none ring-indigo-300 transition duration-100 focus:ring" placeholder={formik.values.safety_measures}/>
      </div>

      <div class="sm:col-span-2">
        <label for="prize1" class="mb-2 inline-block text-sm text-gray-800 sm:text-base">Prize 1</label>
        <input type="text" name="prize1" value={formik.values.prize1} onChange={formik.handleChange} class="w-full rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none ring-indigo-300 transition duration-100 focus:ring" placeholder={formik.values.prize1}/>
      </div>

      <div class="sm:col-span-2">
        <label for="prize2" class="mb-2 inline-block text-sm text-gray-800 sm:text-base">Prize 2</label>
        <input type="text" name="prize2" value={formik.values.prize2} onChange={formik.handleChange} class="w-full rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none ring-indigo-300 transition duration-100 focus:ring" placeholder={formik.values.prize2}/>
      </div>

      <div class="sm:col-span-2">
        <label for="prize3" class="mb-2 inline-block text-sm text-gray-800 sm:text-base">Prize 3</label>
        <input type="text" name="prize3" value={formik.values.prize3} onChange={formik.handleChange} class="w-full rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none ring-indigo-300 transition duration-100 focus:ring" placeholder={formik.values.prize3}/>
      </div>

      <div class="sm:col-span-2">
        <label for="prize4" class="mb-2 inline-block text-sm text-gray-800 sm:text-base">Prize 4</label>
        <input type="text" name="prize4" value={formik.values.prize4} onChange={formik.handleChange} class="w-full rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none ring-indigo-300 transition duration-100 focus:ring" placeholder={formik.values.prize4}/>
      </div>

      <div class="sm:col-span-2">
        <label for="prize5" class="mb-2 inline-block text-sm text-gray-800 sm:text-base">Prize 5</label>
        <input type="text" name="prize5" value={formik.values.prize5} onChange={formik.handleChange} class="w-full rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none ring-indigo-300 transition duration-100 focus:ring" placeholder={formik.values.prize5}/>
      </div>

      <div class="sm:col-span-2">
        <label for="prize6" class="mb-2 inline-block text-sm text-gray-800 sm:text-base">Prize 6</label>
        <input type="text" name="prize6" value={formik.values.prize6} onChange={formik.handleChange} class="w-full rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none ring-indigo-300 transition duration-100 focus:ring" placeholder={formik.values.prize6}/>
      </div>

      <div class="sm:col-span-2">
        <label for="prize7" class="mb-2 inline-block text-sm text-gray-800 sm:text-base">Prize 7</label>
        <input type="text" name="prize7" value={formik.values.prize7} onChange={formik.handleChange} class="w-full rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none ring-indigo-300 transition duration-100 focus:ring" placeholder={formik.values.prize7}/>
      </div>

      <div class="sm:col-span-2">
        <label for="prize8" class="mb-2 inline-block text-sm text-gray-800 sm:text-base">Prize 8</label>
        <input type="text" name="prize8" value={formik.values.prize8} onChange={formik.handleChange} class="w-full rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none ring-indigo-300 transition duration-100 focus:ring" placeholder={formik.values.prize8}/>
      </div>

      <div class="sm:col-span-2">
        <label for="registration_schedule" class="mb-2 inline-block text-sm text-gray-800 sm:text-base"> What is the registration schedule?</label>
        <input type="text" name="registration_schedule" value={formik.values.registration_schedule} onChange={formik.handleChange} class="w-full rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none ring-indigo-300 transition duration-100 focus:ring" placeholder={formik.values.registration_schedule}/>
      </div>

      <div class="flex items-center justify-between sm:col-span-2">

        {/* NEED TO CHANGE COLOR */}
        <button type="submit" class="inline-block rounded-lg bg-indigo-500 px-8 py-3 text-center text-sm font-semibold text-white outline-none ring-indigo-300 transition duration-100 hover:bg-indigo-600 focus-visible:ring active:bg-indigo-700 md:text-base">Finished Editing</button>

        <button onClick={() => backToComp(compID)} class="inline-block rounded-lg bg-indigo-500 px-8 py-3 text-center text-sm font-semibold text-white outline-none ring-indigo-300 transition duration-100 hover:bg-indigo-600 focus-visible:ring active:bg-indigo-700 md:text-base">Back</button>

        <span class="text-sm text-gray-500">*Required</span>
      </div>
    </form>

  </div>
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