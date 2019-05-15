import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import Dimensions from 'Dimensions';

const Key = (props) => {
    const { buttonStyle, textStyle } = style;
    const { onPress, children, show } = props;

    return (
        <TouchableOpacity
            onPress={()=>onPress(`${children}`)}
            style={buttonStyle}
        >
            <Text style={textStyle}>
                {show}
            </Text>
        </TouchableOpacity>
    );
};

const DEVICE_WIDTH = Dimensions.get('window').width;

const style = {
    buttonStyle: {
        width: DEVICE_WIDTH/11,
        marginHorizontal: 1,
        backgroundColor: '#fff',
        borderRadius: 5,
        borderWidth: 1,
        borderColor: 'gray',
    },
    textStyle: {
        alignSelf: 'center',
        color: 'gray',
        fontSize: 18,
        fontWeight: '600',
        paddingTop: 5,
        paddingBottom: 5
    }
};

export { Key };
