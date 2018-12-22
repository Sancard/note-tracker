// @flow
import React from 'react';
import styles from './TaskCard.css';


type Props = {
  name: string,
  time: number,
  desc: string,
  click: () => void
};

const TaskCard = (props: Props) => {
  return (
    <div onClick={props.click} className={styles.taskCard}>
      <h3>{props.name}</h3>
      <span className={styles.sectionTitle}>Logged:</span>
      <p>20 hours</p>
      <span className={styles.sectionTitle}>Estimated:</span>
      <p>{props.time} hours</p>
      <span className={styles.sectionTitle}>Description:</span>
      <p className={styles.description}>{props.desc}</p>
      <div className={styles.menu}>
        <i className="fas fa-archive"></i>
      </div>
    </div>
  );
};

export default TaskCard;
