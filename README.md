# Проект: Место (версия на react + Хуки)

### Обзор

- Интро
- Реализованный функционал
- Какие технологии используются

**Интро**

- Небольшой проект Место с карточками фотографий и подписями к ним.
- Первый опыт работы с React и использовани Хуков.
- [Ссылка на GitHub Pages](https://chepash.github.io/mesto-react/)

**Реализованный функционал**

- карточки, полученные с сервера, добавляются на страницу с помощью JS;
- при редактировании профиля текст кнопки меняется на: «Сохранение...», пока данные загружаются;
- при наведении указателя мыши на аватар, на нём появляется иконка редактирования;
- при клике на аватар открывается модальное окно редактирования аватарки пользователя;
- карточки отображаются на странице только после получения id пользователя;
- у карточек отображается количество лайков;
- визуальные эфекты при работе с интерактивными элеменетами;
- форма добавления карточки свёрстана, открывается, добавляет карточку;
- работает нажатие на кнопку лайка;
- удаление текущих карточек при нажатии на значок Урны;
- при удалении карточки появляется модальное окно для подтверждения удаления;
- модальные окна закрываются на любых разрешениях экрана;
- модальное окно с картинкой открывается, изображение не теряет пропорции;
- реализовано плавное открытие и закрытие модального окна CSS-стилями;
- для всех полей ввода в формах включена браузерная лайв-валидация;
- кнопка отправки формы неактивна, если хотя бы одно из полей не проходит валидацию;
- модальное окно закрывается по в клику любом месте вне этого окна и по нажатию на Esc.

**Какие технологии используются**

- использование файловой структуры CSS Nested по методолгии БЭМ;
- CSS grid;
- CSS flex;
- JavaScript код объектно-ориентирован:
  - Использованы ES6-классы (только в api.js);
  - работа с Promise и API;
- React:
  - использование утилиты Create React App;
  - Хуки;
  - браузерная валидация реализована с помощью кастомных хуков;
  - использование контекста для функциональных компонент
