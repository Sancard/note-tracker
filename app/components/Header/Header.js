// @flow
import React from 'react';
import { withRouter } from 'react-router-dom';
import moment from 'moment';
import electron from 'electron';
import styles from './Header.css';
import * as routes from '../../constants/routes';

type Props = {
  history: {
    push: () => void
  },
  location: {
    pathname: string
  }
};

class Header extends React.Component<Props> {
  _isMounted = false;

  state = {
    currentTime: moment().format('H:mm:ss')
  };

  timeInterval = null;

  componentDidMount() {
    this._isMounted = true;
    if (this._isMounted) {
      this.timeInterval = setInterval(() => {
        this.setState({ currentTime: moment().format('H:mm:ss') });
      }, 1000);
    }
  }

  componentWillUnmount() {
    this._isMounted = false;
    clearInterval(this.timeInterval);
  }


  onCreateNewTask = () => {
    this.props.history.push(routes.TASK_CREATOR);
  };

  onBrandClick = () => {
    if(this.props.location.pathname !== '/') {
      this.props.history.push('/');
    }
  };


  closeApp = () => {
    electron.remote.getCurrentWindow().close();
  };

  minimizeApp = () => {
    electron.remote.getCurrentWindow().minimize();
  };

  maximizeApp = () => {
    if (electron.remote.getCurrentWindow().isMaximized()) {
      electron.remote.getCurrentWindow().unmaximize();
    } else {
      electron.remote.getCurrentWindow().maximize();
    }
  };


  render() {
    return (
      <div className={styles.header}>
        <div className={styles.currentDate}>
          <p>{moment().format('D. MMM Y')}</p>
          <p>{this.state.currentTime}</p>
        </div>
        <div className={styles.actionButtons}>
          <div className={styles.actionButton} onClick={this.minimizeApp}><i className="fas fa-window-minimize"></i>
          </div>
          <div className={styles.actionButton} onClick={this.maximizeApp}><i className="fas fa-window-maximize"></i>
          </div>
          <div className={styles.actionButton} onClick={this.closeApp}><i className="fas fa-times"></i></div>
        </div>
      </div>
    );
  }

}

export default withRouter(Header);
