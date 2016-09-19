import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  Navigator,
  ToolbarAndroid,
  ProgressBarAndroid,
  ScrollView,
  ListView,
  StatusBar,
  DrawerLayoutAndroid,
  TouchableOpacity,
  TouchableHighlight,
  BackAndroid
} from 'react-native';
//import Icon from 'react-native-vector-icons/FontAwesome';
import 'whatwg-fetch';
import ScrollableTabView ,{DefaultTabBar, } from 'react-native-scrollable-tab-view'
import Hot from './Hot'
import BoardRoot from './BoardRoot'
import New from './New'



class Navigation extends Component {
  render() {
    return (
      <Navigator
        initialRoute={{ name: 'Home' , component: Main}}
        renderScene={this.renderScene}
        configureScene={(route, routeStack) => Navigator.SceneConfigs.FloatFromRight}
      />
    );
  }

  renderScene(route, navigator) {
    return <route.component navigator={navigator} {...route.passProps} />;
  }
}


var Main =React.createClass ({

getInitialState: function() {
  var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
  return {
    dataSource: ds.cloneWithRows([]),
  };
},

  render() {
    return (
      <View style={{backgroundColor: 'white', flex: 1}}>
        <View style={{backgroundColor: '#387ef5', height: 20}}/>
           <ScrollableTabView
            renderTabBar={() => <DefaultTabBar />}
            tabBarBackgroundColor={'#387ef5'}
            tabBarInactiveTextColor={'rgba(255,255,255,0.5)'}
            tabBarActiveTextColor={'white'}
            tabBarUnderlineStyle={{backgroundColor: 'rgba(200,200,250,0.8)'}}
            >
             <BoardRoot navigator={this.props.navigator} tabLabel="板块列表" />
             <Hot navigator={this.props.navigator} tabLabel="热门话题" />
             <New navigator={this.props.navigator} tabLabel="查看新帖" />
           </ScrollableTabView>
         </View>

    );
  }
})



const styles = StyleSheet.create({
  scrollable: {
    backgroundColor: 'purple'
  }
});

export default Navigation
