import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  Image,
  ActivityIndicator,
  Text,
} from 'react-native';
import Item from '../components/Item';
//import movies from './movies.json'

const styles = StyleSheet.create({
  row:{
    paddingHorizontal:15,
  },
  container: {
    flex: 1,
  },
  loading:{
    marginTop:50,
  },
  callback:{
    marginTop:10,
    fontSize:20,
  },
});
const api = 'http://api.douban.com/v2/movie/in_theaters';
export default class List extends Component{
  static navigationOptions = {
    title: '列表页',
  };
  state = {
    movies:[],
    refreshing:false,
    ready : false,
    childState : '',
  };
  refreshing = false;
  start:0;
  count:12;
  fetchData = (start=0, count=12) => {
    if(this.refreshing){
      return;
    }
    this.setState({
      refreshing:true,
    });
    this.refreshing = true;
    return fetch(`${api}?start=${start}&count=${count}`)
      .then((response) => response.text())
      .then((responseText) => {
        const json = JSON.parse(responseText);
        this.setState({
          //movies:json.subjects,
          refreshing:false,
        });
        this.refreshing = false;
        return json;
      })
      .catch((error) => {
        console.error(error);
      });
  };
  freshData = async () => {
    const json = await this.fetchData();
    this.setState({
      movies:json.subjects,
    });
  };
  fetchMore = async () => {
    const json = await this.fetchData(this.start, this.count);
    if(json){
      this.start += this.count -1 ;
      this.setState({
        movies:this.state.movies.concat(json.subjects),
      });
    }
  };
  async componentDidMount(){
    //this.fetchData();
    await this.fetchMore();
    this.setState({
      ready : true,
    });
  }
  render() {
    const { movies, refreshing, ready, childState} = this.state;
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.row}>
        <Text style={ styles.callback }> 子组件传回的数据：{childState}</Text>
        {
          ready ?
            <FlatList
              numColumns={3}
              keyExtractor={item => item.id}
              data={movies}
              onRefresh={this.freshData}
              onEndReached={this.fetchMore}
              onEndReachedThreshold={0}
              refreshing={refreshing}
              ListFooterComponent = {()=>{
                return refreshing && <ActivityIndicator
                  size = 'large'
                  style={styles.loading}
                />
              }}
              renderItem={({item}) =>{
                return (<Item
                  title={item.title}
                  image={item.images.medium}
                  stars={item.rating.stars}
                  onPress={() => navigate('Detail', {
                    id: item.id,
                    callback:(data)=>{
                      this.setState({
                        childState:data
                      })
                    }
                  })}
                />)}
              }
            />
            :
            <ActivityIndicator size='large' style={styles.loading} />
        }
      </View>
    );
  }
}

