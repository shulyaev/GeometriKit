import React, { Component } from 'react';
import { View, Text, ScrollView, Picker, AsyncStorage, Alert } from 'react-native';
import Icon from '@expo/vector-icons/Ionicons'
import { Button } from './common';
import MyCheckBox from './common/MyCheckBox';
import axios from 'axios';

export default class AssignToGroup extends Component {
    static navigationOptions = ({ navigation }) => {
        return {
          title: 'הצטרפות לקבוצה',
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
            groups: []
        }
        this.studentID = this.props.navigation.getParam('studentID', '0')
    }

    componentDidMount(){
      axios.post('http://geometrikit-ws.cfapps.io/api/getGroups', {
        userID: this.studentID
      }).then((response) => {
          this.setState({groups: response.data});
          console.log(response.data)
      })
      .catch(() => {
        Alert.alert(
          '',
          "תקלה בחיבור לשרת, אנא נסה שוב מאוחר יותר",
          [
            {text: 'נסה שוב', onPress: () => this.componentDidMount()},
          ],
          {cancelable: false}
        
          );
      })  
      .done();
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