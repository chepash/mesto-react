import { useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Card({ card, onCardClick, onCardLike, onCardDelete }) {
  const currentUser = useContext(CurrentUserContext);

  const isLikedByMe = card.likes.some((ownerData) => {
    return ownerData._id === currentUser._id;
  });

  // Определяем, являемся ли мы владельцем текущей карточки
  const isOwn = card.owner._id === currentUser._id;

  function handleClick() {
    onCardClick(card);
  }

  function handleLikeClick() {
    onCardLike(card);
  }

  function handleDeleteClick() {
    onCardDelete(card);
  }

  return (
    <li className="element">
      <img src={card.link} alt={card.name} onClick={handleClick} className="element__image" />

      {isOwn && (
        <button
          onClick={handleDeleteClick}
          type="button"
          aria-label="Удалить"
          className="button button_type_delete"></button>
      )}

      <div className="element__footer">
        <p className="element__caption">{card.name}</p>
        <div className="element__like-wrap">
          <button
            type="button"
            aria-label="Нравится"
            className={`button button_type_like ${isLikedByMe ? "button_active" : ""}`}
            onClick={handleLikeClick}></button>
          <p className="element__like-count">{card.likes.length}</p>
        </div>
      </div>
    </li>
  );
}

export default Card;
