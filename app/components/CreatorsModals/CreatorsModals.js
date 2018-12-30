import React, { Component } from 'react';
import Modal from 'react-modal';
import { connect } from 'react-redux';
import { guidGenerator } from '../../utils/utilities';
import { ProjectCreator, TaskCreator } from '../Creators/Creators';
import * as styles from './CreatorsModals.css';
import { projectNewProject, taskNewTask } from '../../store/actions';

type Props = {
  modalIsOpen: boolean,
  modalTrigger: () => void,
  createNewProject: () => void,
  createNewTask: () => void,
  appState: {
    projectUuid: string
  }
};

class CreatorsModals extends Component<Props> {
  state = {
    modalIsOpen: false,
    valid: false,
    isProject: true,
    projectUuid: null,
    project: {
      uuid: guidGenerator(),
      name: '',
      tag: '',
      createdAt: Date.now()
    },
    task: {
      uuid: guidGenerator(),
      projectUuid: null,
      name: '',
      estimatedHours: null,
      description: '',
      loggedTime: [],
      createdAt: Date.now(),
      notes: ''
    }
  };

  componentWillReceiveProps(props) {
    this.setState({ modalIsOpen: props.modalIsOpen, projectUuid: props.appState.projectUuid, isProject: !props.appState.projectUuid });
  }

  formsSnap = {
    name: ''
  };


  handleInputChange = (event) => {
    if (event.target.name === 'name') {
      this.formsSnap.name = event.target.value;
    }
    const { target } = event;
    if (this.formsSnap.name.length > 0) {
      if (this.state.isProject) {
        this.setState((prevState) => ({
          ...prevState,
          valid: true,
          project: { ...prevState.project, [target.name]: target.value }
        }));
      } else {
        this.setState((prevState) => ({
          ...prevState,
          valid: true,
          task: { ...prevState.task, [target.name]: target.value, projectUuid: prevState.projectUuid }
        }));
      }
    } else {
      this.setState({ valid: false });
    }

  };

  onCreateProject = () => {
    if (!this.state.valid) {
      return;
    }
    this.props.createNewProject(this.state.project);
    this.props.modalTrigger(false);
  };

  onCreateTask = () => {
    if (!this.state.valid) {
      return;
    }
    this.props.createNewTask(this.state.task);
    this.props.modalTrigger(false);
  };


  render() {
    const creator = this.state.isProject ?
      <ProjectCreator valid={this.state.valid}
                      onCreateProject={this.onCreateProject}
                      modalTrigger={this.props.modalTrigger}
                      handleInputChange={this.handleInputChange}/>
      :
      <TaskCreator valid={this.state.valid}
                   onCreateTask={this.onCreateTask}
                   modalTrigger={this.props.modalTrigger}
                   handleInputChange={this.handleInputChange}/>;


    return (
      <Modal
        isOpen={this.state.modalIsOpen}
        contentLabel="Example Modal"
        onRequestClose={() => this.props.modalTrigger(false)}
        className={styles.modal}
        overlayClassName={styles.backdrop}
        shouldCloseOnOverlayClick={true}
        ariaHideApp={false}
      >
        {creator}
      </Modal>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    appState: state.appStore
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    createNewProject: (project) => dispatch(projectNewProject(project)),
    createNewTask: (task) => dispatch(taskNewTask(task))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CreatorsModals);
