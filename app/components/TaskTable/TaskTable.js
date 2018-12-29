import React from 'react';
import * as styles from './TaskTable.css';
import { sumLoggedTime } from '../../utils/utilities';

type Props = {
  tasks: Array<{
    name: string,
    estimatedHours: number
  }>,
  click: () => void
};

const MyComponent = (props: Props) => {
  const tasks = props.tasks.map((el, index) => {
    return (
      <tr key={index} onClick={() => props.click(el.uuid)}>
        <td>{el.name}</td>
        <td>{el.estimatedHours} hours</td>
        <td>{sumLoggedTime(el.loggedTime)}</td>
        <td className={styles.descOverflow}>{el.description}</td>
      </tr>
    );
  });

  return (
    <div className={styles.listContainer}>
      <div className={styles.list}>
        <table className="table">
          <thead>
            <tr>
              <td>Task name</td>
              <td>Estimated hours</td>
              <td>Logged time</td>
              <td>Description</td>
            </tr>
          </thead>
          <tbody>
            {tasks.length > 0 ? tasks.reverse() : <p className={styles.emptyTasks}>No tasks found. Hurry up and create some!</p>}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyComponent;
