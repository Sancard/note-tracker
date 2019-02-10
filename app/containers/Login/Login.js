import React, { Component } from 'react';
import firebase from '../../config/firebase';
import routes from '../../constants/routes';
import styles from './Login.css';
import NoteButton from '../../components/NoteButton/NoteButton';
import logo from '../../assets/images/logo-dark.png'

class Login extends Component {
  state = {
    email: '',
    password: '',
    passwordAgain: '',
    passwordsMatch: true,
    valid: false,
    isSignUp: false
  };

  formSnap = {
    email: null,
    password: null,
    passwordAgain: null
  };

  createUserOnFirebase = () => {
    firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password).then(res => {
      if(res.user) {
        localStorage.setItem('userInfo', JSON.stringify(res.user));
        this.props.history.push(routes.HOME);
      }
    }).catch(err => {
      const errorCode = err.code;
      const errorMessage = err.message;

      console.error(errorCode, errorMessage);
    })
  };

  signInToFirebase = () => {
    firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password).then(res => {
      if(res.user) {
        localStorage.setItem('userInfo', JSON.stringify(res.user));
        this.props.history.push(routes.HOME);
      }
    }).catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;

      console.error(errorCode, errorMessage);

    });
  };

  handleClick = () => {
    if(this.state.isSignUp) {
      this.createUserOnFirebase();
    } else {
      this.signInToFirebase();
    }
  };

  handleInputChange = ({target}) => {
    this.formSnap[target.name] = target.value;

    const isValid = this.state.isSignUp ? this.formSnap.email && this.formSnap.password
      && this.formSnap.passwordAgain &&
      (this.formSnap.password === this.formSnap.passwordAgain) : this.formSnap.email && this.formSnap.password;

    this.setState(prevState => ({
      ...prevState,
      [target.name]: target.value,
      valid: isValid,
      passwordsMatch: this.formSnap.password === this.formSnap.passwordAgain
    }));
  };


  render() {
    return (
      <div className={styles.formContainer}>
        <img src={logo} alt="NoteTracker Icon"/>
        <h3>{this.state.isSignUp ? 'Sign up' : 'Sign in'} to Note<span>Tracker</span></h3>
        <form className={styles.form}>
          <input type="email"
                 name="email"
                 required
                 onChange={this.handleInputChange}
                 placeholder="E-mail"/>
          <input type="password"
                 name="password"
                 required
                 onChange={this.handleInputChange}
                 placeholder="Password"/>
          {this.state.isSignUp ? <input type="password"
                                        name="passwordAgain"
                                        required
                                        onChange={this.handleInputChange}
                                        placeholder="Password Again" /> : null}
          {this.state.isSignUp && !this.state.passwordsMatch && this.formSnap.passwordAgain ? <span>Passwords does not match.</span> : null}
          <NoteButton padding="15px 75px" type="button" disabled={!this.state.valid}
                      onClick={this.handleClick}>
            {this.state.isSignUp ? 'Sign Up' : 'Sign In'}
          </NoteButton>
        </form>
        {this.state.isSignUp ?  <p className={styles.actionLink}>
            Already have an account? Sign in <a onClick={() => this.setState({isSignUp: false})}>here.</a></p> :
          <p className={styles.actionLink}>
            Don't have an account? Sign up <a onClick={() => this.setState({isSignUp: true, valid: false})}>here.</a></p>}
      </div>
    );
  }
}

export default Login;
