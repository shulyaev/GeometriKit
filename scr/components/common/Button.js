import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import Dimensions from 'Dimensions';

const Button = (props) => {
    const { buttonStyle, textStyle } = style;
    const { onPress, children } = props;

    return (
        <TouchableOpacity
            onPress={onPress}
            style={buttonStyle}
        >
            <Text style={textStyle}>
                {children}
            </Text>
        </TouchableOpacity>
    );
};

const DEVICE_WIDTH = Dimensions.get('window').width;

const style = {
    buttonStyle: {
        width: DEVICE_WIDTH - 40,
        marginHorizontal: 20,
        backgroundColor: '#fff',
        borderRadius: 20,
        borderWidth: 2,
        borderColor: '#f44444',
        marginVertical: 5
    },
    textStyle: {
        alignSelf: 'center',
        color: '#f44444',
        fontSize: 18,
        fontWeight: '600',
        paddingTop: 10,
        paddingBottom: 10
    }
};

export { Button };
