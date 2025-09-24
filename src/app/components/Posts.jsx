import { useState, useEffect } from "react";
import { Link } from "react-router";
import "./posts.css";

const Post = ({ posts, postError }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (posts || postError) {
      setLoading(false);
    }
  }, [posts, postError]);

  if (loading) return <div>Loading...</div>;
  if (postError) return <div>An error has occured</div>;
  return (
    <table>
      <thead>
        <tr>
          <th scope="col">Title</th>
          <th scope="col">Published</th>
          <th scope="col">Created</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {posts.map((post) => {
          return (
            <tr className="post-container" key={post.id}>
              <td>{post.title}</td>
              <td>{post.publish ? "Yes" : "No"}</td>
              <td>{post.timestamp}</td>
              <td>
                <Link to={`/edit-post/${post.id}`}>Edit</Link>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default Post;
