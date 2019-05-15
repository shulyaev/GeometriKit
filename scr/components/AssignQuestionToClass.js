import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, AsyncStorage, Image, Alert, Dimensions, ScrollView, TextInput, KeyboardAvoidingView } from 'react-native';
import Icon1 from '@expo/vector-icons/Ionicons';
import { Button, Input } from './common';
import { ImagePicker, Permissions } from 'expo';
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
                    name="ios-arrow-forward"
                    size={30}
                />
            ),
            headerLeft: (
                <TouchableOpacity style={{flexDirection: 'row'}} onPress={() => {_this.saveAssignment();navigation.goBack()}}>
                    <Text style={{paddingLeft: 15, color: '#fff', paddingTop: 17, fontSize: 25}}>
                        סיום
                    </Text>
                    <Icon1
                        style={{ paddingLeft: 10, paddingBottom: 53, color: "#fff" }}
                        name="ios-checkmark"
                        size={53}
                    />
                </TouchableOpacity>
            ),
        };
    };

    constructor(props) {
        super(props);
        this.state = {
            selectedClasses : [],
            allClasses: [{groupID: '1', grade: 'ט', questionnaire: '4', schoolName: 'םןו', assigned: false},
                        {groupID: '2', grade: 'י', questionnaire: '5', schoolName: 'לחי', assigned: true},
                        {groupID: '3', grade: 'יא', questionnaire: '6', schoolName: 'מנה', assigned: false}]
        }
    }

    componentDidMount () {
        // axios.post('http://geometrikit-ws.cfapps.io/api/getAssignedClasses', {
        //     questionID: this.props.navigation.getParam('questionID', '1'),
        //     teacherID: this.props.navigation.getParam('teacherID', 'X'),
        //   }
        // ).then((response) => {
        //     this.setState({allClasses: response.data})
        // }).done();
        
        this.state.allClasses.forEach(element => {
            if (element.assigned){
              this.state.selectedClasses.push(element.groupID);
            }    
          });
        _this = this;
    }

    updateSelectedClasses = (groupID) => {
        if (this.state.selectedClasses.includes(groupID)){
          for( var i = 0; i < this.state.selectedClasses.length; i++){ 
            if ( this.state.selectedClasses[i] === groupID) {
              this.state.selectedClasses.splice(i, 1); 
              break;
            }
          }
        } else {
          this.state.selectedClasses.push(groupID);
        }
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
        // axios.post('http://geometrikit-ws.cfapps.io/api/updateAssignClasses', {
        //     questionID: this.props.navigation.getParam('questionID', 'X'),
        //     groupID: this.props.navigation.getParam('questionID', 'X'),
        //   }
        // ).then((response) => {
        //     this.setState({allClasses: response.data})
        // }).done();
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