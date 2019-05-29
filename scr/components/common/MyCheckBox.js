import React, { Component } from 'react';
import { View, Text, Picker, StyleSheet,ScrollView } from 'react-native';
import { CheckBox } from 'react-native-elements'

export default class MyCheckBox extends Component {
    constructor(props){
      super(props)
      this.state = {
        checked: this.props.checked,
        groupID: this.props.groupID,
        title: `כיתה ${this.props.grade}', ${this.props.questionnaire} יח"ל, ${this.props.schoolName}, ${this.props.HebrowYear}`
      }
    }
    
    render() {
      return (
        <CheckBox
          title={this.state.title}
          iconRight
          right
          checked={this.props.checked}
          onPress={() => {this.setState({checked: !this.state.checked}); this.props.updateSelectedClasses(this.state.groupID)}}
        />
      );
   }
}