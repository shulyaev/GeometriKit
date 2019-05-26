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
import hints from '../images/hints.png'
import Icon from '@expo/vector-icons/MaterialIcons';

class TeacherQuestionListView extends Component {
    static navigationOptions = ({ navigation }) => {
        return {
            title: navigation.getParam('subjectName', 'NO-ID'),
            headerRight: (
                <Icon
                    style={{ paddingRight: 15, color: "#fff" }}
                    onPress={() => navigation.goBack()}
                    name="arrow-forward"
                    size={30}
                />
            ),
            headerLeft: null
        };
    };

    constructor(props) {
        super(props);
        this.state = {
            subjectID: this.props.navigation.getParam('subjectID', 'X'),
            teacherID: this.props.navigation.getParam('teacherID', 'X'),
            filtered: this.props.navigation.getParam('filtered', 'X'),
            questions: [],
            loading: true,
        }
    }

    componentDidMount () {
        axios.post(`http://geometrikit-ws.cfapps.io/api/getTeacherQuestions`,{
            filtered: this.state.filtered,
            teacherID: this.state.teacherID,
            subjectID: this.state.subjectID,
        })
        .then((response) => {
          this.setState({questions: response.data, loading: false})
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
            return (<ScrollView style={{flex: 1}}>
                {this.state.questions.map((q) => {
                    return <TeacherView
                                key={q.questionID}
                                id={q.questionID}
                                refresh={() => {this.setState({loading: true}); this.componentDidMount(); this.props.navigation.state.params.loadData();}}
                                delete={q.authorID === this.props.navigation.getParam('teacherID', 'X')}
                                subject={`${q.title}`}
                                image={q.picture}
                                onPress={()=>{this.props.navigation.navigate('TeacherQuestionView', { questionID: q.questionID,
                                                                                                bookName: q.bookName,
                                                                                                page: q.page,
                                                                                                questionNumber: q.questionNumber,
                                                                                                color: q.color,
                                                                                                content: q.content,
                                                                                                picture: q.picture,
                                                                                                enabled: q.authorID === this.state.teacherID,
                                                                                                title: q.title,
                                                                                                teacherID: this.state.teacherID
                            })}}/>
                    })}
            </ScrollView>)
        }
    }

    render() { 
        return this.renderContent();
    }
}
 
export default TeacherQuestionListView;