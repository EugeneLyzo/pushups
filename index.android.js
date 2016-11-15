/**
 * Push Ups Plan for 6 weeks course
 * @author Eugene Lyzo
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  AsyncStorage,
  ListView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from 'react-native';
import Drawer from 'react-native-drawer';

import Day from './src/components/Day';
import TimeCountdown from './src/components/TimeCountdown';
import Week from './src/components/Week';
import Settings from './src/components/Settings';

import CONFIG from './src/constants/Config';
import PLAN from './src/constants/Plan';
import Translater from './src/utils/Translater';

export default class pushups extends Component {

  constructor(props) {
    super(props);

    this.userData = {
      plan: {},
      settings: {
        days: 1,
      },
    };

    this.countdownAttempt = 1; // used to prevent update after rotate

    this.init();
  }

  init() {
    const firstLoad = !!this.userData.plan;
    this.userData.plan = PLAN;
    AsyncStorage.getItem(CONFIG.storeUserDataKey).then((value) => {
      if (value) {
        this.userData = JSON.parse(value);
        // console.log('AsyncStorage.getItem done', this.userData);
      }

      let week = -1;
      let day = 1;

      this.userData.plan.forEach((userWeek, i) => {
        // check week status
        if (week !== -1) return;
        let complete = true;
        let currentDay = 0;

        userWeek.day1.forEach((attempt) => (complete = complete && attempt.done));
        if (complete) currentDay = 1;
        userWeek.day2.forEach((attempt) => (complete = complete && attempt.done));
        if (complete) currentDay = 2;
        userWeek.day3.forEach((attempt) => (complete = complete && attempt.done));
        if (complete) currentDay = 3;

        if (!complete) {
          week = i;
          day = currentDay + 1;
        }
      });

      if (week === -1) {
        week = 5;
        day = 3;
      } // cource completed and we don't have any empty attempts

      this.updateLists(week, day);
      if (firstLoad) {
        this.state = {
          selectedDay: { week, day },
          countdownTime: 0,
        };
      } else {
        this.setState({
          selectedDay: { week, day },
          countdownTime: 0,
        });
      }
      this.forceUpdate();
    }).done();
  }

  restoreDefaults() {
    // deep clear, because object was updated by link
    this.userData.plan.forEach((week, i) => {
      week.day1.forEach((attempt, j) => (this.userData.plan[i].day1[j].done = false));
      week.day2.forEach((attempt, j) => (this.userData.plan[i].day2[j].done = false));
      week.day3.forEach((attempt, j) => (this.userData.plan[i].day3[j].done = false));
    });

    AsyncStorage.clear().then(() => {
      this.init();
      this._drawer.close();
    }).done();
  }

  closeDrawer() {
    this._drawer.close();
  }

  updateLists(selectedWeek, selectedDay) {
    const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    this.lists = {
      weeks: ds.cloneWithRows(this.userData.plan),
      selectedDay: ds.cloneWithRows(this.userData.plan[selectedWeek][`day${selectedDay}`]),
    };
  }

  onPressDay(week, day) {
    // console.log('onPressDay', arguments, this);
    this.updateLists(week, day);
    this.setState({
      selectedDay: { week, day },
      countdownTime: 0,
    });
  }

  onPressAttempt(attemptId) {
    const week = this.state.selectedDay.week;
    const day = this.state.selectedDay.day;
    // console.log('onPressAttempt', attemptId, this);
    this.userData.plan[week][`day${day}`][attemptId].done =
      !this.userData.plan[week][`day${day}`][attemptId].done;

    this.updateLists(week, day);
    this.countdownAttempt += 1;

    AsyncStorage.setItem(CONFIG.storeUserDataKey, JSON.stringify(this.userData)).then(() => {
      // console.log('AsyncStorage.setItem done', attemptId);
      this.setState({
        selectedDay: { week, day },
        countdownTime: this.userData.plan[week][`day${day}`].length > (+attemptId + 1)
                          ? CONFIG.timerTime : 0,
      });
    }).done();
  }

  saveSettings(settings) {
    this.userData.settings = settings;
    AsyncStorage.setItem(CONFIG.storeUserDataKey, JSON.stringify(this.userData)).then(() => {
      // console.log('AsyncStorage.setItem done', this.userData);
      this.init();
    }).done();
  }

  getCompletePercent() {
    let total = 0;
    let completed = 0;

    this.userData.plan.forEach((week, i) => {
      week.day1.forEach((attempt, j) => {
        completed += this.userData.plan[i].day1[j].done ? 1 : 0;
        total += 1;
      });
      week.day2.forEach((attempt, j) => {
        completed += this.userData.plan[i].day2[j].done ? 1 : 0;
        total += 1;
      });
      week.day3.forEach((attempt, j) => {
        completed += this.userData.plan[i].day3[j].done ? 1 : 0;
        total += 1;
      });
    });

    const percent = Math.round((completed / total) * 1000) / 10;
    let progress = '[';
    let i;
    for (i = 10; i < percent; i += 10) progress += '|';
    for (i = 100; i > percent; i -= 10) progress += '.';
    progress += ']';

    return `${percent}% \n ${progress}`;
  }


  // ------------------------------------------
  // ------------------------------------------

  render() {
    return this.lists ? (
      <Drawer
        type="displace"
        content={(
          <Settings
            settings={this.userData.settings}
            saveSettings={(settings) => this.saveSettings(settings)}
            closeDrawer={() => this.closeDrawer()}
            restoreDefaults={() => this.restoreDefaults()}
          />
        )}
        tapToClose
        openDrawerOffset={0.2} // 20% gap on the right side of drawer
        panCloseMask={0.2}
        closedDrawerOffset={-3}
        styles={drawerStyles}
        tweenHandler={(ratio) => ({
          main: { opacity: (2 - ratio) / 2 },
        })}
        ref={(ref) => (this._drawer = ref)}
      >
        <ScrollView>
          <View style={styles.container}>
            <Text style={styles.caption}>
              {Translater.t('title')}: {Translater.t('week')} {this.state.selectedDay.week + 1}, {
                                      Translater.t('day')} {this.state.selectedDay.day}
            </Text>
            <TouchableHighlight
              onPress={() => this._drawer.open()}
            ><Text>{Translater.t('settings_title')}</Text></TouchableHighlight>
            <View style={{ flexDirection: 'row' }}>
              <ListView
                dataSource={this.lists.weeks}
                renderRow={(week) => (
                  <Week
                    week={week}
                    settings={this.userData.settings}
                    onPressDay={(weekId, day) => this.onPressDay(weekId, day)}
                    selectedWeek={week.id === this.state.selectedDay.week}
                    selectedDay={this.state.selectedDay.day}
                  >${Translater.t('week')} {week.name}</Week>
                )}
              />
              <ListView
                dataSource={this.lists.selectedDay}
                renderRow={(day, sectionID, rowID) => (
                  <Day
                    day={day}
                    attemptId={rowID}
                    onPressAttempt={(attemptId) => this.onPressAttempt(attemptId)}
                  />
                )}
              />
              <View style={styles.timer}>
                <TimeCountdown
                  countdownTime={this.state.countdownTime}
                  attempt={this.countdownAttempt}
                />
                <Text style={styles.complete}>
                  {this.getCompletePercent()}
                </Text>
              </View>
            </View>
          </View>
        </ScrollView>
      </Drawer>
    ) : <Text>Loading...</Text>;
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  caption: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  complete: {
    marginTop: 20,
    color: 'green',
    fontSize: 14,
  },
  timer: {
    flex: 0.4,
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
  main: {
    paddingLeft: 3,
  },
};

AppRegistry.registerComponent('pushups', () => pushups);
