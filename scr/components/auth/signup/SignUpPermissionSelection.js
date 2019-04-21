import React, { Component } from 'react';
import { View } from 'react-native';
import Icon from '@expo/vector-icons/Ionicons'
import { Button } from '../../common';

export default class SignUpPermissionSelection extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: 'הרשמה',
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

  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center' }}>
        <Button onPress={() => {this.props.navigation.navigate("SignUpStudentForm")}}>
          תלמיד
        </Button>
        <Button onPress={() => {this.props.navigation.navigate("SignUpTeacherVerification")}}>
          מורה
        </Button>
      </View>
    );
  }
}