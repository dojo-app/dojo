import React, { Component } from 'react';
import { Container, Content, Text, Button } from 'native-base';
import { StyleSheet } from 'react-native';

import { secret } from './secret';
import Expo from 'expo';
import * as firebase from 'firebase';

export class NotInDojo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: props.user
    };
  }
  createDojo() {
    var new_dojo = firebase
      .database()
      .ref('dojos')
      .push({
        user: this.state.user.uid
      });

    firebase
      .database()
      .ref('users')
      .child(this.state.user.uid)
      .child('dojo')
      .set(new_dojo.key);
  }
  render() {
    return (
      <Container style={styles.container}>
        <Button full large>
          <Text>Join Dojo</Text>
        </Button>
        <Button full success large onPress={() => this.createDojo()}>
          <Text>Create Dojo</Text>
        </Button>
        <Button full danger large>
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
  }
});
