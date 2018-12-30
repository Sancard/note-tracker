// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as styles from './TaskCreator.css';
import { taskNewTask } from '../../store/actions';
import { guidGenerator } from '../../utils/utilities';
import NoteButton from '../../components/NoteButton/NoteButton';

type Props = {
  history: {
    push: () => void,
    goBack: () => void,
  },
  location: {
    search: string
  },
  newTask: () => void
};

class TaskCreator extends Component<Props> {
  props: Props;

  state = {
    uuid: guidGenerator(),
    projectUuid: null,
    name: '',
    estimatedHours: null,
    description: '',
    loggedTime: [],
    createdAt: Date.now(),
    valid: false,
    notes: ''
  };


  componentWillMount() {
    const params = new URLSearchParams(this.props.location.search);
    const projectUuid = params.get('projectUuid');
    if (projectUuid) {
      this.setState({ projectUuid });
    } else {
      this.props.history.goBack();
    }
  }


  onCreateTask = () => {
    if(!this.state.valid) {
      return;
    }
    this.props.newTask(this.state);
    this.props.history.push('/');
  };

  handleInputChange = (event) => {
    const { target } = event;
    this.setState({ [target.name]: target.value });

    if (this.state.name && this.state.estimatedHours && this.state.description) {
      this.setState((prevState) => ({
        ...prevState,
        valid: true
      }));
    } else {
      this.setState((prevState) => ({
        ...prevState,
        valid: false
      }));
    }

  };

  render() {
    return (
      <form className={[styles.form, 'container'].join(' ')}>
        <h2>Create a task</h2>
        <button type="button" onClick={() => this.props.history.goBack()}>back</button>
        <div>
          <input type="text"
                 name="name"
                 required
                 onChange={this.handleInputChange}
                 placeholder="Enter task name"/>
        </div>
        <div>
          <input type="number"
                 name="estimatedHours"
                 required
                 onChange={this.handleInputChange}
                 placeholder="Enter estimated hours"/>
        </div>
        <div>
          <textarea required placeholder="Task description" name="description" onChange={this.handleInputChange}/>
        </div>
        <NoteButton disabled={!this.state.valid} type="button" onClick={this.onCreateTask}>Create a task</NoteButton>
      </form>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    newTask: (task) => dispatch(taskNewTask(task))
  };
};

export default connect(
  null, mapDispatchToProps)(TaskCreator);
