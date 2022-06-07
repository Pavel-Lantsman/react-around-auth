import React from "react";
import { Link } from "react-router-dom";
import logoPath from "../images/logo.svg";

export default function Header({ link, text, loggedIn, email, onLogOut}) {
  return (
    <header className="header">
      <img className="header__logo" src={logoPath} alt="around the u.s. logo" />
      <div className="header__container">
        {loggedIn ? (
          <>
            <p className="header__email">{email}</p>
            <Link to={link} className="header__link" onClick={onLogOut}>
              Log Out
            </Link>
          </>
        ) : (
          <>
            <Link to={link} className="header__link">
              {text}
            </Link>
          </>
        )}
      </div>
    </header>
  );
}
