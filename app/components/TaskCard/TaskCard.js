// @flow
import React from 'react';
import styles from './TaskCard.css';
import { sumLoggedTime } from '../../utils/utilities';

type Props = {
  name: string,
  estimatedHours: number,
  description: string,
  click: () => void,
  loggedTime: []
};



const TaskCard = (props: Props) => {
  return (
    <div onClick={props.click} className={styles.taskCard}>
      <h3>{props.name}</h3>
      <span className={styles.sectionTitle}>Logged:</span>
      <p>{sumLoggedTime(props.loggedTime)}</p>
      <span className={styles.sectionTitle}>Estimated:</span>
      <p>{props.estimatedHours} hours</p>
      <span className={styles.sectionTitle}>Description:</span>
      <p className={styles.description}>{props.description}</p>
      {/*<div className={styles.menu}>
        <i className="fas fa-archive"></i>
      </div>*/}
    </div>
  );
};

export default TaskCard;
