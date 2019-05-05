import React from 'react';
import { TouchableOpacity, Image, Text } from 'react-native';

const TeacherView = (props) => {
    return (
            <TouchableOpacity style={styles.containerStyle} onPress={props.onPress}>
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
        width: 80
    }
};

export { TeacherView };