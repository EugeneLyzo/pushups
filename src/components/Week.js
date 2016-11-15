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

import Translater from '../utils/Translater';

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
          {Translater.t('week')} {this.props.week.name}:
        </Text>
        <TouchableHighlight onPress={() => this._onPressDay(this.props.week.id, 1)}>
          <Text
            style={[
              styles[`dayStatus_${this.checkDay(this.props.week.day1)}`],
              this.props.selectedWeek && this.props.selectedDay === 1 ? styles.daySelected : null,
            ]
            }
          >
            {Translater.t('weekDays')[-1 + this.props.settings.days]}:
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
            {Translater.t('weekDays')[1 + this.props.settings.days]}:
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
            {Translater.t('weekDays')[3 + this.props.settings.days]}:
            {this.props.selectedWeek && this.props.selectedDay === 3 ? ' :::: ' : ''}
          </Text>
        </TouchableHighlight>
      </View>
    );
  }
}

Week.propTypes = {
  onPressDay: React.PropTypes.func,
  week: React.PropTypes.object,
  settings: React.PropTypes.object,
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
    color: 'black',
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
    color: 'green',
  },
});
