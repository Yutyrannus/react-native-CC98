/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */

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
} from 'react-native';
//import Icon from 'react-native-vector-icons/FontAwesome';
import 'whatwg-fetch';


class demo extends Component {
  render() {
    return (
        <Main/>
    );
  }
}

class Home extends Component {
  navSecond() {
    this.props.navigator.push({
      name: 'second'
    })
  }
  render() {
    return (
      <BoardRoot/>

    );
  }
}

class Navigation extends Component {
  render() {
    return (
      <Navigator
        initialRoute={{ name: 'Home' }}
        renderScene={this.renderScene}/>
    );
  }

  renderScene(route, navigator) {
    switch (route.name) {
      case 'Home':
        return <Home navigator={navigator} title="Home" />;
      case 'second':
        return (<Second navigator={navigator} title="second" />);
    }
  }
}

//菜单图标
// const myIcon = (<Icon name="home" size={30} color="#900" />)
const menuDate = [
  //myIcon,
  'second'
]

var Main =React.createClass ({

getInitialState: function() {
  var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
  return {
    dataSource: ds.cloneWithRows(menuDate),
  };
},

  render: function() {
var navigationView = (
      <View style={{flex: 1, backgroundColor: '#fff'}}>
        <Image  source= {require('./src/bg.jpg')} style={{  height:200, width: 300 }} />
        <ListView
          dataSource={this.state.dataSource}
          renderRow={ (rowData) =>
              <View style={{
                height: 56,
                flexDirection : 'row',
                alignItems:'center',
                paddingLeft: 20,
              }}>
                <Image source = { require('./src/logo.png') } style={{ height:10, width:10, margin:8, backgroundColor:'#06F'}}/>
                <Text style={ styles.listItem }>{rowData}</Text>
             </View>
           }
        />
      </View>
    );

  return (
    <DrawerLayoutAndroid
      drawerWidth={300}
      drawerPosition={DrawerLayoutAndroid.positions.Left}
      ref={(drawer) => { this.drawer = drawer; }}
      renderNavigationView={() => navigationView}>
      <View style={styles.toolbarContainer}>
        <StatusBar
          translucent={true}
          backgroundColor="rgba(0, 0, 0, 0.1)"
          barStyle="light-content"
         />
        <ToolbarAndroid
          navIconName="bars"
          iconColor="white"
          title="首页"
          titleColor="white"
          style={styles.toolbar}
          onIconClicked={() => this.drawer.openDrawer()}
        />
        </View>
        <Navigation/>
    </DrawerLayoutAndroid>
  );
}
})

const baseUrl = 'http://api.cc98.org/';

var Second = React.createClass({

  getInitialState: function() {
    return {
      title: 'click to back',
      authorName: ''
    };
  },

  componentWillMount: function (){
    fetch(baseUrl + 'topic/hot')
      .then(response => response.json())
      .then(json => this.updateDataSource(json))
  },
  updateDataSource: function(data){
    this.setState({
      title: data[0].title,
      authorName: data[0].authorName
    })
  },

  render: function (){
    return (
      <View style={styles.container}>
        <Text style={styles.welcome} onPress={this.props.navigator.pop}>
          {this.state.title}
          {'\n\n\n\n\n\n\n\n\n'}
          {this.state.authorName}
        </Text>
      </View>
    );
  }

});

class BoardRoot extends Component {
  navSecond() {
    this.props.props.navigator.push({
      name: 'second'
    })
  }

  constructor() {
    super();
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: ds.cloneWithRows(['1']),
    };
  }

  componentWillMount(){
    fetch(baseUrl + 'board/root')
      .then(response => response.json())
      .then(json => this.updateDataSource(json))
  }

  updateDataSource(data){
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.setState({
      dataSource: ds.cloneWithRows(data),
    })
  }

  render() {
    return (
      <ScrollView>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={(rowData) =>
            <View style={styles.boardRoot} onPress={this.navSecond.bind(this) }>
              <Text style={styles.instructions}>
                {rowData.name}
              </Text>
            </View>
            }
        />
    </ScrollView>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  boardRoot: {
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0, 0, 0, 0.2)'
  },

  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    color: '#333',
    fontSize: 20,
    textAlign: 'left',
    margin: 15,
    marginLeft: 30
  },
  toolbarContainer: {
    paddingTop: 20,
    backgroundColor: '#00796B'
  },
  toolbar: {
    backgroundColor: '#00796B',
    height: 56,
  }
});

AppRegistry.registerComponent('demo', () => demo);
