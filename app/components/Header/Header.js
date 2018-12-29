// @flow
import React from 'react';
import { withRouter } from 'react-router-dom';
import moment from "moment";
import electron from 'electron';
import styles from './Header.css';
import NoteButton from '../NoteButton/NoteButton';

type Props = {
  history: {
    push: () => void
  },
  location: {
    pathname: string
  }
};

class Header extends React.Component<Props> {

  state = {
    currentTime: moment().format('H:mm:ss')
  };


  componentDidMount() {
    setInterval(() =>{
      this.setState({currentTime: moment().format('H:mm:ss')});
    }, 1000);
  }


  onCreateNewTask = () => {
    this.props.history.push('/taskcreator');
  };

  onBrandClick = () => {
    this.props.history.push('/');
  };


  closeApp = () => {
    electron.remote.getCurrentWindow().close();
  };

  minimizeApp = () => {
    electron.remote.getCurrentWindow().minimize();
  };

  maximizeApp = () => {
    electron.remote.getCurrentWindow().isMaximized() ? electron.remote.getCurrentWindow().unmaximize() :
      electron.remote.getCurrentWindow().maximize();
  };


  render() {
    return (
      <div className={styles.header}>
        <div>
          <NoteButton padding="20px 73px" onClick={this.props.location.pathname !== '/' ? this.onBrandClick : null}>Note
            Tracker</NoteButton>
        </div>
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
