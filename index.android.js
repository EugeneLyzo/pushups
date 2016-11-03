/**
 * Push Ups Plan for 6 weeks course
 * @author Eugene Lyzo
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  ListView,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from 'react-native';
import Drawer from 'react-native-drawer';

import Day from './src/components/Day';
import TimeCountdown from './src/components/TimeCountdown';
import Week from './src/components/Week';

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
    let week = this.state.selectedDay.week;
    let day = this.state.selectedDay.day;
    // console.log('onPressAttempt', arguments, this, this.userPlan[week]['day' + day][attemptId]);
    this.userPlan[week]['day' + day][attemptId].done =
      !this.userPlan[week]['day' + day][attemptId].done;
    this._updateLists(week, day);
    this.setState({
      selectedDay: { week, day },
      countdownTime: TIMER_TIME,
    });
  }

  render() {
    return (
      <Drawer
        type="displace"
        content={(
          <View>
            <View><Text>Some left menu</Text></View>
            <View>
              <TouchableHighlight onPress={() => this._drawer.close()}><Text>Close panel</Text></TouchableHighlight>
            </View>
          </View>
        )}
        tapToClose={true}
        openDrawerOffset={0.2} // 20% gap on the right side of drawer
        panCloseMask={0.2}
        closedDrawerOffset={-3}
        styles={drawerStyles}
        tweenHandler={(ratio) => ({
          main: { opacity:(2-ratio)/2 }
        })}
        ref={(ref) => (this._drawer = ref)}
      >
        <View style={styles.container}>
          <Text style={styles.weeksCaption}>
            Push ups Plan:
          </Text>
          <TouchableHighlight
            onPress={() => this._drawer.open()}
          ><Text>Open panel</Text></TouchableHighlight>
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
              />}
            />
            <View style={styles.timer}><TimeCountdown countdownTime={this.state.countdownTime} /></View>
          </View>
        </View>
      </Drawer>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  weeksCaption: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
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
  timer: {
    // flex: 0.4,
    margin: 10,
    marginRight: 20,
  },
});

const drawerStyles = {
  drawer: {
    shadowColor: '#000000',
    shadowOpacity: 0.8,
    shadowRadius: 3,
    backgroundColor: 'white',
    height: 400,
    width: 200,
  },
  main: {paddingLeft: 3},
}

AppRegistry.registerComponent('pushups', () => pushups);
