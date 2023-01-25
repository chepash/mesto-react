import { useRef } from "react";
import PopupWithForm from "./PopupWithForm";
import { useFormWithValidation } from "./useFormWithValidation";

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
  //по заданию требуется использовать useRef и работать с input как с неконтролируемым компонент здесь.
  //но при использовании валидации на хуках он всёравно становится контролируемым
  //вроде эти хуки друг другу не мешают, хоть и отпала надобность в useRef
  const { values, handleChange, errors, isValid, resetForm } = useFormWithValidation();

  const avatarInputRef = useRef(); // записываем объект, возвращаемый хуком, в переменную

  function handleSubmit(e) {
    // Запрещаем браузеру переходить по адресу формы
    e.preventDefault();

    // Передаём значения управляемых компонентов во внешний обработчик
    onUpdateAvatar({
      avatarLink: avatarInputRef.current.value,
    });
    //onUpdateAvatar(values);
    resetForm();
    avatarInputRef.current.value = "";
  }

  return (
    <PopupWithForm
      name="new-avatar"
      title="Обновить аватар"
      ariaLable="Всплывающее окно: Изменить аватар"
      isOpen={isOpen}
      onClose={onClose}
      isValid={isValid}
      onSubmit={handleSubmit}
      buttonSubmitText="Сохранить">
      <div className="form__inputs-container">
        <label className="form__input-wrap">
          <input
            type="url"
            placeholder="Ссылка на картинку"
            ref={avatarInputRef}
            value={values.avatarLink ? values.avatarLink : ""}
            onChange={handleChange}
            className={
              "form__input form__input_type_avatar-link" +
              (errors.avatarLink ? " form__input_type_error" : "")
            }
            id="form__input_type_avatar-link"
            name="avatarLink"
            required
          />
          <span
            className={"form__error" + (errors.avatarLink ? " form__error_visible" : "")}
            id="form__input_type_avatar-link-error">
            {errors.avatarLink}
          </span>
        </label>
      </div>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
