import React from 'react'
import { useState } from 'react'
import {FaSignInAlt} from 'react-icons/fa'

function Login() {
    const [formData, setFormDatat] = useState({
        email:'',
        password:'',
    })
    const {email,password,} = formData
    const onChange=(e)=>{
        setFormDatat((prevState)=>({
            ...prevState,
            [e.target.name]:e.target.value,
        }))
    }
    const onSubmit=(e)=>{
        e.preventDefault()
    }

  return (

    <>
        <section className='heading'>
            <h1>
                <FaSignInAlt/>Login
            </h1>
            <p>login your account</p>
        </section>
        <section className='form'>
        <form onSubmit={onSubmit}> 
       
            <div className="form-group">
            
                <input type="email" className='form-control' 
                id="email" 
                name='email' 
                value={email} 
                placeholder='entre email ' 
                onChange={onChange} />
            
            </div>
            <div className="form-group">
            
                <input type="password" className='form-control' 
                id="password" 
                name='password' 
                value={password} 
                placeholder='entre your password ' 
                onChange={onChange} />
            
            </div>
            
            <div className="form-group">
                <button type ='submit' className='btn btn-block'>
                    submit
                </button>
            </div>
            </form>

        </section>
    </>
  )
}

export default Login