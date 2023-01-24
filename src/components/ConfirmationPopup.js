import PopupWithForm from "./PopupWithForm";

function ConfirmationPopup({ isOpen, onClose, card, onCardDelete }) {
  function handleSubmit(e) {
    // Запрещаем браузеру переходить по адресу формы
    e.preventDefault();

    onCardDelete(card);
  }

  return (
    <PopupWithForm
      name="confirmation"
      title="Вы уверены?"
      ariaLable="Всплывающее окно: Подтвердить удаление карточки"
      isOpen={isOpen}
      onClose={onClose}
      isValid={"true"}
      onSubmit={handleSubmit}
      buttonSubmitText="Да"
    />
  );
}

export default ConfirmationPopup;
