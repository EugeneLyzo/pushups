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

  checkDay(day) {
    let status = 'wait';
    let attemptsDone = 0;
    day.forEach((attempt) => {
      if (attempt.done) {
        attemptsDone++;
      }
    });
    if (attemptsDone > 0) status = 'inProgress';
    if (attemptsDone === day.length) status = 'done';
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
            this.props.selectedWeek ? styles.week_selected : null,
          ]}
        >
          {this.props.lang.week} {this.props.week.name}:
        </Text>
        <TouchableHighlight onPress={() => this._onPressDay(this.props.week.id, 1)}>
          <Text
            style={[
              styles[`dayStatus_${this.checkDay(this.props.week.day1)}`],
              this.props.selectedWeek && this.props.selectedDay === 1 ? styles.daySelected : null,
            ]
            }
          >
            {this.props.lang.weekDays[0]}:
            {this.props.selectedWeek && this.props.selectedDay === 1 ? ' :::: ' : ''}
          </Text>
        </TouchableHighlight>
        <TouchableHighlight onPress={() => this._onPressDay(this.props.week.id, 2)}>
          <Text
            style={[
              styles[`dayStatus_${this.checkDay(this.props.week.day2)}`],
              this.props.selectedWeek && this.props.selectedDay === 2 ? styles.daySelected : null,
            ]
            }
          >
            {this.props.lang.weekDays[2]}:
            {this.props.selectedWeek && this.props.selectedDay === 2 ? ' :::: ' : ''}
          </Text>
        </TouchableHighlight>
        <TouchableHighlight onPress={() => this._onPressDay(this.props.week.id, 3)}>
          <Text
            style={[
              styles[`dayStatus_${this.checkDay(this.props.week.day3)}`],
              this.props.selectedWeek && this.props.selectedDay === 3 ? styles.daySelected : null,
            ]
            }
          >
            {this.props.lang.weekDays[4]}:
            {this.props.selectedWeek && this.props.selectedDay === 3 ? ' :::: ' : ''}
          </Text>
        </TouchableHighlight>
      </View>
    );
  }
}

Week.propTypes = {
  onPressDay: React.PropTypes.func,
  lang: React.PropTypes.object,
  week: React.PropTypes.object,
  selectedWeek: React.PropTypes.bool,
  selectedDay: React.PropTypes.number,
};


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
  daySelected: {
    fontWeight: 'bold',
  },
  dayStatus_done: {
    color: 'brown',
  },
  dayStatus_wait: {
    color: 'grey',
  },
  dayStatus_inProgress: {
    color: 'orange',
  },
});
