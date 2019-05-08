import React from 'react';
import { Text, TouchableOpacity,View } from 'react-native';
import Dimensions from 'Dimensions';
import {Key} from './Key'

const MathKeyboard = (props) => {
    return (
        <View>
            <View style={{flexDirection: 'row', justifyContent: 'space-around', marginTop: 10}}>
                <Key onPress={props.onPress}>°</Key>
                <Key onPress={props.onPress}>∡</Key>
                <Key onPress={props.onPress}>∆</Key>   
                <Key onPress={props.onPress}>∥</Key>
                <Key onPress={props.onPress}>∦</Key>
                <Key onPress={props.onPress}>⊥</Key>
                <Key onPress={props.onPress}>≠</Key>
                <Key onPress={props.onPress}>~</Key>
                <Key onPress={props.onPress}>≅</Key>
            </View>
            <View style={{flexDirection: 'row', justifyContent: 'space-around', marginTop: 10}}>
                <Key onPress={props.onPress}>⋅</Key>
                <Key onPress={props.onPress}>π</Key>
                <Key onPress={props.onPress}>√</Key>
                <Key onPress={props.onPress}>α</Key>
                <Key onPress={props.onPress}>β</Key>
                <Key onPress={props.onPress}>γ</Key>
                <Key onPress={props.onPress}>δ</Key>
                <Key onPress={props.onPress}>≥</Key>
                <Key onPress={props.onPress}>≤</Key>
            </View>
        </View>
    );
};



export { MathKeyboard };
