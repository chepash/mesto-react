import React from "react";
import defaultAvatarPic from "../images/default_profile_pic.jpg";

function Main(props) {
  return (
    <main className="content section section_size_narrow page__content">
      <section className="profile section content__section" aria-label="Профиль автора">
        <div className="profile__avatar-overlay" onClick={props.onEditAvatar}>
          <img src={defaultAvatarPic} alt="Картинка профиля" className="profile__avatar" />
        </div>

        <div className="profile__info">
          <p className="profile__name">...</p>
          <p className="profile__about">...</p>
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
        <ul className="elements__list page__list"></ul>
      </section>
    </main>
  );
}

export default Main;
