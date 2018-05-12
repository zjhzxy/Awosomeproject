/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  } from 'react-native';
import Item from './src/components/Item';
import movies from './movies.json'

const styles = StyleSheet.create({
  row:{
    paddingHorizontal:15,
  },
});
type Props = {};
export default class App extends Component<Props> {
  render() {
    return (
      <View>
        <FlatList
          style={styles.row}
          numColumns={3}
          keyExtractor={item=>item.id}
          data={movies.subjects}
          renderItem={({item}) =>
            <Item
              title={item.title}
              image={item.images.medium}
              stars={item.rating.stars}
            />}
        />
      </View>
    );
  }
}

