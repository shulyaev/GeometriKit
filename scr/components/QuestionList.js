import React, { Component } from 'react';
import { Image, StyleSheet, View, Text, TouchableOpacity, ActivityIndicator, FlatList, Dimensions, Alert } from 'react-native';
import Icon from '@expo/vector-icons/MaterialIcons';
import axios from 'axios';
import {scaleVertical} from '../scale';

const numColumns = 2;

export default class QuestionList extends Component {
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
            groupID: this.props.navigation.getParam('groupID', 'X'),
            subjectID: this.props.navigation.getParam('subjectID', 'X'),
            filtered: false,
            questions: [],
            loading: true
        }
    }

    componentDidMount () {
        axios.get(`http://geometrikit-ws.cfapps.io/api/getquestions?filtered=${this.state.filtered}&groupID=${this.state.groupID}&subjectID=${this.state.subjectID}`)
        .then((response) => {
          this.setState({questions: response.data, loading: false})
        })
        .catch(() => {
            Alert.alert(
              '',
              "תקלה בחיבור לשרת, אנא נסה שוב מאוחר יותר",
              [
                {text: 'נסה שוב', onPress: () => this.componentDidMount()},
              ],
              {cancelable: false},);
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
            picture: item.picture,
            title: item.title
        })
    }

    renderContent = () => {
        if (this.state.loading){
            return (
                <View style={{justifyContent: 'center', flex: 1}}>
                    <ActivityIndicator size="large" color={this.props.navigation.getParam('color', '#f44444')} />
                </View>
            )
        } else {
            return (
                <FlatList
                    data={this.state.questions}
                    style={styles.containerNew}
                    renderItem={({ item }) =>
                        <TouchableOpacity style={[styles.GridViewContainer, { backgroundColor: item.color }]} onPress={this.GetGridViewItem.bind(this, item)}>
                            <Image source={{ uri: item.picture}} style={{ flex: 1.9, width: Dimensions.get('window').height / 7, margin: 5, borderRadius: 10, borderWidth: 1, borderColor: "black" }}/>
                            <Text style={styles.GridViewTextLayout}>{item.title}</Text>
                        </TouchableOpacity>}
                    numColumns={numColumns}
                    keyExtractor={(item, index) => index.toString()}
                />
            )
        }
    }

    render() {
        return (
            <View style={{flex: 1}}>
                {this.renderContent()}
            </View>
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
        height: Dimensions.get('window').height / 4.3,
        margin: 5
    },
    GridViewTextLayout: {
        fontSize: scaleVertical(2.3),
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#fff',
        padding: 3,
    }
});
