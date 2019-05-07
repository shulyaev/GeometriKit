import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, AsyncStorage, Image, Alert, Dimensions, ScrollView } from 'react-native';
import Icon from '@expo/vector-icons/Ionicons';
import hints from '../images/hints.png'
import statements from '../images/statements.png'
import axios from 'axios';
import { Button } from './common';
import HintPreview from './common/HintPreview';

let _this = null;

export default class TeacherQuestionView extends Component {
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
                <TouchableOpacity style={{flexDirection: 'row', paddingLeft: 1}} onPress={() => navigation.navigate('AddQuestion3Form', {text: navigation.getParam('text', 'X'), photo: navigation.getParam('photo', 'X'), hints: _this.hintsToPass(_this.state.hints)})}>
                    <Text style={{color: '#fff', fontSize: 20, paddingTop: 15}}>
                        שמור
                    </Text>
                    <Icon
                        style={{ color: "#fff" }}
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
            questionID: this.props.navigation.getParam('questionID', 'X'),
            bookName: this.props.navigation.getParam('bookName', 'X'),
            page: this.props.navigation.getParam('page', 'X'),
            questionNumber: this.props.navigation.getParam('questionNumber', 'X'),
            color: this.props.navigation.getParam('color', 'X'),
            content: this.props.navigation.getParam('content', 'X'),
            picture: this.props.navigation.getParam('picture', 'X'),
            hints: [],
            newHints: [],
            deletedHintsIDs: [],
            picWidth: 0,
            picHeight: 0
        }
        this.index = -1;
    }

    saveButtonRender = () => {
        if (true){
            <Icon
                style={{ paddingLeft: 15, paddingBottom: 53, color: "#fff" }}
                onPress={() => Alert.alert('כל הכבוד', '', [{ text: 'חזור', onPress: () => navigation.goBack()}],{cancelable: false})}
                name="ios-checkmark"
                size={53}
            />
        }
    }

    componentDidMount () {
        _this = this;
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

    shortTextCreate = (str, type) => {
        if (type === "text"){
            if (str.includes("\n")){
                for( var i = 0; i < str.length; i++){ 
                    if ( str[i] === "\n") {
                        str = str.replace("\n", " ");
                    }
                }
            }
            
            if (str.length > 20){
                return str.substring(0,20) + "...";
            }
        }
        return str;
    }

    removeHint = (id) => {
        for( var i = 0; i < this.state.hints.length; i++) { 
            if (this.state.hints[i].id === id) {
                var temp = this.state.hints;
                temp.splice(i, 1);
                if (this.state.hints[i].id > 0){
                    this.setState({hints: temp, deletedHintsIDs: [...this.state.deletedHintsIDs, this.state.hints[i].id]});
                    break;
                }
                this.setState({hints: temp});
                break;
            }
        }
    };

    addNewHints (hnt){
        for (var i=hnt.length-1; i>=0; i--) {
            hnt[i].id = --this.index;
        }
        this.setState({newHints: hnt, hints: [...this.state.hints, ...hnt]});
    }

    saveChanges = () => {
        alert("השאלה נשמרה בהצלחה")
    }

    render() {
        return (
            <View style={{flex:1}}>
                <ScrollView style={styles.container}>
                    <View style={{height: Dimensions.get('window').height / 1.7, justifyContent: 'center', alignItems: 'center'}}>
                        <Image source={{ uri: this.state.picture}} style={{ height: this.state.picHeight, width: this.state.picWidth, borderRadius: 10 }}/>
                        <TouchableOpacity
                            onPress={() => this.props.navigation.navigate('AssignQuestionToClass', {questionID: this.props.navigation.getParam('questionID', 'X')})}
                            style={{position: 'absolute', left: 15, bottom: 20, shadowColor: '#000', shadowOffset: { width: 0, height: 5 }, shadowOpacity: 0.5, shadowRadius: 5}}
                        >
                            <Image source={hints} style={{ height: 60, width: 60}}/>
                        </TouchableOpacity>
                    </View>
                    <View contentContainerStyle={{alignSelf: 'flex-end', width: Dimensions.get('window').width * 0.8}}>
                        <Text style={{ fontSize: 25, color: 'black', textAlign: 'right', padding: 20}}>
                            {this.state.content}
                        </Text>
                    </View>
                    <TouchableOpacity
                            onPress={() => this.props.navigation.navigate('AddHint', {questionID: this.props.navigation.getParam('questionID', 'X'), addNewHints: this.addNewHints.bind(this)})}
                            style={{alignItems: 'center', shadowColor: '#000', shadowOffset: { width: 0, height: 5 }, shadowOpacity: 0.5, shadowRadius: 5}}
                        >
                            <Text>הוסף רמז</Text>
                    </TouchableOpacity>
                    <View>
                        { this.state.hints.map((c) => {
                            return (
                                <HintPreview key={c.id} id={c.id} type={c.type} removeHint={this.removeHint} shortContent={c.content}/>
                            )
                        })}
                    </View>
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