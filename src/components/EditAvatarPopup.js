import { useContext, useState, useEffect, useRef } from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
  const currentUser = useContext(CurrentUserContext);

  const avatarInputRef = useRef(); // записываем объект, возвращаемый хуком, в переменную

  function handleSubmit(e) {
    // Запрещаем браузеру переходить по адресу формы
    e.preventDefault();

    // Передаём значения управляемых компонентов во внешний обработчик
    onUpdateAvatar({
      avatar: avatarInputRef.current.value,
    });
  }

  // После загрузки текущего пользователя из API
  // его данные будут использованы в управляемых компонентах.
  // useEffect(() => {
  //   setName(currentUser.name);
  //   setDescription(currentUser.about);
  // }, [currentUser]);

  return (
    <PopupWithForm
      name="new-avatar"
      title="Обновить аватар"
      ariaLable="Всплывающее окно: Изменить аватар"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      buttonSubmitText="Сохранить">
      <div className="form__inputs-container">
        <label className="form__input-wrap">
          <input
            type="url"
            placeholder="Ссылка на картинку"
            ref={avatarInputRef}
            className="form__input form__input_type_avatar-link"
            id="form__input_type_avatar-link"
            name="placeAvatarLink"
            required
          />
          <span className="form__error" id="form__input_type_avatar-link-error"></span>
        </label>
      </div>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
