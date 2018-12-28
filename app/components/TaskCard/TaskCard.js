// @flow
import React from 'react';
import moment from 'moment';
import styles from './TaskCard.css';

type Props = {
  name: string,
  estimatedHours: number,
  description: string,
  click: () => void,
  loggedTime: []
};

function formatTime(times) {
  const sum = Object.values(times).reduce((a, b) => {
    return a + b;
  }, 0);
  return moment.utc(sum * 1000).format('HH:mm:ss');
}

const TaskCard = (props: Props) => {
  return (
    <div onClick={props.click} className={styles.taskCard}>
      <h3>{props.name}</h3>
      <span className={styles.sectionTitle}>Logged:</span>
      <p>{formatTime(props.loggedTime)}</p>
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
