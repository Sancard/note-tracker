// @flow
import React from 'react';
import { withRouter } from 'react-router-dom';
import styles from './Header.css';

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
  }

  render() {
    const createButton = this.props.location.pathname === '/taskcreator' ? null :
      <button type="button" className={styles.add} onClick={this.onCreateNewTask}>+ Create new task</button>;
    return (
      <div className={styles.header}>
        <button type="button" className={styles.add} onClick={this.props.location.pathname !== '/' ? this.onBrandClick : null}>Note Tracker</button>
        {createButton}
      </div>
    );
  }

}

export default withRouter(Header);
