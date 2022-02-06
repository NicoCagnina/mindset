import styles from './input.module.css';

const Input = (props) => {
  const hasError = !!(props.meta.touched && props.meta.error);
  return (
    <>
      {props.label && <label className={styles.label}>{props.label}</label>}
      <input
        className={`${styles.input} ${!props.meta.active && hasError && styles.inputError}`}
        type={props.type ?? 'text'}
        id={props.id}
        name={props.name}
        value={props.value}
        required={props.required}
        onChange={props.onChange}
        placeholder={props.placeholder}
        pattern={props.pattern}
        disabled={props.disabled}
        {...props.input}
      />
      <div className={styles.messageError}>
        {!props.meta.active && props.meta.touched && props.meta.error}
      </div>
    </>
  );
};

export default Input;
