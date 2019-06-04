/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Image, TextInput} from 'react-native';
const {xml} = require('@xmpp/client')

import XMPPConnection from "./xmpp/connection";

class Login extends Component {

  constructor(props) {
    super(props);

    this.state = {
      uname: "",
      pass: "",
    };
  }

  render () {
    return (
    <View style={styles.container}>
    <View style={{flexDirection: 'row', alignItems: 'center', marginTop: 10,}}>
        <Text>
        {"Uname:   "}
        </Text>
        <TextInput
            style={styles.textInput}
            onChangeText={(text) => this.setState({uname: text})}
            value={this.state.uname}
            autoCapitalize={'none'}/>
    </View>
    <View style={{flexDirection: 'row', alignItems: 'center', marginTop: 10,}}>
        <Text>
        {"Pass:       "}
        </Text>
        <TextInput
            style={styles.textInput}
            onChangeText={(text) => this.setState({pass: text})}
            value={this.state.pass}
            autoCapitalize={'none'}/>
    </View>
    <Text style={{
        padding: 12,
        alignSelf: 'center',
        color: 'green',
        borderWidth: 1,
        borderColor: 'red',
        marginTop: 10,
        borderRadius: 5,
    }} onPress={() => {
        this.props.onLoginSuccess(this.state.uname, this.state.pass);
    }}>
        Sumbit
        </Text>
    </View>
    );
    }
}

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
    backgroundColor: '#F5FCFF',
    margin: 10,
  },
  textInput: {
      minWidth: 200,
      height: 50,
      color: 'black',
      borderWidth: 1,
      borderColor: 'black',
      marginRight: 10,
  }
});
