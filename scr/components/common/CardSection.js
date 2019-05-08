import React from 'react';
import { View } from 'react-native';

const CardSection = (props) => {
    return (
        <View style={styles.containerStyle}>
            {props.children}
        </View>
    );
};

const styles = {
    containerStyle: {
        borderBottomWidth: 1,
        padding: 10,
        backgroundColor: '#fff',
        borderColor: '#f44444',
        flexDirection: 'row',
        borderRadius: 10,
    }
};

export { CardSection };
