import React, { Component } from 'react';
import { Container, Content, Text, Button } from 'native-base';
import { StyleSheet } from 'react-native';

import { secret } from './secret';
import Expo from 'expo';
import * as firebase from 'firebase';

export class NotInDojoScreen extends React.Component {
  render() {
    return (
      <Container style={styles.container}>
        <Text style={styles.text}>
          You are not in a Dojo. You can create a Dojo, or join one by scanning
          its QR code.
        </Text>
        <Button
          full
          large
          onPress={() => this.props.navigation.navigate('JoinDojo')}>
          <Text>Join Dojo</Text>
        </Button>
        <Button
          full
          success
          large
          onPress={() => this.props.navigation.navigate('CreateDojo')}>
          <Text>Create Dojo</Text>
        </Button>
        <Button full danger large onPress={() => firebase.auth().signOut()}>
          <Text>Sign Out</Text>
        </Button>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  text: {
    margin: '10%'
  }
});
