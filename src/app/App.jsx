import { useState, useEffect } from "react";
import Posts from "./components/Posts";
import { Link, useNavigate } from "react-router";
import styles from "./app.module.css";

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

  const logOutUser = async () => {
    try {
      const response = await fetch(import.meta.env.VITE_BLOG_LOGOUT, {
        method: "POST",
        credentials: "include",
      });

      if (!response.ok) {
        console.error("An error has occured:", response.msg);
        return;
      }

      navigate("/login");
    } catch (error) {
      console.error("A server error has occured:", error);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>A network error has occured</div>;

  return (
    <div className={styles.main}>
      <nav className={styles.nav}>
        <h1>JohanCodes Admin</h1>
        <button onClick={logOutUser}>Logout</button>
      </nav>
      <div className={styles.content}>
        <div className={styles.createPost}>
          <Link to="/create-post">
            <img src="/plus-square.svg" alt="Create a new post button" />
          </Link>
          <p>Create New Post</p>
        </div>
        <Posts posts={posts} postError={postError} />
      </div>
    </div>
  );
}

export default App;
