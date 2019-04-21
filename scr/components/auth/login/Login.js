import React, {Component} from 'react';
import {Alert, View, AsyncStorage } from 'react-native';
import axios from 'axios';
import userIcon from '../../../images/user.png'
import keyIcon from '../../../images/key.png'
import { StudentHeader, Input, Button } from '../../common';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

export default class Login extends Component {
    static navigationOptions = {
      title: 'גיאומתריקיט'
    };
    constructor(props) {
      super(props);
      this.state = {
        username: '',
        password: '',
        groupID: ''
      }
    }

    componentWillMount(){
      this._loadInitialState().done();
    }
    _loadInitialState = async () => {
      var value = await AsyncStorage.getItem('userData');
      if (value !== null) {
        this.props.navigation.navigate('StudentMenu');
      }
    }

    render() {
      return (
        <View style={{flex: 1, justifyContent: 'center'}}>
          <Input
            onChangeText= {(username) => this.setState({username})}
            placeholder='שם משתמש'
            imageSource={userIcon}
          />
          <Input
            onChangeText= {(password) => this.setState({password})}
            placeholder='סיסמא'
            secureTextEntry
            imageSource={keyIcon}
          />
          <Button onPress={this.login}>
            התחבר/י
          </Button>
          <Button onPress={() => this.props.navigation.navigate('SignUp')}>
            הרשמה
          </Button>
        </View>
      );
    }
    login = () => {
      axios.get(`http://geometrikit-ws.cfapps.io/api/auth?username=${this.state.username}&password=${this.state.password}`)
        .then((response) => {
          if (response.data.status === 'false') {
              Alert.alert('שם משתשמש או סיסמא שגויים');
          } else {
              AsyncStorage.setItem('userData', JSON.stringify(response.data) );
              AsyncStorage.setItem('groupID', response.data.groupID );
              AsyncStorage.setItem('userID', response.data.userID );
              this.props.navigation.navigate('StudentMenu'); 
          }
        })
        .done();
    }
  }