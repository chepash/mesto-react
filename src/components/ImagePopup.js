import React from "react";

function ImagePopup(props) {
  function handleEscClose(e) {
    if (e.key === "Escape") {
      document.removeEventListener("keydown", handleEscClose);
      props.onClose();
    }
  }

  React.useEffect(() => {
    document.addEventListener("keydown", handleEscClose);
  }, [props.isOpen]);

  function handlePopupOverlayClick(e) {
    if (e.currentTarget === e.target) {
      props.onClose();
    }
  }

  return (
    <section
      className={`popup section popup_type_image ${props.isOpen ? "popup_opened" : ""}`}
      aria-label="Всплывающее окно: Просмотр карточки"
      onClick={handlePopupOverlayClick}>
      <button
        type="button"
        aria-label="Закрыть"
        className="button button_type_close popup__close"
        onClick={props.onClose}></button>
      <figure className="popup__image-container">
        <img className="popup__image" src={props.card.link} alt={props.card.name} />
        <figcaption className="popup__image-caption">{props.card.name}</figcaption>
      </figure>
    </section>
  );
}

export default ImagePopup;
