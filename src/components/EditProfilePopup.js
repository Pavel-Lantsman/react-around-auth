import React, {useEffect, useContext, useState} from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

export default function EditProfilePopup({isOpen, onClose, onUpdateUser}) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  function handleNameChange(e) {
    // Disallow special characters to prevent XSS
    const filteredValue = e.target.value.replace(/[*|"<>[\]{}`;&$]+/, " ");
    setName(filteredValue);
  }

  function handleDescriptionChange(e) {
    // Disallow special characters to prevent XSS
    const filteredValue = e.target.value.replace(/[*|"<>[\]{}`;&$]+/, " ");
    setDescription(filteredValue);
  }

  // Subscription to the context
  const currentUser = useContext(CurrentUserContext);

  // After loading the current user from the API
  // their data will be used in managed components.
  useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, isOpen]);

  //submit handler:
  function handleSubmit(e) {
    // Prevent the browser from navigating to the form address
    e.preventDefault();

    // Pass the values to the external handler
    onUpdateUser({
      name,
      about: description,
    });
  }

  return (
    <PopupWithForm
      name="profile"
      title="Edit Profile"
      buttonTitle="Save"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <input
        className="popup__form-input"
        id="name-input"
        type="text"
        name="name"
        value={name}
        onChange={handleNameChange}
        placeholder="full name"
        minLength="2"
        maxLength="40"
        required
      />
      <span id="name-input-error"></span>
      <input
        className="popup__form-input"
        id="job-input"
        type="text"
        name="about"
        value={description}
        onChange={handleDescriptionChange}
        placeholder="job title"
        minLength="2"
        maxLength="200"
        required
      />
      <span id="job-input-error"></span>
    </PopupWithForm>
  );
}
