import React from "react";

export default function PopupWithForm(props){
    return(
        <div className={`popup popup_type_${props.name} ${props.isOpen ? "popup_opened":''}`} >
          <div className="popup__container">
            <button className="popup__close-button" type="button" onClick={props.onClose}></button>
            <form className="popup__form" name={props.name}  onSubmit={props.onSubmit}>
              <h2 className="popup__form-title">{props.title}</h2>
              {props.children}
              <button className="popup__form-submit-button" type="submit">
                {props.buttonTitle}
              </button>
            </form>
          </div>
        </div>
    );
}