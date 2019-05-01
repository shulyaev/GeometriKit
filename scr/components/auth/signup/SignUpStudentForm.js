import React, { Component } from 'react';
import { Alert, View, Text, TouchableOpacity, AsyncStorage, Picker } from 'react-native';
import axios from 'axios';
import Icon from '@expo/vector-icons/Ionicons'
import { Input, Button } from '../../common';

export default class SignUpStudentForm extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: 'הרשמה תלמיד',
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
      userName: '',
      password: '',
      firstName: '',
      lastName: '',
      schoolID: '1',
      profilePicture: 'X',
      schoolList: [{schoolID: '1', schoolName: 'מבאות הנגב'}, {schoolID: '2', schoolName: 'מקיף א׳'}]
    }
  }

  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center' }}>
        <Input
          placeholder='שם משתמש'
          onChangeText={(userName) => this.setState({ userName })}
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
        <Picker
          selectedValue = {this.state.schoolID}
          onValueChange = {(itemValue) => this.setState({schoolID: itemValue})}
          itemStyle={{color: 'black', backgroundColor: 'rgba(200, 200, 200, 0.4)', marginHorizontal: 20, marginVertical: 5, height: 100, borderRadius: 20, fontSize: 15}}
        >
          {this.state.schoolList.map((s) => {
            return <Picker.Item key={s.schoolID} label={s.schoolName} value={s.schoolID}/>
          })}
        </Picker>
        <Button onPress={() => this.signup()}>
          הרשם
        </Button>
      </View>
    );
  }

  signup = () => {
    axios.post('http://geometrikit-ws.cfapps.io/api/register', {
      userName: this.state.userName,
      password: this.state.password,
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      permissionID: "1",
      schoolID: this.state.schoolID,
      profilePicture: this.state.profilePicture
    }).then((response) => {
        if (response.data.status !== 'true') {
          Alert.alert('שם משתשמש שבחרת כבר קיים במערכת');
        } else {
          AsyncStorage.setItem('user', this.state.username);
          this.props.navigation.navigate('StudentMenu');
        }
      })
      .done();
  }
}