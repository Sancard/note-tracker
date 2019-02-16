// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { EditorState, convertToRaw, convertFromRaw } from 'draft-js';
import moment from 'moment';
import { Editor } from 'react-draft-wysiwyg';
import { getTask } from '../../utils/storage';
import Timer from '../../shared/Timer/Timer';
import { deleteTask, updateTask } from '../../store/actions';
import * as styles from './Task.css';
import { sumLoggedTime } from '../../utils/utilities';
import DialogModal from '../../shared/DialogModal/DialogModal';
import LogPicker from './components/LogPicker/LogPicker';

type Props = {
  location: {
    search: string
  },
  history: {
    goBack: () => void,
    push: () => void
  },
  updateTask: () => void,
  deleteTask: () => void,
  onClick: () => void,
};

class Task extends Component<Props> {
  props: Props;


  // INITIALIZATION OF TASK
  state = {
    showLogPicker: false,
    dialogOpen: false,
    currentDate: moment().format('D-M-Y'),
    currentSeconds: 0,
    editorState: null,
    deleting: false,
    task: {
      notes: '',
      loggedTime: [],
      projectUuid: ''
    }
  };

  componentWillMount() {
    const params = new URLSearchParams(this.props.location.search);
    const uuid = params.get('uuid');
    if (uuid) {
      const taskData = this.handleTaskLoading(uuid);
      this.setState(prevState => {
        return {
          task: taskData.task,
          editorState: taskData.editorState,
          currentSeconds: prevState.task.loggedTime[prevState.currentDate]
        };
      });

      if (!taskData) {
        this.props.history.push('/');
      }

    } else {
      this.props.history.goBack();
    }
  }

  handleTaskLoading(uuid) {
    const task = getTask(uuid);
    return {
      task: { ...task },
      editorState: task.notes ? EditorState.createWithContent(convertFromRaw(task.notes)) : EditorState.createEmpty()
    };
  }

  componentWillUnmount() {
    if (!this.state.deleting) {
      this.saveData();
    }
  }

  // HANDLE CHANGES AND SAVING
  handleInputChange = (editorState) => {
    const rawState = convertToRaw(editorState.getCurrentContent());
    this.setState((prevState) => {
      return {
        editorState,
        task: { ...prevState.task, notes: rawState }
      };
    });
  };

  saveData = () => {
    this.props.updateTask(this.state.task);
  };

  // TIME LOGGING
  loggedTimeHandler = (seconds) => {
    this.setState((prevState) => {
      const timeToUpdate = { ...prevState.task.loggedTime };
      timeToUpdate[prevState.currentDate] = seconds;
      return {
        task: {
          ...prevState.task,
          loggedTime: timeToUpdate
        }
      };
    });
  };


  addTimeHandler = (date, time) => {
    this.setState((prevState) => {
      const timeToUpdate = { ...prevState.task.loggedTime };
      timeToUpdate[date] = time;
      return {
        showLogPicker: false,
        currentSeconds: date === prevState.currentDate ? time : prevState.currentSeconds,
        task: {
          ...prevState.task,
          loggedTime: timeToUpdate
        }
      };
    });
  };


  // BUTTONS HANDLERS
  onBack = () => {
    this.props.history.push('/');
  };

  onDeleteTask = () => {
    this.setState({deleting: true}, () => {
      this.props.deleteTask(this.state.task);
      this.props.history.push('/');
    });
  };

  onDialogTrigger = (state) => {
    this.setState({ dialogOpen: state });
  };

  toggleLogPicker = (state) => {
    this.setState(prevState => {
      return {
        ...prevState,
        showLogPicker: !state ? state : !prevState.showLogPicker
      };
    });
  };

  // render everything
  render() {
    let loggedTime = null;
    if (Object.entries(this.state.task.loggedTime).length > 0) {
      // sort dates properly
      loggedTime = Object.entries(this.state.task.loggedTime).sort((a, b) => {
        const _a = moment((a[0]), 'D-M-Y').toDate();
        const _b = moment(b[0], 'D-M-Y').toDate();

        if (_a < _b) {
          return 1;
        } else if (_a > _b) {
          return -1;
        }
        return 0;
      });
      // create elements
      loggedTime = loggedTime.map((el) => {
        return (
          <p key={el[0]}>{el[0].replace(/-/g, '.')} • {moment.utc(el[1] * 1000).format('HH:mm:ss')}</p>
        );
      });
    }

    return (
      <div className={styles.task}>
        <div className={styles.sideBar}>
          <div className={styles.actionBar}>
            <button type="button" onClick={this.onBack}><i
              className="fas fa-long-arrow-alt-left"/></button>
            <button type="button" onClick={this.toggleLogPicker}><i
              className="fas fa-plus"/></button>
            <button type="button" onClick={() => this.onDialogTrigger(true)}><i className="fas fa-trash-alt"/></button>
          </div>
          <Timer getTime={this.loggedTimeHandler} initialTime={this.state.currentSeconds}/>
          {this.state.showLogPicker ? <LogPicker addTimeHandler={this.addTimeHandler}/> : null}
          <div className={styles.loggedDays}>
            {loggedTime}
          </div>
          <span>Task:</span>
          <h3>{this.state.task.name}</h3>
          <span>Estimated:</span>
          <h3>{this.state.task.estimatedHours} hours</h3>
          <span>Time spent:</span>
          <h3>{sumLoggedTime(this.state.task.loggedTime)}</h3>
          <span>Description:</span>
          <h3 className={styles.desc}>{this.state.task.description}</h3>
        </div>
        <Editor
          editorState={this.state.editorState}
          onEditorStateChange={this.handleInputChange}
          wrapperClassName={styles.editorWrapper}
          toolbarClassName={styles.toolbarEditor}
          editorClassName={styles.editor}
          onFocus={() => this.setState({showLogPicker: false})}
        />
        <DialogModal modalIsOpen={this.state.dialogOpen} modalTrigger={this.onDialogTrigger}
                     onConfirm={this.onDeleteTask} onDecline={() => this.onDialogTrigger(false)}/>
      </div>
    );
  }
}

// redux
const mapDispatchToProps = (dispatch) => {
  return {
    updateTask: (task) => dispatch(updateTask(task)),
    deleteTask: (task) => dispatch(deleteTask(task))
  };
};


export default connect(null, mapDispatchToProps)(Task);
