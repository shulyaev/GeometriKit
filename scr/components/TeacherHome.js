import React, { Component } from 'react';
import {
    View,
    Text,
    ScrollView,
    AsyncStorage,
    TouchableOpacity,
    Image,
    ActivityIndicator
} from 'react-native';
import { Button, TeacherView, ClassView } from './common';
import axios from 'axios';
import {ButtonGroup} from 'react-native-elements';
import addQuestion from '../images/addQuestion.png'
import addGroup from '../images/addGroup.png'
import Icon from '@expo/vector-icons/AntDesign';
import {scaleVertical} from '../scale';

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
            groups: [],
            loading: true,
            subjectsFiltered: []
        }
        this.teacherID = '';
        this.updateIndex = this.updateIndex.bind(this);
        this._loadInitialState().done();
    }

    _loadInitialState = async () => {
        var value = await AsyncStorage.getItem('userData');
        this.setState({teacherID: JSON.parse(value).userID, schoolName: JSON.parse(value).schoolName});
        this.loadData();
    }

    updateIndex (selectedIndex) {
        if(selectedIndex=="2"){
            this.setState({filtered: false, selectedIndex: selectedIndex});
        } else if(selectedIndex=="1"){
            this.setState({filtered: true, selectedIndex: selectedIndex});
        } else
            this.setState({selectedIndex: selectedIndex});
    }

    loadData(){
        axios.post(`http://geometrikit-ws.cfapps.io/api/getTeacherSubjects`, {
            filtered: 'false',
            teacherID: this.state.teacherID
        })
        .then((response) => {
            this.setState({subjects: response.data, loading: false})
        })
        .done();

        axios.post(`http://geometrikit-ws.cfapps.io/api/getTeacherSubjects`, {
            filtered: 'true',
            teacherID: this.state.teacherID
        })
        .then((response) => {
            this.setState({subjectsFiltered: response.data})
        })
        .done();

        axios.post('http://geometrikit-ws.cfapps.io/api/getTeacherGroups', {
            teacherID: this.state.teacherID,
        })
        .then((response) => {
            this.setState({groups: response.data})
        })
        .catch(() => {
            Alert.alert('', "תקלה בחיבור לשרת, אנא נסה שוב מאוחר יותר")
        })
        .done();
    }

    deleteGroup(gid){
        axios.post(`http://geometrikit-ws.cfapps.io/api/deleteTeacherGroup`, {
            groupID: gid
        })
        .then((response) => {
            if (response.data.Status == 'true'){
                for( var i = 0; i < this.state.groups.length; i++) { 
                    if (this.state.groups[i].groupID === gid) {
                        var temp = this.state.groups;
                        temp.splice(i, 1);
                        this.setState({groups: temp});
                        break;
                    }
                }
            }
        })
        .done();
    }

    renderContent() {
        if (this.state.loading){
            return (
                <View style={{justifyContent: 'center', flex: 1}}>
                    <ActivityIndicator size="large" color="grey" />
                </View>
            )
        } else {
            if (this.state.selectedIndex == "2"){
                return <View style={{flex: 1}}>
                            <ScrollView>
                                {this.state.subjects.map((s) => {
                                    return <TeacherView key={s.subjectID} subject={s.subjectName} image={s.picture} onPress={()=>this.props.navigation.navigate('TeacherQuestionListView', { subjectID: s.subjectID, subjectName: s.subjectName, teacherID: this.state.teacherID, filtered: this.state.filtered })}/>
                                })}
                            </ScrollView>
                            <TouchableOpacity
                                onPress={() => this.props.navigation.navigate('AddQuestion1Form', {filtered: false})}
                                style={{position: 'absolute', left: 15, bottom: 20, shadowColor: '#000', shadowOffset: { width: 0, height: 5 }, shadowOpacity: 0.5, shadowRadius: 5}}
                            >
                                <Image source={addQuestion} style={{ height: 60, width: 60}}/>
                            </TouchableOpacity>
                        </View>
            } else if (this.state.selectedIndex == '1') {
                return  <View style={{flex: 1}}>
                            <ScrollView>
                                {this.state.subjectsFiltered.map((s) => {
                                    return <TeacherView key={s.subjectID} subject={s.subjectName} image={s.picture} onPress={()=>this.props.navigation.navigate('TeacherQuestionListView', { subjectID: s.subjectID, subjectName: s.subjectName, teacherID: this.state.teacherID, filtered: this.state.filtered })}/>
                                })}
                            </ScrollView>
                            <TouchableOpacity
                                onPress={() => this.props.navigation.navigate('AddQuestion1Form', {filtered: true})}
                                style={{position: 'absolute', left: 15, bottom: 20, shadowColor: '#000', shadowOffset: { width: 0, height: 5 }, shadowOpacity: 0.5, shadowRadius: 5}}
                            >
                                <Image source={addQuestion} style={{ height: 60, width: 60}}/>
                            </TouchableOpacity>
                        </View>
            } else if (this.state.selectedIndex == '0') {
                return  <View style={{flex: 1}}>
                            <ScrollView>
                                {this.state.groups.map((g) => {
                                    return <ClassView key={g.groupID} onPress={(gid)=>this.deleteGroup(gid)} gid={g.groupID} grade={g.grade} questionnaire={g.questionnaire} schoolName={this.state.schoolName}/>
                                })}
                            </ScrollView>
                            <TouchableOpacity
                                onPress={() => this.props.navigation.navigate('CreateGroup', {loadData: this.loadData.bind(this)})}
                                style={{position: 'absolute', left: 15, bottom: 20, shadowColor: '#000', shadowOffset: { width: 0, height: 5 }, shadowOpacity: 0.5, shadowRadius: 5}}
                            >
                                <Image source={addGroup} style={{ height: 60, width: 60}}/>
                            </TouchableOpacity>
                       </View>
            }
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