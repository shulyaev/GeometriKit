import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, AsyncStorage, Image, Alert, Dimensions, ScrollView } from 'react-native';
import Icon from '@expo/vector-icons/Ionicons';
import hints from '../images/hints.png'
import statements from '../images/statements.png'
import axios from 'axios';
import { Button } from './common';

export default class QuestionForm extends Component {
    static navigationOptions = ({ navigation }) => {
        return {
            title: 'עמוד ' + navigation.getParam('page', 'X') + ', שאלה ' + navigation.getParam('questionNumber', 'X'),
            headerRight: (
                <Icon
                    style={{ paddingRight: 15, color: "#fff" }}
                    onPress={() => navigation.goBack()}
                    name="ios-arrow-forward"
                    size={30}
                />
            ),
            headerLeft: (
                <Icon
                    style={{ paddingLeft: 15, paddingBottom: 53, color: "#fff" }}
                    onPress={() => Alert.alert('כל הכבוד', '', [{ text: 'חזור', onPress: () => navigation.goBack()}],{cancelable: false})}
                    name="ios-checkmark"
                    size={53}
                />
            ),
        };
    };

    constructor(props) {
        super(props);
        this.state = {
            questionID: this.props.navigation.getParam('questionID', 'X'),
            bookName: this.props.navigation.getParam('bookName', 'X'),
            page: this.props.navigation.getParam('page', 'X'),
            questionNumber: this.props.navigation.getParam('questionNumber', 'X'),
            color: this.props.navigation.getParam('color', 'X'),
            content: this.props.navigation.getParam('content', 'X'),
            picture: this.props.navigation.getParam('picture', 'X'),
            hints: [{type: 'text', content: 'רמז 1'}, {type: 'picture', content: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABgCAYAAADimHc4AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAG7AAABuwBHnU4NQAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAATySURBVHic7ZxJjBVVFEBfMQooYzuB4tRoEEkkGqcokRAJIWKi0ZUYlQW2iW5EI3FYiFExETXiwiGaICaCAwtRYaELEhSDhuBARxE1GqKADEIL2g3dx0VV4yfWu/3r/6q6//2+J6lVV7177q1bP++//6qdMwzDMAzDMAzDMAzDMAzDMBocYCgwRNujHgZoC9TJA8lhlA0wETiUHBO1ffodwJv8xwptn34FcA3QU3EDeoCrtb36BUAEfMb/+RSItP2aHuCOlOL3cru2X1MDjAR2CjdgJzBS27NpAZ4Uit/LE9qeTQnQCnRWcQP+Bs7R9m06gHerKH4v72j7NhXAdRmK38u12t5NATAA+NJT5O7kSOMLIPSlFn2ABUKXvwS8LPx9gbZ/0ACjgd2e4u4HTk6O/Z5zdgOjtfMIFmCp0N33VZy3UDjvGc0cggW4AOjyFPU7YHDFuUOA7z3ndgLna+YSJMAaoauvTzl/rnD++xo5BAswWyjmWuG6dcJ1s8vMIViAwUC7p4hdwGTh2sn4P7baqfjYMjwA9wpd/EIV1y8Trr+njByCBWgB9nmK9wcwpooxxgB7PGPsA1rKyCVIgBfz6N4+nqJlReYQLMBU4KinaF8DAzOMNQj4xjPWUWBqkbkECfCJ0LUzaxhvpjDex0XkECzADUKx1tQx7gfCuHPzzCFYiHe3bfcU6R/gvDrGbk3GSGM7MDTPXIIEuF/o0qU5jP+sMP7CPHIIFuB04KCnOL+Tww/syCuqB4HT8sglSIBXhe68K8c4bUKcV/KKExTApfh/zdpChmlnFbEGAl95YnUDl+QVKwiId7dtELpyRgExZwjxNtCfdtUBtwjFeK/AuKuFuDcXFbehAIYDv3qKUOieHuDcJEYaPwEnFBW7YQAeFrrwqRLiLxHiP1R0fFWA8UCHJ/nfgBNLcDgpiZVGBzC+aAc1gOVC991Zosd8wWN5WR6lAlzO8S9VVLKJEjdREW/22uRx6QEuK8ulFIinnRuFhK9UcLpKaIiNNNO0FJgnPPIrFb1WCV63annlCjAC2OFJ8hBwhqLbmYlDGjuAEVpuuQEsFrpscQP4PS74PabtVxfA2cBhT3K/AMMawHF44pLGYeAsbceaAVYK3TVP268X4DbB8y1tv5oApgtJNdTiF/Es7XPBd7q2YyaI59mbPck05PIvcAX+aelmQnrZA/mb5hvafj6AFYL3fG2/qgBGAbs8SXQAE7QdfQATgL887ruAUdqOfQI8LXTRI9p+fQE8Kvgv0fYTASbhf5f3ZwJYbweGJa5pdAKTtB29AG8L3RPMV3vkpZNV2n6pALME6fXaflkB1gv5zNL2Ow7izbBbPbLdwDRtx6wA0/Dv2tgKDNJ2PAZwt9Atr2n71QrwupBXm7afc845YByw1yP5J3CKtmOtAKcCBzy57QXGaTs64HmhSx7U9qsXYJGQ33PaclOAIx65bQT+Pz2dO/YO8jZPjkeAKZpyHwndcaOaWM4ANwl5fljP2DWvSAJznHN1BW8i5kRR5H1/WaKmG0A8BdvinNN7/BqLb51zF0dR1J31wlqXWNucFb+Si1xck8xkfgKAsc65H5xzY2sJ2MTscc61RlF0IMtFtTwBi5wVP40W51zmvaWZngDiF+banXPBTy8Loss5d2EURT9qixiGYRiGYRiGYRiGYRiGYRiGYRhGY/Av6agOMZQAGS8AAAAASUVORK5CYII='}],
            picWidth: 0,
            picHeight: 0
        }
        this.index = 0;
    }

    componentDidMount () {
        Image.getSize(this.state.picture, (width, height) => {
            if (width > height) {
                const screenWidth = (Dimensions.get('window').width)
                const scaleFactor = width / screenWidth
                const imageHeight = height / scaleFactor
                this.setState({picWidth: screenWidth, picHeight: imageHeight})
            } else {
                const screenHeight = (Dimensions.get('window').height / 1.7)
                const scaleFactor = height / screenHeight
                const imageWidth = width / scaleFactor
                this.setState({picWidth: imageWidth, picHeight: screenHeight})
            }
        })
        // // AsyncStorage.getItem('userData').then((data) => {
        // //     this.setState({ 'username': JSON.parse(data).userName })
        // // }).done();
        // // = async () => this.setState({ 'username': JSON.parse(await AsyncStorage.getItem('userData')).userName })
        // axios.get(`http://geometrikit-ws.cfapps.io/api/auth?username=username&password=password`)
        // .then((response) => {
        //   if (response.data.status === 'false') {
        //     console.log("false");
        //   } else {
        //     console.log(response.data);
        //   }
        // })
        // .done();
    }

    showHint = (hint) => {
        switch(hint.type) {
            case 'text':
                Alert.alert(hint.content);
                break;
            case 'picture':
                this.setState({picture: hint.picture})
                break;
            case 'voice':
                break;
            default:
                Alert.alert("שגיאה בזימון רמז, אנא נסה שוב");
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={{height: Dimensions.get('window').height / 1.7, justifyContent: 'center', alignItems: 'center'}}>
                    <Image source={{ uri: this.state.picture}} style={{ height: this.state.picHeight, width: this.state.picWidth, borderRadius: 10 }}/>
                </View>
                <ScrollView contentContainerStyle={{alignSelf: 'flex-end', width: Dimensions.get('window').width * 0.8}}>
                    <Text style={{ fontSize: 25, color: 'black', textAlign: 'right', padding: 20}}>
                        {this.state.content}
                    </Text>
                </ScrollView>
                <TouchableOpacity
                    onPress={() => console.log('clicked')}
                    style={{position: 'absolute', left: 15, bottom: 100, shadowColor: '#000', shadowOffset: { width: 0, height: 5 }, shadowOpacity: 0.5, shadowRadius: 5}}
                >
                    <Image source={statements} style={{ height: 60, width: 60}}/>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => this.showHint({type: 'text', content: 'המשולש הנתון שווה שוקיים'})}
                    style={{position: 'absolute', left: 15, bottom: 20, shadowColor: '#000', shadowOffset: { width: 0, height: 5 }, shadowOpacity: 0.5, shadowRadius: 5}}
                >
                    <Image source={hints} style={{ height: 60, width: 60}}/>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    }
});