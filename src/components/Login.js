import React, {useState} from "react";
import { Link } from "react-router-dom";
import InfoTooltip from "./InfoTooltip";
import failPath from "../images/fail.svg";

export default function Login({ onLogin, onClose, isOpen }) {
  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  function handleChange(e) {
    const { name, value } = e.target;
    // Disallow special characters to prevent XSS
    let filteredValue = value.replace(/[*|"<>[\]{}`;&$]+/, " ");
    setValues( {...values, [name]: filteredValue} );
  }

  //submit handler:
  function handleSubmit(e) {
    // Prevent the browser from navigating to the form address
    e.preventDefault();

    // Pass the values to the external handler
    onLogin(values)
  }

  return (
    <>
      <div className="signing">
        <h1 className="signing__title">Log In</h1>
        <form className="signing__form" onSubmit={handleSubmit}>
          <input
            className="signing__form-input"
            name="email"
            placeholder="Email"
            required
            type="email"
            value={values.email}
            onChange={handleChange}
          ></input>
          <input
            className="signing__form-input"
            name="password"
            placeholder="Password"
            required
            type="password"
            value={values.password}
            onChange={handleChange}
          ></input>
          <button className="signing__form-submit-button" type="submit">Log In</button>
        </form>
        <Link to="/signup" className="signing__link">Not a member yet? Sign up here!</Link>
      </div>
      <InfoTooltip
                isOpen={isOpen}
                name="info"
                title= "Oops, something went wrong! Please try again."
                src={failPath}
                onClose={onClose}
              />
    </>
  );
}
