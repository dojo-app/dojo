import React, { Component } from 'react';
import { Container, Content, Text, Button } from 'native-base';
import { StyleSheet } from 'react-native';

import { secret } from './secret';
import Expo from 'expo';
import * as firebase from 'firebase';

export class NotInDojoScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'Not In Dojo',
    /*
    headerRight: (
      <Button transparent onPress={() => navigation.navigate('AddTask')}>
        <Text>Add Task</Text>
      </Button>
    ),
    headerLeft: (
      <Button transparent onPress={() => navigation.navigate('EditTask')}>
        <Text>Edit Task</Text>
      </Button>
    ),
    */
    tabBarIcon: ({ tintColor, focused }) => (
      <Icon
        name={focused ? 'ios-list-box' : 'ios-list-box-outline'}
        style={{ color: tintColor }}
      />
    )
  });
  createDojo() {
    var new_dojo = firebase
      .database()
      .ref('dojos')
      .push({
        name: 'Awesome Dojo',
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
        <Button
          full
          large
          onPress={() => this.props.navigation.navigate('JoinDojo')}>
          <Text>Join Dojo</Text>
        </Button>
        <Button full success large onPress={() => this.createDojo()}>
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
  }
});
