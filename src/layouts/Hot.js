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
  TouchableHighlight,
  RefreshControl
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'
import 'whatwg-fetch';
import config from '../config'
import topicListStyle from '../styles/topicListStyle'
import refreshStyle from '../styles/refreshStyle'
import Topic from './Topic'


class Hot extends Component {

  constructor() {
    super();
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      refreshing: false,
      dataSource: ds.cloneWithRows([]),
    };
  }

  componentWillMount(){
    this._onRefresh()
  }

  _onRefresh() {
    this.setState({refreshing: true})
    fetch(config.baseUrl + 'topic/hot')
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

  _navigate(id, name) {
    this.props.navigator.push({
      component: Topic,
      passProps: {
        topicId: id,
        topicName: name
      },
    })
  }

  _renderRow(rowData) {
    return (
      <TouchableHighlight
        onPress={()=>this._navigate(rowData.id, rowData.title)}>
        <View style={topicListStyle.list} >
          <Text style={topicListStyle.title}>
            {rowData.title}
          </Text>
          <View style={topicListStyle.info}>
            <Text style={topicListStyle.authorName}>
              <Icon name="md-person" color="#4F8EF7" /> {rowData.authorName || '匿名'}
            </Text>
            <Text style={topicListStyle.count}>
              <Icon name="md-chatbubbles" color="#4F8EF7" /> {rowData.replyCount}/{rowData.hitCount}
            </Text>
            <Text style={topicListStyle.time}
              ellipsizeMode="tail"
              numberOfLines={1}
            >
              <Icon name="ios-browsers" color="#4F8EF7" /> {rowData.boardName}
            </Text>
          </View>
        </View>
      </TouchableHighlight>
    )
  }

  render() {
    return (
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
        renderRow={this._renderRow.bind(this)}
      />
    );
  }
};

export default Hot
