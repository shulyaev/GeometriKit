import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import Dimensions from 'Dimensions';

export default class HintPreview extends Component {
    renderContent = () => {
        if (this.props.type === "text"){
            return (<View
                        style={styles.viewStyle}
                    >
                        <TouchableOpacity onPress={() => {this.props.removeHint(this.props.id)}}><Text style={styles.buttonStyle}>X</Text></TouchableOpacity>
                        <Text style={styles.textStyle}>
                            {this.props.shortContent}
                        </Text>
                    </View>
            );
        } else if (this.props.type === "image"){
            return (
                    <View
                        style={styles.viewStyle}
                    >
                        <TouchableOpacity onPress={() => {this.props.removeHint(this.props.id)}}><Text style={styles.buttonStyle}>X</Text></TouchableOpacity>
                        <Image source={{uri: this.props.shortContent}} style={{ width: Dimensions.get('window').width / 1.4, height: Dimensions.get('window').width / 3,borderRadius: 10, flex: 1}}/>
                    </View>
            );
        }
    }
    
    render() {
      return (
        <View>
            {this.renderContent()}
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
        borderColor: 'grey',
        marginVertical: 5,
        flexDirection: 'row',
    },
    textStyle: {
        flex: 1,
        textAlign: 'right',
        color: 'grey',
        fontSize: 18,
        fontWeight: '600',
        paddingTop: 10,
        paddingBottom: 10,
        paddingRight: 20,
    },
    buttonStyle: {
        flex: 1,
        textAlign: 'left',
        color: 'grey',
        fontSize: 18,
        fontWeight: '600',
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 20,
        paddingRight: 20,
    }
})
