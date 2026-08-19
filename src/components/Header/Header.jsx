import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import logoIcon from "../../assets/icons/avion.png";
import "./Header.css";

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const getLinkClassName = ({ isActive }) =>
    isActive
      ? "header__link header__link_active"
      : "header__link";

  const closeMenu = () => setIsMenuOpen(false);

  const toggleMenu = () => setIsMenuOpen((isOpen) => !isOpen);

   useEffect(() => {
    if (!isMenuOpen) {
      return undefined;
    }

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        closeMenu();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isMenuOpen]);

  return (
    <header className="header">
      <div className="header__container">

        <Link to="/" className="header__logo" onClick={closeMenu}>
          <img
            className="header__logo-icon"
            src={logoIcon}
            alt="Travel Atlas logo"
          />

          <span className="header__logo-text">
            ATlas
          </span>
        </Link>

        <nav
          className={`header__nav ${
            isMenuOpen ? "header__nav_open" : ""
          }`}
          aria-label="Main navigation"
        >
          <NavLink
            to="/"
            end
            className={getLinkClassName}
            onClick={closeMenu}
          >
            Home
          </NavLink>

          <Link
            to="/#about"
            className="header__link"
            onClick={closeMenu}
          >
            About
          </Link>
        </nav>

        <button
          className="header__menu-button"
          type="button"
          aria-label={isMenuOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={isMenuOpen}
          onClick={toggleMenu}
        >
          {isMenuOpen ? "✕" : "☰"}
        </button>

      </div>
    </header>
  );
}

export default Header;