// @flow
import React from 'react';
import styles from './TaskCard.css';


type Props = {
  name: string,
  time: number,
  desc: string
};

const TaskCard = (props: Props) => {
  return (
    <div className={styles.taskCard}>
      <h3>{props.name}</h3>
      <p>{props.time}</p>
      <p>{props.desc}</p>
    </div>
  );
};

export default TaskCard;
