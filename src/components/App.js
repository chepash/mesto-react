import { useEffect, useState } from "react";
import { api } from "../utils/api.js";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import defaultAvatarPic from "../images/default_profile_pic.jpg";
import AddPlacePopup from "./AddPlacePopup";

import { CurrentUserContext } from "../contexts/CurrentUserContext";

function App() {
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = useState(false);
  const [isPopupWithImageOpen, setPopupWithImageOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});

  const [currentUser, setCurrentUser] = useState({ name: "", about: "", avatar: defaultAvatarPic });
  //важно указать у currentUser начальные значения name, about,
  //иначе реакт будет ругаться про начальные значения null или undefined для управляемых инпутов

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

  useEffect(() => {
    // действия при монтировании
    api
      .getUserInfo()
      .then((userDataFromServer) => {
        setCurrentUser(userDataFromServer);
      })
      .catch((err) => {
        console.log(`Ошибка api промиса getUserInfo: ${err}`);
      });

    // возвращаем действия при размонтировании
    return () => {};
  }, []);

  function handleCardClick(cardData) {
    setPopupWithImageOpen(true);
    setSelectedCard(cardData);
  }

  function handleEditProfileClick() {
    setEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setAddPlacePopupOpen(true);
  }

  function handleEditAvatarClick() {
    setEditAvatarPopupOpen(true);
  }

  function closeAllPopups() {
    setEditProfilePopupOpen(false);
    setAddPlacePopupOpen(false);
    setEditAvatarPopupOpen(false);
    setPopupWithImageOpen(false);
    setSelectedCard({});
  }

  function handleUpdateUser({ name, about }) {
    api
      .sendUserInfo(name, about)
      .then((userDataFromServer) => {
        setCurrentUser(userDataFromServer);
      })
      .then(() => {
        closeAllPopups();
      })
      .catch((err) => {
        console.log(`Ошибка api промиса sendUserInfo: ${err}`);
      });
  }

  function handleUpdateAvatar({ avatar }) {
    api
      .sendUserAvatar(avatar)
      .then((userDataFromServer) => {
        setCurrentUser(userDataFromServer);
      })
      .then(() => {
        closeAllPopups();
      })
      .catch((err) => {
        console.log(`Ошибка api промиса sendUserAvatar: ${err}`);
      });
  }

  function handleAddPlaceSubmit({ name, link }) {
    // api
    //   .sendUserAvatar(avatar)
    //   .then((userDataFromServer) => {
    //     setCurrentUser(userDataFromServer);
    //     closeAllPopups();
    //   })
    //   .then(() => {})
    //   .catch((err) => {
    //     console.log(`Ошибка api промиса sendUserAvatar: ${err}`);
    //   });
    api
      .sendNewCardInfo(name, link)
      .then((newCard) => {
        setCards([newCard, ...cards]);
      })
      .then(() => {
        closeAllPopups();
      })
      .catch((err) => {
        console.log(`Ошибка api sendNewCardInfo: ${err}`);
      })
      .finally(() => {
        //newCardPopup.renderLoading(false);
      });
  }

  return (
    <>
      <CurrentUserContext.Provider value={currentUser}>
        <div className="page__container">
          <Header />
          <Main
            onEditAvatar={handleEditAvatarClick}
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            onCardClick={handleCardClick}
            onCardLike={handleCardLike}
            onCardDelete={handleCardDelete}
            cards={cards}
          />
          <Footer />
        </div>

        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />

        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />

        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
        />

        {/* popup подтверждения удаления */}
        <PopupWithForm
          name="confirmation"
          title="Вы уверены?"
          ariaLable="Всплывающее окно: Подтвердить удаление карточки"
          isOpen={false}
          onClose={closeAllPopups}
          buttonSubmitText="Да"
        />

        {/* popup просмотра изображения */}
        <ImagePopup card={selectedCard} isOpen={isPopupWithImageOpen} onClose={closeAllPopups} />
      </CurrentUserContext.Provider>
    </>
  );
}

export default App;
