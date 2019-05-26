import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, AsyncStorage, Image, Alert, Dimensions, ScrollView, TextInput, KeyboardAvoidingView } from 'react-native';
import Icon1 from '@expo/vector-icons/MaterialIcons';
import Icon2 from '@expo/vector-icons/Feather';
import hints from '../images/hints.png'
import statements from '../images/statements.png'
import axios from 'axios';
import { Button, Key ,MathKeyboard} from './common';
import { ImagePicker, Permissions, ImageManipulator } from 'expo';

let _this = null;

export default class AddQuestion1Form extends Component {
    static navigationOptions = ({ navigation }) => {
        return {
            title: 'יצירת שאלה',
            headerRight: (
                <Icon1
                    style={{ paddingRight: 15, color: "#fff" }}
                    onPress={() => navigation.goBack()}
                    name="arrow-forward"
                    size={30}
                />
            ),
            headerLeft: (
                <TouchableOpacity style={{paddingLeft: 15, flexDirection: 'row'}} onPress={() => {if(_this.state.text.length > 1 || _this.state.photo != undefined){navigation.navigate('AddQuestion2Form', {loadData: () => navigation.state.params.loadData(), text: navigation.getParam('text', 'X'), photo: navigation.getParam('photo', 'X')})}else{Alert.alert('', 'יש להזין שאלה או להעלות תמונה');}}}>
                    <Text style={{color: '#fff', fontSize: 25}}>
                        הבא
                    </Text>
                    <Icon1
                        style={{ color: "#fff" }}
                        name="check"
                        size={30}
                    />
                </TouchableOpacity>
            ),
        };
    };

    constructor(props) {
        super(props);
        this.state = {
            photo: undefined,
            text: "",
            picWidth: 0,
            picHeight: 0
        }
    }

    componentDidMount () {
        _this = this;
    }

    selectPicture = async () => {
        await Permissions.askAsync(Permissions.CAMERA_ROLL);
        const { cancelled, uri, type, height, width } = await ImagePicker.launchImageLibraryAsync({
            quality: 1,
        });
        if (!cancelled) {
            var ratio = 1;
            if (height > 600 || width > 600){
                if (height > width){
                    ratio = height / 600;
                } else {
                    ratio = width / 600;
                }
            }
            var manipResult = await ImageManipulator.manipulateAsync(
                uri, 
                [{ resize: { height: height /ratio, width: width /ratio} }],
                { compress: 0.5, base64: true }
              );
            this.setState({ photo: `data:${type};base64,${manipResult.base64}`});
            this.props.navigation.setParams({photo: this.state.photo});
        }
    };

    takePicture = async () => {
        await Permissions.askAsync(Permissions.CAMERA);
        const { cancelled, uri, type, height, width } = await ImagePicker.launchCameraAsync({
          quality: 1,
        });
        if (!cancelled) {
            var ratio = 1;
            if (height > 600 || width > 600){
                if (height > width){
                    ratio = height / 600;
                } else {
                    ratio = width / 600;
                }
            }
            var manipResult = await ImageManipulator.manipulateAsync(
                uri, 
                [{ resize: { height: height /ratio, width: width /ratio} }],
                { compress: 0.5, base64: true }
              );
            this.setState({ photo: `data:${type};base64,${manipResult.base64}`});
            this.props.navigation.setParams({photo: this.state.photo});
        }
    };

    render() {
        if (this.state.photo !== undefined){
            Image.getSize(this.state.photo, (width, height) => {
                const screenWidth = (Dimensions.get('window').width)
                const scaleFactor = width / screenWidth
                const imageHeight = height / scaleFactor
                this.setState({picWidth: screenWidth, picHeight: imageHeight})
            })
        }
        return (
            <View style={styles.container}>
                <MathKeyboard onPress={(k)=>{this.props.navigation.setParams({text: this.state.text + k}); this.setState({text: this.state.text + k});}}/>
                <ScrollView style={styles.container}>
                <TextInput
                    style={{
                        textAlign: "right",
                        fontSize: 25
                    }}
                    editable = {true}
                    multiline={true}
                    onChangeText={(text) => {if (text.length == 1){text = "\u200F" + text}; if (text[text.length -1] == '\n' || text[text.length -1] == ',' || text[text.length -1] == '.'){this.setState({text: text + "\u200F"});}else{this.setState({text});} this.props.navigation.setParams({text});}}
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
                <Image source={{uri: this.state.photo}} style={{ width: this.state.picWidth, height: this.state.picHeight}}/>
                </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    }
});