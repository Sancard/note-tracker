// @flow
import React from 'react';
import styles from './TaskCard.css';
import { sumLoggedTime } from '../../utils/utilities';

type Props = {
  name: string,
  estimatedHours: number,
  description: string,
  tag: string,
  loggedTime: [],
  click: () => void,
  isProjects: boolean
};

const taskTemplate = (props: Props) => (
  <React.Fragment>
    <h3>{props.name}</h3>
    <span className={styles.sectionTitle}>Time spent:</span>
    <p>{sumLoggedTime(props.loggedTime)}</p>
    <span className={styles.sectionTitle}>Estimated:</span>
    <p>{props.estimatedHours} hours</p>
    <span className={styles.sectionTitle}>Description:</span>
    <p className={styles.description}>{props.description}</p>
  </React.Fragment>
);

const projectTemplate = (props: Props) => (
  <React.Fragment>
    <h3>{props.name}</h3>
    <span className={styles.sectionTitle}>Tag:</span>
    <p>{props.tag}</p>
  </React.Fragment>
);


const TaskCard = (props: Props) => {
  return (
    <div onClick={props.click} className={styles.taskCard}>
      {props.isProjects ? projectTemplate(props) : taskTemplate(props)}
    </div>
  );
};

export default TaskCard;
