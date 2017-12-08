import React, { Component } from 'react';
import { Container, Content, Text, Button, View, Icon } from 'native-base';
import { StyleSheet } from 'react-native';

import { secret } from './secret';
import Expo from 'expo';
import * as firebase from 'firebase';

export class NotInDojoScreen extends React.Component {

  render() {
    return (
      <Container style={styles.container}>
        <Text style={styles.text}>
          Hello! You are not part of a Dojo yet.
          You can either join a Dojo or create one to get started.
        </Text>

        <View>
        <Button iconLeft style={styles.create}
          large
          onPress={() => this.props.navigation.navigate('CreateDojo')}>
          <Icon name='ios-create-outline' />
          <Text>Create Dojo</Text>
        </Button>
        </View>

        <View>
        <Button iconLeft style={styles.join}
          large
          onPress={() => this.props.navigation.navigate('JoinDojo')}>
          <Icon name='ios-people-outline' />
          <Text>Join Dojo</Text>
        </Button>
        </View>

        <View>
        <Button iconLeft style={styles.signOut}
           large onPress={() => firebase.auth().signOut()}>
          <Icon name='ios-log-out' />
          <Text>Sign Out</Text>
        </Button>
        </View>

      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white'
  },
  text: {
    marginTop: '15%',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 20,
    marginLeft: '5%',
    marginRight: '5%'
  },

  create: {
    backgroundColor: '#c02b2b',
    margin: 40
  },

  join: {
    backgroundColor: '#c02b2b',
    margin: 30
  },

  signOut: {
    backgroundColor: '#c02b2b',
    margin: 30
  },

  view: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  }
});
