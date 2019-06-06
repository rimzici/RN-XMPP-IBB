/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component, useState} from 'react';
import {Platform, StyleSheet, Text, View, Image} from 'react-native';
import ImagePicker from 'react-native-image-picker';

import XMPPConnection from './xmpp/connection';

var base64 = require('base-64');
global.btoa = base64.encode;
global.atob = base64.decode;

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      image: false,
    };

    const { initiate } = XMPPConnection();
    initiate();
  }
  render () {
    return (
    <View style={styles.container}>
      <Text style={styles.welcome}>Hello</Text>
    </View>
  );
    }
}

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
