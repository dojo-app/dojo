import React, { Component } from 'react';
import * as firebase from 'firebase';
import { StackNavigator } from 'react-navigation';
import { MainNav } from './MainNav';
import { AddBillScreen } from './AddBillScreen';
import { firebaseConfig } from './firebaseConfig';
import { LoginScreen } from './LoginScreen';
import { NotInDojo } from './NotInDojo';

firebase.initializeApp(firebaseConfig);

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      loaded: false, // whether fonts are loaded
      loggedIn: false,
      auth: false, // whether the onAuthStateChanged listener has been set, prevents a flash of login screen if the user is already logged in
      inDojo: false,
      user: null
    };

    firebase.auth().onAuthStateChanged(user => {
      this.setState({ user: user });
      this.setState({ auth: true });

      if (user != null) {
        // user logged in
        var ref = firebase.database().ref('users');

        ref.on('value', snapshot => {
          var userExists = snapshot.hasChild(this.state.user.uid);

          if (!userExists) {
            ref.update({
              [this.state.user.uid]: {
                name: user['displayName'],
                dojo: ''
              }
            });
          } else {
            var dojo = snapshot
              .child(this.state.user.uid)
              .child('dojo')
              .val();
            if (dojo !== '') {
              this.setState({ inDojo: true });
            }
          }
        });

        this.setState({ loggedIn: true });
      } else {
        this.setState({ loggedIn: false });
      }
    });
  }

  async componentWillMount() {
    await Expo.Font.loadAsync({
      Roboto: require('native-base/Fonts/Roboto.ttf'),
      Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
      Ionicons: require('@expo/vector-icons/fonts/Ionicons.ttf')
    });
    this.setState({ loaded: true });
  }

  render() {
    if (!(this.state.loaded && this.state.auth)) {
      return <Expo.AppLoading />;
    } else if (!this.state.loggedIn) {
      return <LoginScreen />;
    } else if (!this.state.inDojo) {
      return <NotInDojo user={this.state.user} />;
    } else {
      return <MainNav />;
    }
  }
}
