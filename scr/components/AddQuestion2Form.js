import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, TouchableWithoutFeedback, Image, Alert, Dimensions, ScrollView, TextInput, Keyboard } from 'react-native';
import Icon1 from '@expo/vector-icons/MaterialIcons';
import { Button, MathKeyboard} from './common';
import HintPreview from './common/HintPreview';
import { ImagePicker, Permissions, ImageManipulator } from 'expo';
import Icon2 from '@expo/vector-icons/Feather';
import {ButtonGroup} from 'react-native-elements';


let _this = null;

export default class AddQuestion2Form extends Component {
    static navigationOptions = ({ navigation }) => {
        return {
            title: 'הוספת רמז',
            headerRight: (
                <Icon1
                    style={{ paddingRight: 15, color: "#fff" }}
                    onPress={() => navigation.goBack()}
                    name="arrow-forward"
                    size={30}
                />
            ),
            headerLeft: (
                <TouchableOpacity style={{paddingLeft: 15, flexDirection: 'row'}} onPress={() => {if(_this.state.hints.length>0){navigation.navigate('AddQuestion3Form', {loadData: () => navigation.state.params.loadData(), text: navigation.getParam('text', 'X'), photo: navigation.getParam('photo', 'X'), hints: _this.state.hints})}else{Alert.alert('', 'יש להזין רמז אחד לפחות');}}}>
                    <Text style={{color: '#fff', fontSize: 25}}>
                        הבא
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
            hintType: "text",
            hints: [],
            hint: "",
            selectedIndex: 0
        };
        this.index = 0;
        this.updateIndex = this.updateIndex.bind(this);
    }

    updateIndex (selectedIndex) {
        if (selectedIndex == '0'){
            this.setState({selectedIndex: selectedIndex, hintType: 'text'});
        } else if (selectedIndex == '1'){
            this.setState({selectedIndex: selectedIndex, hintType: 'image'});
        } else if (selectedIndex == '2'){
            this.setState({selectedIndex: selectedIndex, hintType: 'voice'});
        }
    }

    componentDidMount () {
        _this = this;
    }

    selectPicture = async () => {
        var status = await Permissions.askAsync(Permissions.CAMERA_ROLL);
        if (status.status == 'denied'){
            Alert.alert('נא ניתן לגשת לגלריה תמונה', 'נא לאפשר גישה לגלריה בהגדרות המכשיר')
        } else {
            const { cancelled, uri, type, height, width } = await ImagePicker.launchImageLibraryAsync({
                quality: 1,
            }).catch();
     
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
                this.setState({hints: [...this.state.hints, {id: this.index++, type: 'image', content: `data:${type};base64,${manipResult.base64}`, shortContent: `data:${type};base64,${manipResult.base64}`}]});
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
            }).catch();
    
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
                this.setState({hints: [...this.state.hints, {id: this.index++, type: 'image', content: `data:${type};base64,${manipResult.base64}`, shortContent: `data:${type};base64,${manipResult.base64}`}]});
            }
        }
    };

    renderContent = () => {
        if (this.state.hintType === "text")
            return <View>
                        <MathKeyboard onPress={(k)=>this.setState({hint: this.state.hint + k})}/>
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
                                
                                this.setState({hint: text});
                            }}
                            value={this.state.hint}
                            placeholder='הקלד כאן את הרמז'
                        />
                        <Button onPress = {() => {
                            this.setState({hints: [...this.state.hints, {id: this.index++, type: 'text', content: this.state.hint, shortContent: this.shortTextCreate(this.state.hint)}]});
                            this.setState({hint: ''});}}
                            borderColor="grey"
                            backgroundColor="grey"
                            textColor="white"
                        >
                            שמור רמז
                        </Button>
                    </View>
        if (this.state.hintType === 'image')
            return <View>
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
                    </View>
        if (this.state.hintType === 'voice')
            return <Text>אפשרות זו אינה זמינה</Text>
    };

    shortTextCreate = (str) => {
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
        return str;
    }

    renderHintsPreview = () => {
        return this.state.hints.map((c) => {
            return (
                <HintPreview key={c.id} id={c.id} type={c.type} removeHint={this.removeHint} shortContent={c.shortContent}/>
            )
        });
    };

    removeHint = (id) => {
        console.log(this.state.hints);
        var temp = [];
        for( var i = 0; i < this.state.hints.length; i++) {
            console.log(this.state.hints[i].id + '    ' + id);
            if (this.state.hints[i].id != id) {
                temp.push(this.state.hints[i]);
            }
        }
        this.setState({hints: temp});
        console.log(temp);
    };

    render() {
        const buttons = ['רמז מילולי', 'רמז ויזואלי', 'רמז קולי'];

        return (
            <TouchableWithoutFeedback onPress={()=>Keyboard.dismiss()}>
                <View style={styles.container}>
                    <View>
                        <ButtonGroup
                            onPress={this.updateIndex}
                            selectedIndex={this.state.selectedIndex}
                            buttons={buttons}
                            containerStyle={{height: 40}}
                            selectedButtonStyle={{borderColor: 'grey',backgroundColor: 'grey'}}
                        />
                    </View>
                    <View>
                        {this.renderContent()}
                    </View>
                    <ScrollView>
                        {this.renderHintsPreview()}
                    </ScrollView>
                </View>
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