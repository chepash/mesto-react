import { useState } from "react";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";

function App() {
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = useState(false);
  const [isPopupWithImageOpen, setPopupWithImageOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});

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

  return (
    <>
      <div className="page__container">
        <Header />
        <Main
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}
          onEditAvatar={handleEditAvatarClick}
          onCardClick={handleCardClick}
        />
        <Footer />
      </div>

      {/* popup редактирования профиля */}

      <PopupWithForm
        name="profile"
        title="Редактировать профиль"
        ariaLable="Всплывающее окно: Редактировать профиль"
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopups}
        buttonSubmitText="Сохранить">
        <div className="form__inputs-container">
          <label className="form__input-wrap">
            <input
              type="text"
              placeholder="Имя пользователя"
              className="form__input form__input_type_profile-name"
              id="form__input_type_profile-name"
              name="profileName"
              minLength="2"
              maxLength="40"
              required
            />
            <span className="form__error" id="form__input_type_profile-name-error"></span>
          </label>

          <label className="form__input-wrap">
            <input
              type="text"
              placeholder="Деятельность"
              className="form__input form__input_type_profile-about"
              id="form__input_type_profile-about"
              name="profileAbout"
              minLength="2"
              maxLength="200"
              required
            />
            <span className="form__error" id="form__input_type_profile-about-error"></span>
          </label>
        </div>
      </PopupWithForm>

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

      {/* popup редактирования аватара */}
      <PopupWithForm
        name="new-avatar"
        title="Обновить аватар"
        ariaLable="Всплывающее окно: Изменить аватар"
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopups}
        buttonSubmitText="Сохранить">
        <div className="form__inputs-container">
          <label className="form__input-wrap">
            <input
              type="url"
              placeholder="Ссылка на картинку"
              className="form__input form__input_type_avatar-link"
              id="form__input_type_avatar-link"
              name="placeAvatarLink"
              required
            />
            <span className="form__error" id="form__input_type_avatar-link-error"></span>
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
    </>
  );
}

export default App;
