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
      isReady: false,
      loggedIn: false
    };

    firebase.auth().onAuthStateChanged(user => {
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
    this.setState({ isReady: true });
  }

  render() {
    if (!this.state.isReady) {
      return <Expo.AppLoading />;
    } else if (!this.state.loggedIn) {
      return <LoginScreen />;
    } else {
      return <MainNav />;
    }
  }
}
