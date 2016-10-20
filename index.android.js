/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  ListView,
  StyleSheet,
  Text,
  TouchableHighlight,
  Vibration,
  View,
} from 'react-native';

const PLAN = [
  {
    id: 0,
    name: 'Неделя 1',
    complete: false,
    day1: [
      { count: 10, done: false },
      { count: 12, done: false },
      { count: 7, done: false },
      { count: 7, done: false },
      { count: 9, done: false }
    ],
    day2: [
      { count: 10, done: false },
      { count: 12, done: false },
      { count: 8, done: false },
      { count: 8, done: false },
      { count: 12, done: false }
    ],
    day3: [
      { count: 11, done: false },
      { count: 15, done: false },
      { count: 9, done: false },
      { count: 9, done: false },
      { count: 13, done: false }
    ]
  },
  {
    id: 1,
    name: 'Неделя 2',
    complete: false,
    day1: [
      { count: 14, done: false },
      { count: 14, done: false },
      { count: 10, done: false },
      { count: 10, done: false },
      { count: 15, done: false }
    ],
    day2: [
      { count: 14, done: false },
      { count: 16, done: false },
      { count: 12, done: false },
      { count: 12, done: false },
      { count: 17, done: false }
    ],
    day3: [
      { count: 16, done: false },
      { count: 17, done: false },
      { count: 14, done: false },
      { count: 14, done: false },
      { count: 20, done: false }
    ]
  },
  {
    id: 2,
    name: 'Неделя 3',
    complete: false,
    day1: [
      { count: 14, done: false },
      { count: 18, done: false },
      { count: 14, done: false },
      { count: 14, done: false },
      { count: 20, done: false }
    ],
    day2: [
      { count: 20, done: false },
      { count: 25, done: false },
      { count: 15, done: false },
      { count: 15, done: false },
      { count: 25, done: false }
    ],
    day3: [
      { count: 22, done: false },
      { count: 30, done: false },
      { count: 20, done: false },
      { count: 20, done: false },
      { count: 28, done: false }
    ]
  },
  {
    id: 3,
    name: 'Неделя 4',
    complete: false,
    day1: [
      { count: 21, done: false },
      { count: 25, done: false },
      { count: 21, done: false },
      { count: 21, done: false },
      { count: 32, done: false }
    ],
    day2: [
      { count: 25, done: false },
      { count: 29, done: false },
      { count: 25, done: false },
      { count: 25, done: false },
      { count: 36, done: false }
    ],
    day3: [
      { count: 29, done: false },
      { count: 33, done: false },
      { count: 29, done: false },
      { count: 29, done: false },
      { count: 40, done: false }
    ]
  },
  {
    id: 4,
    name: 'Неделя 5',
    complete: false,
    day1: [
      { count: 36, done: false },
      { count: 40, done: false },
      { count: 30, done: false },
      { count: 24, done: false },
      { count: 40, done: false }
    ],
    day2: [
      { count: 19, done: false },
      { count: 19, done: false },
      { count: 22, done: false },
      { count: 22, done: false },
      { count: 18, done: false },
      { count: 18, done: false },
      { count: 22, done: false },
      { count: 45, done: false }
    ],
    day3: [
      { count: 20, done: false },
      { count: 20, done: false },
      { count: 24, done: false },
      { count: 24, done: false },
      { count: 20, done: false },
      { count: 20, done: false },
      { count: 22, done: false },
      { count: 50, done: false }
    ]
  },
  {
    id: 5,
    name: 'Неделя 6',
    complete: false,
    day1: [
      { count: 45, done: false },
      { count: 55, done: false },
      { count: 35, done: false },
      { count: 30, done: false },
      { count: 55, done: false }
    ],
    day2: [
      { count: 22, done: false },
      { count: 22, done: false },
      { count: 30, done: false },
      { count: 30, done: false },
      { count: 24, done: false },
      { count: 24, done: false },
      { count: 18, done: false },
      { count: 18, done: false },
      { count: 58, done: false }
    ],
    day3: [
      { count: 26, done: false },
      { count: 26, done: false },
      { count: 33, done: false },
      { count: 33, done: false },
      { count: 26, done: false },
      { count: 26, done: false },
      { count: 22, done: false },
      { count: 22, done: false },
      { count: 60, done: false }
    ]
  },
];
const TIMER_TIME = 60;


export default class pushups extends Component {

  constructor(props) {
    super(props);

    let weekId = 0;
    let day = 1;

    this.userPlan = PLAN;
    this._updateLists(weekId, day);
    this.state = {
      selectedDay: { week: weekId, day: day },
      countdownTime: 0,
    };
  }

  _updateLists(weekId, day) {
    let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.lists = {
      weeks: ds.cloneWithRows(this.userPlan),
      selectedDay: ds.cloneWithRows(this.userPlan[weekId]['day' + day])
    }
  }

  onPressDay(weekId, day) {
    // console.log('onPressDay', arguments, this);
    this._updateLists(weekId, day);
    this.setState({
      selectedDay: { week: weekId, day: day },
      countdownTime: 0,
    });
  }

  onPressAttempt(attemptId) {
    weekId = this.state.selectedDay.week;
    day = this.state.selectedDay.day;
    console.log('onPressAttempt', arguments, this, this.userPlan[weekId]['day' + day][attemptId]);
    this.userPlan[weekId]['day' + day][attemptId].done =
      !this.userPlan[weekId]['day' + day][attemptId].done;
    this._updateLists(weekId, day);
    this.setState({
      selectedDay: { week: weekId, day: day },
      countdownTime: TIMER_TIME,
    });
  }

  render() {
    return (

      <View style={styles.container}>
        <Text style={styles.weeksCaption}>
          Push ups Plan:
        </Text>
        <View style={{ flexDirection: 'row' }}>
          <ListView
            dataSource={this.lists.weeks}
            renderRow={(week, sectionID, rowID) => <Week
              week={week}
              onPressDay={(weekId, day) => this.onPressDay(weekId, day)}
              selectedWeek={week.id === this.state.selectedDay.week}
              selectedDay={this.state.selectedDay.day}
            >{week.name}</Week>}
          />
          <ListView
            dataSource={this.lists.selectedDay}
            renderRow={(day, sectionID, rowID) => <Day
              day={day}
              attemptId={rowID}
              onPressAttempt={(attemptId) => this.onPressAttempt(attemptId)}
            ></Day>}
          />
          <View style={styles.timer}><TimeCountdown countdownTime={this.state.countdownTime} /></View>
        </View>
      </View>
    );
  }

}


export class Week extends Component {

  _checkDay(day) {
    status = 'Wait';
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
            styles[this.props.week.complete ? 'weekDone' : 'weekWait'],
            this.props.selectedWeek ? styles.weekSelected : null
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


export class Day extends Component {

  _onPressAttempt() {
    // console.log('_onPressAttempt', arguments, this);
    this.props.onPressAttempt(this.props.attemptId);
  }

  render() {
    return (
      <View style={styles.day}>
        <TouchableHighlight onPress={(e) => this._onPressAttempt()}>
          <Text
            style={[
              styles.attempt,
              this.props.day.done ? styles.attemptDone : null
            ]}
          >{this.props.day.count}</Text>
        </TouchableHighlight>
      </View>
    );
  }

}


export class TimeCountdown extends Component {

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
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  weeksCaption: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  week: {
    flex: 0.5,
    marginTop: 10,
    marginLeft: 20,
  },
  weekSelected: {
    fontWeight: 'bold',
  },
  weekDone: {
    color: 'green',
  },
  weekWait: {
    color: 'blue',
  },
  daySelected: {
    fontWeight: 'bold'
  },
  dayStatusDone: {
    color: 'brown',
  },
  dayStatusWait: {
    color: 'grey',
  },
  dayStatusInProgress: {
    color: 'orange',
  },
  day: {
    flex: 0.2,
    marginLeft: 20,
    marginTop: 10,
  },
  attempt: {
    fontSize: 30,
  },
  attemptDone: {
    textDecorationLine: 'line-through',
  },
  timer: {
    flex: 0.4,
    margin: 10,
    marginRight: 20,
  },
  timerCountdown: {
    fontSize: 36,
  },
});

AppRegistry.registerComponent('pushups', () => pushups);
