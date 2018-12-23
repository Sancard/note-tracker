// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import TaskCard from '../../components/TaskCard/TaskCard';
import * as styles from './HomePage.css';
import routes from '../../constants/routes';

type Props = {
  tasks: {
    tasks: Array
  },
};

class HomePage extends Component<Props> {
  props: Props;


  openTask = (key) => {
    this.props.history.push(routes.TASK +'?uuid=' + key);
  };

  render() {
    const tasks = this.props.tasks.tasks.map((task, index) =>
      (
        <TaskCard key={index} click={() => this.openTask(task.uuid)} name={task.name} description={task.description}
                  estimatedHours={task.estimatedHours} loggedTime={task.loggedTime} />
      )
    );

    return (
      <React.Fragment>
        <div className={styles.tasksGrid}>
          {tasks.length > 0 ? tasks.reverse() : <p className={styles.emptyTasks}>No tasks found. Hurry up and create some!</p>}
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    tasks: state.tasks
  };
};
export default connect(
  mapStateToProps, null)(HomePage);
