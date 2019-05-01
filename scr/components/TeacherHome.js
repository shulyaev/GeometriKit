import React, { Component } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    AsyncStorage
} from 'react-native';
import { Button } from './common';

class TeacherHome extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }
    render() { 
        return ( 
            <View>
                <Button onPress={() => this.props.navigation.navigate('AddQuestion1Form')}>
                    הוסף שאלה
                </Button>
                <Button onPress={() => this.props.navigation.navigate('AssignQuestionToClass')}>
                    שייך שאלה
                </Button>
                <Button onPress={() => this.props.navigation.navigate('CreateGroup')}>
                    צור קבוצה
                </Button>
                <Button onPress={() => { AsyncStorage.removeItem('userData'); this.props.navigation.navigate('Auth') }}>
                    התנתק
                </Button>
            </View>
        );
    }
}
 
export default TeacherHome;