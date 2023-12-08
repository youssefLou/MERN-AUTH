import React from 'react'
import { useState,useEffect } from 'react'
import { useSelector, useDispatch} from 'react-redux'
import {useNavigate} from 'react-router-dom'
import {toast} from 'react-toastify'
import {FaUser} from 'react-icons/fa'
import {register,reset } from '../features/auth/authSlice'
import Spinner from '../components/spinner'


function Register() {
    const [formData, setFormDatat] = useState({
        name:'',
        email:'',
        password:'',
        password2:''
    })
    const {name,email,password,password2} = formData
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {user,isLoading,isError,isSeccess,message  }=useSelector((state)=> state.auth)

    const onChange=(e)=>{
        setFormDatat((prevState)=>({
            ...prevState,
            [e.target.name]:e.target.value,
        }))
    }
    useEffect(()=>{
        if(isError){
            toast.error(message)
        }
        if(isSeccess || user){
            navigate('/')
        }
        dispatch(reset())
        
    },[user,isError,isSeccess,message,navigate,dispatch])

    const onSubmit=(e)=>{
        e.preventDefault()

        if (password!== password2){
            toast.error('password do not match')
        }else{
            const userDate ={
                name,
                email,
                password
            }
            dispatch(register(userDate))
        }
    }
    if(isLoading){
        return<Spinner/>
    }

  return (

    <>
        <section className='heading'>
            <h1>
                <FaUser/>Register
            </h1>
            <p>please creat an aacont</p>
        </section>
        <section className='form'>
        <form onSubmit={onSubmit}> 
        <div className="form-group">
                <input type="text" className='form-control' 
                id="name" 
                name='name' 
                value={name} 
                placeholder='entre use name ' 
                onChange={onChange} />
            
            </div>
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
            
                <input type="password" className='form-control' 
                id="password2" 
                name='password2' 
                value={password2} 
                placeholder='confirm your passsword ' 
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

export default Register