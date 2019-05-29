import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, AsyncStorage, Image, Alert, Dimensions, ScrollView, TextInput, KeyboardAvoidingView } from 'react-native';
import Icon1 from '@expo/vector-icons/MaterialIcons';
import axios from 'axios';
import MyCheckBox from './common/MyCheckBox';


let _this = null;

export default class AssignQuestionToClass extends Component {
    static navigationOptions = ({ navigation }) => {
        return {
            title: 'בחר כיתות לשיוך',
            headerRight: (
                <Icon1
                    style={{ paddingRight: 15, color: "#fff" }}
                    onPress={() => navigation.goBack()}
                    name="arrow-forward"
                    size={30}
                />
            ),
            headerLeft: (
                <TouchableOpacity style={{flexDirection: 'row'}} onPress={() => {_this.saveAssignment();navigation.goBack()}}>
                    <Text style={{paddingLeft: 15, color: '#fff', fontSize: 25}}>
                        סיום
                    </Text>
                    <Icon1
                        style={{color: "#fff", paddingLeft: 5}}
                        name="check"
                        size={30}
                    />
                </TouchableOpacity>
            ),
        };
    };

    constructor(props) {
        super(props);
        this.state = {
            allClasses: []
        }
    }

    componentDidMount () {
        axios.post('https://geometrikit.azurewebsites.net/api/getAssignedClasses', {
            questionID: this.props.navigation.getParam('questionID', 'X'),
            teacherID: this.props.navigation.getParam('teacherID', 'X'),
          }
        ).then((response) => {
            for (var i in response.data) {
                if (response.data[i].assigned == 'true') {
                  response.data[i].assigned = true;
                } else if (response.data[i].assigned == 'false') {
                  response.data[i].assigned = false;
                }
            }
            this.setState({allClasses: response.data})
        }).catch(() => {
            Alert.alert(
              '',
              "תקלה בחיבור לשרת, אנא נסה שוב מאוחר יותר",
              [
                {text: 'נסה שוב', onPress: () => this.componentDidMount()},
              ],
              {cancelable: false},);
        }).done();

        _this = this;
    }

    updateSelectedClasses = (groupID) => {
        var newArr = [];
        this.state.allClasses.forEach(e => {
            if (e.groupID === groupID){
                e.assigned = !e.assigned;
            }
            newArr.push(e)
        });
        this.setState({allClasses: newArr});
      }

    saveAssignment(){
        var data = [];
        this.state.allClasses.forEach(e => {
            let groups = (({ groupID, assigned }) => ({ groupID, assigned: assigned.toString() }))(e);
            data.push({...groups, questionID: this.props.navigation.getParam('questionID', 'X')})
        });
        axios.post('https://geometrikit.azurewebsites.net/api/updateAssignClasses', data).done();
    }

    render() {
        return (
            <ScrollView>
                 {this.state.allClasses.map(c =>
                    <MyCheckBox
                        key={c.groupID}
                        groupID={c.groupID}
                        grade={c.grade}
                        questionnaire={c.questionnaire}
                        HebrowYear={c.HebrowYear}
                        schoolName={c.schoolName}
                        checked={c.assigned}
                        updateSelectedClasses={this.updateSelectedClasses}
                    />
                )}
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    }
});