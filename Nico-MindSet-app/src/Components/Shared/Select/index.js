import styles from './select.module.css';

const Select = (props) => {
  const hasError = !!(props.meta.touched && props.meta.error);
  return (
    <>
      {props.label && <label className={styles.label}>{props.label}</label>}
      <select
        className={`${styles.select} ${!props.meta.active && hasError && styles.selectError}`}
        name={props.name}
        id={props.id}
        value={props.value}
        onChange={props.onChange}
        required={props.required}
        {...props.input}
      >
        <option value="" disabled>
          Select one
        </option>
        {props.options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <div className={styles.messageError}>
        {!props.meta.active && props.meta.touched && props.meta.error}
      </div>
    </>
  );
};

export default Select;
