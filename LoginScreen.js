import React, { Component } from 'react';
import {
  Alert,
  StyleSheet,
  Image,
  TouchableWithoutFeedback
} from 'react-native';
import {
  Container,
  Header,
  Content,
  Footer,
  FooterTab,
  Icon,
  Text,
  Left,
  Body,
  Title,
  Right,
  List,
  ListItem,
  Switch,
  Button,
  H1,
  Spinner
} from 'native-base';
import { secret } from './secret';
import Expo from 'expo';
import * as firebase from 'firebase';

// TODO for deployment to standalone app, need to do stuff : https://docs.expo.io/versions/latest/sdk/google.html

export class LoginScreen extends React.Component {
  constructor(props) {
    super(props);
    this.normalButton = require('./btn_google_signin_dark_normal_web.png');
    this.pressedButton = require('./btn_google_signin_dark_pressed_web.png');

    this.state = {
      signingIn: false,
      button: this.normalButton
    };
  }

  async signInWithGoogleAsync() {
    try {
      const result = await Expo.Google.logInAsync({
        androidClientId: secret.googleAndroidClientID,
        iosClientId: secret.googleiOSClientID,
        scopes: ['profile', 'email']
      });

      if (result.type === 'success') {
        this.setState({ signingIn: true });

        console.log(result);
        // https://firebase.google.com/docs/reference/js/firebase.auth.GoogleAuthProvider#.credential
        var credential = firebase.auth.GoogleAuthProvider.credential(
          result.idToken
        );

        firebase
          .auth()
          .signInWithCredential(credential)
          .catch(error => console.error(error));

        return result.accessToken;
      } else {
        this.setState({ signingIn: false });

        return { cancelled: true };
      }
    } catch (e) {
      return { error: true };
    }
  }

  render() {
    if (this.state.signingIn) {
      return (
        <Container style={styles.container}>
          <H1 style={styles.center}>Logging In...</H1>
          <Spinner color="black" />
        </Container>
      );
    }
    return (
      <Container style={styles.container}>
        <H1 style={styles.center}>Welcome to Dojo!</H1>
        <TouchableWithoutFeedback
          onPress={() => this.signInWithGoogleAsync()}
          onPressIn={() => this.setState({ button: this.pressedButton })}
          onPressOut={() => this.setState({ button: this.normalButton })}
        >
          <Image style={styles.button} source={this.state.button} />
        </TouchableWithoutFeedback>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    flex: 1,
    alignItems: 'center'
  },

  center: {
    textAlign: 'center'
  },

  button: { marginTop: '10%' }
});
