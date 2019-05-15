import React, {Component} from 'react';
import {StyleSheet, I18nManager, Text, TouchableOpacity, AsyncStorage, Image } from 'react-native';
import { createSwitchNavigator, createAppContainer, createDrawerNavigator, createBottomTabNavigator, createStackNavigator} from 'react-navigation';
import Login from './scr/components/auth/login/Login';
import SignUpPermissionSelection from './scr/components/auth/signup/SignUpPermissionSelection';
import SignUpTeacherVerification from './scr/components/auth/signup/SignUpTeacherVerification';
import SignUpStudentForm from './scr/components/auth/signup/SignUpStudentForm';
import SignUpTeacherForm from './scr/components/auth/signup/SignUpTeacherForm';
import TopicList from './scr/components/TopicList';
import HamburgerMenu from './scr/components/HamburgerMenu';
import QuestionList from './scr/components/QuestionList';
import QuestionForm from './scr/components/QuestionForm';
import AddQuestion1Form from './scr/components/AddQuestion1Form';
import AddQuestion2Form from './scr/components/AddQuestion2Form';
import AddQuestion3Form from './scr/components/AddQuestion3Form';
import AssignQuestionToClass from './scr/components/AssignQuestionToClass';
import TeacherHome from './scr/components/TeacherHome';
import CreateGroup from './scr/components/CreateGroup';
import Theorems from './scr/components/Theorems';
import AssignToGroup from './scr/components/AssignToGroup';
import TeacherQuestionListView from './scr/components/TeacherQuestionListView';
import TeacherQuestionView from './scr/components/TeacherQuestionView';
import AddHint from './scr/components/AddHint';

const studentStackNavigator = createStackNavigator({
  TopicList: { screen: TopicList},
  QuestionList: { screen: QuestionList},
  QuestionForm: { screen: QuestionForm},
  HamburgerMenu: { screen: HamburgerMenu},
  Theorems: { screen: Theorems},
  AssignToGroup: { screen: AssignToGroup},
},
{
  initialRouteName: 'TopicList',
  defaultNavigationOptions: {
    headerStyle: {
      backgroundColor: '#f44444',
      elevation: 0,
      shadowOpacity: 0,
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontSize: 25,
      textAlign: 'center',
      flex: 1
    },
  }
})

const teacherStackNavigator = createStackNavigator({
  TeacherHome: {screen: TeacherHome},
  AddQuestion1Form: {screen: AddQuestion1Form},
  AddQuestion2Form: {screen: AddQuestion2Form},
  AddQuestion3Form: {screen: AddQuestion3Form},
  AssignQuestionToClass: {screen: AssignQuestionToClass},
  CreateGroup: {screen: CreateGroup},
  TeacherQuestionListView: {screen: TeacherQuestionListView},
  TeacherQuestionView: {screen: TeacherQuestionView},
  AddHint: {screen: AddHint},
},
{
  initialRouteName: 'TeacherHome',
  defaultNavigationOptions: {
    headerStyle: {
      backgroundColor: 'grey',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontSize: 25,
      textAlign: 'center',
      flex: 1
    },
  }
})

const authStachNavigator = createStackNavigator({
  Login: { screen: Login},
  SignUp: { screen: SignUpPermissionSelection},
  SignUpTeacherVerification: { screen: SignUpTeacherVerification},
  SignUpStudentForm: { screen: SignUpStudentForm},
  SignUpTeacherForm: { screen: SignUpTeacherForm}
},
{
  initialRouteName: 'Login',
  defaultNavigationOptions: {
    headerStyle: {
      backgroundColor: '#f44444',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontSize: 30
    },
  }
})

const AppSwitchNavigator = createSwitchNavigator({
  Auth: { screen: authStachNavigator },
  StudentMenu: { screen: studentStackNavigator },
  TeacherMenu: { screen: teacherStackNavigator }
})

export default class App extends Component {
  constructor(props){
    super(props);
    I18nManager.allowRTL(false);
    I18nManager.forceRTL(false);
  }
  render() {
    return (
      <Application />
    );
  }
}

const Application = createAppContainer(AppSwitchNavigator);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  }
});