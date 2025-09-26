import Styles from "./comments.module.css";
import { useParams, Link } from "react-router";
import { useState, useEffect } from "react";
const Comments = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();
  const { postId } = useParams();
  const [comments, setComments] = useState([]);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_BLOG_COMMENT}/${postId}/comments`, {
      credentials: "include",
    })
      .then((response) => {
        if (!response.ok) {
          console.error("An error has occured:", response.msg);
          return null;
        }
        return response.json();
      })
      .then((data) => {
        if (data) {
          setComments(data.comments);
          setLoading(false);
        }
      })
      .catch((error) => {
        console.error("A server side error has occured:", error);
        setError(error);
      });
  }, []);

  const removeComment = (commentId) => {
    const confirmed = window.confirm("Are you sure you want to delete this?");

    if (confirmed) {
      fetch(
        `${import.meta.env.VITE_BLOG_COMMENT}/${postId}/comments/${commentId}`,
        {
          method: "DELETE",
          credentials: "include",
        },
      )
        .then((response) => {
          if (!response.ok) {
            console.error("An error has occured:", response.msg);
            return null;
          }
          return response.json();
        })
        .then((data) => {
          window.location.reload();
        })
        .catch((error) => {
          console.error("A server error has occured:", error);
        });
    }
  };

  if (error) return <div>{error.message}</div>;
  if (loading) return <div>Loading...</div>;

  return (
    <div>
      {comments.length > 0 ? (
        <div>
          <Link to={`/edit-post/${postId}`}>Back</Link>
          {comments.map((comment) => {
            return (
              <div className={Styles["comment"]} key={comment.id}>
                <p>content: {comment.content}</p>
                <p>user: {comment.user.name}</p>
                <button onClick={() => removeComment(comment.id)}>
                  Remove
                </button>
              </div>
            );
          })}
        </div>
      ) : (
        <div>
          <Link to={`/edit-post/${postId}`}>Back</Link>
          <p>There are no comments on this post</p>
        </div>
      )}
    </div>
  );
};

export default Comments;
