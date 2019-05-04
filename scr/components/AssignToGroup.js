import React, { Component } from 'react';
import { View, Text, ScrollView, Picker, AsyncStorage, Alert } from 'react-native';
import Icon from '@expo/vector-icons/Ionicons'
import { Button } from './common';
import MyCheckBox from './common/MyCheckBox';

export default class AssignToGroup extends Component {
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
            groupID: '',
            studentID: '',
            groups: [{groupID: '1', grade: 'י', questionnaire: '5', teacherName: 'שדגשדג שדגשדג', assigned: false},
            {groupID: '2', grade: 'יא', questionnaire: '4', teacherName: 'שדגשד גדשג ש ', assigned: false},
            {groupID: '3', grade: 'א', questionnaire: '5', teacherName: 'שדגשדג דשג שדג', assigned: false},
            {groupID: '4', grade: 'י', questionnaire: '4', teacherName: 'שדגשדג שדגשדג', assigned: true},
            {groupID: '5', grade: 'ט', questionnaire: '5', teacherName: 'שדגשדגשד שדגשדג', assigned: false},]
        }
       
        this._loadInitialState().done();
    }

    _loadInitialState = async () => {
        var value = await AsyncStorage.getItem('userData');
          this.setState({studentID: JSON.parse(value).userID})
      }

      updateSelectedGroup = (gID) => {
        var newArr = [];
        this.state.groups.forEach(e => {
            if (e.groupID === gID){
                e.assigned = !e.assigned;
            } else {
                e.assigned = false;
            }

            newArr.push(e)
        });
        this.setState({groupID: gID})
        this.setState({groups: newArr});
      }
    
    render() {
      return (
        <View style={{ flex: 1, justifyContent: 'center' }}>
            <ScrollView>
                 {this.state.groups.map(c =>
                    <MyCheckBox
                        key={c.groupID}
                        groupID={c.groupID}
                        grade={c.grade}
                        questionnaire={c.questionnaire}
                        schoolName={c.teacherName}
                        checked={c.assigned}
                        updateSelectedClasses={this.updateSelectedGroup}
                    />
                )}
            </ScrollView>
            <Button onPress={() => {this.save(); this.props.navigation.navigate("HamburgerMenu");}}>
            הצטרף
            </Button>
      </View>
      );
   }

   save = () => {
    // axios.post('http://geometrikit-ws.cfapps.io/api/gbkhjldsafhkjldfsahdsfajklhdfkjlhdas', {
    //     grade: this.state.grade,
    //     questionnaire: this.state.questionnaire,
    //     teacherID: this.state.teacherID,
    //     schoolID: this.state.schoolID
    //   }
    // );
    Alert.alert('ברוך הבא לקבוצת לימוד');
   }
}