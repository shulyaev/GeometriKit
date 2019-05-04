import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, AsyncStorage, Image, Alert, Dimensions, ScrollView } from 'react-native';
import Icon from '@expo/vector-icons/Ionicons';
import hints from '../images/hints.png'
import statements from '../images/statements.png'
import axios from 'axios';
import { Button } from './common';

export default class QuestionForm extends Component {
    static navigationOptions = ({ navigation }) => {
        return {
            title: 'עמוד ' + navigation.getParam('page', 'X') + ', שאלה ' + navigation.getParam('questionNumber', 'X'),
            headerRight: (
                <Icon
                    style={{ paddingRight: 15, color: "#fff" }}
                    onPress={() => navigation.goBack()}
                    name="ios-arrow-forward"
                    size={30}
                />
            ),
            headerLeft: (
                <Icon
                    style={{ paddingLeft: 15, paddingBottom: 53, color: "#fff" }}
                    onPress={() => Alert.alert('כל הכבוד', '', [{ text: 'חזור', onPress: () => navigation.goBack()}],{cancelable: false})}
                    name="ios-checkmark"
                    size={53}
                />
            ),
        };
    };

    constructor(props) {
        super(props);
        this.state = {
            questionID: this.props.navigation.getParam('questionID', 'X'),
            bookName: this.props.navigation.getParam('bookName', 'X'),
            page: this.props.navigation.getParam('page', 'X'),
            questionNumber: this.props.navigation.getParam('questionNumber', 'X'),
            color: this.props.navigation.getParam('color', 'X'),
            content: this.props.navigation.getParam('content', 'X'),
            picture: this.props.navigation.getParam('picture', 'X'),
            hints: [],
            picWidth: 0,
            picHeight: 0
        }
        this.index = 0;
    }

    componentDidMount () {
        Image.getSize(this.state.picture, (width, height) => {
            if (width > height) {
                const screenWidth = (Dimensions.get('window').width)
                const scaleFactor = width / screenWidth
                const imageHeight = height / scaleFactor
                this.setState({picWidth: screenWidth, picHeight: imageHeight})
            } else {
                const screenHeight = (Dimensions.get('window').height / 1.7)
                const scaleFactor = height / screenHeight
                const imageWidth = width / scaleFactor
                this.setState({picWidth: imageWidth, picHeight: screenHeight})
            }
        })
        
        axios.post('http://geometrikit-ws.cfapps.io/api/getHint', {
            questionID: this.state.questionID
          }
        ).then((response) => {
            console.log(response.data);
            this.setState({hints: response.data})
        });
    }

    showHint = (hint) => {
        console.log(hint);
        console.log("sdfsdfsdfsd");
        switch(hint.type) {
            case 'text':
                Alert.alert(hint.content);
                break;
            case 'image':
                this.setState({picture: hint.content})
                break;
            case 'voice':
                break;
            default:
                Alert.alert("שגיאה בזימון רמז, אנא נסה שוב");
        }
    }

    indexInc () {
        if (this.index >= this.state.hints.length){
            this.index = 0;
            this.setState({picture: this.props.navigation.getParam('picture', 'X')})
        }

        return ++this.index - 1
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={{height: Dimensions.get('window').height / 1.7, justifyContent: 'center', alignItems: 'center'}}>
                    <Image source={{ uri: this.state.picture}} style={{ height: this.state.picHeight, width: this.state.picWidth, borderRadius: 10 }}/>
                </View>
                <ScrollView contentContainerStyle={{alignSelf: 'flex-end', width: Dimensions.get('window').width * 0.8}}>
                    <Text style={{ fontSize: 25, color: 'black', textAlign: 'right', padding: 20}}>
                        {this.state.content}
                    </Text>
                </ScrollView>
                <TouchableOpacity
                    onPress={() => this.props.navigation.navigate("Theorems")}
                    style={{position: 'absolute', left: 15, bottom: 100, shadowColor: '#000', shadowOffset: { width: 0, height: 5 }, shadowOpacity: 0.5, shadowRadius: 5}}
                >
                    <Image source={statements} style={{ height: 60, width: 60}}/>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => this.showHint(this.state.hints[this.indexInc()])}
                    style={{position: 'absolute', left: 15, bottom: 20, shadowColor: '#000', shadowOffset: { width: 0, height: 5 }, shadowOpacity: 0.5, shadowRadius: 5}}
                >
                    <Image source={hints} style={{ height: 60, width: 60}}/>
                </TouchableOpacity>
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