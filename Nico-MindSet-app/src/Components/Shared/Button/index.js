import styles from './button.module.css';

const Button = ({ onClick, disabled, content, ...moreProps }) => {
  return (
    <button className={styles.button} disabled={disabled} onClick={onClick} {...moreProps}>
      {content}
    </button>
  );
};

export default Button;
