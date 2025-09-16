import { useState } from "react";
import { useNavigate } from "react-router";

export default function Login() {
  const [errors, setErrors] = useState("");
  const navigate = useNavigate();

  const formSubmit = async (formdata) => {
    try
    {
    const email = formdata.get("email");
    const password = formdata.get("password");

    const formData = {email, password};

    const request = await fetch(import.meta.env.VITE_BLOG_LOGIN, {
      method: "POST",
      headers : {
        "Content-Type" : "application/json"
      },
      body: JSON.stringify(formData),
      credentials: "include",
      });

    if (!request.ok){
      const response = await request.json();
      const errorMessage = response.errors[0].msg;

      setErrors(errorMessage);
      return null;
    }
    navigate("/");
    return null;

    }catch(error){
      console.error(error);
      }
  };

  return (
    <>
      <h1>Login</h1>
      <form action={formSubmit}>
        <div className="form-field">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" name="email" />
        </div>
        <div className="form-field">
            <label htmlFor="password">Password</label>
            <input type="password" id="password" name="password" />
        </div>
        <button type="submit">Log In</button>
        <div>{errors}</div>
      </form>
    </>
  )
}
