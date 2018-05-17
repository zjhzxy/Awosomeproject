/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
import {
  StackNavigator,
} from 'react-navigation';

import List from './src/pages/List'
import Detail from './src/pages/Detail'

const App = StackNavigator({
  List: {screen: List},
  Detail: {screen: Detail},
});

export default App;
