import React, { Component } from 'react';
import {
  StyleSheet,
  StatusBar,
  Text,
  View,
  Image,
  ToolbarAndroid,
  ProgressBarAndroid,
  ScrollView,
  ListView,
  TouchableOpacity,
  RefreshControl
} from 'react-native';
//import Icon from 'react-native-vector-icons/FontAwesome';
import 'whatwg-fetch';
import config from '../config'
import boardListStyle from '../styles/boardListStyle'
import refreshStyle from '../styles/refreshStyle'
import BoardSub from './BoardSub'


class BoardRoot extends Component {

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
    fetch(config.baseUrl + 'board/root')
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
      component: BoardSub,
      passProps: {
        boardId: boardId,
        boardName: boardName
      },
    })
  }

  render() {
    return (
      <ScrollView
        style={{backgroundColor: 'white'}}
        refreshControl={
          <RefreshControl
            refreshing={this.state.refreshing}
            onRefresh={this._onRefresh.bind(this)}
            colors={refreshStyle.colors}
          />
        }
      >
      <StatusBar
        backgroundColor="transparent"
        barStyle="light-content"
        translucent={true}
        animated={true}
       />
        <ListView
          removeClippedSubviews
          enableEmptySections
          dataSource={this.state.dataSource}
          renderRow={(rowData) =>
            <TouchableOpacity
              onPress={()=>this._navigate(rowData.id, rowData.name)}>
              <View style={boardListStyle.list} >
                <Text style={boardListStyle.text}>
                  {rowData.name}
                </Text>
              </View>
            </TouchableOpacity>

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

export default BoardRoot
