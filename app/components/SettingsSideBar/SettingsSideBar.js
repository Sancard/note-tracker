import React from 'react';
import styles from './SettingsSideBar.css';

const SettingsSideBar = (props) => {
  console.log(props);
  return (
    <div className={styles.container}>
      <p onClick={props.goBack.click}><i className="fas fa-arrow-left"/>&nbsp;&nbsp;&nbsp;Go Back</p>
      <h3>Settings</h3>
      <div className={styles.divider}/>
      <p onClick={props.logOut.click} className={styles.dangerFont}>{props.logOut.label}</p>
    </div>
  );
};

export default SettingsSideBar;
