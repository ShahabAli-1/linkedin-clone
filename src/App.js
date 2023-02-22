import { onAuthStateChanged } from 'firebase/auth'
import React from 'react'
import { useEffect } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import './App.css'
import Feed from './Components/Feed/Feed'
import Header from './Components/Header/Header'
import Sidebar from './Components/Sidebar/Sidebar'
import { logout, login,selectUser } from './features/userSlice'
import { auth } from './firebase'
import Login from './Login'
import Widget from './Components/Widget/Widget'

const App = () => {
  const user = useSelector(selectUser)
  const dispatch = useDispatch();

  useEffect(() => {
    onAuthStateChanged(auth,user => {
      if (user) {
        //logged in
        dispatch(login({
            email:user.email,
            uid:user.uid,
            displayName:user.displayName,
            photoURL:user.photoURL
        }))
      } else {
        //user logged out
        dispatch(logout())
      }
    })

  }, []);

  return (
    <div className='app'>
    {/* Header */}
    <Header/>

    {!user ? (
      <Login/>
    ):(
      <div className="app__body">
      <Sidebar/>      
      <Feed/>
      <Widget/>
      </div>
    )}
    </div>
  )
}

export default App