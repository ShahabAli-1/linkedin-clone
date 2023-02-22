import React from 'react'
import './Header.css'
import {useDispatch, useSelector} from 'react-redux'
import SearchIcon from '@mui/icons-material/Search';
import HeaderOption from './HeaderOption/HeaderOption';
import HomeIcon from '@mui/icons-material/Home';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import ChatIcon from '@mui/icons-material/Chat';
import NotificationsIcon from '@mui/icons-material/Notifications';
import {auth} from '../../firebase'
import { signOut } from 'firebase/auth';
import { logout, selectUser } from '../../features/userSlice';


const Header = () => {
  const user = useSelector(selectUser)
  const dispatch = useDispatch()  
  const logoutofapp = () => {
    signOut(auth)
    .then(() => {
      dispatch(logout())
    })
  }

  return (
    <div className='header'>
        {/* HeaderLeft */}
        <div className="header__left">
            <img src="https://www.freepnglogos.com/uploads/linkedin-logo-design-30.png" alt="" />
            <div className="header__search">
                <SearchIcon/>
                <input type="text" placeholder="Search" />
            </div>
        </div>
        {/* HeaderRight */}
        <div className="header__right">
            <HeaderOption title='Home' Icon={HomeIcon}/>
            <HeaderOption title='My Network' Icon={SupervisorAccountIcon}/>
            <HeaderOption title='Jobs' Icon={BusinessCenterIcon}/>
            <HeaderOption title='Chat' Icon={ChatIcon}/>
            <HeaderOption title='Notifications' Icon={NotificationsIcon}/>
            <HeaderOption title={user?.displayName} onClick={logoutofapp} avatar={true}/>
        </div>
    </div>
  )
}

export default Header