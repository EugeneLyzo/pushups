/**
 * @author Eugene Lyzo
 */

import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  Vibration,
  ToastAndroid,
} from 'react-native';

export default class TimeCountdown extends Component {

  constructor(props) {
    super(props);

    this.state = {
      countdownTime: this.props.countdownTime,
    };

    this.attempt = 0;

    setInterval(() => this._updateCountdown(), 1000);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.attempt !== this.attempt) {
      this.attempt = nextProps.attempt;
      this.setState({
        countdownTime: nextProps.countdownTime,
      });
    }
  }

  _updateCountdown() {
    const countdownTime = this.state.countdownTime || 0;
    if (countdownTime > 0) {
      this.setState({
        countdownTime: countdownTime - 1,
      });
      if (countdownTime === 1) {
        Vibration.vibrate([0, 500, 200, 500]);
        ToastAndroid.showWithGravity(
          'GO GO GO!!!',
          ToastAndroid.LONG,
          ToastAndroid.CENTER,
        );
      }
    }
  }

  render() {
    return (
      <Text style={styles.timerCountdown}>{this.state.countdownTime}</Text>
    );
  }
}

TimeCountdown.propTypes = {
  countdownTime: React.PropTypes.number,
  attempt: React.PropTypes.number,
};


const styles = StyleSheet.create({
  timerCountdown: {
    fontSize: 36,
  },
});
