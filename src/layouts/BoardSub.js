import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  ToolbarAndroid,
  ProgressBarAndroid,
  ScrollView,
  ListView,
  TouchableOpacity,
  RefreshControl,
  BackAndroid,
  TouchableHighlight
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import 'whatwg-fetch';
import config from '../config'
import boardListStyle from '../styles/boardListStyle'
import refreshStyle from '../styles/refreshStyle'
import TopicList from './TopicList'

var _navigator
BackAndroid.addEventListener('hardwareBackPress', function() {
  if(_navigator == null){
    return false;
  }
  if(_navigator.getCurrentRoutes().length === 1){
    return false;
  }
  _navigator.pop();
  return true;
});

const myIcon = (<Icon name="rocket" size={30} color="#900" />)

class BoardSub extends Component {

  constructor() {
    super();
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      refreshing: false,
      dataSource: ds.cloneWithRows([]),
    };
  }

  componentWillMount(){
    _navigator = this.props.navigator
    this._onRefresh()
  }

  _onRefresh() {
    this.setState({refreshing: true})
    fetch(config.baseUrl + 'board/' + this.props.boardId + '/subs')
      .then(response => response.json())
      .then(json => {
        this.updateDataSource(json)
        this.setState({refreshing: false})
      })
  }

  updateDataSource(data){
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.setState({
      dataSource: ds.cloneWithRows(data),
    })
  }

  _navigate(boardId, boardName) {
    this.props.navigator.push({
      component: TopicList,
      passProps: {
        boardId: boardId,
        boardName: boardName
      },
    })
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <View style={styles.toolbarContainer}/>
          <Icon.ToolbarAndroid
            iconSize={30}
            navIconName="arrow-back"
            title={this.props.boardName}
            titleColor="white"
            style={styles.toolbar}
            onIconClicked={() => this.props.navigator.pop()}
          />
        <ListView
          removeClippedSubviews
          enableEmptySections
          dataSource={this.state.dataSource}
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this._onRefresh.bind(this)}
              colors={refreshStyle.colors}
            />
          }
          renderRow={(rowData) =>
            <TouchableHighlight
              style={styles.button}
              onPress={()=>this._navigate(rowData.id, rowData.name)}>
              <View style={boardListStyle.list} >
                <Text style={boardListStyle.name}>
                  {rowData.name}
                </Text>
                <Text style={boardListStyle.count}>
                  {rowData.todayPostCount}
                </Text>
              </View>
            </TouchableHighlight>

            }
        />
      </View>
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
    backgroundColor: 'white',
    borderBottomColor: 'rgba(0, 0, 0, 0)'
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
    height: 20,
    backgroundColor: '#387ef5'
  },
  toolbar: {
    backgroundColor: '#387ef5',
    height: 56,
  }
});

export default BoardSub
