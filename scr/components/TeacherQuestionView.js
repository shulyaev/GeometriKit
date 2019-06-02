import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, TextInput, Image, Alert, Dimensions, ScrollView } from 'react-native';
import Icon from '@expo/vector-icons/MaterialIcons';
import assignToClass from '../images/assignToClass.png'
import statements from '../images/statements.png'
import axios from 'axios';
import { MathKeyboard, Button} from './common';
import HintPreview from './common/HintPreview';
import { ImagePicker, Permissions, ImageManipulator } from 'expo';
import Icon1 from '@expo/vector-icons/MaterialCommunityIcons';
import Icon2 from '@expo/vector-icons/Feather';

let _this = null;

export default class TeacherQuestionView extends Component {
    static navigationOptions = ({ navigation }) => {
        return {
            title: navigation.getParam('title', 'X'),
            headerRight: (
                <Icon
                    style={{ paddingRight: 15, color: "#fff" }}
                    onPress={() => navigation.goBack()}
                    name="arrow-forward"
                    size={30}
                />
            ),
            headerLeft: (
                <TouchableOpacity style={{flexDirection: 'row', paddingLeft: 1}} onPress={() => {_this.saveChanges(); navigation.goBack()}}>
                    <Text style={{color: '#fff', fontSize: 25, paddingLeft: 15, paddingRight: 5}}>
                        שמור
                    </Text>
                    <Icon
                        style={{ paddingRight: 15, color: "#fff" }}
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
            questionID: this.props.navigation.getParam('questionID', 'X'),
            bookName: this.props.navigation.getParam('bookName', 'X'),
            page: this.props.navigation.getParam('page', 'X'),
            questionNumber: this.props.navigation.getParam('questionNumber', 'X'),
            color: this.props.navigation.getParam('color', 'X'),
            content: this.props.navigation.getParam('content', 'X'),
            picture: this.props.navigation.getParam('picture', 'X'),
            editingMode: false,
            hints: [],
            newHints: [],
            deletedHintsIDs: [],
            picWidth: 0,
            picHeight: 0
        }
        this.index = -1;
    }

    saveButtonRender = () => {
        <Icon
            style={{ paddingLeft: 15, color: "#fff" }}
            onPress={() => Alert.alert('כל הכבוד', '', [{ text: 'חזור', onPress: () => navigation.goBack()}],{cancelable: false})}
            name="check"
            size={30}
        />
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
        
        axios.post('https://geometrikit.azurewebsites.net/api/getHint', {
            questionID: this.state.questionID
          }
        ).then((response) => {
            this.setState({hints: response.data})
        }).catch(() => {
            Alert.alert(
              '',
              "תקלה בחיבור לשרת, אנא נסה שוב מאוחר יותר",
              [
                {text: 'נסה שוב', onPress: () => this.componentDidMount()},
              ],
              {cancelable: false},);
        }).done();
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

    removeHint (id) {
        var tempOld = [];
        var tempNew = [];
        this.state.hints.forEach(e => {
            if (e.hintID != id){
                tempOld.push(e);
                if(e.hintID < 0 && id != e.hintID){
                    tempNew.push(e);
                }
            }
        });

        if (parseInt(id) > 0){
            this.setState({hints: tempOld, deletedHintsIDs: [...this.state.deletedHintsIDs, id]});
        } else {
            this.setState({hints: tempOld, newHints: tempNew});
        }
    };

    addNewHints (hnt){
        for (var i=hnt.length-1; i>=0; i--) {
            hnt[i].hintID = (--this.index).toString();
        }
        this.setState({newHints: [...this.state.newHints, ...hnt], hints: [...this.state.hints, ...hnt]});
    }

    saveChanges = () => {
        var hintsToAdd = [];
        this.state.newHints.forEach(e => {
            let slice = (({ type, content }) => ({ type, content }))(e);
            hintsToAdd.push({...slice, questionID: this.props.navigation.getParam('questionID', 'X'), teacherID: this.props.navigation.getParam('teacherID', 'X')})
        });
        if (hintsToAdd.length){
            axios.post('https://geometrikit.azurewebsites.net/api/addHints', hintsToAdd).catch(() => {
                Alert.alert(
                  '',
                  "תקלה בחיבור לשרת, אנא נסה שוב מאוחר יותר",
                  [
                    {text: 'נסה שוב', onPress: () => this.saveChanges()},
                  ],
                  {cancelable: false},);
            }).done();
        }
        if (this.state.deletedHintsIDs.length){
            axios.post('https://geometrikit.azurewebsites.net/api/deleteHints', this.state.deletedHintsIDs).catch(() => {
                Alert.alert(
                  '',
                  "תקלה בחיבור לשרת, אנא נסה שוב מאוחר יותר",
                  [
                    {text: 'נסה שוב', onPress: () => this.saveChanges()},
                  ],
                  {cancelable: false},);
            }).done();
        }
        if (this.state.content != this.props.navigation.getParam('content', 'X') || this.state.picture != this.props.navigation.getParam('picture', 'X')){
            axios.post('https://geometrikit.azurewebsites.net/api/editQuestion', {
                questionID: this.state.questionID,
                content: this.state.content,
                picture: this.state.picture
            }).then(() => {
                this.props.navigation.state.params.refresh();
            }).catch(() => {
                Alert.alert(
                  '',
                  "תקלה בחיבור לשרת, אנא נסה שוב מאוחר יותר",
                  [
                    {text: 'נסה שוב', onPress: () => this.saveChanges()},
                  ],
                  {cancelable: false},);
            }).done();
        }
        
        alert("השאלה נשמרה בהצלחה")
    }

    renderTextPreview = () => {
        if (this.state.editingMode && this.props.navigation.getParam('enabled', false)){
            return (
                <View contentContainerStyle={{alignSelf: 'flex-end', width: Dimensions.get('window').width * 0.8}}>
                    <MathKeyboard onPress={(k)=>{this.props.navigation.setParams({text: this.state.text + k}); this.setState({text: this.state.text + k});}}/>
                    <TextInput
                        style={{
                            textAlign: "right",
                            fontSize: 25
                        }}
                        editable = {true}
                        multiline={true}
                        onChangeText={(text) => {
                            var specialChars = ['°', '∡', '∆', '∥' ,'∦' ,'⊥', '≠', '~','≅','⋅','π','√','α','β','γ','δ','≥','≤']                                    
                            if(specialChars.includes(text[text.length - 1])){
                                text = text.substring(0, text.length-2);
                            }

                            if(text[text.length - 1] == '\u200F'){
                                text = text.substring(0, text.length-1);
                            }

                            if (text.length == 1){
                                text = "\u200F" + text
                            }
                            if (text[text.length - 2] == '\n' || text[text.length -2] == ',' || text[text.length -2] == '.'){
                                text = text.substring(0, text.length-1) + "\u200F"  + text[text.length-1]
                            }
                            
                            this.setState({content: text});
                        }}
                        value={this.state.content}
                        placeholder='הקלד כאן את השאלה'
                    />
                </View>
            )
        } else{
            return (
                <View contentContainerStyle={{alignSelf: 'flex-end', width: Dimensions.get('window').width * 0.8}}>
                    <Text style={{ fontSize: 25, color: 'black', textAlign: 'right', padding: 20}}>
                        {this.state.content}
                    </Text>
                </View>
            )
        }
    }

    selectPicture = async () => {
        var status = await Permissions.askAsync(Permissions.CAMERA_ROLL);
        if (status.status == 'denied'){
            Alert.alert('נא ניתן לגשת לגלריה תמונה', 'נא לאפשר גישה לגלריה בהגדרות המכשיר')
        } else {
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
                Image.getSize(`data:${type};base64,${manipResult.base64}`, (width, height) => {
                    if (width > height) {
                        const screenWidth = (Dimensions.get('window').width)
                        const scaleFactor = width / screenWidth
                        const imageHeight = height / scaleFactor
                        this.setState({picWidth: screenWidth, picHeight: imageHeight, picture: `data:${type};base64,${manipResult.base64}`})
                    } else {
                        const screenHeight = (Dimensions.get('window').height / 1.7)
                        const scaleFactor = height / screenHeight
                        const imageWidth = width / scaleFactor
                        this.setState({picWidth: imageWidth, picHeight: screenHeight, picture: `data:${type};base64,${manipResult.base64}`})
                    }
                })
            }
        }
    };

    takePicture = async () => {
        var status = await Permissions.askAsync(Permissions.CAMERA_ROLL, Permissions.CAMERA);
        if (status.status == 'denied'){
            Alert.alert('נא ניתן לגשת למצלמה תמונה', 'נא לאפשר גישה למצלמה ולגלריה בהגדרות המכשיר')
        } else {
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
                Image.getSize(`data:${type};base64,${manipResult.base64}`, (width, height) => {
                    if (width > height) {
                        const screenWidth = (Dimensions.get('window').width)
                        const scaleFactor = width / screenWidth
                        const imageHeight = height / scaleFactor
                        this.setState({picWidth: screenWidth, picHeight: imageHeight, picture: `data:${type};base64,${manipResult.base64}`})
                    } else {
                        const screenHeight = (Dimensions.get('window').height / 1.7)
                        const scaleFactor = height / screenHeight
                        const imageWidth = width / scaleFactor
                        this.setState({picWidth: imageWidth, picHeight: screenHeight, picture: `data:${type};base64,${manipResult.base64}`})
                    }
                })
            }
        }
    };

    renderEditSaveButton () {
        if (this.props.navigation.getParam('enabled', false)){
            if (this.state.editingMode){
                return (
                    <Icon1
                        name="arrow-collapse"
                        size={25}
                    />
                )
            } else {
                return (
                    <Icon2
                        name="edit"
                        size={25}
                    />
                )
            }
        } else {
            return <View></View>
        }        
    }

    render() {
        return (
            <View style={{flex:1}}>
                <ScrollView style={styles.container}>
                    <View style={{height: Dimensions.get('window').height / 1.7, justifyContent: 'center', alignItems: 'center'}}>
                        <Image source={{ uri: this.state.picture}} style={{ height: this.state.picHeight, width: this.state.picWidth, borderRadius: 10 }}/>
                        <TouchableOpacity
                            onPress={() => this.props.navigation.navigate('AssignQuestionToClass', {questionID: this.props.navigation.getParam('questionID', 'X'), teacherID: this.props.navigation.getParam('teacherID', 'X')})}
                            style={{position: 'absolute', left: 15, bottom: 20, shadowColor: '#000', shadowOffset: { width: 0, height: 5 }, shadowOpacity: 0.5, shadowRadius: 5}}
                        >
                            <Image source={assignToClass} style={{ height: 60, width: 60}}/>
                        </TouchableOpacity>
                    </View>
                    <View style={{flexDirection: 'row'}}> 
                        <TouchableOpacity onPress={() => this.setState({editingMode: !this.state.editingMode})}>
                            {this.renderEditSaveButton()}
                        </TouchableOpacity>  
                        <TouchableOpacity onPress={() => this.selectPicture()}>
                            <Icon2
                                name="paperclip"
                                size={25}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this.takePicture()}>
                            <Icon2
                                name="camera"
                                size={25}
                            />
                        </TouchableOpacity>
                    </View> 
                    {this.renderTextPreview()}
                    <Button onPress={() => this.props.navigation.navigate('AddHint', {questionID: this.props.navigation.getParam('questionID', 'X'), addNewHints: this.addNewHints.bind(this)})}
                            borderColor="grey"
                            backgroundColor="grey"
                            textColor="white"
                        >
                            הוסף רמז
                    </Button>
                    <View>
                        { this.state.hints.map((c) => {
                            return (
                                <HintPreview key={c.hintID} id={c.hintID} delete={c.teacherID == this.props.navigation.getParam('teacherID', 'X') || this.props.navigation.getParam('enabled', 'X')} type={c.type} removeHint={this.removeHint.bind(this)} shortContent={c.content}/>
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