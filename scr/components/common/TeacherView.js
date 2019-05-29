import React from 'react';
import { TouchableOpacity, Image, Text, Alert } from 'react-native';
import axios from 'axios';

const TeacherView = (props) => {
    deleteQuestion = () => {
        Alert.alert(
            '',
            'האם את/ה בטוח שאת/ה רוצה למחוק את השאלה?',
            [
              {text: 'אישור', onPress: () => axios.post('https://geometrikit.azurewebsites.net/api/removeQuestion', {questionID: props.id}).then(()=>props.refresh()).done()},
              {
                text: 'ביטול',
                style: 'cancel',
              },
            ],
            {cancelable: false},
        );
        
    }

    renderDeleteButton = () => {
        if (props.delete)
            return (
                <TouchableOpacity onPress={() => deleteQuestion()}>
                    <Text style={styles.buttonStyle}>X</Text>
                </TouchableOpacity>
            )
    }

    return (
            <TouchableOpacity style={styles.containerStyle} onPress={props.onPress}>
                {renderDeleteButton()}
                <Text style={styles.textStyle}>{props.subject}</Text>
                <Image source={{ uri: props.image }} style={styles.imageStyle}/>
            </TouchableOpacity>
    );
};

const styles = {
    containerStyle: {
        borderWidth: 2,
        padding: 5,
        backgroundColor: 'grey',
        borderColor: 'grey',
        flexDirection: 'row',
        borderRadius: 10,
        margin: 5,
        alignContent: 'center'
    },
    textStyle: {
        fontSize: 25,
        flex: 5,
        color: '#fff'
    },
    imageStyle: {
        flex: 1.4,
        height: 80,
        width: 80,
        borderRadius: 10,
        marginLeft: 20
    },
    buttonStyle: {
        flex: 1,
        textAlign: 'left',
        color: 'white',
        fontSize: 18,
        fontWeight: '600',
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 20,
        paddingRight: 20,
    }
};

export { TeacherView };