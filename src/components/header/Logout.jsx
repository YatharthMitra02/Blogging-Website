import React from 'react'
import { useDispatch } from 'react-redux'
import authservice from '../../appwrite/Auth'
import { logout } from '../../store/authSlice'

const Logout = () => {
    const dispatch = useDispatch();
    const handleclick = ()=> {
        authservice.logOut().then(()=>
            dispatch(logout())
        ).catch((error) =>console.log('error' , error))
        

    
    }
  return (
 
    <button className='inline-bock px-6 py-2 duration-200 hover:bg-blue-100 rounded-full'
    onClick={handleclick}>
        Logout
    </button>
  )
}

export default Logout