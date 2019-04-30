import React, { Component } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    AsyncStorage
} from 'react-native';

class TeacherHome extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }
    render() { 
        return ( 
            <View>
                <TouchableOpacity onPress={() => this.props.navigation.navigate('AddQuestion1Form')}>                    
                    <Text>ADD QUESTIONNNNNNNNN</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.props.navigation.navigate('AssignQuestionToClass')}>                    
                    <Text>ASSIGN CLASSSSSSSSSSSSSSS</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => { AsyncStorage.removeItem('userData'); this.props.navigation.navigate('Auth') }}>                    
                    <Text>התנתק</Text>
                </TouchableOpacity>
            </View>
        );
    }
}
 
export default TeacherHome;