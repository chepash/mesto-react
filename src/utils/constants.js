export const apiOptions = {
  baseUrl: "https://mesto.nomoreparties.co/v1/cohort-55",
  headers: {
    authorization: "8abcd093-addb-4bd1-b00f-f600aa41c00a",
    "Content-Type": "application/json",
  },
};

export const validationConfig = {
  //селекторы с точкой в начале:
  //formSelector: ".form", не используется
  inputSelector: ".form__input",
  //errorSelector: ".form__error", не используется
  submitButtonSelector: ".button_type_submit",

  //классы без точки в начале:
  inactiveButtonClass: "button_disabled",
  inputErrorClass: "form__input_type_error",
  errorClass: "form__error_visible",
};
