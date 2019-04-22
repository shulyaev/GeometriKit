import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, AsyncStorage, Image } from 'react-native';
import Icon from '@expo/vector-icons/Ionicons';
import axios from 'axios';
import { Button } from './common';

export default class HamburgerMenu extends Component {
    static navigationOptions = ({ navigation }) => {
        return {
            title: 'גיאומתריקיט',
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
            username: ' ',
            photo: null,
            getPhoto: null
        }
    }

    componentDidMount () {
        // AsyncStorage.getItem('userData').then((data) => {
        //     this.setState({ 'username': JSON.parse(data).userName })
        // }).done();
        // = async () => this.setState({ 'username': JSON.parse(await AsyncStorage.getItem('userData')).userName })
        axios.get(`http://geometrikit-ws.cfapps.io/api/auth?username=username&password=password`)
        .then((response) => {
          if (response.data.status === 'false') {
            console.log("false");
          } else {
            console.log(response.data);
          }
        })
        .done();
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={{ fontSize: 30 }}>
                    {this.state.username}
                </Text>
                <Image source={{ uri: `data:image/jpg;base64,${this.state.photo}`}} style={{ height: 80, width: 80, borderRadius: 40 }}/>
                <TouchableOpacity onPress={() => { AsyncStorage.removeItem('userData'); this.props.navigation.navigate('Auth') }}>                    
                    <Text>התנתק</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.props.navigation.navigate('AddQuestion1Form')}>                    
                    <Text>ADD QUESTIONNNNNNNNN</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.props.navigation.navigate('AssignQuestionToClass')}>                    
                    <Text>ASSIGN CLASSSSSSSSSSSSSSS</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    }
});