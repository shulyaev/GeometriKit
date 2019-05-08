import React, { Component } from 'react';
import { Alert, View, Keyboard, TouchableWithoutFeedback } from 'react-native';
import keyIcon from '../../../images/key.png';
import Icon from '@expo/vector-icons/Ionicons';
import { Input, Button } from '../../common';

export default class SignUpTeacherVerification extends Component {
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

    constructor(props) {
        super(props);
        this.state = {
            password: ''
        }
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
        if (this.state.password === "123") {
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