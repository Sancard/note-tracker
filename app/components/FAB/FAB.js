import React from 'react';
import styles from './FAB.css';

const FAB = (props) => {
  return (
    <button className={styles.fab} onClick={props.click}>
        <i className="fas fa-plus"/>
    </button>
  );
};

export default FAB;
