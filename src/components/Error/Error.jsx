import css from "./Error.module.css";
const Error = () => {
  return (
    <div className={css.container}>
      <h2 className={css.title}>{"Sorry, something went wrong"}</h2>
    </div>
  );
};

export default Error;