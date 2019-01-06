import React, { Component } from 'react';
import TimePicker from "react-times";
import DayPicker from "react-day-picker";
import moment from 'moment';
import styles from './LogPicker.css';
import NoteButton from '../NoteButton/NoteButton';

type Props = {
  addTimeHandler: () => void
};


class LogPicker extends Component<Props> {
  state = {
    initialTime: "00:00",
    selectedDay: new Date(),
    time: null,
    day: moment().format('D-M-Y')
  };



  onTimeChange = (options) => {
    const timeInSeconds = moment.duration(options.hour + ':' + options.minute).asSeconds();
    this.setState({initialTime: options.hour + ':' + options.minute, time: timeInSeconds});
  };

  onDayClick = (day) => {
    this.setState({day: moment(day).format('D-M-Y'), selectedDay: day});
  };


  onAdd = () => {
    this.props.addTimeHandler(this.state.day, this.state.time);
  };

  render() {
    return (
      <div className={styles.picker}>
        <TimePicker
          onTimeChange={this.onTimeChange}
          colorPalette="dark" // main color, default "light"
          theme="material"
          time={this.state.initialTime}
        />
        <DayPicker onDayClick={this.onDayClick} showWeekNumbers
                   selectedDays={this.state.selectedDay}
                   disabledDays={{ after: new Date() }}/>
        <div className={styles.button}>
          <NoteButton onClick={this.onAdd} padding="10px 55px">Add</NoteButton>
        </div>
      </div>
    );
  }
}

export default LogPicker;
