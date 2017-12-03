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
      loaded: false, // whether android fonts are loaded
      loggedIn: false,
      inDojo: true, // Assume user in dojo until firebase verifies if user is in a dojo; Allows firebase calls to finish loading and then render page
      user: null,
      dojo: '',
      tasks: [],
      bills: [],
      users: [],
      inDojoListener: false,
      dojoInfoListener: false
    };

    firebase.initializeApp(firebaseConfig);

    firebase.auth().onAuthStateChanged(user => {
      if (user === null) {
        this.handleLogOut();
        this.setState({ loaded: true });
      } else {
        this.handleLogIn(user);
      }
    });
  }

  handleLogOut() {
    var ref = firebase.database().ref();

    if (this.state.inDojoListener) {
      ref
        .child('users')
        .child(this.state.user.uid)
        .child('dojo')
        .off();
      this.setState({ inDojoListener: false });
    }

    if (this.state.dojoInfoListener) {
      const refToDojo = ref.child('dojos').child(this.state.dojo);
      refToDojo.child('users').off();
      refToDojo.child('tasks').off();
      // refToDojo.child('bills').off();
      this.setState({ dojoInfoListener: false });
    }

    this.setState({
      loggedIn: false,
      // inDojo: true,
      user: null,
      dojo: '',
      tasks: [],
      bills: [],
      users: []
    });
  }

  handleLogIn(user) {
    this.setState({ loggedIn: true, user: user });
    this.updateUserInfo();
    if (!this.state.inDojoListener) {
      this.addInDojoListener();
      this.setState({ inDojoListener: true });
    }
  }

  addInDojoListener() {
    firebase
      .database()
      .ref('users')
      .child(this.state.user.uid)
      .child('dojo')
      .on('value', snapshot => {
        if (snapshot.exists()) {
          this.setState({
            inDojo: true,
            dojo: snapshot.val()
          },
            () => {
              if (!this.state.dojoInfoListener) {
                this.addDojoInfoListeners();
                this.setState({ dojoInfoListener: true });
              }
            }
          );
        } else {
          // turn off dojo info listeners
          if (this.state.dojoInfoListener) {
            var dojoRef = firebase
              .database()
              .ref('dojos')
              .child(this.state.dojo);

            // turn off dojo info listeners
            dojoRef.child('users').off();
            dojoRef.child('tasks').off();
            dojoRef.child('bills').off();

            this.setState({ dojoInfoListener: false });
          }

          this.setState({
            inDojo: false,
            dojo: ''
          });
        }

        this.setState({ loaded: true });
      });
  }

  addDojoInfoListeners() {
    var dojoRef = firebase
      .database()
      .ref('dojos')
      .child(this.state.dojo);

    dojoRef.child('name').on('value', snapshot => { //TEMP TODO better system
        this.updateDojoName(snapshot);
    });

    dojoRef.child('users').on('value', snapshot => {
      this.updateUsers(snapshot);
    });

    dojoRef.child('tasks').on('value', snapshot => {
      this.updateTasks(snapshot);
    });

    dojoRef.child('bills').on('value', snapshot => {
      this.updateBills(snapshot);
    });
  }

  updateUserInfo() {
    firebase
      .database()
      .ref('users')
      .child(this.state.user.uid)
      .update({
        name: this.state.user.displayName,
        photoURL: this.state.user.photoURL,
        email: this.state.user.email
      });
  }

  updateDojoName(snapshot) {    //TODO Fix state.dojo to be the whole structure containing dojoID and dojoName than state.dojo = {dojoID: "xxxx", dojoName: "xxxx"}
    var taskObjects = [];

    if (snapshot.val()) {
      this.setState({ dojoName: snapshot.val() });
    }
  }

  updateTasks(snapshot) {
    var taskObjects = [];

    if (snapshot.val()) {
      var keys = Object.keys(snapshot.val());

      // stackoverflow.com/q/42610264/
      var promises = keys.map(key => {
        return firebase
          .database()
          .ref('tasks')
          .child(key)
          .once('value');
      });

      Promise.all(promises).then(snapshots => {
        snapshots.forEach(snapshot => {
          var taskObject = snapshot.val();
          taskObject['id'] = snapshot.key;
          taskObjects.push(taskObject);
        });
        this.setState({ tasks: taskObjects.reverse() });
      });
    } else {
      // if the dojo has no tasks
      this.setState({ tasks: [] });
    }
  }

 updateBills(snapshot) {
    var billObjects = [];

    if (snapshot.val()) {
      var keys = Object.keys(snapshot.val());

      // stackoverflow.com/q/42610264/
      var promises = keys.map(key => {
        return firebase
          .database()
          .ref('bills')
          .child(key)
          .once('value');
      });

      Promise.all(promises).then(snapshots => {
        snapshots.forEach(snapshot => {
          var billObject = snapshot.val();
          billObject['id'] = snapshot.key;
          billObjects.push(billObject);
        });
        this.setState({ bills: billObjects.reverse() });
      });
    } else {
      // if the dojo has no bills
      this.setState({ bills: [] });
    }
  }

  updateUsers(snapshot) {
    var userObjects = [];

    if (snapshot.val()) {
      var keys = Object.keys(snapshot.val());

      var promises = keys.map(key => {
        return firebase
          .database()
          .ref('users')
          .child(key)
          .once('value');
      });

      Promise.all(promises).then(snapshots => {
        snapshots.forEach(snapshot => {
          var userObject = snapshot.val();
          userObject['id'] = snapshot.key;
          userObjects.push(userObject);
        });
        this.setState({ users: userObjects });
      });
    }
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

  // fixes font loading error on android
  async componentWillMount() {
    await Expo.Font.loadAsync({
      Roboto: require('native-base/Fonts/Roboto.ttf'),
      Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
      Ionicons: require('@expo/vector-icons/fonts/Ionicons.ttf')
    });
  }
}