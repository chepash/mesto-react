import { useEffect, useState } from "react";
import { api } from "../utils/api.js";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import defaultAvatarPic from "../images/default_profile_pic.jpg";

import { CurrentUserContext } from "../contexts/CurrentUserContext";

function App() {
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = useState(false);
  const [isPopupWithImageOpen, setPopupWithImageOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});

  const [currentUser, setCurrentUser] = useState({ name: "", about: "", avatar: defaultAvatarPic });
  //важно указать у currentUser начальные значения name и about,
  //иначе реакт будет ругаться про начальные значения null или undefined для управляемых инпутов

  useEffect(() => {
    // действия при монтировании
    api
      .getUserInfo()
      .then((userDataFromServer) => {
        setCurrentUser(userDataFromServer);
      })
      .catch((err) => {
        console.log(`Ошибка api промиса getUserInfo: ${err}`);
      });

    // возвращаем действия при размонтировании
    return () => {};
  }, []);

  function handleCardClick(cardData) {
    setPopupWithImageOpen(true);
    setSelectedCard(cardData);
  }

  function handleEditProfileClick() {
    setEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setAddPlacePopupOpen(true);
  }

  function handleEditAvatarClick() {
    setEditAvatarPopupOpen(true);
  }

  function closeAllPopups() {
    setEditProfilePopupOpen(false);
    setAddPlacePopupOpen(false);
    setEditAvatarPopupOpen(false);
    setPopupWithImageOpen(false);
    setSelectedCard({});
  }

  function handleUpdateUser({ name, about }) {
    api
      .sendUserInfo(name, about)
      .then((userDataFromServer) => {
        setCurrentUser(userDataFromServer);
        closeAllPopups();
      })
      .then(() => {})
      .catch((err) => {
        console.log(`Ошибка api промиса sendUserInfo: ${err}`);
      });
  }

  function handleUpdateAvatar({ avatar }) {
    api
      .sendUserAvatar(avatar)
      .then((userDataFromServer) => {
        setCurrentUser(userDataFromServer);
        closeAllPopups();
      })
      .then(() => {})
      .catch((err) => {
        console.log(`Ошибка api промиса sendUserAvatar: ${err}`);
      });
  }

  return (
    <>
      <CurrentUserContext.Provider value={currentUser}>
        <div className="page__container">
          <Header />
          <Main
            onEditAvatar={handleEditAvatarClick}
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            onCardClick={handleCardClick}
          />
          <Footer />
        </div>

        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />

        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />

        {/* popup добавления карточки */}
        <PopupWithForm
          name="new-card"
          title="Новое место"
          ariaLable="Всплывающее окно: Добавить карточку"
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          buttonSubmitText="Создать">
          <div className="form__inputs-container">
            <label className="form__input-wrap">
              <input
                type="text"
                placeholder="Название"
                className="form__input form__input_type_place-name"
                id="form__input_type_place-name"
                name="placeName"
                minLength="2"
                maxLength="30"
                required
              />
              <span className="form__error" id="form__input_type_place-name-error"></span>
            </label>

            <label className="form__input-wrap">
              <input
                type="url"
                placeholder="Ссылка на картинку"
                className="form__input form__input_type_image-link"
                id="form__input_type_image-link"
                name="placeImageLink"
                required
              />
              <span className="form__error" id="form__input_type_image-link-error"></span>
            </label>
          </div>
        </PopupWithForm>

        {/* popup подтверждения удаления */}
        <PopupWithForm
          name="confirmation"
          title="Вы уверены?"
          ariaLable="Всплывающее окно: Подтвердить удаление карточки"
          isOpen={false}
          onClose={closeAllPopups}
          buttonSubmitText="Да"
        />

        {/* popup просмотра изображения */}
        <ImagePopup card={selectedCard} isOpen={isPopupWithImageOpen} onClose={closeAllPopups} />
      </CurrentUserContext.Provider>
    </>
  );
}

export default App;
