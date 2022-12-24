import "./App.css";
import Header from "./Header";

function App() {
  return (
    <div class="page__container">
      <Header />

      <main class="content section section_size_narrow page__content">
        <section class="profile section content__section" aria-label="Профиль автора">
          <div class="profile__avatar-overlay">
            <img
              src="<%=require('./images/default_profile_pic.jpg')%>"
              alt="Картинка профиля"
              class="profile__avatar"
            />
          </div>

          <div class="profile__info">
            <p class="profile__name">...</p>
            <p class="profile__about">...</p>
            <button
              type="button"
              aria-label="Редактировать"
              class="button button_type_edit"></button>
          </div>
          <button type="button" class="button button_type_add"></button>
        </section>

        <section class="elements section content__section" aria-label="Фотографии">
          <ul class="elements__list page__list"></ul>
        </section>
      </main>

      <footer class="footer section section_size_narrow">
        <p class="footer__copyright">&copy; 2022 Mesto Russia</p>
      </footer>
    </div>
  );
}

export default App;
