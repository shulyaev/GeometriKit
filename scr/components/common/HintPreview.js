import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Dimensions from 'Dimensions';

export default class HintPreview extends Component {
    state = {
        removeHint: this.props.removeHint,
        hintID: this.props.hintID,
        shortContent: this.props.shortContent
    };
    
    render() {
      return (
        <View
            style={styles.viewStyle}
        >
            <TouchableOpacity onPress={() => {this.state.removeHint(this.state.hintID)}}><Text style={styles.buttonStyle}>X</Text></TouchableOpacity>
            <Text style={styles.textStyle}>
                {this.state.shortContent}
            </Text>
        </View>
      );
   }
}


const DEVICE_WIDTH = Dimensions.get('window').width;

const styles = StyleSheet.create({
    viewStyle: {
        width: DEVICE_WIDTH - 40,
        marginHorizontal: 20,
        backgroundColor: '#fff',
        borderRadius: 20,
        borderWidth: 2,
        borderColor: '#f44444',
        marginVertical: 5,
        flexDirection: 'row'
    },
    textStyle: {
        flex: 1,
        textAlign: 'right',
        color: '#f44444',
        fontSize: 18,
        fontWeight: '600',
        paddingTop: 10,
        paddingBottom: 10,
        paddingRight: 20,
    },
    buttonStyle: {
        flex: 1,
        textAlign: 'left',
        color: '#f44444',
        fontSize: 18,
        fontWeight: '600',
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 20,
    }
})
