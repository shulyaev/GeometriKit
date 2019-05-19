import React, { Component } from 'react';
import { Alert, View, TouchableWithoutFeedback, Keyboard, TouchableOpacity, AsyncStorage, Picker } from 'react-native';
import axios from 'axios';
import Icon from '@expo/vector-icons/MaterialIcons'
import { Input, Button } from '../../common';

export default class SignUpStudentForm extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: 'הרשמה תלמיד',
      headerRight: (
        <Icon
          style={{ paddingRight: 15, color: "#fff" }}
          onPress={() => navigation.goBack()}
          name="arrow-forward"
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
        this.setState({schoolList: response.data, schoolID: response.data[0].schoolID})
    })
    .catch(() => {
      Alert.alert(
        '',
        "תקלה בחיבור לשרת, אנא נסה שוב מאוחר יותר",
        [
          {text: 'נסה שוב', onPress: () => this.componentDidMount()},
        ],
        {cancelable: false},);
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
    if (password.length < 6){
      return false
    }
    return true;
  };

  render() {
    return (
      <TouchableWithoutFeedback onPress={()=>Keyboard.dismiss()}>
        <View style={{ flex: 1, justifyContent: 'center' }}>
          <Input
            placeholder='שם משתמש (באנגלית)'
            onChangeText={(userName) => this.setState({ userName })}
          />
          <Input
            placeholder='סיסמא'
            onChangeText={(password) => this.setState({ password })}
            secureTextEntry
          />
          <Input
            placeholder='שם פרטי (בעברית)'
            onChangeText={(firstName) => this.setState({ firstName })}
          />
          <Input
            placeholder='שם משפחה (בעברית)'
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
      this.errorList = this.errorList + '◄סיסמא חייבת להכיל 6 תווים לפחות\n';
    } if (this.errorList === '') {
      axios.post('http://geometrikit-ws.cfapps.io/api/register', {
      userName: this.state.userName,
      password: this.state.password,
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      permissionID: "1",
      schoolID: this.state.schoolID,
      profilePicture: this.state.profilePicture
    }).then((response) => {
      if (response.data.status === 'false') {
        Alert.alert(response.data.message);
      } else {
        AsyncStorage.setItem('userData', JSON.stringify(response.data) );
        AsyncStorage.setItem('userID', response.data.userID );
        AsyncStorage.setItem('groupID', response.data.groupID );
        this.props.navigation.navigate('StudentMenu');
      }
      }).catch(() =>{
          Alert.alert('',"תקלה בחיבור לשרת, אנא נסה שוב מאוחר יותר");
      }).done();
    } else {
      Alert.alert('', this.errorList)
    }
  }
}