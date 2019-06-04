/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Image} from 'react-native';

var base64 = require('base-64');
global.btoa = base64.encode;
global.atob = base64.decode;
const {xml} = require('@xmpp/client')

import User from './User';
import Login from './Login';

import XMPPConnection from "./xmpp/connection";

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      uname: false,
      pass: false,
    };
  }
  render () {
    return (
    <View style={styles.container}>
    {this.state.uname && this.state.pass ?
      <User {...this.state}/>
      :
      <Login
        onLoginSuccess={(uname, pass) => {
        this.setState({
          uname,
          pass,
        })
      }}/>
    }
    </View>
  );
    }
}

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'stretch',
    backgroundColor: '#F5FCFF',
  },
});
