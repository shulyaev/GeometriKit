import React from 'react';
import { View, Text } from 'react-native';
import { scaleVertical } from '../../scale';

const StudentHeader = (props) => {
    const { textStyle, viewStyle } = styles;

    return (
        <View style={viewStyle}>
            <Text style={textStyle}>{props.headerText}</Text>
        </View>
    );
};

const styles = {
    viewStyle: {
        backgroundColor: '#f44444',
        justifyContent: 'center',
        alignItems: 'center',
        height: scaleVertical(9),
        paddingTop: scaleVertical(3.5)
    },
    textStyle: {
        color: 'white',
        fontSize: scaleVertical(4.5)
    }
};

export { StudentHeader };
