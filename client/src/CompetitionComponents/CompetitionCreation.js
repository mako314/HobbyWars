import React from "react";
import { useEffect, useState } from 'react'
import { Link, useNavigate } from "react-router-dom";
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
            fetch('/api/competitions', {
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
                            // console.log(competition)
                        })
                    } else {
                        res.json().then(error => setError(error)) //for backend errors
                    }
                })
        }
    })

    useEffect(() => {
        if (user && user.id){
        formik.setValues({
          user_id: user.id,
          contact: user.email
        })
    }
      }, [user])
//------------------------------------------------------------------ LOGIN CONDITIONALS----------------------------------------------------

    const loggedInDisplay = (
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

        //     </form>

        // </div>

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
      
      <div className="sm:col-span-2">
        <label htmlFor="title" className="mb-2 inline-block text-sm text-gray-800 sm:text-base">War Title</label>
        <input type="text" name="title" value={formik.values.title} onChange={formik.handleChange} className="w-full rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none ring-indigo-300 transition duration-100 focus:ring" />
      </div>

      <div className="sm:col-span-2">
        <label htmlFor="objective" className="mb-2 inline-block text-sm text-gray-800 sm:text-base"> The Objective?</label>
        <textarea type="text" name="objective" value={formik.values.objective} onChange={formik.handleChange} className="h-64 w-full rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none ring-indigo-300 transition duration-100 focus:ring"/>
      </div>

      <div className="sm:col-span-2">
        <label htmlFor="description" className="mb-2 inline-block text-sm text-gray-800 sm:text-base">Description*</label>
        <textarea type="text" name="description" value={formik.values.description} onChange={formik.handleChange} className="h-64 w-full rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none ring-indigo-300 transition duration-100 focus:ring"/>
      </div>

      <div className="sm:col-span-2">
        <label htmlFor="compImg" className="mb-2 inline-block text-sm text-gray-800 sm:text-base"> Image! We Currently Only Accept Image Addresses</label>
        <input type="text" name="compImg" value={formik.values.compImg} onChange={formik.handleChange} className="w-full rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none ring-indigo-300 transition duration-100 focus:ring" />
      </div>

      <div className="sm:col-span-2">
        <label htmlFor="scoring" className="mb-2 inline-block text-sm text-gray-800 sm:text-base">How will it be scored?*</label>
        <textarea type="text" name="scoring" value={formik.values.scoring} onChange={formik.handleChange} className="h-64 w-full rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none ring-indigo-300 transition duration-100 focus:ring"/>
      </div>

      <div className="sm:col-span-2">
        <label htmlFor="cost_of_entry" className="mb-2 inline-block text-sm text-gray-800 sm:text-base">Is there a cost to enter?</label>
        <input type="text" name="cost_of_entry" value={formik.values.cost_of_entry} onChange={formik.handleChange} className="w-full rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none ring-indigo-300 transition duration-100 focus:ring" />
      </div>

      <div className="sm:col-span-2">
        <label htmlFor="schedule" className="mb-2 inline-block text-sm text-gray-800 sm:text-base">What is the schedule?</label>
        <input type="text" name="schedule" value={formik.values.schedule} onChange={formik.handleChange} className="w-full rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none ring-indigo-300 transition duration-100 focus:ring" />
      </div>

      <div className="sm:col-span-2">
        <label htmlFor="contact" className="mb-2 inline-block text-sm text-gray-800 sm:text-base">Contact information</label>
        <input type="text" name="contact" value={formik.values.contact} onChange={formik.handleChange} className="w-full rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none ring-indigo-300 transition duration-100 focus:ring" />
      </div>

      <div className="sm:col-span-2">
        <label htmlFor="location" className="mb-2 inline-block text-sm text-gray-800 sm:text-base">Location</label>
        <input type="text" name="location" value={formik.values.location} onChange={formik.handleChange} className="w-full rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none ring-indigo-300 transition duration-100 focus:ring" />
      </div>

      <div className="sm:col-span-2">
        <label htmlFor="requirements" className="mb-2 inline-block text-sm text-gray-800 sm:text-base">Requirements</label>
        <input type="text" name="requirements" value={formik.values.requirements} onChange={formik.handleChange} className="w-full rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none ring-indigo-300 transition duration-100 focus:ring" />
      </div>
      
      <div className="sm:col-span-2">
        <label htmlFor="competition_tasks" className="mb-2 inline-block text-sm text-gray-800 sm:text-base">What are the tasks?</label>
        <textarea type="text" name="competition_tasks" value={formik.values.competition_tasks} onChange={formik.handleChange} className="w-full rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none ring-indigo-300 transition duration-100 focus:ring" />
      </div>

      <div className="sm:col-span-2">
        <label htmlFor="safety_measures" className="mb-2 inline-block text-sm text-gray-800 sm:text-base">What safety measures are being taken?</label>
        <textarea type="text" name="safety_measures" value={formik.values.safety_measures} onChange={formik.handleChange} className="h-64 w-full rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none ring-indigo-300 transition duration-100 focus:ring"/>
      </div>

      <div className="sm:col-span-2">
        <label htmlFor="prize1" className="mb-2 inline-block text-sm text-gray-800 sm:text-base">Prize 1</label>
        <input type="text" name="prize1" value={formik.values.prize1} onChange={formik.handleChange} className="w-full rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none ring-indigo-300 transition duration-100 focus:ring" />
      </div>

      <div className="sm:col-span-2">
        <label htmlFor="prize2" className="mb-2 inline-block text-sm text-gray-800 sm:text-base">Prize 2</label>
        <input type="text" name="prize2" value={formik.values.prize2} onChange={formik.handleChange} className="w-full rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none ring-indigo-300 transition duration-100 focus:ring" />
      </div>

      <div className="sm:col-span-2">
        <label htmlFor="prize3" className="mb-2 inline-block text-sm text-gray-800 sm:text-base">Prize 3</label>
        <input type="text" name="prize3" value={formik.values.prize3} onChange={formik.handleChange} className="w-full rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none ring-indigo-300 transition duration-100 focus:ring" />
      </div>

      <div className="sm:col-span-2">
        <label htmlFor="prize4" className="mb-2 inline-block text-sm text-gray-800 sm:text-base">Prize 4</label>
        <input type="text" name="prize4" value={formik.values.prize4} onChange={formik.handleChange} className="w-full rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none ring-indigo-300 transition duration-100 focus:ring" />
      </div>

      <div className="sm:col-span-2">
        <label htmlFor="prize5" className="mb-2 inline-block text-sm text-gray-800 sm:text-base">Prize 5</label>
        <input type="text" name="prize5" value={formik.values.prize5} onChange={formik.handleChange} className="w-full rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none ring-indigo-300 transition duration-100 focus:ring" />
      </div>

      <div className="sm:col-span-2">
        <label htmlFor="prize6" className="mb-2 inline-block text-sm text-gray-800 sm:text-base">Prize 6</label>
        <input type="text" name="prize6" value={formik.values.prize6} onChange={formik.handleChange} className="w-full rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none ring-indigo-300 transition duration-100 focus:ring" />
      </div>

      <div className="sm:col-span-2">
        <label htmlFor="prize7" className="mb-2 inline-block text-sm text-gray-800 sm:text-base">Prize 7</label>
        <input type="text" name="prize7" value={formik.values.prize7} onChange={formik.handleChange} className="w-full rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none ring-indigo-300 transition duration-100 focus:ring" />
      </div>

      <div className="sm:col-span-2">
        <label htmlFor="prize8" className="mb-2 inline-block text-sm text-gray-800 sm:text-base">Prize 8</label>
        <input type="text" name="prize8" value={formik.values.prize8} onChange={formik.handleChange} className="w-full rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none ring-indigo-300 transition duration-100 focus:ring" />
      </div>

      <div className="sm:col-span-2">
        <label htmlFor="registration_schedule" className="mb-2 inline-block text-sm text-gray-800 sm:text-base"> What is the registration schedule?</label>
        <input type="text" name="registration_schedule" value={formik.values.registration_schedule} onChange={formik.handleChange} className="w-full rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none ring-indigo-300 transition duration-100 focus:ring" />
      </div>

      <div className="flex items-center justify-between sm:col-span-2">

        {/* NEED TO CHANGE COLOR */}
        <button type="submit" className="inline-block rounded-lg bg-indigo-500 px-8 py-3 text-center text-sm font-semibold text-white outline-none ring-indigo-300 transition duration-100 hover:bg-indigo-600 focus-visible:ring active:bg-indigo-700 md:text-base"> Declare War</button>

        <span className="text-sm text-gray-500">*Required</span>
      </div>
    </form>

  </div>
</div>

    )

    // const loggedOutDisplay=(
    //     <div>
    //         <p> Sorry, but you must be logged in to declare a War!</p>
        
    //         <Link to='/login'>
    //         <button> Login </button>
    //         </Link>

    //     </div>
    // )

    function TakeMeToLogin() {
      navigate(`/login`)
    }
  
    function TakeMeHome(){
      navigate(`/`)
    }
  
    const loggedOutDisplay = (
  
        <div className="bg-white py-6 sm:py-8 lg:py-12">
        <div className="mx-auto max-w-screen-lg px-4 md:px-8">
          <div className="grid gap-8 sm:grid-cols-2">
  
            <div className="h-80 overflow-hidden rounded-lg bg-gray-100 shadow-lg md:h-auto">
              <img src="https://images.unsplash.com/photo-1626790680787-de5e9a07bcf2?auto=format&q=75&fit=crop&w=600" loading="lazy" alt="Photo by Theo Crazzolara" className="h-full w-full object-cover object-center" />
            </div>
  
            <div className="flex flex-col items-center justify-center sm:items-start md:py-24 lg:py-32">
              <p className="mb-4 text-sm font-semibold uppercase text-indigo-500 md:text-base">Error</p>
              <h1 className="mb-2 text-center text-2xl font-bold text-gray-800 sm:text-left md:text-3xl"> Sorry, but you must be logged in to declare a War! Are you signed in?</h1>
  
              <p className="mb-4 text-center text-gray-500 sm:text-left md:mb-8 md:text-lg"> All Wars have Instigators! If you think this is a mistake and are logged in, check your route and try again.</p>
  
              <nav className="flex gap-4 sm:block sm:space-y-1 md:space-y-2">
                
                <button onClick={TakeMeHome} className="inline-block rounded-lg bg-indigo-500 px-8 py-3 text-center text-sm font-semibold text-white outline-none ring-indigo-300 transition duration-100 hover:bg-indigo-600 focus-visible:ring active:bg-indigo-700 md:text-base">Take me Home!</button>
  
  
                <br/>
  
                <button onClick={TakeMeToLogin} className="inline-block rounded-lg bg-indigo-500 px-8 py-3 text-center text-sm font-semibold text-white outline-none ring-indigo-300 transition duration-100 hover:bg-indigo-600 focus-visible:ring active:bg-indigo-700 md:text-base">Login</button>
              
              </nav>
            </div>
          </div>
        </div>
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