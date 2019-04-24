import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, AsyncStorage, Image, Alert, Dimensions, ScrollView, TextInput, KeyboardAvoidingView } from 'react-native';
import Icon1 from '@expo/vector-icons/Ionicons';
import { Button } from './common';
import HintPreview from './common/HintPreview';
import { ImagePicker, Permissions } from 'expo';

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
            hint: ""
        };
        this.index = 0;
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
            this.setState({ photo: `data:${type};base64,${base64}` });
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
        const { base64, type } = await ImagePicker.launchCameraAsync({
          base64: true,
        });
        this.setState({ photo: `data:${type};base64,${base64}` });
    };

    renderContent = () => {
        if (this.state.hintType === "text")
            return <View>
                        <TextInput
                            style={{
                                textAlign: "right",
                                fontSize: 25
                            }}
                            editable = {true}
                            maxLength = {40}
                            multiline={true}
                            numberOfLines={4}
                            onChangeText={(hint) => this.setState({hint})}
                            value={this.state.hint}
                            placeholder='הקלד כאן את הרמז'
                        />
                        <Button onPress = {() => {
                            this.setState({hints: [...this.state.hints, {key: this.index++, type: 'text', content: this.state.hint, shortContent: this.shortTextCreate(this.state.hint)}]});
                            this.setState({hint: ''});}}
                        >
                            שמור רמז
                        </Button>
                    </View>
        if (this.state.hintType === 'voice')
            return <Text>אפשקות זו אינה זמינה</Text>
        if (this.state.hintType === 'image')
            return <Text>אפשקות זו אינה זמינה</Text>
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
            delete h["key"];
            delete h["shortContent"];
        });
        return hnt;
    };

    renderHintsPreview = () => {
        return this.state.hints.map(c => {
            if (c.type === "text"){
                console.log(c.shortContent);
                return (
                    <HintPreview hintID={c.key} removeHint={this.removeHint} shortContent={c.shortContent}></HintPreview>
                )
            }
        });
    };

    removeHint = (key) => {
        for( var i = 0; i < this.state.hints.length; i++) { 
            if ( this.state.hints[i].key === key) {
                var temp = this.state.hints;
                temp.splice(i, 1);
                this.setState({hints: temp});
                break;
            }
        }
        console.log(temp);
    };

    render() {
        return (
            <ScrollView style={styles.container}>
                <View>   
                    <Button onPress = {() => this.setState({hintType: 'text'})}>
                        רמז מילולי
                    </Button>
                    <Button onPress = {() => this.setState({hintType: 'voice'})}>
                        רמז קולי
                    </Button>
                    <Button onPress = {() => this.setState({hintType: 'image'})}>
                        רמז ויזואלי
                    </Button>
                </View>
                <View>
                    {this.renderContent()}
                </View>
                {this.renderHintsPreview()}
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