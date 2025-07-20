"use client"

import { useState } from "react"
import getUserNames from "../_libs/userData";

// import './signUp.scss';

const SignUp = () => {
  const [formData, setFormData] = useState({
    first_name: null,
    username: null,
    password: null
  });

  const [errorState, setErrorState] = useState({
    first_name: null,
    username: null,
    password: null
  })

  const existingUsernames = getUserNames;

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData({
      ...formData, [name]: value
    });
    setError({
      ...errorState,
      [name]: null,
    });
  }

  function validateForm(event) {
    const errors = {
      first_name: formData.first_name?.length < 3 || !formData.first_name,
      username: formData.username?.length < 3 || !formData.username,
      password: formData.password?.length < 9 || !formData.password
    };
    setErrorState(errors);
    const isValid = !Object.values(errors).includes(true);
    return isValid;
  }
  return (
    <main className="main">
      <section className="">
        <form onSubmit={validateForm}>
          <h1>Sign Up</h1>
        </form>
      </section>

    </main>
  )
}

export default SignUp
