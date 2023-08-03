import React from "react";
import { useEffect, useState } from 'react'
import { Link ,useNavigate } from "react-router-dom";
import {useFormik} from "formik"
import { object, string, number} from 'yup'

function HobbyAdd({user, hobbyAdder, setHobbyAdder}) {
    
    const [error, setError] = useState()
    
    const navigate = useNavigate()



    return(

        <div>

        </div>
    )
}

export default HobbyAdd;