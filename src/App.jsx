import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router'
import './App.css'
import Post from "./Post";

function App() {
  const [user, setUser] = useState({});
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [post, setPost] = useState(null);
  const [postError, setPostError] = useState(null);
  useEffect(() => {
    async function fethUserData(){
      try{
          const response = await fetch(import.meta.env.VITE_BLOG_USER, {
            credentials: 'include',
          });
          if(!response.ok){
            navigate("/login");
            return;
          } else {
          const user = await response.json();
          setUser(user);
          }
      }catch(error){
        console.error(error);
        setError(error);
      }finally{
        setLoading(false);
      }
    }
    
    async function fetchPostData(){
      try{
        const request = await fetch(import.meta.env.VITE_BLOG_POST, {
          credentials: 'include',
        });

        const result = await request.json()

        if(!request.ok){
          setPostError(result);
          return null;
        }

        setPost(result);
        return null;

      }catch(error){
        console.error(error);
        setPostError(error);
        return null;
      }
    }

    fethUserData();

  }, []);
  
  if(loading) return <div>Loading...</div>
  if(error) return <div>A network error has occured</div>
  
  return (
    <>
      <div>
        <h1>JohanCodes Admin</h1>
        <p>Welcome back, {user.name}</p>
        <Post post={post} postError={postError}/>
      </div>        
    </>
  )
}

export default App
