// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import ContentEditable from 'react-contenteditable';
import sanitizeHtml from 'sanitize-html';
import moment from 'moment';
import { getTask } from '../../utils/storage';
import Timer from '../../components/Timer/Timer';
import { updateTask } from '../../store/actions';
import * as styles from './Task.css';
import { sumLoggedTime } from '../../utils/utilities';

type Props = {
  location: {
    search: string
  },
  history: {
    goBack: () => void,
    push: () => void
  },
  updateTask: () => void
};

class Task extends Component<Props> {
  props: Props;

  state = {
    currentDate: moment().format('D-M-Y'),
    currentSeconds: 0,
    task: {
      notes: '',
      loggedTime: []
    }
  };

  componentWillMount() {
    const params = new URLSearchParams(this.props.location.search);
    const uuid = params.get('uuid');
    if (uuid) {
      const task = getTask(uuid);
      this.setState({ task: getTask(uuid) });
      this.setState(prevState => {
        return {
          currentSeconds: prevState.task.loggedTime[prevState.currentDate]
        };
      });

      if (!task) {
        this.props.history.push('/');
      }

    } else {
      this.props.history.goBack();
    }
  }

  componentWillUnmount() {
    this.saveData();
  }

  editorRef = React.createRef();

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
        task: {
          ...prevState.task,
          notes: prevState.task.notes ? sanitizeHtml(prevState.task.notes, this.sanitizeConf) : ''
        }
      };
    });
  };

  handleTab = (e) => {
    if (e.key === 'Tab') {
      e.preventDefault();
      // TODO: Implementing tab later
      /*this.setState((prevState) => {
        return {
          task: { ...prevState.task, notes: `${prevState.task.notes}    ` }
        };
      });
      setTimeout(() => {
        this.setCursorAtEnd();
      });*/
    }
  };


  /*setCursorAtEnd = (el = this.editorRef.current) => {
    const range = document.createRange();
    const sel = window.getSelection();
    range.selectNodeContents(el);
    range.collapse(false);
    sel.removeAllRanges();
    sel.addRange(range);
    el.focus();
  };*/

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

  render() {
    let loggedTime = null;
    if (Object.entries(this.state.task.loggedTime).length > 0) {
      // sort dates properly
      loggedTime = Object.entries(this.state.task.loggedTime).sort((a,b) => {
        const _a = moment((a[0]), 'D-M-Y').toDate();
        const _b = moment(b[0], 'D-M-Y').toDate();

        if(_a < _b) {
          return 1;
        } else if (_a > _b) {
          return -1;
        }
        return 0
      });
      // create elements
      loggedTime = loggedTime.map((el, index) => {
        return (
          <p key={index}>{el[0].replace(/-/g, '.')} • {moment.utc(el[1] * 1000).format('HH:mm:ss')}</p>
        );
      });
    }
    return (
      <div className={styles.task}>
        <div className={styles.sideBar}>
          <Timer getTime={this.loggedTimeHandler} initialTime={this.state.currentSeconds}/>
          <div className={styles.loggedDays}>
            {loggedTime}
          </div>
          <span>Task:</span>
          <h3>{this.state.task.name}</h3>
          <span>Estimated:</span>
          <h3>{this.state.task.estimatedHours} hours</h3>
          <span>Logged time:</span>
          <h3>{sumLoggedTime(this.state.task.loggedTime)}</h3>
          <span>Description:</span>
          <h3 className={styles.desc}>{this.state.task.description}</h3>
        </div>
        <div className={styles.editor}>
          <ContentEditable
            innerRef={this.editorRef}
            html={this.state.task.notes} // innerHTML of the editable div
            disabled={false}       // use true to disable editing
            onChange={this.handleInputChange} // handle innerHTML change
            className={styles.area}
            tagName="pre"
            onKeyDown={this.handleTab}
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
