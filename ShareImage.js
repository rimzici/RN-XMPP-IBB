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

const options = {
  title: 'Select Avatar',
  customButtons: [{ name: 'fb', title: 'Choose Photo from Facebook' }],
  storageOptions: {
    skipBackup: true,
    path: 'images',
  },
};

class ShareImage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      image: false,
    };
  }
  render () {
    return (
    <View style={styles.container}>
      <Text style={styles.welcome} onPress={async () => {
        ImagePicker.showImagePicker(options, async (response) => {
          console.log('Response = ', response);
        
          if (response.didCancel) {
            console.log('User cancelled image picker');
          } else if (response.error) {
            console.log('ImagePicker Error: ', response.error);
          } else if (response.customButton) {
            console.log('User tapped custom button: ', response.customButton);
          } else {
            console.log("TEST response", response);
            const { fileSize, data } = response;
            const { initiate } = XMPPConnection((image) => {
              this.setState({
                image,
              });
            });
            initiate(response);
            
          }
        })
      }}>Open</Text>
      {this.state.image && <Image
          style={{width: 150, height: 150}}
          source={{uri: 'data:image/png;base64,'+this.state.image}}
        />}
    </View>
  );
    }
}

export default ShareImage;

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
