import React from 'react';
import { withRouter } from 'react-router';
import firebase from '../config/firebase';
import routes from '../constants/routes';


export default function requireAuth(Component) {

  class AuthenticatedComponent extends React.Component {
    state = {
      isLogged: false
    };


    componentWillMount() {
      this.checkAuth();
    }

    checkAuth() {
      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          localStorage.setItem('userInfo', JSON.stringify(user));
          localStorage.setItem('isLogged', true);
          this.setState({isLogged: true});
        } else {
          this.props.history.push(routes.LOGIN);
        }
      });
    }

    render() {
      return this.state.isLogged
        ? <Component { ...this.props } />
        : null;
    }

  }

  return withRouter(AuthenticatedComponent);
}
