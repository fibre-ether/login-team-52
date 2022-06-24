import React, { useState } from "react";
import axios from "axios";
import { Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

//TODO: Add validation to form

function Login() {
  const history = useNavigate()
  const [mode, setMode] = useState("login");

  function handleModeChange(e) {
    e.preventDefault();
    const newMode = mode === "login" ? "signup" : "login";
    setMode(newMode);
  }

  function validateUserInfo(e) {
    e.preventDefault();
    //checking for both login and signup just in case something goes wrong
    if (mode === "login") {
      console.log("login");
      
      //getting values from form
      const email = e.target[0].value
      const pw = e.target[1].value
      axios
        .post("https://reqres.in/api/users", {
          name: email,
          job: pw,
        })
        .then((response) => {
          console.log(response.data);
          //Only navigate to dashboard if auth is succesful
          history('/')
        })
        .catch((error) => {
          console.log(error);
        });

    } else if (mode === "signup") {
      console.log("signup");
    }
  }

  return (
    <div className="w-full h-screen flex justify-center items-center">
      <Form className="p-5 rounded-xl border-2" onSubmit={validateUserInfo}>
        {/* Name field */}
        {mode === "signup" && (
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Name</Form.Label>
            <Form.Control type="text" placeholder="Enter name" />
          </Form.Group>
        )}

        {/* Email field */}
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          {/* TODO: replace text with email */}
          <Form.Control type="text" placeholder="Enter email" />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        {/* Password field */}
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" />
        </Form.Group>

        {/* Checkbox */}
        {mode === "login" && (
          <Form.Group className="mb-3" controlId="formBasicCheckbox">
            <Form.Check type="checkbox" label="Remember me" />
          </Form.Group>
        )}

        {/* Submit button */}
        <Form.Group className="w-full flex justify-center">
          <Button variant="primary" type="submit">
            {mode === "login" ? "Login" : "Sign Up"}
          </Button>
        </Form.Group>
        {/* Bottom text */}
        <Form.Group className="w-full flex justify-center">
          <Form.Text>
            {mode === "login"
              ? `Don't have an account?`
              : "Already have an account?"}
            <button
              className="mx-1 underline text-blue-500"
              onClick={handleModeChange}>
              Sign up
            </button>
          </Form.Text>
        </Form.Group>
      </Form>
    </div>
  );
}

export default Login;
