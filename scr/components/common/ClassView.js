import React from 'react';
import { View, Image, Text } from 'react-native';

const ClassView = (props) => {
    return (
            <View style={styles.containerStyle}>
                <Text style={styles.textStyle}> 
                    כיתה {props.grade}', {props.questionnaire} יח"ל, {props.schoolName}, תשע"ט
                </Text>
            </View>
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
        fontSize: 20,
        color: '#fff'
    },

};

export { ClassView };