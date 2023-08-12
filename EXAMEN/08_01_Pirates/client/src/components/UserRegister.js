import { useState} from "react"

const UserRegister  = (props) => {

    const [data, setData] = useState({})

    const createUser = () => {

    }


    const changeHandler = (e) => {
        let new_data = {

            ...data,
            [e.target.name]: e.target.value
        }


    }



    return (
        
        

        <form onSubmit={createUser}>
            <div  className="mt-3 px-2">
                <label className="form-label">First Name</label>
                <input className=" form-control" 
                type = "text" 
                value={data ["fisrt_name"]}
                onChange={changeHandler}/>
                
                <div className="form-text text-danger fw-bold"></div>
            </div>

            <div  className="mt-3 px-2">
                <label className="form-label">Last Name</label>
                <input className=" form-control"
                 type = "text"
                 value={data ["last_name"]}
                 onChange={changeHandler}
                 />
                <div className="form-text text-danger fw-bold"></div>
            </div>

            <div  className="mt-3 px-2">
                <label className="form-label">Email</label>
                <input className=" form-control"
                 type = "text"
                 value={data ["email"]}
                 onChange={changeHandler}
                 />
                <div className="form-text text-danger fw-bold"></div>
            </div>

            <div  className="mt-3 px-2">
                <label className="form-label">PassWord</label>
                <input className=" form-control" 
                type = "text"
                value={data ["password"]}
                onChange={changeHandler}
                
                />
                <div className="form-text text-danger fw-bold"></div>
            </div>

            <div  className="mt-3 px-2">
                <label className="form-label">Repeat PassWord</label>
                <input className=" form-control"
                 type = "text"
                 value={data ["password2"]}
                onChange={changeHandler}
                 
                 />
                <div className="form-text text-danger fw-bold"></div>
            </div>
            <div className="">
                <button>Submit</button>

            </div>

        </form>    

    )

}

export default UserRegister