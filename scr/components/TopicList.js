import React, { Component } from 'react';
import { ScrollView, StyleSheet, View, Text, TouchableOpacity, AsyncStorage, FlatList, Dimensions, Alert, Image } from 'react-native';
import Icon from '@expo/vector-icons/Ionicons';
import axios from 'axios';
import { TopicListRow, Tile } from './common';

const numColumns = 2;

export default class TopicList extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: 'גיאומטריקיט',
      headerRight: (
        <Icon
          style={{ paddingRight: 15, color: "#fff" }}
          onPress={() => navigation.navigate('HamburgerMenu')}
          name="md-menu"
          size={30}
        />
      ),
    };
  };

  constructor(props) {
    super(props);
    this.state = {
      groupID: '',
      subjects: [],
      filtered: false,
    }
  }

  componentWillMount(){
    AsyncStorage.getItem('groupID').then((value) => {
      this.setState({groupID: value });
      axios.get(`http://geometrikit-ws.cfapps.io/api/getsubjects?filtered=${this.state.filtered}classID=${this.state.groupID}&groupID=${this.state.groupID}`)
      .then((response) => {
        this.setState({subjects: response.data})
      })
      .done();
    });
  }

  GetGridViewItem(item) {
    this.props.navigation.navigate('QuestionList', { subjectID: item.subjectID, subjectName: item.subjectName, color: item.color, groupID: this.state.groupID })
  }

  render() {
    return (
      // <View></View>
      <FlatList
        data={this.state.subjects}
        style={styles.containerNew}
        renderItem={({ item }) =>
          <TouchableOpacity style={[styles.GridViewContainer, { backgroundColor: item.color }]} onPress={this.GetGridViewItem.bind(this, item)}>
            <Image source={{ uri: item.picture}} style={{ flex: 4, width: Dimensions.get('window').width / 3.5, margin: 5 }}/>
            <Text style={styles.GridViewTextLayout}> {item.subjectName} </Text>
          </TouchableOpacity>}
        numColumns={numColumns}
        keyExtractor={(item, index) => index.toString()}
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  containerNew: {
    flex: 1,
  },
  itemText: {
    color: '#fff',
  },
  GridViewContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: Dimensions.get('window').height / 5,
    margin: 5
  },
  GridViewTextLayout: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#fff',
    padding: 3,
    flex:1
  }
});
