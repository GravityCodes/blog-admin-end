export default function Login() {
  
  const formSubmit = async (formdata) => {
    const email = formdata.get("email");
    const password = formdata.get("password");

    const request = fetch(import.meta.env.VITE_BLOG_LOGIN, {
      method: "POST",
      headers : {
        "Content-Type" : ""
      }
    });
  }

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
      </form>
    </>
  )
}
