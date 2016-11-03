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

export default class Week extends Component {

  _checkDay(day) {
    let status = 'Wait';
    attemptsDone = 0;
    for (attempt of day) {
      if (attempt.done) {
        attemptsDone++;
      }
    }
    if (attemptsDone > 0) status = 'InProgress';
    if (attemptsDone === day.length) status = 'Done';
    return status;
  }
  _onPressDay(weekId, day) {
    this.props.onPressDay(weekId, day);
  }

  render() {
    return (
      <View style={styles.week}>
        <Text
          style={[
            styles[this.props.week.complete ? 'week_done' : 'week_wait'],
            this.props.selectedWeek ? styles.week_selected : null
          ]}
        >
          {this.props.week.name}:
        </Text>
        <TouchableHighlight onPress={(e) => this._onPressDay(this.props.week.id, 1)}>
          <Text
            style={[
              styles['dayStatus' + this._checkDay(this.props.week.day1)],
              this.props.selectedWeek && this.props.selectedDay == 1 ? styles.daySelected : null
            ]
            }>
            Понедельник
            {this.props.selectedWeek && this.props.selectedDay == 1 ? ' :::: ' : ''}
          </Text>
        </TouchableHighlight>
        <TouchableHighlight onPress={(e) => this._onPressDay(this.props.week.id, 2)}>
          <Text
            style={[
              styles['dayStatus' + this._checkDay(this.props.week.day2)],
              this.props.selectedWeek && this.props.selectedDay == 2 ? styles.daySelected : null
            ]
            }>
            Среда
            {this.props.selectedWeek && this.props.selectedDay == 2 ? ' :::: ' : ''}
          </Text>
        </TouchableHighlight>
        <TouchableHighlight onPress={(e) => this._onPressDay(this.props.week.id, 3)}>
          <Text
            style={[
              styles['dayStatus' + this._checkDay(this.props.week.day3)],
              this.props.selectedWeek && this.props.selectedDay == 3 ? styles.daySelected : null
            ]
            }>
            Пятница
            {this.props.selectedWeek && this.props.selectedDay == 3 ? ' :::: ' : ''}
          </Text>
        </TouchableHighlight>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  week: {
    // flex: 0.5,
    marginTop: 10,
    marginLeft: 20,
  },
  week_selected: {
    fontWeight: 'bold',
  },
  week_done: {
    color: 'green',
  },
  week_wait: {
    color: 'blue',
  },
});