import React, {useState, useEffect} from "react";
import { Route, Switch, useHistory } from "react-router-dom";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import ImagePopup from "./ImagePopup";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import api from "../utils/api";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import DeletePostPopup from "./DeletePostPopup";
import Login from "./Login";
import Register from "./Register";
import ProtectedRoute from "./ProtectedRoute";
import * as auth from "../utils/auth";

function App() {
  const history = useHistory();

  //State for edit avatar popup:
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);

  //State for edit profile popup:
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);

  //State for add post popup:
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);

  //State for delete post popup:
  const [isDeletePostPopupOpen, setIsDeletePostPopupOpen] = useState(false);

  //States for info popup:
  const [isInfoPopupOpen, setIsInfoPopupOpen] = useState(false);
  const [infoTitle, setInfoTitle] = useState(false);

  //State for full sized image popup:
  const [selectedCard, setSelectedCard] = useState({
    name: "",
    link: "",
  });

  //State for user data:
  const [currentUser, setCurrentUser] = useState({
    name: "",
    about: "",
    avatar: "",
    _id: "",
  });

  //States for getting initial cards from server:
  const [cards, setCards] = useState([]);

  //State for deleted card
  const [deleteCard, setDeletedCard] = useState({
    _id: "",
  });

  //State for login
  const [loggedIn, setLoggedIn] = useState(false);

  //State for user email
  const [email, setEmail] = useState("");

  //API request for getting initial cards data:
  useEffect(() => {
    api
      .getInitialCards()
      .then((res) => {
        setCards(res);
      })
      .catch(console.log);
  }, []);

  //API request for getting user data:
  useEffect(() => {
    api
      .getUserInfo()
      .then((res) => {
        setCurrentUser(res);
      })
      .catch(console.log);
  }, []);

  // Validate token
  function checkToken() {
    if (localStorage.getItem("jwt")) {
      const jwt = localStorage.getItem("jwt");
      auth
        .getContent(jwt)
        .then((res) => {
          if (res) {
            setLoggedIn(true);
            setEmail(res.data.email);
            history.push("/");
          }
        })
        .catch(console.log);
    }
  }

  // Keep returning users logged in
  useEffect(() => {
    checkToken();
  }, );

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleCardClick(card) {
    setSelectedCard({ name: card.name, link: card.link });
  }

  function handleDeletePostClick(card) {
    setIsDeletePostPopupOpen(true);
    setDeletedCard({ _id: card._id });
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsDeletePostPopupOpen(false);
    setIsInfoPopupOpen(false);
    setSelectedCard({ name: "", link: "" });
  }

  useEffect(() => {
    const closeByEscape = (e) => {
      if (e.key === "Escape") {
        closeAllPopups();
      }
    };

    document.addEventListener("keydown", closeByEscape);

    return () => document.removeEventListener("keydown", closeByEscape);
  }, []);

  useEffect(() => {
    const handleOverlay = (evt) => {
      if (evt.target.classList.contains('popup_opened')) {
        closeAllPopups();
      }
    }

    document.addEventListener('mouseup', handleOverlay)
    return () => document.removeEventListener('mouseup', handleOverlay)
  }, []);

  function handleUpdateUser(newData) {
    api
      .setUserInfo(newData)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch(console.log);
  }

  function handleUpdateAvatar(newData) {
    api
      .setUserAvatar(newData)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch(console.log);
  }

  function handleCardLike(card) {
    // Check if card was already liked:
    const isLiked = card.likes.some((user) => user._id === currentUser._id);
    // Send a request to the API and getting the updated card data
    api
      .changeLikeCardStatus(card._id, isLiked)
      .then((newCard) => {
        setCards((cardsState) =>
          cardsState.map((item) => (item._id === card._id ? newCard : item))
        );
      })
      .catch(console.log);
  }

  function handleCardDelete() {
    api
      .deleteCard(deleteCard._id)
      .then(() => {
        const newCards = cards.filter((item) => item._id !== deleteCard._id);
        setCards(newCards);
        closeAllPopups();
      })
      .catch(console.log);
  }

  function handleAddPlaceSubmit(newData) {
    api
      .createNewCard(newData)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch(console.log);
  }

  function handleLogin(values) {
    auth
      .authorize(values)
      .then(checkToken)
      .catch((err) => {
        console.log(err);
        setIsInfoPopupOpen(true);
      });
  }

  function handleLogOut(){
    setLoggedIn(false);
    localStorage.removeItem('jwt')
  }

  function handleRegister(values) {
    auth
      .register(values)
      .then(() => {
        history.push("/signin");
        setInfoTitle(true);
      })
      .catch((err) => {
        console.log(err);
        setInfoTitle(false);
      })
      .finally(() => {
        setIsInfoPopupOpen(true);
      });
  }

  return (
      <CurrentUserContext.Provider value={currentUser}>
        <div className="content">
          <Switch>
            <Route path="/signup">
              <Header link="/signin" text="Log In" loggedIn={loggedIn} />
              <Register
                onRegister={handleRegister}
                onClose={closeAllPopups}
                isOpen={isInfoPopupOpen}
                isSuccess={infoTitle}
              />
            </Route>
            <Route path="/signin">
              <Header link="/signup" text="Sign Up" loggedIn={loggedIn} />
              <Login
                onLogin={handleLogin}
                onClose={closeAllPopups}
                isOpen={isInfoPopupOpen}
              />
            </Route>
            <ProtectedRoute path="/" loggedIn={loggedIn}>
              <Header
                link="/signin"
                text="Log Out"
                loggedIn={loggedIn}
                email={email}
                onLogOut={handleLogOut}
              />
              <Main
                onEditProfileClick={handleEditProfileClick}
                onAddPlaceClick={handleAddPlaceClick}
                onEditAvatarClick={handleEditAvatarClick}
                onDeletePostClick={handleDeletePostClick}
                onCardClick={handleCardClick}
                cards={cards}
                onCardLike={handleCardLike}
              />
              <Footer />

              <section>
                <EditProfilePopup
                  isOpen={isEditProfilePopupOpen}
                  onClose={closeAllPopups}
                  onUpdateUser={handleUpdateUser}
                />
                <AddPlacePopup
                  isOpen={isAddPlacePopupOpen}
                  onClose={closeAllPopups}
                  onAddPlaceSubmit={handleAddPlaceSubmit}
                />
                <ImagePopup card={selectedCard} onClose={closeAllPopups} />
                <DeletePostPopup
                  isOpen={isDeletePostPopupOpen}
                  onClose={closeAllPopups}
                  onDeletePostSubmit={handleCardDelete}
                />
                <EditAvatarPopup
                  isOpen={isEditAvatarPopupOpen}
                  onClose={closeAllPopups}
                  onUpdateAvatar={handleUpdateAvatar}
                />
              </section>
            </ProtectedRoute>
          </Switch>
        </div>
      </CurrentUserContext.Provider>
  );
}

export default App;
