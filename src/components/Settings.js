/**
 * @author Eugene Lyzo
 */

import React, { Component } from 'react';
import {
  Picker,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from 'react-native';

import Translater from '../utils/Translater';

export default class Settings extends Component {

  constructor(props) {
    super(props);

    this.state = this.props.settings;
  }

  restoreDefaults() {
    this.props.restoreDefaults();
  }

  closeDrawer() {
    this.props.closeDrawer();
  }

  saveSettings(key, value) {
    // console.log('save sett', key, value, this.state);
    const settings = this.state;
    settings[key] = value;
    this.setState(settings);
    this.props.saveSettings(settings);
  }

  render() {
    return (
      <View>
        <View>
          <Text style={styles.caption}>{Translater.t('settings_title')}</Text>
          <Text>{Translater.t('settings_lang')}: {Translater.t('settings_langName')}</Text>
        </View>
        <View>
          <Text>{Translater.t('settings_days')}</Text>
          <Picker
            selectedValue={this.state.days}
            onValueChange={(days) => this.saveSettings('days', days)}
          >
            <Picker.Item
              label={Translater.t('settings_days_1')}
              value={1}
            />
            <Picker.Item
              label={Translater.t('settings_days_2')}
              value={2}
            />
          </Picker>
        </View>
        <View>
          <Text> {'\n\n\n'}</Text>
          <Text> {'\n\n\n'}</Text>
          <TouchableHighlight onPress={() => this.restoreDefaults()}>
            <Text>{Translater.t('settings_restoreDefaults')}</Text>
          </TouchableHighlight>
          <Text> {'\n\n\n'}</Text>
          <TouchableHighlight onPress={() => this.closeDrawer()}>
            <Text>{Translater.t('settings_close')}</Text>
          </TouchableHighlight>
        </View>
      </View>
    );
  }

}

Settings.propTypes = {
  restoreDefaults: React.PropTypes.func,
  closeDrawer: React.PropTypes.func,
  saveSettings: React.PropTypes.func,
  settings: React.PropTypes.object,

};


const styles = StyleSheet.create({
  caption: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
});
