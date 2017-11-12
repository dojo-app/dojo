import React, { Component } from 'react';
import * as firebase from 'firebase';
import { StackNavigator } from 'react-navigation';
import { MainNav } from './MainNav';
import { AddBillScreen } from './AddBillScreen';
import { firebaseConfig } from './firebaseConfig';
import { LoginScreen } from './LoginScreen';

firebase.initializeApp(firebaseConfig);

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      loaded: false, // whether fonts are loaded
      loggedIn: false,
      auth: false // whether the onAuthStateChanged listener has been set, prevents a flash of login screen if the user is already logged in
    };

    firebase.auth().onAuthStateChanged(user => {
      this.setState({ auth: true });

      if (user != null) {
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
    } else {
      return <MainNav />;
    }
  }
}
