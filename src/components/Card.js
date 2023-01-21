import { useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Card({ cardData, onCardClick }) {
  const currentUser = useContext(CurrentUserContext);

  const isLikedByMe = cardData.likes.some((ownerData) => {
    return ownerData._id === currentUser._id;
  });

  // Определяем, являемся ли мы владельцем текущей карточки
  const isOwn = cardData.owner._id === currentUser._id;

  function handleClick() {
    onCardClick(cardData);
  }

  return (
    <li className="element">
      <img
        src={cardData.link}
        alt={cardData.name}
        onClick={handleClick}
        className="element__image"
      />

      {isOwn && (
        <button type="button" aria-label="Удалить" className="button button_type_delete"></button>
      )}

      <div className="element__footer">
        <p className="element__caption">{cardData.name}</p>
        <div className="element__like-wrap">
          <button
            type="button"
            aria-label="Нравится"
            className={`button button_type_like ${isLikedByMe ? "button_active" : ""}`}></button>
          <p className="element__like-count">{cardData.likes.length}</p>
        </div>
      </div>
    </li>
  );
}

export default Card;
