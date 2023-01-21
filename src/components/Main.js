import { useEffect, useState, useContext } from "react";
import Card from "./Card";
import defaultAvatarPic from "../images/default_profile_pic.jpg";
import { api } from "../utils/api.js";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Main({ onEditAvatar, onEditProfile, onAddPlace, onCardClick }) {
  const currentUser = useContext(CurrentUserContext);

  const [cards, setCards] = useState([]);

  useEffect(() => {
    api
      .getInitialCards()
      .then((initialCardsFromServer) => {
        setCards(initialCardsFromServer);

        return currentUser;
      })
      .catch((err) => {
        console.log(`Ошибка api промиса из promise.all: ${err}`);
      });
  }, []);

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
            return <Card key={card._id} cardData={card} onCardClick={onCardClick} />;
          })}
        </ul>
      </section>
    </main>
  );
}

export default Main;
