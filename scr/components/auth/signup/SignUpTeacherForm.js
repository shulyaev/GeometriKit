import React, { Component } from 'react';
import { Alert, View, AsyncStorage, Picker, Keyboard, TouchableWithoutFeedback } from 'react-native';
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
      userName: '',
      password: '',
      firstName: '',
      lastName: '',
      schoolID: '',
      schoolList: []
    }
    this.errorList = '';
  }

  componentDidMount(){
    axios.post('http://geometrikit-ws.cfapps.io/api/getSchools', {
    }).then((response) => {
        this.setState({schoolList: response.data, schoolID: response.data[0].schoolID});
    })
    .done();
  }

  validateEmail = (userName) => {
    var re = /^[a-z0-9A-Z]{6,15}$/;
    return re.test(userName);
  };
  validateName = (name) => {
    var re = /^[- \u0590-\u05fe]{2,100}$/;
    return re.test(name);
  };
  validatePassword = (password) => {
    if (password.length <= 3){
      return false
    }
    return true;
  };

  render() {
    return (
      <TouchableWithoutFeedback onPress={()=>Keyboard.dismiss()}>
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
          <Button onPress={this.signup}>
            הרשם
          </Button>
      </View>
      </TouchableWithoutFeedback>
      
    );
  }

  signup = () => {
    this.errorList = '';
    if (!this.validateEmail(this.state.userName)) {
      this.errorList = this.errorList + '◄שם משתמש מכיל תווים לא חוקיים או אינו באורך 6-15 תווים\n';
    } if (!this.validateName(this.state.firstName)) {
      this.errorList = this.errorList + '◄שם פרטי אינו בערית או מכיל תווים לא חוקיים\n';
    } if (!this.validateName(this.state.lastName)) {
      this.errorList = this.errorList + '◄שם משפחה אינו בערית או מכיל תווים לא חוקיים\n';
    } if (!this.validatePassword(this.state.password)) {
      this.errorList = this.errorList + '◄סיסמא חייבת להכיל 8 תווים לפחות\n';
    } if (this.errorList === '') {
      axios.post('http://geometrikit-ws.cfapps.io/api/register', {
        userName: this.state.userName,
        password: this.state.password,
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        permissionID: "2",
        schoolID: this.state.schoolID
      }).then((response) => {
        if (response.data.status === 'false') {
          Alert.alert(response.data.message);
        } else {
          AsyncStorage.setItem('userData', JSON.stringify(response.data) );
          AsyncStorage.setItem('userID', response.data.userID );
          this.props.navigation.navigate('TeacherMenu');
        }
      }).catch(() =>{
          Alert.alert("תקלה בחיבור לשרת, אנא נסה שוב מאוחר יותר");
      }).done();
    } else {
      Alert.alert('', this.errorList)
    }
  }
}