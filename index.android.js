/**
 * Push Ups Plan for 6 weeks course
 * @author Eugene Lyzo
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  AsyncStorage,
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

import CONFIG from './src/constants/Config';
import LANG_RU from './src/constants/lang/ru';
import LANG_EN from './src/constants/lang/en';
import PLAN from './src/constants/Plan';

const LANG = CONFIG.lang === 'ru' ? LANG_RU : LANG_EN;

export default class pushups extends Component {

  constructor(props) {
    super(props);

    this.init();
  }

  init() {
    const firstLoad = !!this.userPlan;
    this.userPlan = PLAN;
    AsyncStorage.getItem(CONFIG.storeUserPlanKey).then((value) => {
      if (value) {
        this.userPlan = JSON.parse(value);
        // console.log('AsyncStorage.getItem done', this.userPlan);
      }

      let week = -1;
      let day = 1;

      this.userPlan.forEach((userWeek, i) => {
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
    this.userPlan.forEach((week, i) => {
      week.day1.forEach((attempt, j) => (this.userPlan[i].day1[j].done = false));
      week.day2.forEach((attempt, j) => (this.userPlan[i].day2[j].done = false));
      week.day3.forEach((attempt, j) => (this.userPlan[i].day3[j].done = false));
    });

    AsyncStorage.clear().then(() => {
      this.init();
      this._drawer.close();
    }).done();
  }

  updateLists(selectedWeek, selectedDay) {
    const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    this.lists = {
      weeks: ds.cloneWithRows(this.userPlan),
      selectedDay: ds.cloneWithRows(this.userPlan[selectedWeek][`day${selectedDay}`]),
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
    // console.log('onPressAttempt', arguments, this, this.userPlan[week][`day${day}`][attemptId]);
    this.userPlan[week][`day${day}`][attemptId].done =
      !this.userPlan[week][`day${day}`][attemptId].done;

    this.updateLists(week, day);

    AsyncStorage.setItem(CONFIG.storeUserPlanKey, JSON.stringify(this.userPlan)).then(() => {
      // console.log('AsyncStorage.setItem done', this.userPlan);
      this.setState({
        selectedDay: { week, day },
        countdownTime: CONFIG.timerTime,
      });
    }).done();
  }

  // ------------------------------------------
  // ------------------------------------------

  render() {
    return this.lists ? (
      <Drawer
        type="displace"
        content={(
          <View>
            <View>
              <Text style={styles.caption}>{LANG.settings_title}</Text>
              <Text>{LANG.settings_lang}: {LANG.settings_langName}</Text>
            </View>
            <View>
              <Text> {'\n\n\n'}</Text>
              <Text> {'\n\n\n'}</Text>
              <TouchableHighlight onPress={() => this.restoreDefaults()}>
                <Text>{LANG.settings_restoreDefaults}</Text>
              </TouchableHighlight>
              <Text> {'\n\n\n'}</Text>
              <TouchableHighlight onPress={() => this._drawer.close()}>
                <Text>{LANG.settings_close}</Text>
              </TouchableHighlight>
            </View>
          </View>
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
        <View style={styles.container}>
          <Text style={styles.caption}>
            {LANG.title}: {LANG.week} {this.state.selectedDay.week + 1}, {
                                                          LANG.day} {this.state.selectedDay.day}
          </Text>
          <TouchableHighlight
            onPress={() => this._drawer.open()}
          ><Text>{LANG.settings_title}</Text></TouchableHighlight>
          <View style={{ flexDirection: 'row' }}>
            <ListView
              dataSource={this.lists.weeks}
              renderRow={(week) => (
                <Week
                  lang={LANG}
                  week={week}
                  onPressDay={(weekId, day) => this.onPressDay(weekId, day)}
                  selectedWeek={week.id === this.state.selectedDay.week}
                  selectedDay={this.state.selectedDay.day}
                >${LANG.week} {week.name}</Week>
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
              <TimeCountdown countdownTime={this.state.countdownTime} />
            </View>
          </View>
        </View>
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
