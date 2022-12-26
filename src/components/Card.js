function Card({ cardData, myId, onCardClick }) {
  const isCardLikedByMe = cardData.likes.some((ownerData) => {
    return ownerData._id === myId;
  });

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

      {cardData.owner._id === myId && (
        <button type="button" aria-label="Удалить" className="button button_type_delete"></button>
      )}

      <div className="element__footer">
        <p className="element__caption">{cardData.name}</p>
        <div className="element__like-wrap">
          <button
            type="button"
            aria-label="Нравится"
            className={`button button_type_like ${
              isCardLikedByMe ? "button_active" : ""
            }`}></button>
          <p className="element__like-count">{cardData.likes.length}</p>
        </div>
      </div>
    </li>
  );
}

export default Card;
