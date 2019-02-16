import React, { Component } from 'react';
import firebase from '../../config/firebase';
import {connect} from 'react-redux';
import styles from './Settings.css';
import { userLogoutUser } from '../../store/actions/user';
import SettingsSideBar from './components/SettingsSideBar/SettingsSideBar';

class Settings extends Component {

  logOut = () => {
    firebase.auth().signOut().then(() => {
      this.props.logoutUser();
    }).catch((error) => {
      console.error(error);
    });
  };

  goBack = () => {
    this.props.history.goBack();
  };

  sideBarContent = {
    logOut: {
      label: 'Log Out',
      click: this.logOut
    },
    goBack: {
      click: this.goBack
    }
  };

  render() {
    return (
      <div className={styles.container}>
        <SettingsSideBar {...this.sideBarContent} />
        <div className={styles.content}>
          <h3>Work in progress.</h3>
          <p>More options soon...</p>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    logoutUser: () => dispatch(userLogoutUser())
  }
};

export default connect(null, mapDispatchToProps)(Settings);
