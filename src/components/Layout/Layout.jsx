import { Suspense } from "react";
import Navigation from "../Navigation/Navigation";
import css from "./Layout.module.css";
// import AppBar from "./AppBar/AppBar";

const Layout = ({ children }) => {
  return (
    <div>
      <header className={css.header}>
        <Navigation />
      </header>
      <Suspense fallback={null}>{children}</Suspense>
    </div>
  );
};
export default Layout;
