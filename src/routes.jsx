import Login from "./Login.jsx";
import App from "./app/App.jsx";
import EditPost from "./app/EditPost.jsx";
import CreatePost from "./app/CreatePost.jsx";

const routes = [
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/edit-post/:postId",
    element: <EditPost />,
  },
  {
    path: "/create-post",
    element: <CreatePost />,
  },
];

export default routes;
