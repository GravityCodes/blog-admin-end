import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import "./App.css";
import Posts from "./components/Posts";

function App() {
  const [user, setUser] = useState({});
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [posts, setPosts] = useState(null);
  const [postError, setPostError] = useState(null);

  useEffect(() => {
    async function fethUserData() {
      try {
        const userResponse = await fetch(import.meta.env.VITE_BLOG_USER, {
          credentials: "include",
        });
        if (!userResponse.ok) {
          navigate("/login");
          return;
        } else {
          const user = await userResponse.json();
          setUser(user);
        }
      } catch (error) {
        console.error(error);
        setError(error);
      } finally {
        setLoading(false);
      }
    }

    async function fetchPostData() {
      try {
        const postResponse = await fetch(import.meta.env.VITE_BLOG_POST, {
          credentials: "include",
        });
        const result = await postResponse.json();
        if (!postResponse.ok) {
          setPostError(result);
          return null;
        } else {
          setPosts(result);
        }

        return null;
      } catch (error) {
        console.error(error);
        setPostError(error);
        return null;
      }
    }

    fethUserData();
    fetchPostData();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>A network error has occured</div>;

  return (
    <>
      <div>
        <h1>JohanCodes Admin</h1>
        <p>Welcome back, {user.name}</p>
        <button>Create New Post</button>
        <Posts posts={posts} postError={postError} />
      </div>
    </>
  );
}

export default App;
