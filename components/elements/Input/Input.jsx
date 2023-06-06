
import React from "react";
import styles from './index.module.css'

const Input = ({ label, value, onChange }) => {
  const handleChange = (e) => {
    onChange(e.target.value);
  };

  return (
    <div className={styles['input-group']}>
      <p>{label}</p>
      <input type="text" value={value} onChange={handleChange} />
    </div>
  );
};

export default Input;
