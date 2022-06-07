import React from "react";
import PopupWithForm from "./PopupWithForm";

export default function DeletePostPopup({
  isOpen,
  onClose,
  onDeletePostSubmit,
}) {
  function handleSubmit(e) {
    e.preventDefault();
    onDeletePostSubmit();
  }

  return (
    <PopupWithForm
      name="delete"
      title="Are you sure?"
      buttonTitle="Yes"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    />
  );
}
