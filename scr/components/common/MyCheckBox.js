import React, { Component } from 'react';
import { View, Text, Picker, StyleSheet,ScrollView } from 'react-native';
import { CheckBox } from 'react-native-elements'

export default class MyCheckBox extends Component {
    state = {
        checked: this.props.checked,
        groupID: this.props.groupID,
        title: `כיתה ${this.props.grade}', ${this.props.questionnaire} יח"ל, ${this.props.schoolName}, תשע"ט`
    }
    
    render() {
      return (
        <CheckBox
            title={this.state.title}
            iconRight
            right
            checked={this.state.checked}
            onPress={() => {this.setState({checked: !this.state.checked}); this.props.updateSelectedClasses(this.state.groupID)}}
        />
      );
   }
}