import { useEffect, useState, useContext } from "react";
import Card from "./Card";
import { api } from "../utils/api.js";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Main({ onEditAvatar, onEditProfile, onAddPlace, onCardClick }) {
  const currentUser = useContext(CurrentUserContext);

  const [cards, setCards] = useState([]);

  useEffect(() => {
    api
      .getCardList()
      .then((CardsFromServer) => {
        setCards(CardsFromServer);
      })
      .catch((err) => {
        console.log(`Ошибка api промиса из promise.all: ${err}`);
      });
  }, []);

  function handleCardLike(currentCard) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLikedByMe = currentCard.likes.some((ownerData) => ownerData._id === currentUser._id);

    // Отправляем запрос в API и получаем обновлённые данные карточки
    api.changeLikeCardStatus(currentCard._id, isLikedByMe).then((newCardFromServer) => {
      setCards((state) =>
        state.map((oldCard) => (oldCard._id === currentCard._id ? newCardFromServer : oldCard))
      );
    });
  }

  function handleCardDelete(currentCard) {
    // Отправляем запрос в API и получаем обновлённые данные карточки
    api.sendСardDeleteRequest(currentCard._id).then(() => {
      setCards((state) => state.filter((oldCard) => oldCard._id !== currentCard._id));
    });
  }

  return (
    <main className="content section section_size_narrow page__content">
      <section className="profile section content__section" aria-label="Профиль автора">
        <div className="profile__avatar-overlay" onClick={onEditAvatar}>
          <img src={currentUser.avatar} alt="Картинка профиля" className="profile__avatar" />
        </div>

        <div className="profile__info">
          <p className="profile__name">{currentUser.name}</p>
          <p className="profile__about">{currentUser.about}</p>
          <button
            type="button"
            aria-label="Редактировать"
            className="button button_type_edit"
            onClick={onEditProfile}></button>
        </div>
        <button type="button" className="button button_type_add" onClick={onAddPlace}></button>
      </section>

      <section className="elements section content__section" aria-label="Фотографии">
        <ul className="elements__list page__list">
          {cards.map((card) => {
            return (
              <Card
                key={card._id}
                card={card}
                onCardClick={onCardClick}
                onCardLike={handleCardLike}
                onCardDelete={handleCardDelete}
              />
            );
          })}
        </ul>
      </section>
    </main>
  );
}

export default Main;
