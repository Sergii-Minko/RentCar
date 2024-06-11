import { useEffect } from "react";
import { fetchContacts } from "../redux/contactsOps";
import { useDispatch, useSelector } from "react-redux";
import ContactList from "./ContactList/ContactList";
import ContactForm from "./ContactForm/ContactForm";
import SearchBox from "./SearchBox/SearchBox";
import { selectError, selectLoading } from "../redux/selectors";
import Error from "./Error/Error";
import Loader from "./Loader/Loader";
import css from "./App.module.css";

export default function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);
  return (
    <div className={css.container}>
      <h1>Phonebook</h1>
      <ContactForm />
      <SearchBox />
      {error && <Error />}
      {loading && <Loader />}
      {!error && !loading && <ContactList />}
    </div>
  );
}
