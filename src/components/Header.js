import logo from "../images/header_logo.svg";

function Header() {
  return (
    <header class="header section">
      <img src={logo} alt="Логотип" class="header__logo" />
    </header>
  );
}

export default Header;
