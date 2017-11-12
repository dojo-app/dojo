import React, { Component } from 'react';
import { Alert, StyleSheet } from 'react-native';
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
  H1
} from 'native-base';
import { secret } from './secret';
import Expo from 'expo';
import * as firebase from 'firebase';

// TODO for deployment to standalone app, need to do stuff : https://docs.expo.io/versions/latest/sdk/google.html

export class LoginScreen extends React.Component {
  constructor(props) {
    super(props);
  }

  async signInWithGoogleAsync() {
    try {
      const result = await Expo.Google.logInAsync({
        androidClientId: secret.googleAndroidClientID,
        iosClientId: secret.googleiOSClientID,
        scopes: ['profile', 'email']
      });

      if (result.type === 'success') {
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
        return { cancelled: true };
      }
    } catch (e) {
      return { error: true };
    }
  }

  render() {
    return (
      <Container style={styles.container}>
        <H1 style={{ textAlign: 'center' }}>Welcome to Dojo!</H1>
        <Button
          style={styles.button}
          onPress={() => this.signInWithGoogleAsync()}
          full
        >
          <Text>Sign in with Google</Text>
        </Button>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center'
  },

  button: { marginTop: '10%' }
});
