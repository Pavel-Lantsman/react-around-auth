import React from "react";

export default function InfoToolTip(props) {
    return(
        <div className={`popup popup_type_${props.name} ${props.isOpen ? "popup_opened":''}`} >
          <div className="popup__frame">
            <button className="popup__close-button" type="button" onClick={props.onClose}></button>
            <img src={props.src} className="popup__status-image" alt="request status"></img>
            <h2 className="popup__title">{props.title}</h2>
          </div>
        </div>
    )
}
