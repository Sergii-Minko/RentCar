import CarsComponent from "./CarsComponent/CarsComponent";
import Favorites from "./Favorites/Favorites";
import Home from "./Home/Home";
import Layout from "./Layout/Layout";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

const App = () => {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/catalog" element={<CarsComponent />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Layout>
  );
};
export default App;
