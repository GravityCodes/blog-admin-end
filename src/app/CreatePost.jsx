import styles from "./createPost.module.css";
import { Link, useNavigate } from "react-router";

const CreatePost = () => {
  const navigate = useNavigate();

  const createPost = async (formdata) => {
    try {
      const title = formdata.get("title");
      const data = { title, content: {}, publish: false };

      const response = await fetch(import.meta.env.VITE_BLOG_POST, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
        credentials: "include",
      });

      if (!response.ok) {
        console.error("An error has occured:", response.msg);
        return;
      }

      console.log("Post has been created");
    } catch (error) {
      console.error("An error has occured:", error);
    }
  };

  return (
    <>
      <div className={styles.nav}>
        <Link to="/">Back</Link>
      </div>
      <form action={createPost}>
        <p>Post will be offline and avaible to edit in the home page.</p>
        <div className={styles["form-field"]}>
          <label htmlFor="title">Title</label>
          <input type="text" name="title" id="title" />
          <button type="submit">Create</button>
        </div>
      </form>
    </>
  );
};

export default CreatePost;
