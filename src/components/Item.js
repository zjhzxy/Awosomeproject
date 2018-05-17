/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Image,
  Text,
  Dimensions,
  TouchableOpacity,
} from 'react-native';

const { width, height } = Dimensions.get('window');
const thirdWidth = width / 3;
const imageWidth = thirdWidth-10*2;
const imageHeight = imageWidth / 0.697;
const styles = StyleSheet.create({
  root:{
    marginTop:20,
    width:imageWidth,
    //alignItems:'center',
    marginRight:15,
    //height:60,
  },
  image:{
    width:imageWidth,
    height:imageHeight,
  },
  title:{
    fontSize:20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop:5,
  },
  starWrapper:{
    flexDirection:'row',
  },
  stars:{
    width:10,
    height:10,
  },
});
const renderStars = (stars) => {
  if(stars === '00'){
    return;
  }
  const total = 5;
  let full, half, empty;
  full = parseInt(stars[0]);
  if(stars[1]==='5'){
    full++;
    half=0;
    empty=total - full;
  }else {
    half = 1;
    empty = total - full - half;
  }
  const results=[];
  let i;
  for(i=0; i<full; i++){
    results.push(
      <Image
      style={styles.stars}
      key={i}
      source={require('../img/star-full.png')}
    />
    );
  }
  if(half){
    results.push(
      <Image
        style={styles.stars}
        key={i}
        source={require('../img/star-half.png')}
      />
    );
  }
  for(let j=0; j<empty; j++){
    results.push(
      <Image
        style={styles.stars}
        key={i+j+1}
        source={require('../img/star-empty.png')}
      />
    );
  }

  return (
    <View style={styles.starWrapper}>
      {results}
    </View>
  );
}
const Item = (props) => {
    const {title, image, stars, onPress} = props;
    return (
      <TouchableOpacity style={styles.root} onPress={onPress}>
        <Image
          source={{uri:image}}
          style={styles.image}
        />
        <Text
          numberOfLines = {1}
          style={styles.title}
        >
          {title}
        </Text>
        {renderStars(stars)}
      </TouchableOpacity>
    );
  };
export default Item
