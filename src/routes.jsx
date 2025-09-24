import Login from "./Login.jsx";
import App from "./app/App.jsx";
import EditPost from "./app/EditPost.jsx";

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
];

export default routes;
