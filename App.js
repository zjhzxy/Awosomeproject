/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  } from 'react-native';
const styles = StyleSheet.create({
  root:{
    backgroundColor: 'red',
    width:50,
    height:60,
  }
});
type Props = {};
export default class App extends Component<Props> {
  render() {
    return (
      <View style={styles.root} >

      </View>
    );
  }
}

