// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import TaskCard from '../../components/TaskCard/TaskCard';
import * as styles from './Viewer.css';
import routes from '../../constants/routes';
import TaskTable from '../../components/TaskTable/TaskTable';
import { appUpdateProjectUuid } from '../../store/actions';
import CreatorsModals from '../../components/CreatorsModals/CreatorsModals';

type Props = {
  tasks: {
    tasks: Array
  },
  projects: {
    projects: Array
  },
  history: {
    push: () => void
  },
  appState: {
    projectUuid: string
  },
  updateProjectUuid: () => void
};

class Viewer extends Component<Props> {
  props: Props;

  state = {
    listStyle: true,
    isProjects: true,
    data: null,
    modalIsOpen: false
  };


  componentWillMount() {
    this.handleNewProps(this.props);
  }

  componentWillReceiveProps(props) {
    this.handleNewProps(props);
  }


  handleNewProps(props) {
    if (props.appState.projectUuid) {
      this.setState({
        isProjects: false,
        data: props.tasks.tasks.filter((el) => {
          return el.projectUuid === props.appState.projectUuid;
        }),
      });
    } else {
      this.setState({ data: props.projects.projects });
    }
  }

  onSelectedRow = (key) => {
    if (this.state.isProjects) {

      this.props.updateProjectUuid(key);

      const data = this.setData(key);

      this.setState({ isProjects: false, data });
    } else {
      this.props.history.push(routes.TASK + '?uuid=' + key);
    }
  };

  setData = (key) => {
    return this.props.tasks.tasks.filter((el) => {
      return el.projectUuid === key;
    });
  };

  toggleStyle = () => {
    this.setState(prevState => {
      return {
        listStyle: !prevState.listStyle
      };
    });
  };

  onModalTrigger = (state) => {
    this.setState({ modalIsOpen: state });
  };


  onBack = () => {
    this.props.updateProjectUuid(null);
    this.setState({ isProjects: true, data: this.props.projects.projects });
  };

  render() {
    let tasksCard, taskGrid, taskTable;

    // create view based on state
    if (this.state.listStyle) {
      taskTable = <div className={styles.taskTable}>
        <TaskTable isProjects={this.state.isProjects} data={this.state.data} click={this.onSelectedRow}/>
      </div>;
    } else { // grid style
      tasksCard = this.state.data.map((el, index) =>
        (
          <TaskCard {...el} isProjects={this.state.isProjects} key={index} click={() => this.onSelectedRow(el.uuid)}/>
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
            <button type="button" onClick={() => this.onModalTrigger(true)}><i className="fas fa-plus"/></button>
            <button type="button" onClick={this.toggleStyle}><i className={listStyleToggleButtonClass}/></button>
          </div>
        </div>
        {displayTasks}
        <CreatorsModals isProject={this.state.isProjects} modalTrigger={this.onModalTrigger}
                        modalIsOpen={this.state.modalIsOpen}/>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    tasks: state.tasksStore,
    projects: state.projectsStore,
    appState: state.appStore
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateProjectUuid: (projectUuid) => dispatch(appUpdateProjectUuid(projectUuid))
  };
};

export default connect(
  mapStateToProps, mapDispatchToProps)(Viewer);
