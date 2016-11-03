/**
 * @author Eugene Lyzo
 */

import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from 'react-native';

export default class Day extends Component {

  onPressAttempt() {
    // console.log('onPressAttempt', arguments, this);
    this.props.onPressAttempt(this.props.attemptId);
  }

  render() {
    return (
      <View style={styles.day}>
        <TouchableHighlight onPress={() => this.onPressAttempt()}>
          <Text
            style={[
              styles.attempt,
              this.props.day.done ? styles.attempt_done : null,
            ]}
          >{this.props.day.count}</Text>
        </TouchableHighlight>
      </View>
    );
  }

}

Day.propTypes = {
  day: React.PropTypes.object,
  attemptId: React.PropTypes.string,
  onPressAttempt: React.PropTypes.func,
};


const styles = StyleSheet.create({
  day: {
    flex: 0.2,
    marginLeft: 20,
    marginTop: 10,
  },
  attempt: {
    fontSize: 30,
  },
  attempt_done: {
    textDecorationLine: 'line-through',
  },
});
