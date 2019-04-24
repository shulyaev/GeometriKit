import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, AsyncStorage, Image, Alert, Dimensions, ScrollView, TextInput, KeyboardAvoidingView } from 'react-native';
import Icon1 from '@expo/vector-icons/Ionicons';
import { Button, Input } from './common';
import MultiSelectEX from './common/MultiSelectEX'
import { ImagePicker, Permissions } from 'expo';
import axios from 'axios';
import Draw from './Draw';

let _this = null;

export default class AddQuestion3Form extends Component {
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
                <TouchableOpacity style={{flexDirection: 'row'}} onPress={() => {_this.saveQuestion();navigation.navigate('HamburgerMenu')}}>
                    <Text style={{paddingLeft: 15, color: '#fff', paddingTop: 17, fontSize: 25}}>
                        סיום
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
            photo: this.props.navigation.getParam('photo', 'X'),
            text: this.props.navigation.getParam('text', 'X'),
            hints: this.props.navigation.getParam('hints', 'X'),
            allSubjects: [],
            selectedSubjects: [],
            title: '',
            bookName: 'ספר',
            page: '122',
            questionNumber: '17',
            authorID: '111111111'
        };
        this.index = 0;
    }

    componentDidMount () {
        axios.get(`http://geometrikit-ws.cfapps.io/api/getallsubjects`)
        .then((response) => {
          this.setState({allSubjects: response.data})
        })
        .done();
        _this = this;
    }

    componentWillMount(){
        AsyncStorage.getItem('userID').then((value) => {
          this.setState({authorID: value});
        });
      }

    selectPicture = async () => {
        await Permissions.askAsync(Permissions.CAMERA_ROLL);
        const { cancelled, base64, type } = await ImagePicker.launchImageLibraryAsync({
            aspect: 1,
            base64: true
        });
 
        if (!cancelled) {
            this.setState({ photo: `data:${type};base64,${base64}` });
        }
    };

    saveQuestion(){
        axios.post('http://geometrikit-ws.cfapps.io/api/insertquestion', {
            content: this.state.text,
            picture: this.state.photo,
            hints: this.state.hints,
            subjects: this.state.selectedSubjects,
            //title: this.state.title,
            bookName: this.state.bookName,
            page: this.state.page,
            questionNumber: this.state.questionNumber,
            authorID: this.state.authorID
          }
        );
        Alert.alert('שאלה נוספה בהצלחה');
    }

    takePicture = async () => {
        await Permissions.askAsync(Permissions.CAMERA);
        const { base64, type } = await ImagePicker.launchCameraAsync({
          base64: true,
        });
        this.setState({ photo: `data:${type};base64,${base64}` });
    };

    render() {
        return (
            <ScrollView style={styles.container}>
                <Input
                    onChangeText= {(title) => this.setState({title})}
                    placeholder='תן שם לשאלה'
                />
                <MultiSelectEX updateSelectedSubjects={(toUpdate) => {this.setState({selectedSubjects: toUpdate})}} subjects={this.state.allSubjects}/>
                {/* <View>
                    {this.state.allSubjects.map(subject => <Button key={subject.subjectID} onPress={() => this.setState({selectedSubjects: [...this.state.selectedSubjects, subject.subjectID]})}>{subject.subjectName}</Button>)}
                </View> */}
                <TouchableOpacity onPress={() => console.log(this.state.hints)}><Text>CHECK</Text></TouchableOpacity>

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