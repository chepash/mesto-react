import { useContext, useState, useEffect } from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

import { useFormWithValidation } from "./useFormWithValidation";

function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
  const currentUser = useContext(CurrentUserContext);

  const { values, handleChange, errors, isValid, resetForm } = useFormWithValidation();

  const [name, setName] = useState(currentUser.name);
  const [description, setDescription] = useState(currentUser.about);

  function handleNameChange(e) {
    setName(e.target.value);
  }

  function handleDescriptionChange(e) {
    setDescription(e.target.value);
  }

  function handleSubmit(e) {
    // Запрещаем браузеру переходить по адресу формы
    e.preventDefault();

    // Передаём значения управляемых компонентов во внешний обработчик
    onUpdateUser({
      name,
      about: description,
    });
  }

  // После загрузки текущего пользователя из API
  // его данные будут использованы в управляемых компонентах.
  useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser]);

  return (
    <PopupWithForm
      name="profile"
      title="Редактировать профиль"
      ariaLable="Всплывающее окно: Редактировать профиль"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      buttonSubmitText="Сохранить">
      <div className="form__inputs-container">
        <label className="form__input-wrap">
          <input
            type="text"
            placeholder="Имя пользователя"
            value={name}
            onChange={handleNameChange}
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
            value={description}
            onChange={handleDescriptionChange}
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
  );
}

export default EditProfilePopup;
