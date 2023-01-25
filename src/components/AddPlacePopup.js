import PopupWithForm from "./PopupWithForm";
import { useFormWithValidation } from "./useFormWithValidation";

function AddPlacePopup({ isOpen, onClose, onAddPlace }) {
  const { values, handleChange, errors, isValid, resetForm } = useFormWithValidation();

  function handleSubmit(e) {
    // Запрещаем браузеру переходить по адресу формы
    e.preventDefault();

    console.log(values);
    // Передаём значения управляемых компонентов во внешний обработчик
    onAddPlace(values);
    resetForm();
  }

  return (
    <PopupWithForm
      name="new-card"
      title="Новое место"
      ariaLable="Всплывающее окно: Добавить карточку"
      isOpen={isOpen}
      onClose={onClose}
      isValid={isValid}
      onSubmit={handleSubmit}
      buttonSubmitText="Создать">
      <div className="form__inputs-container">
        <label className="form__input-wrap">
          <input
            type="text"
            placeholder="Название"
            value={values.placeName ? values.placeName : ""}
            onChange={handleChange}
            className={
              "form__input form__input_type_place-name" +
              (errors.placeName ? " form__input_type_error" : "")
            }
            id="form__input_type_place-name"
            name="placeName"
            minLength="2"
            maxLength="30"
            required
          />
          <span
            className={"form__error" + (errors.placeName ? " form__error_visible" : "")}
            id="form__input_type_place-name-error">
            {errors.placeName}
          </span>
        </label>

        <label className="form__input-wrap">
          <input
            type="url"
            placeholder="Ссылка на картинку"
            value={values.placeLink ? values.placeLink : ""}
            onChange={handleChange}
            name="placeLink"
            className={
              "form__input form__input_type_image-link" +
              (errors.placeLink ? " form__input_type_error" : "")
            }
            id="form__input_type_image-link"
            required
          />
          <span
            className={"form__error" + (errors.placeLink ? " form__error_visible" : "")}
            id="form__input_type_image-link-error">
            {errors.placeLink}
          </span>
        </label>
      </div>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
