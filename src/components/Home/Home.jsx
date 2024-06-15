import DocumentTitle from "../Title/Title";
import css from "./Home.module.css";
import { NavLink } from "react-router-dom";

const Home = () => {
  return (
    <>
      <DocumentTitle>Home</DocumentTitle>
      <div className={css.home}>
        <h1 className={css.title}>Welcome to Rent a Car</h1>
        <div className={css.container}></div>
        <p className={css.link}>
          <NavLink to="/favorites" className={css.span}>
            My favorites
          </NavLink>{" "}
          or{" "}
          <NavLink to="/catalog" className={css.span}>
            Catalog
          </NavLink>{" "}
        </p>
      </div>
    </>
  );
};
export default Home;
