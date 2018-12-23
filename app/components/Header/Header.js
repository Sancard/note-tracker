// @flow
import React from 'react';
import { withRouter } from 'react-router-dom';
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

  onCreateNewTask = () => {
    console.log(this.props);
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


  render() {
    const createButton = this.props.location.pathname === '/taskcreator' ? null :
      <NoteButton onClick={this.onCreateNewTask}>+ Create new task</NoteButton>;
    return (
      <div className={styles.header}>
        <div>
          <NoteButton padding="20px 73px" onClick={this.props.location.pathname !== '/' ? this.onBrandClick : null}>Note
            Tracker</NoteButton>
          {createButton}
        </div>
        <div className={styles.actionButtons}>
          <div className={styles.actionButton} onClick={this.minimizeApp}><i className="fas fa-window-minimize"></i></div>
          <div className={styles.actionButton} onClick={this.closeApp}><i className="fas fa-times"></i></div>
        </div>
      </div>
    );
  }

}

export default withRouter(Header);
