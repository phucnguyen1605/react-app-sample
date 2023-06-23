import React, { useState, useRef, Fragment } from "react";

import Card from "../UI/Card/Card";
import classes from "./Auth.module.css";
import Button from "../UI/Button/Button";

const SignupForm = () => {
  const [isFormValid, setIsFormValid] = useState(false);
  const [isShowForm, setShowForm] = useState(true);
  const [message, setMessage] = useState("");

  const emailInput = useRef<HTMLInputElement>(null);
  const fullnameInput = useRef<HTMLInputElement>(null);
  const passwordInput = useRef<HTMLInputElement>(null);

  const checkFomValidHandler = () => {
    if (
      (emailInput.current && emailInput.current.value === "") ||
      (fullnameInput.current && fullnameInput.current.value === "") ||
      (passwordInput.current && passwordInput.current.value === "")
    ) {
      setIsFormValid(false);
      return;
    }
    setIsFormValid(true);
  };

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isFormValid) {
      return;
    }
    const signupAPI =
      process.env.REACT_APP_API_GOLANG_HOST !== undefined
        ? process.env.REACT_APP_API_GOLANG_HOST + "/users"
        : "http://localhost:8080/users";
    const signupData = {
      email: emailInput.current ? emailInput.current.value : "",
      full_name: fullnameInput.current ? fullnameInput.current.value : "",
      password: passwordInput.current ? passwordInput.current.value : "",
    };
    fetch(signupAPI, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(signupData),
    })
      .then((reponse) => {
        if (reponse.status === 201) {
          setMessage("Signup successfully");
          setShowForm(false);
          return;
        }
        setMessage("Signup failed, please check information!");
      })
      .catch((error) => {
        setMessage(error.message);
      });
  };

  return (
    <Fragment>
      <Card className={classes.auth}>
        {message != null && <p className={classes.error}>{message}</p>}
        {isShowForm && (
          <form onSubmit={submitHandler}>
            <div className={classes.control}>
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                ref={emailInput}
                onChange={checkFomValidHandler}
              />
            </div>
            <div className={classes.control}>
              <label htmlFor="fullname">Full Name</label>
              <input
                type="text"
                id="fullname"
                ref={fullnameInput}
                onChange={checkFomValidHandler}
              />
            </div>
            <div className={classes.control}>
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                ref={passwordInput}
                onChange={checkFomValidHandler}
              />
            </div>
            <div className={classes.actions}>
              <Button
                type="submit"
                className={classes.btn}
                disabled={!isFormValid}
              >
                Signup
              </Button>
            </div>
          </form>
        )}
      </Card>
    </Fragment>
  );
};

export default SignupForm;
