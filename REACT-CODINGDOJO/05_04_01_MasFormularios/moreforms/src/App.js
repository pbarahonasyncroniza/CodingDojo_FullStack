
import React, { useState } from 'react';
import './App.css';


const App=(props) => {

  const [firstName, setFirstName] = useState (""); 
  const [firstNameError, setFirstNameError] = useState ("");
  const [lastName, setLastName] = useState ("");
  const [lastNameError, setLastNameError] = useState ("");
  const [email, setEmail] = useState ("");
  const [emailError, setEmailError] = useState ("");
  const [password, setPassword] = useState ("");
  const [passwordError, setPasswordError] = useState ("");
  const [confirmPassword, setConfirmPassword] = useState ("");
  const [confirmPasswordError, setConfirmPasswordError] = useState ("");
  

 

  
  const handleFirstName = (e) => {
    setFirstName(e.target.value);
    if(e.target.value.length<10 && e.target.value.length >0){
      setFirstNameError("First Name must be at least 2 character")
   }else{
     setFirstName("")
   }  
  }

  const handleLastName = (e) => {
    setLastName(e.target.value);
    if(e.target.value.length<10 && e.target.value.length >0){
      setLastNameError("Second Name must be at least 2 character")
   }else{
     setLastName("")
   }  
  }

  const handleEmail = (e) => {
    setEmail(e.target.value);
    if(e.target.value.length<10 && e.target.value.length >0){
      setEmailError("Email must be at least 8 number  one special Character")
   }else{
    setEmailError("")
   }  
  }

  const handlePassword = (e) => {
    setPassword(e.target.value);
    if(e.target.value.length<10 && e.target.value.length >0){
      setPasswordError("Password must be at least 8 number  one special Character")
   }else{
    setPasswordError("")
   }  
  }

  const handleConfirmPassword = (e) => {
    setConfirmPassword(e.target.value);
    if(e.target.value.length<8 && e.target.value.length >0){
      setConfirmPasswordError("Email must be at least 8 number  one special Character")
   }else{
    setConfirmPasswordError("")
   }  
  }

  return (
    <div className='w-50 mt-4 mx-auto'>
       <form onSubmit={(e)=> e.preventDefault()}>
        <div className='mb-3'>
          <label htmlFor='firstName' className='form-label' >Firts Name</label>
          <input
          type ="text"
          value={firstName}
          onChange ={handleFirstName} 
          />
          {
          firstNameError ?
          <p>{firstNameError}</p>:
          ""}
        </div>

      <div>
        <label htmlFor='lastName'>Last Name</label>
        <input
         type ="text"
         value={lastName}
         onChange ={handleLastName} 
         />
         {
          lastNameError ?
         <p>{lastNameError}</p>:
         ""}
      </div>
      
      <div>
        <label htmlFor='Email'>Email</label>
        <input
         type ="text"
         value={email}
         onChange ={handleEmail} 
         />
         {
          emailError ?
         <p>{emailError}</p>:
         ""}
      </div>    

      <div>
        <label htmlFor='password'>PassWord</label>
        <input
         type ="password"
         value={password}
         onChange ={handlePassword} 
         />
         {
          passwordError ?
         <p>{passwordError}</p>:
         ""}
      </div>        

      <div>
        <label htmlFor='confirmPassword'>PassWord</label>
        <input
         type ="password"
         value={confirmPassword}
         onChange ={handleConfirmPassword} 
         />
         {
          confirmPasswordError ?
         <p>{confirmPasswordError}</p>:
         ""}
      </div>        

      <button type ="submit" className='btn btn-primary'></button>
     </form>
    </div>
  );
}


export default App;
