import styles from './deleteBtn.module.css';

const DeleteBtn = ({ onClick, disable }) => {
  return (
    <img
      className={styles.deleteBtn}
      onClick={onClick}
      src={`${process.env.PUBLIC_URL}/assets/images/deleteIcon.png`}
      alt="delete button"
      disable={disable}
    />
  );
};

export default DeleteBtn;
