import React, {Component} from 'react';
import {StyleSheet, View, Text, TouchableOpacity, AsyncStorage, Image } from 'react-native';
import { createSwitchNavigator, createAppContainer, createDrawerNavigator, createBottomTabNavigator, createStackNavigator} from 'react-navigation';
import Icon from '@expo/vector-icons/Ionicons';
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

const studentStackNavigator = createStackNavigator({
  TopicList: { screen: TopicList},
  QuestionList: { screen: QuestionList},
  QuestionForm: { screen: QuestionForm},
  HamburgerMenu: { screen: HamburgerMenu}
},
{
  initialRouteName: 'TopicList',
  defaultNavigationOptions: {
    headerStyle: {
      backgroundColor: '#f44444',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontSize: 25
    },
  }
})

const teacherStackNavigator = createStackNavigator({
  TeacherHome: {screen: TeacherHome},
  AddQuestion1Form: {screen: AddQuestion1Form},
  AddQuestion2Form: {screen: AddQuestion2Form},
  AddQuestion3Form: {screen: AddQuestion3Form},
  AssignQuestionToClass: {screen: AssignQuestionToClass}
},
{
  initialRouteName: 'TeacherHome',
  defaultNavigationOptions: {
    headerStyle: {
      backgroundColor: '#f44444',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontSize: 25
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

// export default class App extends Component {
//   render() {
//     return (
//       <AppContainer />
//     );
//   }
// }

// class WelcomeScreen extends Component {
//   render() {
//     return (
//       <View style={styles.container}>
//         <Button title="Login" onPress={() => this.props.navigation.navigate('Dashboard')} />
//         <Button title="Sign Up" onPress={() => alert('button pressed')} />
//       </View>
//     );
//   }
// }

// class DashboardScreen extends Component {
//   render() {
//     return (
//       <View style={styles.container}>
//         <Text>DashboardScreen</Text>
//       </View>
//     );
//   }
// }

// class Feed extends Component {
//   render() {
//     return (
//       <View style={styles.container}>
//         <Text>Feed</Text>
//       </View>
//     );
//   }
// }

// class Profile extends Component {
//   render() {
//     return (
//       <View style={styles.container}>
//         <Text>Profile</Text>
//       </View>
//     );
//   }
// }

// class Settings extends Component {
//   render() {
//     return (
//       <View style={styles.container}>
//         <Text>Setting</Text>
//       </View>
//     );
//   }
// }

// const DashboardTabNavigator = createBottomTabNavigator({
//   Feed,
//   Profile,
//   Settings
// },{
//   navigationOptions: ({navigation}) => {
//     const { routeName } = navigation.state.routes
//     [navigation.state.index];
//     return {
//       headerTitle: routeName
//     };
//   }
// })

// const DashboardStackNavigator = createStackNavigator({
//   DashboardTabNavigator: DashboardTabNavigator
// },{
//   defaultNavigationOptions: ({navigation}) => {
//     return {
//       headerLeft: <Text onPress={()=>navigation.openDrawer()}>===</Text>
//     };
//   }
// })

// const AppDrawerNavigator = createDrawerNavigator({
//   Dashboard: { screen: DashboardStackNavigator }
// })

// const AppSwitchNavigator = createSwitchNavigator({
//   Welcome: { screen: WelcomeScreen },
//   Dashboard: { screen: AppDrawerNavigator }
// });

// const AppContainer = createAppContainer(AppSwitchNavigator);
