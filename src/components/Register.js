import React, {useState} from "react";
import { Link } from "react-router-dom";
import InfoTooltip from "./InfoTooltip";
import successPath from "../images/success.svg";
import failPath from "../images/fail.svg";

export default function Register({ onRegister, onClose, isOpen, isSuccess }) {
  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  function handleChange(e) {
    const { name, value} = e.target;
    // Disallow special characters to prevent XSS
    let filteredValue = value.replace(/[*|"<>[\]{}`;&$]+/, " ");
    setValues({...values, [name]: filteredValue});
  }


  //submit handler:
  function handleSubmit(e) {
    // Prevent the browser from navigating to the form address
    e.preventDefault();

    // Pass the values to the external handler
    onRegister( values )
  }

  return (
    <>
      <div className="signing">
        <h1 className="signing__title">Sign Up</h1>
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
          <button className="signing__form-submit-button" type="submit">Sign Up</button>
        </form>
        <Link to="/signin" className="signing__link" >Already a member? Log in here!</Link>
      </div>
      <InfoTooltip
                isOpen={isOpen}
                name="info"
                title={
                  isSuccess
                    ? "Success! You have now been registered."
                    : "Oops, something went wrong! Please try again."
                }
                src={isSuccess ? successPath : failPath}
                onClose={onClose}
              />
    </>
  );
}
