import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';

const ClassView = (props) => {
    return (
            <View style={styles.containerStyle}>
                <TouchableOpacity onPress={()=>props.onPress(props.gid)}><Text style={{flex: 1, textAlign: 'left', fontSize: 18, fontWeight: '600', paddingTop: 10, color: 'white',paddingBottom: 10, paddingLeft: 10, paddingRight: 20}} >X</Text></TouchableOpacity>
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
    },
    textStyle: {
        flex: 1,
        textAlign: 'right',
        color: 'white',
        fontSize: 18,
        fontWeight: '600',
        paddingTop: 10,
        paddingBottom: 10,
        paddingRight: 20,
    },

};

export { ClassView };