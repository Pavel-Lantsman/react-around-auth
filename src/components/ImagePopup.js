import React from "react";

export default function ImagePopup({card, onClose}) {
  return (
    <div className={`popup popup_type_photo ${card.name ? "popup_opened" : ''}`}>
      <div className="popup__container popup__container_type_photo">
        <button
          className="popup__close-button popup__close-button_type_photo"
          type="button"
          onClick={onClose}
        ></button>
        <div className="popup__photo"  style={{ backgroundImage: `url(${card.link})` }}/>
        <h3 className="popup__text">{card.name}</h3>
      </div>
    </div>
  );
}
