import React from 'react'
import { useEffect , useState } from 'react'
import { useParams , useNavigate } from 'react-router-dom'
import service from '../appwrite/Config'
import { Container, PostForm } from '../components'
const EditPost = () => {
    const [posts , setposts] = useState(null);
    const {slug} = useParams()
    const navigate = useNavigate();

    useEffect(() => {
        service.getPosts(slug).then((posts) =>{
            if(posts){
                setposts(posts)
            }
            else{
                navigate("/")
            }
        })
     
        
    }, [slug,navigate])
    
  return posts? (
    <div className='py-8'>
        <Container>
            <PostForm/>
        </Container>
    </div>
  ) :null 
   
    
  
}

export default EditPost