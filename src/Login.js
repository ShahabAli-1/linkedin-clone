import React, { useState } from 'react'
import './Login.css'
import { auth } from './firebase'
import { createUserWithEmailAndPassword,signInWithEmailAndPassword,updateProfile } from 'firebase/auth'
import { useDispatch } from 'react-redux'
import { login } from './features/userSlice'

const Login = () => {
    const [name,setName] = useState("")
    const [password,setPassword] = useState("")
    const [email,setEmail] = useState("")
    const [profilePic,setProfilePic] = useState("")
    const dispatch = useDispatch();

    const register = () => {
        if (!name) {
            return alert("Please Enter a Full Name!")
        } else {
            createUserWithEmailAndPassword(auth,email,password)
            .then(user => {
                updateProfile(user.user,{
                    displayName:name,
                    photoURL:profilePic
                })
                .then(() => {
                    dispatch(login({
                        email: user.user.email,
                        uid: user.user.uid,
                        displayName:name,
                        photoURL:profilePic
                    }))
                })
            })
            .catch(err => alert(err)) 
        }
    }

    const loginToApp = (e) => {
        e.preventDefault()
        signInWithEmailAndPassword(auth,email,password)
        .then(user => {
            dispatch(login({
                email:user.user.email,
                uid:user.user.uid,
                displayName:user.user.displayName,
                photoURL:user.user.photoURL
            }))
        })
        .catch(err => alert(err))
    }


  return (
    <div className='login'>

        <img src="https://www.pngarts.com/files/7/Linkedin-Logo-PNG-Download-Image.png" alt="" />
        <form>
            <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder='Full name (required if registering)'/>
            <input placeholder='Profile pic URL (optional)' value={profilePic} onChange={e => setProfilePic(e.target.value)} type="text" />
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder='Email' />
            <input placeholder='Password' onChange={e => setPassword(e.target.value)} value={password} type="password" />
            <button type='submit' onClick={loginToApp}>Sign In</button>
        </form>

        <p>Not a member?{" "}
            <span className='login__register' onClick={register}>Register Now</span>
        </p>
    </div>
  )
}

export default Login