import { useState } from "react";
import { useNavigate } from "react-router";
import styles from "./login.module.css";

export default function Login() {
  const [errors, setErrors] = useState("");
  const navigate = useNavigate();

  const formSubmit = async (formdata) => {
    try {
      const email = formdata.get("email");
      const password = formdata.get("password");

      const formData = { email, password };

      const request = await fetch(import.meta.env.VITE_BLOG_LOGIN, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
        credentials: "include",
      });

      if (!request.ok) {
        const response = await request.json();
        const errorMessage = response.errors?.[0]?.msg || response.msg;

        setErrors(errorMessage);
        return null;
      }
      navigate("/");
      return null;
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className={styles.main}>
      <img src="/logo.svg" alt="admin page logo" />
      <h1>Login Into Your Account</h1>
      <form action={formSubmit} className={styles.form}>
        <div className={styles.formSection}>
          <label htmlFor="email">EMAIL</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="email@example.com"
          />
        </div>
        <div className={styles.formSection}>
          <label htmlFor="password">PASSWORD</label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Password"
          />
        </div>
        <button type="submit">LOG IN</button>
        <div>{errors}</div>
      </form>
    </div>
  );
}
