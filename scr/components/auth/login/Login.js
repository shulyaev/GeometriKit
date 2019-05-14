import React, {Component} from 'react';
import {Alert, View, AsyncStorage, Keyboard, TouchableWithoutFeedback, ActivityIndicator } from 'react-native';
import axios from 'axios';
import userIcon from '../../../images/user.png'
import keyIcon from '../../../images/key.png'
import { StudentHeader, Input, Button } from '../../common';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

export default class Login extends Component {
    static navigationOptions = {
      title: 'גיאומטריקיט'
    };
    constructor(props) {
      super(props);
      this.state = {
        username: '',
        password: '',
        groupID: '',
        loading: false
      }
      this.errorList = '';
      this._loadInitialState().done();
    }

    _loadInitialState = async () => {
      var value = await AsyncStorage.getItem('userData');
      if (value !== null) {
        if (JSON.parse(value).permissionID === "1")
          this.props.navigation.navigate('StudentMenu');
        if (JSON.parse(value).permissionID === "2")
          this.props.navigation.navigate('TeacherMenu');
      }
    }

    renderButtons = () => {
      if (this.state.loading) {
        return (
          <ActivityIndicator size="large" color="#f44444" />
        )
      } else {
        return (
          <View>
            <Button onPress={() => {Keyboard.dismiss(); this.login()}}>
              התחבר/י
            </Button>
            <Button onPress={() => this.props.navigation.navigate('SignUp')}>
              הרשמה
            </Button>
          </View>
        )
      }
    }

    validateEmail = (username) => {
      var re = /^[a-z0-9A-Z]{6,15}$/;
      return re.test(username);
    };
    validatePassword = (password) => {
      if (password.length < 6){
        return false
      }
      return true;
    };

    render() {
      return (
        <TouchableWithoutFeedback onPress={()=>Keyboard.dismiss()}>
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
            {this.renderButtons()}
          </View>
        </TouchableWithoutFeedback>
      );
    }

    login = () => {
      this.errorList = '';
      if (!this.validateEmail(this.state.username)) {
        this.errorList = this.errorList + '◄שם משתמש אינו חוקי\n';
      } if (!this.validatePassword(this.state.password)) {
        this.errorList = this.errorList + '◄סיסמא אינה חוקית\n';
      } if (this.errorList === '') {
        this.setState({loading: true})
        axios.get(`http://geometrikit-ws.cfapps.io/api/auth?username=${this.state.username}&password=${this.state.password}`)
          .then((response) => {
            if (response.data.status === 'false') {
              this.setState({loading: false});
              Alert.alert('שם משתשמש או סיסמא שגויים');
            } else if (response.data.permissionID === '1'){
              AsyncStorage.setItem('userData', JSON.stringify(response.data) );
              AsyncStorage.setItem('groupID', response.data.groupID );
              AsyncStorage.setItem('userID', response.data.userID );
              this.setState({loading: false});
              this.props.navigation.navigate('StudentMenu'); 
            } else if (response.data.permissionID === '2'){
              AsyncStorage.setItem('userData', JSON.stringify(response.data) );
              AsyncStorage.setItem('groupID', response.data.groupID );
              AsyncStorage.setItem('userID', response.data.userID );
              this.setState({loading: false});
              this.props.navigation.navigate('TeacherMenu'); 
            }
          })
          .catch(() => {
            this.setState({loading: false})
            Alert.alert('',"תקלה בחיבור לשרת, אנא נסה שוב מאוחר יותר");
          })
          .done();
      } else {
        Alert.alert('', this.errorList)
      }
    }
  }