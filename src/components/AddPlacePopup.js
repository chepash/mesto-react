import { useContext, useState } from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function AddPlacePopup({ isOpen, onClose, onAddPlace }) {
  const currentUser = useContext(CurrentUserContext);

  const [placeName, setPlaceName] = useState("");
  const [placeLink, setLink] = useState("");

  function handlePlaceNameChange(e) {
    setPlaceName(e.target.value);
  }

  function handleLinkChange(e) {
    setLink(e.target.value);
  }

  function handleSubmit(e) {
    // Запрещаем браузеру переходить по адресу формы
    e.preventDefault();

    // Передаём значения управляемых компонентов во внешний обработчик
    onAddPlace({
      name: placeName,
      link: placeLink,
    });
  }

  // После загрузки текущего пользователя из API
  // его данные будут использованы в управляемых компонентах.
  // useEffect(() => {
  //   // setName(currentUser.name);
  //   // setDescription(currentUser.about);
  // }, [currentUser]);

  return (
    <PopupWithForm
      name="new-card"
      title="Новое место"
      ariaLable="Всплывающее окно: Добавить карточку"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      buttonSubmitText="Создать">
      <div className="form__inputs-container">
        <label className="form__input-wrap">
          <input
            type="text"
            placeholder="Название"
            value={placeName}
            onChange={handlePlaceNameChange}
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
            value={placeLink}
            onChange={handleLinkChange}
            className="form__input form__input_type_image-link"
            id="form__input_type_image-link"
            name="placeImageLink"
            required
          />
          <span className="form__error" id="form__input_type_image-link-error"></span>
        </label>
      </div>
    </PopupWithForm>
  );
}

export default AddPlacePopup;