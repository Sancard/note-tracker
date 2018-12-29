// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import TaskCard from '../../components/TaskCard/TaskCard';
import * as styles from './Tasks.css';
import routes from '../../constants/routes';
import TaskTable from '../../components/TaskTable/TaskTable';
import NoteButton from '../../components/NoteButton/NoteButton';

type Props = {
  tasks: {
    tasks: Array
  },
  history: {
    push: () => void
  }
};

class Tasks extends Component<Props> {
  props: Props;

  state = {
    listStyle: true
  };

  openTask = (key) => {
    this.props.history.push(routes.TASK + '?uuid=' + key);
  };

  toggleStyle = () => {
    this.setState(prevState => {
      return {
        listStyle: !prevState.listStyle
      };
    });
  };

  onCreateNewTask = () => {
    this.props.history.push('/taskcreator');
  };

  render() {
    const tasksCard = this.props.tasks.tasks.map((task, index) =>
      (
        <TaskCard key={index} click={() => this.openTask(task.uuid)} name={task.name} description={task.description}
                  estimatedHours={task.estimatedHours} loggedTime={task.loggedTime}/>
      )
    );

    const taskGrid = <div className={styles.tasksGrid}>{tasksCard.length > 0 ? tasksCard.reverse() : <p
      className={styles.emptyTasks}>No tasks found. Hurry up and create some!</p>}</div>;

    const taskTable = <div className={styles.taskTable}>
      <TaskTable tasks={this.props.tasks.tasks} click={this.openTask}/>
    </div>;

    const displayTasks = this.state.listStyle ? taskTable : taskGrid;

    const listStyleToggleButton = this.state.listStyle ? <button type="button" onClick={this.toggleStyle}><i
        className="fas fa-th-large"></i></button> :
      <button type="button" onClick={this.toggleStyle}><i className="fas fa-list-ul"></i></button>;


    return (
      <React.Fragment>
        <div className={styles.header}>
          <div>
            <NoteButton onClick={this.onCreateNewTask}>+ Create new task</NoteButton>
          </div>
          <div className={styles.buttons}>
            {listStyleToggleButton}
          </div>
        </div>
        {displayTasks}
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
  mapStateToProps, null)(Tasks);
