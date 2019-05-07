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
import Icon from '@expo/vector-icons/Ionicons';

class TeacherQuestionListView extends Component {
    static navigationOptions = ({ navigation }) => {
        return {
            title: navigation.getParam('subjectName', 'NO-ID'),
            headerRight: (
                <Icon
                    style={{ paddingRight: 15, color: "#fff" }}
                    onPress={() => navigation.goBack()}
                    name="ios-arrow-forward"
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
            
        }
    }

    componentDidMount () {
        axios.get(`http://geometrikit-ws.cfapps.io/api/getquestions?filtered=${this.state.filtered}&groupID=1&subjectID=${this.state.subjectID}`)
        .then((response) => {
          this.setState({questions: response.data})
        })
        .done();
    }
    render() { 

        return (
            <ScrollView style={{flex: 1}}>
                {this.state.questions.map((q) => {
                    return <TeacherView
                                key={q.questionID}
                                subject={`${q.bookName}\nעמוד ${q.page}, שאלה ${q.questionNumber}`}
                                image={q.picture}
                                onPress={()=>{this.props.navigation.navigate('TeacherQuestionView', { questionID: q.questionID,
                                                                                                bookName: q.bookName,
                                                                                                page: q.page,
                                                                                                questionNumber: q.questionNumber,
                                                                                                color: q.color,
                                                                                                content: q.content,
                                                                                                picture: q.picture,
                                                                                                enabled: q.authorID === this.state.teacherID
                            })}}/>
                    })}
            </ScrollView>      
        );
    }
}
 
export default TeacherQuestionListView;