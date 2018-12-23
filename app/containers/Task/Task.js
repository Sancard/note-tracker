// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getTask} from '../../utils/storage';
import Timer from '../../components/Timer/Timer';
import { updateTask } from '../../store/actions';
import * as styles from './Task.css';


type Props = {
  location: {
    search: string
  },
  history: {
    goBack: () => void
  },
  updateTask: () => void
};

class Task extends Component<Props> {
  props: Props;

  state = {
    task: {
      notes: '',
      loggedTime: 0
    }

  };

  componentWillMount() {
    const params = new URLSearchParams(this.props.location.search);
    const uuid = params.get('uuid');
    if (uuid) {
      this.setState({ task: getTask(uuid) });
    } else {
      this.props.history.goBack();
    }
  }

  componentWillUnmount() {
    this.saveData();
  }

  handleInputChange = (event) => {
    const { target } = event;
    this.setState((prevState) => {
      return {
        task: { ...prevState.task, notes: target.value }
      };
    });
  };

  saveData = () => {
    this.props.updateTask(this.state.task);
  };

  loggedTimeHandler = (seconds) => {
    this.setState((prevState) => {
      return {
        task: {
          ...prevState.task,
          loggedTime: seconds
        }
      };
    });
  };

  render() {
    return (
      <div className={styles.task}>
        <div className={styles.sideBar}>
          <Timer getTime={this.loggedTimeHandler} initialTime={this.state.task.loggedTime}/>
          <span>Task:</span>
          <h3>{this.state.task.name}</h3>
          <span>Estimated:</span>
          <h3>{this.state.task.estimatedHours} hours</h3>
          <span>Description:</span>
          <h3 className={styles.desc}>{this.state.task.description}</h3>
        </div>
        <div className={styles.editor}>
          <textarea placeholder="Your thoughts..." value={this.state.task.notes} name="notes"
                    onChange={this.handleInputChange} onBlur={this.saveData}/>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateTask: (task) => dispatch(updateTask(task))
  };
};


export default connect(null, mapDispatchToProps)(Task);
