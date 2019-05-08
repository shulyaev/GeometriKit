import React, { Component } from 'react';
import { ScrollView, ActivityIndicator, Text, View, AsyncStorage, Alert } from 'react-native';
import Icon from '@expo/vector-icons/Ionicons'
import { Card, CardSection } from './common';
import axios from 'axios';

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
            theorems: [],
            loading: true
        }
        this.last = []
    }

    componentDidMount(){
      axios.post('http://geometrikit-ws.cfapps.io/api/getTheorems', {
      }).then((response) => {
          this.setState({theorems: response.data, loading: false})
      })
      .done();
    }

    renderContent = () => {
      if (this.state.loading){
          return (
              <View style={{justifyContent: 'center', flex: 1}}>
                  <ActivityIndicator size="large" color="#f44444" />
              </View>
          )
      } else {
          return (
            <ScrollView>
              {this.state.theorems.map((t) => {
                if (!this.last.includes(t.theoremName)){
                  this.last.push(t.theoremName)
                  return (<Card key={t.theoremID}>
                            <CardSection>
                              <Text style={{fontWeight: 'bold', fontSize: 20, flex: 1}}>
                                {t.theoremName}
                              </Text>
                            </CardSection>
                            {this.state.theorems.map((c) => {
                              if (this.last[this.last.length -1] === c.theoremName){
                                return (
                                  <CardSection key={c.theoremID}>
                                    <Text style={{fontSize: 14, flex: 1}}>
                                      {c.content}
                                    </Text>
                                  </CardSection>
                                )
                              }
                            })}
                          </Card>)
                }             
              })}
            </ScrollView>
          )
      }
    }

    render() {
      return (
        <View style={{flex: 1}}>
          {this.renderContent()}
        </View>
      );
   }
}