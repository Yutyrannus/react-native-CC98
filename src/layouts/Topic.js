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
import Icon from 'react-native-vector-icons/Ionicons'
import 'whatwg-fetch';
import config from '../config'
import topicStyle from '../styles/topicStyle'
import refreshStyle from '../styles/refreshStyle'
import moment from 'moment'
//import ubb from '../lib/ubb'

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

class Topic extends Component {

  constructor() {
    super()
    this._data = []
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      refreshing: false,
      dataSource: ds.cloneWithRows([]),
    }
  }

  componentWillMount(){
    _navigator = this.props.navigator
    this._onRefresh()
  }

  _onRefresh() {
    this.setState({refreshing: true})
    fetch(`${config.baseUrl}post/topic/${this.props.topicId}?from=0&to=9`)
      .then(response => response.json())
      .then(json => {
        this.initDataSource(json)
        this.setState({refreshing: false})
      })
  }

  _loadMore() {
    let len = this._data.length
    fetch(`${config.baseUrl}post/topic/${this.props.topicId}?from=${len}&to=${len + 9}`)
      .then(response => response.json())
      .then(json => {
        this.updateDataSource(json)
      })
  }

  initDataSource(data){
    this._data = data
    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(this._data),
    })
  }

  updateDataSource(data){
    if (this._data)
      this._data = this._data.concat(data)
    else
      this._data = data
    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(this._data),
    })
  }

  _navigate(id) {
    return 0
  }

  _renderFooter() {
    return (
      <Text> </Text>
    )
  }

  _renderRow(rowData) {
    let timeFromNow = moment(rowData.time).fromNow()
    //let content = ubb(rowData.content)
    return (
      <View style={topicStyle.list}>
        <Text>{rowData.authorName || '匿名'}</Text>
        <Text style={topicStyle.text}>
          {rowData.content}
        </Text>
        <View style={topicStyle.info}>
          <Text style={topicStyle.floor}>
            第{rowData.floor}楼
          </Text>
          <Text style={topicStyle.time}>
            <Icon name="md-time" color="#4F8EF7" /> {timeFromNow}
          </Text>
        </View>
      </View>
    )
  }

  render() {
    return (
      <View style={{flex: 1, backgroundColor: 'white'}}>
        <View style={styles.toolbarContainer}/>
          <Icon.ToolbarAndroid
            navIconName="md-arrow-back"
            iconSize={30}
            title={this.props.topicName}
            titleColor="white"
            style={styles.toolbar}
            onIconClicked={() => this.props.navigator.pop()}
          />
        <ListView
          style={{flex: 1}}
          removeClippedSubviews
          enableEmptySections
          pagingEnabled={false}
          dataSource={this.state.dataSource}
          scrollRenderAheadDistance={90}
          onEndReached={this._loadMore.bind(this)}
          onEndReachedThreshold={30}
          renderFooter={this._renderFooter.bind(this)}
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this._onRefresh.bind(this)}
              colors={refreshStyle.colors}
            />
          }
          renderRow={this._renderRow.bind(this)}
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

export default Topic
