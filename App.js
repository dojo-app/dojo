import React, { Component } from 'react';
import * as firebase from 'firebase';
import { StackNavigator } from 'react-navigation';
import { MainNav } from './MainNav';
import { AddBillScreen } from './AddBillScreen';
import { firebaseConfig } from './firebaseConfig';
import { LoginScreen } from './LoginScreen';
import { NotInDojo } from './NotInDojo';
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
      this.handleAuthStateChange(user);
    });
  }

  async handleAuthStateChange(user) {
    this.setState({ auth: true });

    if (user === null) {
      this.setState({ loggedIn: false });
    } else {
      // user logged in
      this.setState({ loggedIn: true });
      this.setState({ user: user });
      this.updateUserInfo(user);
      var inDojo = await this.inDojo(user);
      if (inDojo) {
        this.setState({ inDojo: true });
        this.setState({ dojo: await this.getDojo(user) });
        firebase
          .database()
          .ref('dojos')
          .child(this.state.dojo)
          .on('value', snapshot => {
            this.updateTasks(snapshot.child('tasks'));
            this.updateUsers(snapshot.child('users'));
          });
      } else {
        // watch for inDojo changes
        firebase
          .database()
          .ref('users')
          .child(user.uid)
          .on('value', dataSnapshot => {
            if (dataSnapshot.child('dojo').exists()) {
              this.setState({
                inDojo: true,
                dojo: dataSnapshot.child('dojo').val()
              });
            }
          });
      }
    }
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
    // console.log(snapshot.val());
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

    // console.log('printing task ids from all tasks');
    for (const task_id of Object.keys(tasks)) {
      // console.log('task_id = ' + task_id);
    }

    // console.log('printing task ids from this dojos tasks');
    for (const task_id of tasks_ids) {
      // console.log('task_id = ' + task_id);
      if (task_id in tasks) {
        taskObjects.push(tasks[task_id]);
      }
    }
    // console.log('printing task objects');
    // console.log(taskObjects);

    this.setState({ tasks: taskObjects.reverse() });
    for (const task of this.state.tasks) {
      console.log(task);
    }
  }

  async updateUsers(snapshot) {
    var userObjects = [];
    var user_ids = Object.keys(snapshot.val());

    var users = (await firebase
      .database()
      .ref('users')
      .once('value')).val();
    for (const user_id of Object.keys(users)) {
      // console.log('task_id = ' + task_id);
    }
    for (const user_id of user_ids) {
      if (user_id in users) {
        userObjects.push(users[user_id]);
      }
    }
    console.log('printing user objects');
    console.log(userObjects);

    this.setState({ users: userObjects });
  }

  render() {
    if (!this.state.loaded) {
      return <Expo.AppLoading />;
    } else if (!this.state.loggedIn) {
      return <LoginScreen />;
    } else if (!this.state.inDojo) {
      return <NotInDojo state={this.state} />;
    } else {
      return <MainNav screenProps={{ state: this.state }} />;
    }
  }
}
