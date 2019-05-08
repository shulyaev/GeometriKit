import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, AsyncStorage, Image, Alert, Dimensions, ScrollView, TextInput, KeyboardAvoidingView } from 'react-native';
import Icon1 from '@expo/vector-icons/Ionicons';
import { Button, MathKeyboard} from './common';
import HintPreview from './common/HintPreview';
import { ImagePicker, Permissions } from 'expo';
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
                    name="ios-arrow-forward"
                    size={30}
                />
            ),
            headerLeft: (
                <TouchableOpacity style={{flexDirection: 'row'}} onPress={() => navigation.navigate('AddQuestion3Form', {text: navigation.getParam('text', 'X'), photo: navigation.getParam('photo', 'X'), hints: _this.hintsToPass(_this.state.hints)})}>
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
        await Permissions.askAsync(Permissions.CAMERA_ROLL);
        const { cancelled, base64, type } = await ImagePicker.launchImageLibraryAsync({
            aspect: 1,
            base64: true
        });
 
        if (!cancelled) {
            this.setState({hints: [...this.state.hints, {id: this.index++, type: 'image', content: `data:${type};base64,${base64}`, shortContent: `data:${type};base64,${base64}`}]});
        }
    };

    takePicture = async () => {
        await Permissions.askAsync(Permissions.CAMERA);
        const { cancelled, base64, type } = await ImagePicker.launchCameraAsync({
          base64: true,
        });

        if (!cancelled) {
            this.setState({hints: [...this.state.hints, {id: this.index++, type: 'image', content: `data:${type};base64,${base64}`, shortContent: `data:${type};base64,${base64}`}]});
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
                            onChangeText={(hint) => this.setState({hint})}
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

    hintsToPass = (hnt) => {
        hnt.forEach(h => {
            delete h["id"];
            delete h["shortContent"];
        });
        return hnt;
    };

    renderHintsPreview = () => {
        return this.state.hints.map((c) => {
            return (
                <HintPreview id={c.id} type={c.type} removeHint={this.removeHint} shortContent={c.shortContent}/>
            )
        });
    };

    removeHint = (id) => {
        for( var i = 0; i < this.state.hints.length; i++) { 
            if (this.state.hints[i].id === id) {
                var temp = this.state.hints;
                temp.splice(i, 1);
                this.setState({hints: temp});
                break;
            }
        }
    };

    render() {
        const buttons = ['רמז מילולי', 'רמז ויזואלי', 'רמז קולי'];

        return (
            <View style={styles.container}>
                <View style>
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
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    }
});