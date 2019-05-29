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
            groups: [],
            questionnaire: '',
            grade: '',
            HebrowYear: '',
        }
        this.userData = ''
        this.studentID = this.props.navigation.getParam('studentID', '0')
        this._loadInitialState().done();
    }

    _loadInitialState = async () => {
      var value = await AsyncStorage.getItem('userData');
      this.userData = JSON.parse(value)
    }

    componentDidMount(){
      axios.post('http://geometrikit-ws.cfapps.io/api/getGroups', {
        userID: this.studentID
      }).then((response) => {
          for (var i in response.data) {
            if (response.data[i].assigned == 'true') {
              response.data[i].assigned = true;
              this.setState({HebrowYear: response.data[i].HebrowYear, groupID: response.data[i].groupID, questionnaire: response.data[i].questionnaire, grade: response.data[i].grade})
            } else if (response.data[i].assigned == 'false') {
              response.data[i].assigned = false;
            }
          }
          this.setState({groups: response.data});
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
                if (!e.assigned){
                  this.setState({HebrowYear: e.HebrowYear, groupID: gID, questionnaire: e.questionnaire, grade: e.grade})
                } else if (e.assigned){
                  this.setState({groupID: '', questionnaire: '', grade: '', HebrowYear: ''})
                }
                e.assigned = !e.assigned;
            } else {
                e.assigned = false;
            }

            newArr.push(e)
        });
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
                        HebrowYear={c.HebrowYear}
                        questionnaire={c.questionnaire}
                        schoolName={c.teacherName}
                        checked={c.assigned}
                        updateSelectedClasses={this.updateSelectedGroup}
                    />
                )}
            </ScrollView>
            <Button onPress={() => {this.save(); this.props.navigation.state.params.refreshFunction(this.state.HebrowYear, this.state.grade, this.state.questionnaire, this.state.groupID); this.props.navigation.goBack();}}>
              הצטרף
            </Button>
        </View>
      );
   }

  save = () => {
    axios.post('http://geometrikit-ws.cfapps.io/api/updateAssignToGroup', {
        studentID: this.studentID,
        groupID: this.state.groupID,
      }
      ).then((response) => {
        if (response.data.Status == "true") {
          this.userData.grade = this.state.grade;
          this.userData.questionnaire = this.state.questionnaire;
          this.userData.groupID = this.state.groupID;
          this.userData.HebrowYear = this.state.HebrowYear;
          AsyncStorage.setItem('userData', JSON.stringify(this.userData)); 
          Alert.alert("", 'קבוצת לימוד עודכנה');
        } else {
          Alert.alert('','תקלה בלתי צפויה\nלא עודכנה קבוצת לימוד');
        }
      })
      .catch(() => {
        Alert.alert('', "תקלה בחיבור לשרת, אנא נסה שוב מאוחר יותר")
      })
      .done();
    }
}