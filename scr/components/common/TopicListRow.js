import React from 'react';
import { View, Text } from 'react-native';
import { scaleVertical } from '../../scale';
import Dimensions from 'Dimensions';


const TopicListRow = (props) => {
    const { rowTopicStyle, singleTopicStyle } = styles;
    const {item1, item2} = props;

    return (
        <View style={rowTopicStyle}>
            <View style={singleTopicStyle}>
                <Text>{item1}</Text>
            </View>
            <View style={singleTopicStyle}>
                <Text>{item2}</Text>
            </View>
        </View>
    );
};

const DEVICE_WIDTH = Dimensions.get('window').width;

const styles = {
    singleTopicStyle: {
        width: DEVICE_WIDTH / 2.1,
        height: DEVICE_WIDTH / 3,
        backgroundColor:'red',
        marginVertical: (DEVICE_WIDTH - ((DEVICE_WIDTH / 2.1) * 2)) / 6,
    },
    rowTopicStyle: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-evenly'
    }
};

export { TopicListRow };
