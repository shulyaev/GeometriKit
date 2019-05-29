import React, { Component } from 'react';
import { ScrollView, ActivityIndicator, Text, View, Image, Alert } from 'react-native';
import Icon from '@expo/vector-icons/Ionicons'
import { Card, CardSection } from './common';
import axios from 'axios';
import { TabHeading, Header, Content, Tab, Tabs } from 'native-base';
import angle2 from '../images/angle2.png'
import square from '../images/square.png'
import triangle from '../images/triangle.png'
import circle from '../images/circle.png'

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
      axios.post('https://geometrikit.azurewebsites.net/api/getTheorems', {
      }).then((response) => {
          this.setState({theorems: response.data, loading: false})
      }).catch(() =>{
        Alert.alert("תקלה בחיבור לשרת, אנא נסה שוב מאוחר יותר");
      })
      .done();
    }

    renderSubjects = (subject) => {
      if (this.state.loading){
        return (
            <View style={{justifyContent: 'center', flex: 1}}>
                <ActivityIndicator size="large" color="#f44444" />
            </View>
        )
    } else {
        this.last = [];
        return (
        <ScrollView>
            {this.state.theorems.map((t) => {
              if (!this.last.includes(t.theoremSubName) && t.theoremName == subject){
                this.last.push(t.theoremSubName)
                return (<Card key={t.theoremID}>
                          <CardSection>
                            <Text style={{fontWeight: 'bold', fontSize: 20, flex: 1}}>
                              {t.theoremSubName}
                            </Text>
                          </CardSection>
                          {this.state.theorems.map((c) => {
                            if (this.last[this.last.length -1] === c.theoremSubName && c.theoremName == subject){
                              return (
                                <CardSection key={c.theoremID}>
                                  <View style={{flex: 19}}>
                                    <Text style={{fontSize: 14, flex: 1}}>
                                      {c.content}
                                    </Text>
                                  </View>
                                  <View style={{flex: 1}}>
                                    <Text style={{textAlign: 'right'}}>●</Text>
                                  </View>
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

    renderContent = () => {
      return (
        <Tabs>
          <Tab heading={<TabHeading style={{backgroundColor: '#f44444'}}><Image source={angle2} style={{ height: 30, width: 30,}}></Image></TabHeading>}>
            {this.renderSubjects("angle")}
          </Tab>
          <Tab heading={<TabHeading style={{backgroundColor: '#f44444'}}><Image source={square} style={{ height: 25, width: 25}}></Image></TabHeading>}>
          {this.renderSubjects("square")}
          </Tab>
          <Tab heading={<TabHeading style={{backgroundColor: '#f44444'}}><Image source={circle} style={{ height: 25, width: 25}}></Image></TabHeading>}>
            {this.renderSubjects("circle")}
          </Tab>
          <Tab heading={<TabHeading style={{backgroundColor: '#f44444'}}><Image source={triangle} style={{ height: 25, width: 25}}></Image></TabHeading>}>
            {this.renderSubjects("triangle")}
          </Tab>
        </Tabs>
        )}


    render() {
      return (
        <View style={{flex: 1}}>
          {this.renderContent()}
        </View>
      );
   }
}