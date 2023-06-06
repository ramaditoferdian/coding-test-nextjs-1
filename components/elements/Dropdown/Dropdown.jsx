import { useState } from 'react';
import styles from './index.module.css';

const Dropdown = ({ options, onSelect, label, initialValue }) => {
  const [selectedOption, setSelectedOption] = useState(initialValue);

  const [isOpenMenu, setIsOpenMenu] = useState(false);

  const handleOpenMenu = () => {
    setIsOpenMenu((state) => !state)
  }

  const handleSelect = (option) => {
    setSelectedOption(option);
    onSelect(option);
    setIsOpenMenu(false);
  };

  return (
    <div className={styles.dropdown}>
      <p>{label}</p>
      <button onClick={handleOpenMenu} className={styles["dropdown-toggle"]}>{selectedOption || 'Select an option'}</button>
      {isOpenMenu && (
        <ul className={styles["dropdown-menu"]}>
          {options.map((option) => (
            <li key={option} onClick={() => handleSelect(option)}>
              { 
                <>
                  {
                    option === 'ascending' ?
                    `${option}${String.fromCharCode(8593)}` 
                    : option === 'descending' ? 
                    `${option}${String.fromCharCode(8595)}` 
                    : option
                  }
                
                </>
              }
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Dropdown;
