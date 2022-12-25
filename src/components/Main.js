import React from "react";
import Card from "./Card";
import defaultAvatarPic from "../images/default_profile_pic.jpg";
import { api } from "../utils/api.js";

function Main(props) {
  const [userName, setUserName] = React.useState("...");
  const [userDescription, setUserDescription] = React.useState("...");
  const [userAvatar, setUserAvatar] = React.useState(defaultAvatarPic);
  const [myId, setMyId] = React.useState("...");
  const [cards, setCards] = React.useState([]);

  React.useEffect(() => {
    Promise.all([api.getUserInfo(), api.getInitialCards()])
      .then(([userDataFromServer, initialCardsFromServer]) => {
        setUserName(userDataFromServer.name);
        setUserDescription(userDataFromServer.about);
        setUserAvatar(userDataFromServer.avatar);
        setMyId(userDataFromServer._id);
        setCards(initialCardsFromServer);

        return userDataFromServer;
      })
      .catch((err) => {
        console.log(`Ошибка api промиса из promise.all: ${err}`);
      });
  }, []);

  return (
    <main className="content section section_size_narrow page__content">
      <section className="profile section content__section" aria-label="Профиль автора">
        <div className="profile__avatar-overlay" onClick={props.onEditAvatar}>
          <img src={userAvatar} alt="Картинка профиля" className="profile__avatar" />
        </div>

        <div className="profile__info">
          <p className="profile__name">{userName}</p>
          <p className="profile__about">{userDescription}</p>
          <button
            type="button"
            aria-label="Редактировать"
            className="button button_type_edit"
            onClick={props.onEditProfile}></button>
        </div>
        <button
          type="button"
          className="button button_type_add"
          onClick={props.onAddPlace}></button>
      </section>

      <section className="elements section content__section" aria-label="Фотографии">
        <ul className="elements__list page__list">
          {cards.map((card) => {
            return (
              <Card key={card._id} cardData={card} myId={myId} onCardClick={props.onCardClick} />
            );
          })}
        </ul>
      </section>
    </main>
  );
}

export default Main;
