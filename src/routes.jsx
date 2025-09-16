import Login from './Login.jsx'
import App from './App.jsx'

const routes =[
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/login",
    element: <Login />,
  }
];

export default routes;