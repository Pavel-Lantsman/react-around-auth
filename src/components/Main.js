import React, {useContext} from "react";
import Card from "./Card";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

export default function Main({
  onEditProfileClick,
  onAddPlaceClick,
  onEditAvatarClick,
  onDeletePostClick,
  onCardClick,
  cards,
  onCardLike,
}) {
  //Subscribing to user info context:
  const currentUser = useContext(CurrentUserContext);

  return (
    <main>
      <section className="profile">
        <div
          className="profile__avatar-container"
          style={{ backgroundImage: `url("${currentUser.avatar}")` }}
        >
          <button
            className="profile__avatar-edit"
            onClick={onEditAvatarClick}
          ></button>
        </div>
        <div className="profile__info">
          <div className="profile__info-title">
            <h1 className="profile__name">{currentUser.name}</h1>
            <button
              className="profile__edit-button"
              type="button"
              aria-label="edit button"
              onClick={onEditProfileClick}
            ></button>
          </div>
          <p className="profile__job-description">{currentUser.about}</p>
        </div>
        <button
          className="profile__add-button"
          type="button"
          aria-label="add button"
          onClick={onAddPlaceClick}
        ></button>
      </section>

      <section className="gallery">
        <ul className="gallery__list">
          {cards.map((card) => {
            return (
              <Card
                card={card}
                key={card._id}
                onCardClick={onCardClick}
                onCardLike={onCardLike}
                onDeletePostClick={onDeletePostClick}
              />
            );
          })}
        </ul>
      </section>
    </main>
  );
}
