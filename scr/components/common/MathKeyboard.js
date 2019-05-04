import React from 'react';
import { Text, TouchableOpacity,View } from 'react-native';
import Dimensions from 'Dimensions';
import {Key} from './Key'

const MathKeyboard = (props) => {
    return (
        <View style={{flexDirection: 'row', justifyContent: 'space-around', marginTop: 10}}>
            <Key onPress={props.onPress}>°</Key>
            <Key onPress={props.onPress}>∡</Key>
            <Key onPress={props.onPress}>∆</Key>
            <Key onPress={props.onPress}>~</Key>
            <Key onPress={props.onPress}>∥</Key>
            <Key onPress={props.onPress}>⊥</Key>
            <Key onPress={props.onPress}>≠</Key>
            <Key onPress={props.onPress}>≅</Key>
        </View>
    );
};



export { MathKeyboard };
