import React, { Component } from 'react';
import { StyleSheet, Keyboard, Text, TouchableOpacity, AsyncStorage, TouchableWithoutFeedback, Alert, Dimensions, ScrollView, TextInput, KeyboardAvoidingView } from 'react-native';
import Icon1 from '@expo/vector-icons/MaterialIcons';
import { Button, Input } from './common';
import MultiSelectEX from './common/MultiSelectEX'
import { ImagePicker, Permissions } from 'expo';
import axios from 'axios';

let _this = null;

export default class AddQuestion3Form extends Component {
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
                <TouchableOpacity style={{paddingLeft: 15, flexDirection: 'row'}} onPress={() => {_this.saveQuestion()}}>
                    <Text style={{color: '#fff', fontSize: 25}}>
                        סיום
                    </Text>
                    <Icon1
                        style={{ color: "#fff",  }}
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
            photo: this.props.navigation.getParam('photo', 'X'),
            text: this.props.navigation.getParam('text', 'X'),
            hints: this.props.navigation.getParam('hints', 'X'),
            allSubjects: [],
            selectedSubjects: [],
            title: '',
            bookName: 'שם הספר',
            page: '0',
            questionNumber: '0',
            authorID: ''
        };
        this.index = 0;
        this.errorList = '';
        this._loadInitialState().done();
    }

    _loadInitialState = async () => {
        var value = await AsyncStorage.getItem('userData');
            this.setState({authorID: JSON.parse(value).userID})
    }

    componentDidMount () {
        axios.get(`http://geometrikit-ws.cfapps.io/api/getallsubjects`)
        .then((response) => {
          this.setState({allSubjects: response.data})
        }).catch(() => {
            Alert.alert(
              '',
              "תקלה בחיבור לשרת, אנא נסה שוב מאוחר יותר",
              [
                {text: 'נסה שוב', onPress: () => this.componentDidMount()},
              ],
              {cancelable: false},);
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
        this.errorList = '';
        if (!this.validateTitle(this.state.title)) {
            this.errorList = this.errorList + '◄לא הוזן שם לשאלה\n';
        }
        if (!this.validateSubjects(this.state.selectedSubjects)) {
            this.errorList = this.errorList + '◄חובה לחור 2 נושאים לפחות\n';
        }
        if (this.errorList === '') {
            axios.post('http://geometrikit-ws.cfapps.io/api/insertquestion', {
                content: this.state.text,
                picture: this.state.photo,
                hints: this.hintsToPass(this.state.hints),
                subjects: this.state.selectedSubjects,
                title: this.state.title,
                bookName: this.state.bookName,
                page: this.state.page,
                questionNumber: this.state.questionNumber,
                authorID: this.state.authorID
            }).then(() => {
                Alert.alert('שאלה נוספה בהצלחה');
                this.props.navigation.navigate('TeacherHome');
                this.props.navigation.state.params.loadData();
            }).catch(() => {
                Alert.alert(
                  '',
                  "תקלה בחיבור לשרת, אנא נסה שוב מאוחר יותר",
                  [
                    {text: 'נסה שוב', onPress: () => this.componentDidMount()},
                  ],
                  {cancelable: false},);
            })
            .done();
        } else {
            Alert.alert('', this.errorList);
        }
    }

    hintsToPass = (hnt) => {
        hnt.forEach(h => {
            delete h["id"];
            delete h["shortContent"];
        });
        return hnt;
    };

    takePicture = async () => {
        await Permissions.askAsync(Permissions.CAMERA);
        const { base64, type } = await ImagePicker.launchCameraAsync({
          base64: true,
        });
        this.setState({ photo: `data:${type};base64,${base64}` });
    };

    validateTitle = (title) => {
        if (title.length < 1){
          return false
        }
        return true;
      };

      validateSubjects = (subjects) => {
        if (subjects.length < 2){
          return false
        }
        return true;
      };

    render() {
        return (
            <TouchableWithoutFeedback onPress={()=>Keyboard.dismiss()}>
                <ScrollView style={styles.container}>
                    <Input
                        onChangeText= {(title) => this.setState({title})}
                        placeholder='תן שם לשאלה'
                    />
                    <MultiSelectEX updateSelectedSubjects={(toUpdate) => {this.setState({selectedSubjects: toUpdate})}} subjects={this.state.allSubjects}/>
                </ScrollView>
            </TouchableWithoutFeedback>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    }
});