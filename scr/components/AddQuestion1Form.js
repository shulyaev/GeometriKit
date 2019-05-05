import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, AsyncStorage, Image, Alert, Dimensions, ScrollView, TextInput, KeyboardAvoidingView } from 'react-native';
import Icon1 from '@expo/vector-icons/Ionicons';
import Icon2 from '@expo/vector-icons/Feather';
import hints from '../images/hints.png'
import statements from '../images/statements.png'
import axios from 'axios';
import { Button, Key ,MathKeyboard} from './common';
import { ImagePicker, Permissions } from 'expo';

export default class AddQuestion1Form extends Component {
    static navigationOptions = ({ navigation }) => {
        return {
            title: 'יצירת שאלה',
            headerRight: (
                <Icon1
                    style={{ paddingRight: 15, color: "#fff" }}
                    onPress={() => navigation.goBack()}
                    name="ios-arrow-forward"
                    size={30}
                />
            ),
            headerLeft: (
                <TouchableOpacity style={{flexDirection: 'row'}} onPress={() => navigation.navigate('AddQuestion2Form', {text: navigation.getParam('text', 'X'), photo: navigation.getParam('photo', 'X')})}>
                    <Text style={{paddingLeft: 15, color: '#fff', paddingTop: 17, fontSize: 25}}>
                        הבא
                    </Text>
                    <Icon1
                        style={{ paddingLeft: 10, paddingBottom: 53, color: "#fff" }}
                        name="ios-checkmark"
                        size={53}
                    />
                </TouchableOpacity>
            ),
        };
    };

    constructor(props) {
        super(props);
        this.state = {
            photo: undefined,
            text: ""
        }
    }

    selectPicture = async () => {
        await Permissions.askAsync(Permissions.CAMERA_ROLL);
        const { cancelled, base64, type } = await ImagePicker.launchImageLibraryAsync({
            base64: true
        });
 
        if (!cancelled) {
            this.setState({ photo: `data:${type};base64,${base64}` });
            this.props.navigation.setParams({photo: this.state.photo});
            // axios.post('http://geometrikit-ws.cfapps.io/api/insert_question', {headers: {"image": `${this.state.photo}`, "text": "text of question", "subject": "s1", "hint1": "hint1",  "hint2": "hint2", "hint3": "hint3"}});
            // axios.get('http://geometrikit-ws.cfapps.io/api/get_qustion', {headers: {"selectorType": "subject", "selector": "s1"}})
            // .then((response) => {
            //     this.setState({getPhoto: response.data.image});
            //     //alert(`${response.data.image}`);
            // })
            // .done();
        }
    };

    takePicture = async () => {
        await Permissions.askAsync(Permissions.CAMERA);
        const { cancelled, base64, type } = await ImagePicker.launchCameraAsync({
          base64: true,
        });
        if (!cancelled) {
            this.setState({ photo: `data:${type};base64,${base64}` });
            this.props.navigation.setParams({photo: this.state.photo});
            // axios.post('http://geometrikit-ws.cfapps.io/api/insert_question', {headers: {"image": `${this.state.photo}`, "text": "text of question", "subject": "s1", "hint1": "hint1",  "hint2": "hint2", "hint3": "hint3"}});
            // axios.get('http://geometrikit-ws.cfapps.io/api/get_qustion', {headers: {"selectorType": "subject", "selector": "s1"}})
            // .then((response) => {
            //     this.setState({getPhoto: response.data.image});
            //     //alert(`${response.data.image}`);
            // })
            // .done();
        }
      };

    render() {
        return (
            <ScrollView style={styles.container}>
                <MathKeyboard onPress={(k)=>{this.props.navigation.setParams({text: this.state.text + k}); this.setState({text: this.state.text + k});}}/>
                <TextInput
                    style={{
                        textAlign: "right",
                        fontSize: 25
                    }}
                    editable = {true}
                    multiline={true}
                    onChangeText={(text) => {this.setState({text}); this.props.navigation.setParams({text});}}
                    value={this.state.text}
                    placeholder='הקלד כאן את השאלה'
                />
                <View style={{flexDirection: 'row'}}>   
                    <TouchableOpacity onPress={this.selectPicture.bind(this)}>
                        <Icon2
                            name="paperclip"
                            size={25}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={this.takePicture.bind(this)}>
                        <Icon2
                            name="camera"
                            size={25}
                        />
                    </TouchableOpacity>
                </View> 
                <Image source={{uri: this.state.photo}} style={{ width: Dimensions.get('window').width, height: Dimensions.get('window').width}}/>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    }
});