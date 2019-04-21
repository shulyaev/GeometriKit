import React from 'react';
import { TextInput, View, Text, Image } from 'react-native';
import Dimensions from 'Dimensions';

const Input = ({ value, onChangeText, placeholder, secureTextEntry, imageSource}) => {
    const { inputStyle, containerStyle, imageStyle } = styles;

    return (
        <View style={containerStyle}>
            <TextInput
                secureTextEntry={secureTextEntry}
                placeholder={placeholder}
                autoCorrect={false}
                style={inputStyle}
                value={value}
                onChangeText={onChangeText}
                autoCapitalize={'none'}
            />
            <Image source={imageSource} style={imageStyle} />
        </View>
    );
};

const DEVICE_WIDTH = Dimensions.get('window').width;

const styles = {
    inputStyle: {
        backgroundColor: 'rgba(200, 200, 200, 0.4)',
        width: DEVICE_WIDTH - 40,
        height: 40,
        marginHorizontal: 20,
        paddingRight: 45,
        paddingLeft: 45,
        borderRadius: 20,
        textAlign: 'right',
        color: 'black',
    },
    containerStyle: {
        marginVertical: 5
    },
    imageStyle: {
        position: 'absolute',
        zIndex: 99,
        width: 22,
        height: 22,
        right: 35,
        top: 9
    }
};

export { Input };