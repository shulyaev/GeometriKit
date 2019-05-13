import React from 'react';
import { Text, TouchableOpacity,View } from 'react-native';
import Dimensions from 'Dimensions';
import {Key} from './Key'

const MathKeyboard = (props) => {
    return (
        <View>
            <View style={{flexDirection: 'row', justifyContent: 'space-around', marginTop: 10}}>
                <Key onPress={props.onPress}>&#8206;°&#8206;</Key>
                <Key onPress={props.onPress}>&#8206;∡&#8206;</Key>
                <Key onPress={props.onPress}>&#8206;∆&#8206;</Key>   
                <Key onPress={props.onPress}>&#8206;∥&#8206;</Key>
                <Key onPress={props.onPress}>&#8206;∦&#8206;</Key>
                <Key onPress={props.onPress}>&#8206;⊥&#8206;</Key>
                <Key onPress={props.onPress}>&#8206;≠&#8206;</Key>
                <Key onPress={props.onPress}>&#8206;~&#8206;</Key>
                <Key onPress={props.onPress}>&#8206;≅&#8206;</Key>
            </View>
            <View style={{flexDirection: 'row', justifyContent: 'space-around', marginTop: 10}}>
                <Key onPress={props.onPress}>&#8206;⋅&#8206;</Key>
                <Key onPress={props.onPress}>&#8206;π&#8206;</Key>
                <Key onPress={props.onPress}>&#8206;√&#8206;</Key>
                <Key onPress={props.onPress}>&#8206;α&#8206;</Key>
                <Key onPress={props.onPress}>&#8206;β&#8206;</Key>
                <Key onPress={props.onPress}>&#8206;γ&#8206;</Key>
                <Key onPress={props.onPress}>&#8206;δ&#8206;</Key>
                <Key onPress={props.onPress}>&#8206;≥&#8206;</Key>
                <Key onPress={props.onPress}>&#8206;≤&#8206;</Key>
            </View>
        </View>
    );
};



export { MathKeyboard };
