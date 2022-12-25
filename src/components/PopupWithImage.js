import React from "react";

function PopupWithImage(props) {
  function handleEscClose(e) {
    if (e.key === "Escape") {
      props.onClose();
    }
  }

  React.useEffect(() => {
    document.addEventListener("keydown", handleEscClose);

    return () => {
      document.removeEventListener("keydown", handleEscClose);
    };
  }, []);

  function handlePopupOverlayClick(e) {
    if (e.currentTarget == e.target) {
      props.onClose();
    }
  }

  return (
    <section
      className={`popup section popup_type_${props.name} ${props.isOpen ? "popup_opened" : ""}`}
      aria-label={`${props.ariaLable}`}
      onClick={handlePopupOverlayClick}>
      <button
        type="button"
        aria-label="Закрыть"
        className="button button_type_close popup__close"
        onClick={props.onClose}></button>
      <figure className="popup__image-container">
        <img className="popup__image" src="#" alt="Название места" />
        <figcaption className="popup__image-caption">Название места</figcaption>
      </figure>
    </section>
  );
}

export default PopupWithImage;
