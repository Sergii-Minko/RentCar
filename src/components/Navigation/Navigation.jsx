import { NavLink } from "react-router-dom";
import css from "./Navigation.module.css";

const Navigation = () => {
  return (
    <nav className={css.nav}>
      <NavLink
        className={({ isActive }) => (isActive ? css.activeLink : css.link)}
        to="/"
      >
        Home
      </NavLink>

      <NavLink
        className={({ isActive }) => (isActive ? css.activeLink : css.link)}
        to="/catalog"
      >
        Catalog
      </NavLink>
      <NavLink
        className={({ isActive }) => (isActive ? css.activeLink : css.link)}
        to="/favorites"
      >
        Favorites
      </NavLink>
    </nav>
  );
};

export default Navigation;
