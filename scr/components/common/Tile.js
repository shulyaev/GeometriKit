import React from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import Dimensions from 'Dimensions';

const Tile = (props) => {
    const { tileStyle, textStyle } = style;
    const { key, onPress, children, tileColor } = props;

    return (
        <TouchableOpacity
            onPress={onPress}
            style={[tileStyle, {backgroundColor: tileColor}]}
        >
            <Text style={textStyle}>
                {children}
            </Text>
        </TouchableOpacity>
    );
};

const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;


const style = StyleSheet.create({
    tileStyle: {
        width: DEVICE_WIDTH / 2.1,
        height: DEVICE_HEIGHT / 5,
        marginHorizontal: 20,
        borderRadius: 5,
        borderWidth: 2,
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
});

export { Tile };
