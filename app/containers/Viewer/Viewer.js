// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import TaskCard from '../../components/TaskCard/TaskCard';
import * as styles from './Viewer.css';
import routes from '../../constants/routes';
import TaskTable from '../../components/TaskTable/TaskTable';

type Props = {
  tasks: {
    tasks: Array
  },
  projects: {
    projects: Array
  },
  history: {
    push: () => void
  }
};

class Viewer extends Component<Props> {
  props: Props;

  state = {
    listStyle: true,
    isProjects: true,
    data: null,
    projectUuid: null
  };

  componentWillMount() {
    this.setState({ data: this.props.projects.projects });
  }

  onSelectedRow = (key) => {
    if (this.state.isProjects) {

      const data = this.props.tasks.tasks.filter((el) => {
        return el.projectUuid === key;
      });

      this.setState({ isProjects: false, data, projectUuid: key });
    } else {
      this.props.history.push(routes.TASK + '?uuid=' + key);
    }
  };

  toggleStyle = () => {
    this.setState(prevState => {
      return {
        listStyle: !prevState.listStyle
      };
    });
  };

  onCreateNew = () => {
    if (!this.state.isProjects) {
      this.props.history.push(routes.TASK_CREATOR + '?projectUuid=' + this.state.projectUuid);
    } else {
      this.props.history.push(routes.PROJECT_CREATOR);
    }
  };

  onBack = () => {
    this.setState({ isProjects: true, data: this.props.projects.projects });
  };

  render() {
    let tasksCard, taskGrid, taskTable;

    // create view based on state
    if(this.state.listStyle) {
      taskTable = <div className={styles.taskTable}>
        <TaskTable isProjects={this.state.isProjects} data={this.state.data} click={this.onSelectedRow}/>
      </div>;
    }  else { // grid style
      tasksCard = this.state.data.map((el, index) =>
        (
          <TaskCard {...el} isProjects={this.state.isProjects} key={index} click={() => this.onSelectedRow(el.uuid)} />
        )
      );
      taskGrid = <div className={styles.tasksGrid}>{tasksCard.length > 0 ? tasksCard.reverse() : <p
        className={styles.emptyTasks}>No tasks found. Hurry up and create some!</p>}</div>;
    }


    const displayTasks = this.state.listStyle ? taskTable : taskGrid;

    const listStyleToggleButtonClass = this.state.listStyle ? 'fas fa-th-large' : 'fas fa-list-ul';

    return (
      <React.Fragment>
        <div className={styles.header}>
          <div className={styles.buttons}>
            {!this.state.isProjects ? <button type="button" onClick={this.onBack}><i
              className="fas fa-long-arrow-alt-left"/></button> : null}
          </div>
          <div className={styles.buttons}>
            <button type="button" onClick={this.onCreateNew}><i className="fas fa-plus"/></button>
            <button type="button" onClick={this.toggleStyle}><i className={listStyleToggleButtonClass}/></button>
          </div>
        </div>
        {displayTasks}
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    tasks: state.tasksStore,
    projects: state.projectsStore
  };
};
export default connect(
  mapStateToProps, null)(Viewer);
