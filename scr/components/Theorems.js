import React, { Component } from 'react';
import { ScrollView, Text, Picker, AsyncStorage, Alert } from 'react-native';
import Icon from '@expo/vector-icons/Ionicons'
import { Card, CardSection } from './common';

export default class CreateGroup extends Component {
    static navigationOptions = ({ navigation }) => {
        return {
          title: 'משפטים',
          headerRight: (
            <Icon
              style={{ paddingRight: 15, color: "#fff" }}
              onPress={() => navigation.goBack()}
              name="ios-arrow-forward"
              size={30}
            />
          ),
          headerLeft: null
        };
      };

    constructor(props) {
        super(props);
        this.state = {
            theorems: [{theoremID: '1', theoremName: "דגדכדגכגדכ dfsfsdf גדכדגכג", content: 'דגכדגכדגכדגכגדכ'},
                        {theoremID: '2', theoremName: "דגכגדכגדכ", content: 'דגכדגכגדכגדכ'},
                        {theoremID: '3', theoremName: "דגכדגכגדכ", content: 'דגכדגכגדכגדכ'}]
        }
    }

    componentDidMount(){
        // axios.get(`http://geometrikit-ws.cfapps.io/api/gettheorems`)
        // .then((response) => {
        //   this.setState({theorems: response.data})
        //   }
        // )
        // .done();
    }

    render() {
      return (
        <ScrollView>
            {this.state.theorems.map((t) => {
                return <Card key={t.theoremID}>
                            <CardSection>
                                <Text style={{fontWeight: 'bold', fontSize: 20}}>
                                    {t.theoremName}
                                </Text>
                            </CardSection>
                            <CardSection>
                                <Text>
                                    {t.content}
                                </Text>
                            </CardSection>
                        </Card>
            })}
        </ScrollView>
      );
   }
}