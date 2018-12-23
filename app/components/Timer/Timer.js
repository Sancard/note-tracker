import React, { Component } from 'react';
import moment from 'moment';

import * as styles from './Timer.css';

type Props = {
  getTime: () => void,
  initialTime: number
};


class Timer extends Component<Props> {

  constructor(props) {
    super(props);
    this.incrementer = null;
    this.state = {
      secondsElapsed: props.initialTime ? props.initialTime : 0,
      play: true
    };
  }

  componentDidMount() {
    this.startCounting();
  }

  componentWillUnmount() {
    this.stopCounting();
  }

  startCounting = () => {
    this.setState({play: true});
    this.incrementer = setInterval(() => {
      this.setState((prevState) => {
        this.props.getTime(prevState.secondsElapsed + 1);
        return {
          secondsElapsed: prevState.secondsElapsed + 1
        };
      });
    }, 1000);
  };

  stopCounting = () => {
    this.setState({ play: false });
    clearInterval(this.incrementer);
  };

  formatTime(seconds) {
    return moment.utc(seconds * 1000).format('HH:mm:ss');
  }

  render() {
    const button = this.state.play ? <i onClick={this.stopCounting} className="fas fa-pause"></i> :
      <i onClick={this.startCounting} className="fas fa-play"></i>;
    return (
      <div className={styles.timer}>
        {this.formatTime(this.state.secondsElapsed)}
        <div className={styles.controls}>
          {button}
        </div>
      </div>
    );
  }
}

export default Timer;
