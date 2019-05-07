import React, { Component } from 'react';
import {
    View,
    Text,
    ScrollView,
    AsyncStorage,
    TouchableOpacity,
    Image
} from 'react-native';
import { Button, TeacherView, ClassView } from './common';
import axios from 'axios';
import {ButtonGroup} from 'react-native-elements';
import hints from '../images/hints.png'
import Icon from '@expo/vector-icons/AntDesign';
import Icon1 from '@expo/vector-icons/Ionicons';

class TeacherHome extends Component {
    static navigationOptions = ({ navigation }) => {
        return {
            headerRight: (
                <Icon
                    style={{ paddingRight: 15, color: "#fff" }}
                    onPress={() => { AsyncStorage.removeItem('userData'); navigation.navigate('Auth') }}
                    name="logout"
                    size={30}
                />
            ),
            headerLeft: null
        };
    };

    constructor(props) {
        super(props);
        this.state = {
            schoolName: '',
            filtered: false,
            subjects: [],
            selectedIndex: 2,
            teacherID: '',
            groups: [{groupID: '1', grade: 'י', questionnaire: '5'},
                    {groupID: '2', grade: 'יא', questionnaire: '4'},
                    {groupID: '3', grade: 'א', questionnaire: '5'},
                    {groupID: '4', grade: 'י', questionnaire: '4'},
                    {groupID: '5', grade: 'ט', questionnaire: '5'},]
        }
        this.updateIndex = this.updateIndex.bind(this);
        this._loadInitialState().done();
    }

    _loadInitialState = async () => {
        var value = await AsyncStorage.getItem('userData');
            this.setState({teacherID: JSON.parse(value).userID, schoolName: JSON.parse(value).schoolName})
    }

    updateIndex (selectedIndex) {
        if(selectedIndex=="2"){
            this.setState({filtered: false, selectedIndex: selectedIndex});
        } else if(selectedIndex=="1"){
            this.setState({filtered: true, selectedIndex: selectedIndex});
        } else
            this.setState({selectedIndex: selectedIndex});
    }

    componentDidMount(){
            axios.get(`http://geometrikit-ws.cfapps.io/api/getsubjects?filtered=falseclassID=1&groupID=1`)
            .then((response) => {
                this.setState({subjects: response.data})
            })
            .done();
    }

    renderContent() {
        if (this.state.selectedIndex == "2"){
            return <View style={{flex: 1}}>
                        <ScrollView>
                            {this.state.subjects.map((s) => {
                                return <TeacherView key={s.subjectID} subject={s.subjectName} image={s.picture} onPress={()=>this.props.navigation.navigate('TeacherQuestionListView', { subjectID: s.subjectID, subjectName: s.subjectName, teacherID: this.state.teacherID, filtered: this.state.filtered })}/>
                            })}
                            <Button onPress={() => { AsyncStorage.removeItem('userData'); this.props.navigation.navigate('Auth') }}>
                                התנתק
                            </Button>
                        </ScrollView>
                        <TouchableOpacity
                            onPress={() => this.props.navigation.navigate('AddQuestion1Form')}
                            style={{position: 'absolute', left: 15, bottom: 20, shadowColor: '#000', shadowOffset: { width: 0, height: 5 }, shadowOpacity: 0.5, shadowRadius: 5}}
                        >
                            <Image source={hints} style={{ height: 60, width: 60}}/>
                        </TouchableOpacity>
                    </View>
        } else if (this.state.selectedIndex == '1') {
            return <View><Text>אפשרות זו אינה זמינה</Text></View>
        } else if (this.state.selectedIndex == '0') {
            return  <View style={{flex: 1}}>
                        <ScrollView>
                            {this.state.groups.map((g) => {
                                return <ClassView key={g.groupID} grade={g.grade} questionnaire={g.questionnaire} schoolName={this.state.schoolName}/>
                            })}
                        </ScrollView>
                        <TouchableOpacity
                            onPress={() => this.props.navigation.navigate('CreateGroup')}
                            style={{position: 'absolute', left: 15, bottom: 20, shadowColor: '#000', shadowOffset: { width: 0, height: 5 }, shadowOpacity: 0.5, shadowRadius: 5}}
                        >
                            <Image source={hints} style={{ height: 60, width: 60}}/>
                        </TouchableOpacity>
                   </View>
        }
    }

    render() { 
        const buttons = ['כיתות שלי', 'שאלות שחיברתי', 'מאגר שאלות'];

        return (
            <View style={{flex: 1}}>
                <ButtonGroup
                    onPress={this.updateIndex}
                    selectedIndex={this.state.selectedIndex}
                    buttons={buttons}
                    containerStyle={{borderColor: 'white',height: 40, borderRadius: 10, margin: 1}}
                    selectedButtonStyle={{backgroundColor: 'grey'}}
                />
                {this.renderContent()}
            </View>
        );
    }
}
 
export default TeacherHome;