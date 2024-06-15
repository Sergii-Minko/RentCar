import css from "./LoadMoreBtn.module.css";

const LoadMoreBtn = ({ onClik }) => {
  return (
    <div className={css.container}>
      <button className={css.btn} onClick={onClik}>
        Load more
      </button>
    </div>
  );
};
export default LoadMoreBtn;
