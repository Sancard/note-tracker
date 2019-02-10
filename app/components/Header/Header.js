// @flow
import React from 'react';
import { withRouter } from 'react-router-dom';
import moment from 'moment';
import { connect } from 'react-redux';
import electron from 'electron';
import styles from './Header.css';
import * as routes from '../../constants/routes';
import { appUpdateProjectUuid } from '../../store/actions';
import firebase from '../../config/firebase';

type Props = {
  history: {
    push: () => void
  },
  location: {
    pathname: string
  },
  updateProjectUuid: () => void
};

class Header extends React.Component<Props> {
  _isMounted = false;

  state = {
    currentTime: moment().format('H:mm:ss'),
    userInfo: localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null
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
      this.props.updateProjectUuid(null);
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
        <div className={styles.mainButton}>
          <button disabled={this.props.location.pathname === '/'} className={styles.appName} onClick={this.onBrandClick}>
            <span>Note</span><span>Tracker</span>
          </button>
        </div>
        <div className={styles.currentDate}>
          <p>{moment().format('D. MMM Y')}</p>
          <p>{this.state.currentTime}</p>
          <p className={styles.userName}>{this.state.userInfo ? this.state.userInfo.email : null}</p>
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

const mapDispatchToProps = (dispatch) => {
  return {
    updateProjectUuid: (projectUuid) => dispatch(appUpdateProjectUuid(projectUuid))
  }
};

export default withRouter(connect(null, mapDispatchToProps)(Header));
