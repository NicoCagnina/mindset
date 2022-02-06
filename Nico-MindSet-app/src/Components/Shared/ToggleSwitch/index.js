import styles from './toggleSwitch.module.css';
import React from 'react';

const ToggleSwitch = ({ label, toggled, onClick, disabled }) => {
  return (
    <div className={styles.toggle}>
      {label}{' '}
      <div className={styles.toggle_switch}>
        <input
          type="checkbox"
          className={styles.checkbox}
          name={label}
          id={label}
          defaultChecked={toggled}
          onClick={onClick}
          disabled={disabled}
        />
        <label className={styles.label} htmlFor={label}>
          <span className={styles.inner} />
          <span className={styles.switch} />
        </label>
      </div>
    </div>
  );
};

export default ToggleSwitch;
