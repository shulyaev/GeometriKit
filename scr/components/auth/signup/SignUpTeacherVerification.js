import React, { Component } from 'react';
import { Alert, View, Keyboard, TouchableWithoutFeedback } from 'react-native';
import axios from 'axios';
import keyIcon from '../../../images/key.png';
import Icon from '@expo/vector-icons/MaterialIcons';
import { Input, Button } from '../../common';

export default class SignUpTeacherVerification extends Component {
    static navigationOptions = ({ navigation }) => {
        return {
        title: 'הרשמה',
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
            password: '',
            tPassword: undefined
        }
    }

    componentDidMount(){
        axios.post('https://geometrikit.azurewebsites.net/api/getTpassword', {
            InternalPassword: 'ASOBAT'
        }).then((response) => {
            this.setState({tPassword: response.data.tpassword})
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
  

    render() {
        return (
            <TouchableWithoutFeedback onPress={()=>Keyboard.dismiss()}>
                <View style={{ flex: 1, justifyContent: 'center' }}>
                    <Input
                        onChangeText= {(password) => this.setState({password})}
                        placeholder='סיסמת רישום'
                        secureTextEntry
                        imageSource={keyIcon}
                    />
                    <Button onPress={() => this.passwordCheck()}>
                        המשך
                    </Button>
                </View>
            </TouchableWithoutFeedback>
        );
    }

    passwordCheck = () => {
        if (this.state.password === this.state.tPassword) {
            this.props.navigation.navigate("SignUpTeacherForm");
        } else {
            Alert.alert(
                'סיסמא שגויה',
                '',
                [
                    {
                        text: 'חזור',
                        onPress: () => this.props.navigation.goBack()
                    },
                    {
                        text: 'נסה שוב'
                    }
                ],
                {cancelable: false}
            );
        }
    }
}