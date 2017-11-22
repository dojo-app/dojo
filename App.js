import React, { Component } from 'react';
import * as firebase from 'firebase';
import { StackNavigator } from 'react-navigation';
import { MainNav } from './MainNav';
import { AddBillScreen } from './AddBillScreen';
import { firebaseConfig } from './firebaseConfig';
import { LoginScreen } from './LoginScreen';
import { DojoNav } from './DojoNav';
import Expo from 'expo';

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      loaded: false, // whether fonts are loaded
      loggedIn: false,
      inDojo: false,
      user: null,
      dojo: '',
      tasks: [],
      bills: [],
      users: []
    };
    firebase.initializeApp(firebaseConfig);

    firebase.auth().onAuthStateChanged(user => {
      if (user === null) {
        this.handleLogOut();
      } else {
        this.handleLogIn(user);
      }
    });
  }
  handleLogOut() {
    this.setState({
      loggedIn: false,
      inDojo: false,
      user: null,
      dojo: '',
      tasks: [],
      bills: [],
      users: []
    });
  }
  async handleLogIn(user) {
    this.setState({ loggedIn: true });
    this.setState({ user: user });
    this.updateUserInfo(user);
    this.watchChangesInUsersDojo(user);
  }

  watchChangesInUsersDojo(user = this.state.user) {
    firebase
      .database()
      .ref('users')
      .child(user.uid)
      .child('dojo')
      .on('value', dataSnapshot => {
        if (dataSnapshot.exists()) {
          this.setState({
            inDojo: true,
            dojo: dataSnapshot.val()
          });
          firebase
            .database()
            .ref('dojos')
            .child(dataSnapshot.val())
            .on('value', snapshot => {
              this.updateTasks(snapshot.child('tasks'));
              this.updateUsers(snapshot.child('users'));
            });
        } else {
          this.setState({
            inDojo: false,
            dojo: ''
          });
        }
      });
  }

  async userInDatabase(user) {
    var snapshot = await firebase
      .database()
      .ref('users')
      .child(user.uid)
      .once('value');
    return snapshot.exists();
  }

  updateUserInfo(user) {
    firebase
      .database()
      .ref('users')
      .child(user.uid)
      .update({ name: user.displayName, photoURL: user.photoURL });
  }

  async inDojo(user) {
    var snapshot = await firebase
      .database()
      .ref('users')
      .child(user.uid)
      .child('dojo')
      .once('value');
    return snapshot.exists();
  }

  async getDojo(user) {
    var snapshot = await firebase
      .database()
      .ref('users')
      .child(user.uid)
      .child('dojo')
      .once('value');
    return snapshot.val();
  }

  async componentWillMount() {
    await Expo.Font.loadAsync({
      Roboto: require('native-base/Fonts/Roboto.ttf'),
      Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
      Ionicons: require('@expo/vector-icons/fonts/Ionicons.ttf')
    });
    this.setState({ loaded: true });
  }
  async updateTasks(snapshot) {
    var taskObjects = [];
    var tasks_ids = Object.keys(snapshot.val());
    var tasks = (await firebase
      .database()
      .ref('tasks')
      .once('value')).val();

    for (const task_id of tasks_ids) {
      if (task_id in tasks) {
        taskObjects.push(tasks[task_id]);
      }
    }

    this.setState({ tasks: taskObjects.reverse() });
  }

  async updateUsers(snapshot) {
    var userObjects = [];
    var user_ids = Object.keys(snapshot.val());

    var users = (await firebase
      .database()
      .ref('users')
      .once('value')).val();

    for (const user_id of user_ids) {
      if (user_id in users) {
        userObjects.push(users[user_id]);
      }
    }

    this.setState({ users: userObjects });
  }

  render() {
    if (!this.state.loaded) {
      return <Expo.AppLoading />;
    } else if (!this.state.loggedIn) {
      return <LoginScreen />;
    } else if (!this.state.inDojo) {
      return <DojoNav screenProps={{ state: this.state }} />;
    } else {
      return <MainNav screenProps={{ state: this.state }} />;
    }
  }
}
