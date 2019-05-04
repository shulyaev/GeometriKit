import React, { Component } from 'react';
import { Image, StyleSheet, View, Text, TouchableOpacity, AsyncStorage, FlatList, Dimensions, Alert } from 'react-native';
import Icon from '@expo/vector-icons/Ionicons';
import axios from 'axios';

const numColumns = 2;

export default class QuestionList extends Component {
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
            groupID: this.props.navigation.getParam('groupID', 'X'),
            subjectID: this.props.navigation.getParam('subjectID', 'X'),
            filtered: false,
            questions: []
        }
    }

    componentDidMount () {
        axios.get(`http://geometrikit-ws.cfapps.io/api/getquestions?filtered=${this.state.filtered}&groupID=${this.state.groupID}&subjectID=${this.state.subjectID}`)
        .then((response) => {
          this.setState({questions: response.data})
        })
        .done();
    }

    GetGridViewItem(item) {
        this.props.navigation.navigate('QuestionForm', { 
            questionID: item.questionID,
            bookName: item.bookName,
            page: item.page,
            questionNumber: item.questionNumber,
            color: item.color,
            content: item.content,
            picture: item.picture
        })
    }

    render() {
        return (
            <FlatList
                data={this.state.questions}
                style={styles.containerNew}
                renderItem={({ item }) =>
                    <TouchableOpacity style={[styles.GridViewContainer, { backgroundColor: item.color }]} onPress={this.GetGridViewItem.bind(this, item)}>
                        <Image source={{ uri: item.picture}} style={{ flex: 1.9, width: Dimensions.get('window').width / 4.4, margin: 5 }}/>
                        <Text style={styles.GridViewTextLayout}>{item.bookName}{"\n"}עמוד {item.page}, שאלה {item.questionNumber}</Text>
                    </TouchableOpacity>}
                numColumns={numColumns}
                keyExtractor={(item, index) => index.toString()}
            />
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    containerNew: {
        flex: 1,
    },
    item: {
        backgroundColor: '#4D243D',
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        margin: 3,
        height: Dimensions.get('window').width / 2.5 // approximate a square
    },
    itemText: {
        color: '#fff',
    },
    GridViewContainer: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
        height: 150,
        margin: 5
    },
    GridViewTextLayout: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#fff',
        padding: 3,
    }
});
