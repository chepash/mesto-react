import { useContext, useEffect } from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

import { useFormWithValidation } from "./useFormWithValidation";

function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
  const currentUser = useContext(CurrentUserContext);

  const { values, handleChange, errors, isValid, resetForm } = useFormWithValidation();

  function handleSubmit(e) {
    e.preventDefault();
    // Передаём значения управляемых компонентов во внешний обработчик
    onUpdateUser({ name: currentUser.name, about: currentUser.about, ...values });
  }

  useEffect(() => {
    resetForm({ name: currentUser.name, about: currentUser.about }, {}, true);
  }, [isOpen, currentUser]);

  return (
    <PopupWithForm
      name="profile"
      title="Редактировать профиль"
      ariaLable="Всплывающее окно: Редактировать профиль"
      isOpen={isOpen}
      onClose={onClose}
      isValid={isValid}
      onSubmit={handleSubmit}
      buttonSubmitText="Сохранить">
      <div className="form__inputs-container">
        <label className="form__input-wrap">
          <input
            type="text"
            placeholder="Имя пользователя"
            value={values.name ? values.name : currentUser.name}
            onChange={handleChange}
            name="name"
            className={
              "form__input form__input_type_profile-name" +
              (errors.name ? " form__input_type_error" : "")
            }
            id="form__input_type_profile-name"
            minLength="2"
            maxLength="40"
            required
          />
          <span
            className={"form__error" + (errors.name ? " form__error_visible" : "")}
            id="form__input_type_profile-name-error">
            {errors.name}
          </span>
        </label>

        <label className="form__input-wrap">
          <input
            type="text"
            placeholder="Деятельность"
            value={values.about ? values.about : currentUser.about}
            onChange={handleChange}
            name="about"
            className={
              "form__input form__input_type_profile-about" +
              (errors.about ? " form__input_type_error" : "")
            }
            id="form__input_type_profile-about"
            minLength="2"
            maxLength="200"
            required
          />
          <span
            className={"form__error" + (errors.about ? " form__error_visible" : "")}
            id="form__input_type_profile-about-error">
            {errors.about}
          </span>
        </label>
      </div>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
