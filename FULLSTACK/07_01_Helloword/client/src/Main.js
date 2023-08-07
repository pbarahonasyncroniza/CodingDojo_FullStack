import React , {useEffect, useState} from 'react';

import axios from 'axios';
import { response } from 'express';

export default () => {

    const[message, setMessage] = useState("Loading...");

    useEffect(()=>
        axios.get("http://localhoost:8000/api")
        .then(response =>{
            setMessage(response.data.message)
        })    
    ),[]

    return (
        <div>

            <h2>Message From the backend: {message}</h2>

        </div>



    
    )






}