// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import ContentEditable from 'react-contenteditable';
import sanitizeHtml from 'sanitize-html';
import { getTask } from '../../utils/storage';
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

  sanitizeConf = {
    allowedTags: ['b', 'i', 'em', 'strong', 'a', 'p', 'h1', 'img', 'br', 'div'],
    allowedAttributes: { a: ['href'], img: ['src'] }
  };

  handleInputChange = (event) => {
    const { target } = event;

    this.setState((prevState) => {
      return {
        task: { ...prevState.task, notes: target.value ? target.value : '' }
      };
    });
  };

  saveData = () => {
    this.props.updateTask(this.state.task);
  };

  sanitize = () => {
    this.setState((prevState) => {
      return {
        task: { ...prevState.task, notes: sanitizeHtml(prevState.task.notes, this.sanitizeConf) }
      };
    });
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
          <ContentEditable
            innerRef={this.contentEditable}
            html={this.state.task.notes} // innerHTML of the editable div
            disabled={false}       // use true to disable editing
            onChange={this.handleInputChange} // handle innerHTML change
            className={styles.area}
            tagName="pre"
            onBlur={this.sanitize}
          />
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
