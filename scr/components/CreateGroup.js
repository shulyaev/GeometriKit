import React, { Component } from 'react';
import { View, Text, Picker, AsyncStorage, Alert } from 'react-native';
import Icon from '@expo/vector-icons/Ionicons'
import { Button } from './common';

export default class CreateGroup extends Component {
    static navigationOptions = ({ navigation }) => {
        return {
          title: 'יצירת קבוצה',
          headerRight: (
            <Icon
              style={{ paddingRight: 15, color: "#fff" }}
              onPress={() => navigation.goBack()}
              name="ios-arrow-forward"
              size={30}
            />
          ),
          headerLeft: null
        };
      };

    constructor(props) {
        super(props);
        this.state = {
            grade: 'ט',
            questionnaire: '4',
            teacherID: '',
            schoolID: ''
        }
        this._loadInitialState().done();
    }

    _loadInitialState = async () => {
        var value = await AsyncStorage.getItem('userData');
          this.setState({teacherID: JSON.parse(value).userID})
      }
    
    render() {
      return (
        <View style={{ flex: 1, justifyContent: 'center' }}>
        <Picker
          selectedValue = {this.state.grade}
          onValueChange = {(itemValue) => this.setState({grade: itemValue})}
          itemStyle={{color: 'black', backgroundColor: 'rgba(200, 200, 200, 0.4)', marginHorizontal: 20, marginVertical: 5, height: 100, borderRadius: 20, fontSize: 15}}
        >
            <Picker.Item label="ט'" value="ט"/>
            <Picker.Item label="י'" value="י"/>
            <Picker.Item label="יא'" value="יא"/>
        </Picker>

        <Picker
          selectedValue = {this.state.questionnaire}
          onValueChange = {(itemValue) => this.setState({questionnaire: itemValue})}
          itemStyle={{color: 'black', backgroundColor: 'rgba(200, 200, 200, 0.4)', marginHorizontal: 20, marginVertical: 5, height: 100, borderRadius: 20, fontSize: 15}}
        >
            <Picker.Item label="4" value="4"/>
            <Picker.Item label="5" value="5"/>
        </Picker>
        <Button onPress={() => {this.save(); this.props.navigation.navigate("TeacherHome");}}>
          צור
        </Button>
      </View>
      );
   }

   save = () => {
    // axios.post('http://geometrikit-ws.cfapps.io/api/creategroup', {
    //     grade: this.state.grade,
    //     questionnaire: this.state.questionnaire,
    //     teacherID: this.state.teacherID
    //   }
    // );
    Alert.alert('קבוצה נוספה בהצלחה');
   }
}