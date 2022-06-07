import React, { useEffect } from "react";
import PopupWithForm from "./PopupWithForm";

export default function AddPlacePopup({isOpen, onClose, onAddPlaceSubmit}) {
  const [place, setPlace] = React.useState("");
  const [link, setLink] = React.useState("");

  useEffect(() => {
    setPlace("");
    setLink("");
  }, [isOpen])

  function handlePlaceChange(e) {
    // Disallow special characters to prevent XSS
    const filteredValue = e.target.value.replace(/[*|"<>[\]{}`;&$]+/, " ")
    setPlace(filteredValue);
  }

  function handleLinkChange(e) {
    // Disallow special characters to prevent XSS
    const filteredValue = e.target.value.replace(/[*|"<>[\]{}`;&$]+/, " ")
    setLink(filteredValue);
  }

  function handleSubmit(e) {
    e.preventDefault();

    // Pass the values to the external handler
    onAddPlaceSubmit({
        name: place,
        link: link
    });
  }

  return (
    <PopupWithForm
      name="post"
      title="New place"
      buttonTitle="Create"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <input
        className="popup__form-input"
        id="title-input"
        type="text"
        name="name"
        value={place}
        onChange={handlePlaceChange}
        placeholder="Title"
        minLength="1"
        maxLength="30"
        required
      />
      <span id="title-input-error"></span>
      <input
        className="popup__form-input"
        id="link-input"
        type="url"
        name="link"
        value={link}
        onChange={handleLinkChange}
        placeholder="Image link"
        required
      />
      <span id="link-input-error"></span>
    </PopupWithForm>
  );
}
