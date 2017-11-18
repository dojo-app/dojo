import React, { Component } from 'react';
import {
  Container,
  Content,
  Text,
  Button,
  Form,
  Input,
  Label,
  Item
} from 'native-base';
import { StyleSheet } from 'react-native';

import { secret } from './secret';
import Expo from 'expo';
import * as firebase from 'firebase';

export class CreateDojoScreen extends React.Component {
  constructor() {
    super();
    this.state = { dojoName: '' };
  }
  createDojo() {
    var new_dojo = firebase
      .database()
      .ref('dojos')
      .push({
        name: this.state.dojoName,
        users: { [this.props.screenProps.state.user.uid]: true }
      });

    firebase
      .database()
      .ref('users')
      .child(this.props.screenProps.state.user.uid)
      .child('dojo')
      .set(new_dojo.key);
  }

  render() {
    return (
      <Container style={styles.container}>
        <Form>
          <Item fixedLabel>
            <Label>Dojo Name</Label>
            <Input
              value={this.state.dojoName}
              onChangeText={text => this.setState({ dojoName: text })}
            />
          </Item>
        </Form>
        <Button large full success onPress={() => this.createDojo()}>
          <Text>Create Dojo</Text>
        </Button>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center'
  },
  text: {
    margin: '10%'
  }
});
