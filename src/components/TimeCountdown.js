/**
 * @author Eugene Lyzo
 */

import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  Vibration,
} from 'react-native';

export default class TimeCountdown extends Component {

  constructor(props) {
    super(props);

    this.state = {
      countdownTime: this.props.countdownTime,
    };

    setInterval(() => this._updateCountdown(), 1000);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.countdownTime !== this.state.countdownTime) {
      this.setState({ countdownTime: nextProps.countdownTime });
    }
  }


  _updateCountdown() {
    let countdownTime = this.state.countdownTime || 0;
    if (countdownTime > 0) {
      this.setState({
        countdownTime: countdownTime - 1,
      });
      if (countdownTime === 1) {
        Vibration.vibrate([0, 500, 200, 500])
      }
    }
  }

  render() {
    return (
      <Text style={styles.timerCountdown}>{this.state.countdownTime}</Text>
    );
  }
}

const styles = StyleSheet.create({
  timerCountdown: {
    fontSize: 36,
  },
});