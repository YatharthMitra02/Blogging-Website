import React from 'react'
import service from '../appwrite/Config'
import { Link } from 'react-router-dom'



function Postcard({$id , tittle , featuredimage}) {
  return (
    <div>
      // $id - id of the post stored in appwrite data base
      // featuredimage- id of image stored in appwrite database
        <Link to={`/post/${$id}`}>
        <div className='w-full bg-gray-100 rounded-xl pl-4'>
            <div className='w-full justify-center mb-4'>
                <img src={service.getfilepreview(featuredimage)} alt={tittle} className='rounded-xl' />
            </div>
            <h1 className='text-xl font-bold'>
              {tittle} </h1>
        </div>
        </Link>
      
    </div>
  )
}

export default Postcard
