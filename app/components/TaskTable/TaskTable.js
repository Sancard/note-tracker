import React from 'react';
import * as styles from './TaskTable.css';
import { sumLoggedTime } from '../../utils/utilities';

type Props = {
  data: Array<{
    name: string,
    estimatedHours: number,
    uuid: string
  }>,
  isProjects: boolean,
  click: () => void
};

const taskTemplate = (el) => (
  <React.Fragment>
    <td>{el.name}</td>
    <td>{el.estimatedHours} hours</td>
    <td>{sumLoggedTime(el.loggedTime)}</td>
    <td className={styles.descOverflow}>{el.description}</td>
  </React.Fragment>
);

const projectTemplate = (el) => (
  <React.Fragment>
    <td>{el.name}</td>
    <td>{el.tag}</td>
    <td>{el.sumTasksTime}</td>
  </React.Fragment>
);


const MyComponent = (props: Props) => {
  const data = props.data.map((el) => {
    return (
      <tr key={el.uuid} onClick={() => props.click(el.uuid)}>
        {props.isProjects ? projectTemplate(el) : taskTemplate(el)}
      </tr>
    );
  });

  return (
    <div className={styles.listContainer}>
      <div className={styles.list}>
        <table className="table">
          <thead>
          {props.isProjects ? <tr>
            <td>Project name</td>
            <td>Tag</td>
            <td>Time spent</td>
          </tr> : <tr>
            <td>Task name</td>
            <td>Estimated hours</td>
            <td>Time spent</td>
            <td>Description</td>
          </tr>}
          </thead>
          <tbody>
          {data.length > 0 ? data.reverse() : null}
          </tbody>
        </table>
        {data.length < 1 ?
          <p className={styles.emptyTasks}>No {props.isProjects ? 'projects' : 'tasks'} found. Hurry up and create
            some!</p> : null}
      </div>
    </div>
  );
};

export default MyComponent;
