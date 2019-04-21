import React, { Component } from 'react';
import { Alert, View, AsyncStorage } from 'react-native';
import axios from 'axios';
import Icon from '@expo/vector-icons/Ionicons'
import { Input, Button } from '../../common';

export default class SignUpTeacherForm extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: 'הרשמה מורה',
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
      username: '',
      password: '',
      firstName: '',
      lastName: ''
    }
  }

  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center' }}>
        <Input
          placeholder='שם משתמש'
          onChangeText={(username) => this.setState({ username })}
        />
        <Input
          placeholder='סיסמא'
          onChangeText={(password) => this.setState({ password })}
          secureTextEntry
        />
        <Input
          placeholder='שם פרטי'
          onChangeText={(firstName) => this.setState({ firstName })}
        />
        <Input
          placeholder='שם משפחה'
          onChangeText={(lastName) => this.setState({ lastName })}
        />
        <Button onPress={this.signup}>
          הרשם
          </Button>
      </View>
    );
  }

  signup = () => {
    axios.get('http://geometrikit-ws.cfapps.io/api/register', { headers: { "username": `${this.state.username}`, "password": `${this.state.password}`, "fname": `${this.state.firstName}`, "lname": `${this.state.lastName}` } })
      .then((response) => {
        if (response.data.masssege !== 'success!') {
          Alert.alert('שם משתשמש שבחרת כבר קיים במערכת');
        } else {
          AsyncStorage.setItem('user', this.state.username);
          this.props.navigation.navigate('StudentMenu');
        }
      })
      .done();
  }
}