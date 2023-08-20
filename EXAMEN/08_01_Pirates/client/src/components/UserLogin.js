import { useState } from "react";

const LoginUSer = (props) => {

    const [data, setData] = useState ({});

    const loginUser  = () => {

        
    }

    const changeHandler = (e) => {
        let new_data = {
            ...data,
            [e.target.name]: e.target.value
        }


    }


    return (

        <form onSubmit={loginUser}>
           
           <div  className="mt-3 px-2">
                <label className="form-label">Email</label>
                <input className=" form-control" 
                type = "text" 
                value={data ["email"]}
                onChange={changeHandler}/>
                
                <div className="form-text text-danger fw-bold"></div>
            </div>

            <div  className="mt-3 px-2">
                <label className="form-label">Pass Word</label>
                <input className=" form-control"
                 type = "text"
                 value={data ["password"]}
                 onChange={changeHandler}
                 />
                <div className="form-text text-danger fw-bold"></div>
            </div>
            <div className="">
                <button>LogIn</button>

            </div>




        </form>




    )







}

export default  LoginUSer;