function Card(props) {
  const isCardLikedByMe = props.cardData.likes.some((ownerData) => {
    return ownerData._id === props.myId;
  });

  function handleClick() {
    props.onCardClick(props.cardData);
  }

  return (
    <li className="element">
      <img
        src={props.cardData.link}
        alt={props.cardData.name}
        onClick={handleClick}
        className="element__image"
      />

      {props.cardData.owner._id === props.myId && (
        <button type="button" aria-label="Удалить" className="button button_type_delete"></button>
      )}

      <div className="element__footer">
        <p className="element__caption">{props.cardData.name}</p>
        <div className="element__like-wrap">
          <button
            type="button"
            aria-label="Нравится"
            className={`button button_type_like ${
              isCardLikedByMe ? "button_active" : ""
            }`}></button>
          <p className="element__like-count">{props.cardData.likes.length}</p>
        </div>
      </div>
    </li>
  );
}

export default Card;
