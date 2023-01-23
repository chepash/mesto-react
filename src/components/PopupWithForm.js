import { useEffect, useContext } from "react";
import { RenderLoadingContext } from "../contexts/RenderLoadingContext";

function PopupWithForm(props) {
  const isLoading = useContext(RenderLoadingContext);

  function handleEscClose(e) {
    if (e.key === "Escape") {
      document.removeEventListener("keydown", handleEscClose);
      props.onClose();
    }
  }

  useEffect(() => {
    document.addEventListener("keydown", handleEscClose);
  }, [props.isOpen]);

  function handlePopupOverlayClick(e) {
    if (e.currentTarget === e.target) {
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
      <div className="popup__container">
        <form
          action="some_URL"
          method="get"
          onSubmit={props.onSubmit}
          className="form"
          name={`form_type_${props.name}`}
          noValidate>
          <h2 className="form__title">{props.title}</h2>

          {props.children}

          {!isLoading && (
            <button type="submit" className="button button_type_submit">
              {props.buttonSubmitText}
            </button>
          )}
          {isLoading && (
            <button type="submit" className="button button_type_submit" disabled>
              Сохранение...
            </button>
          )}
        </form>
      </div>
    </section>
  );
}

export default PopupWithForm;
