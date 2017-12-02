import React, { Component } from 'react';
import {
  Container,
  Grid,
  Col,
  Row,
  Header,
  Content,
  Footer,
  FooterTab,
  Icon,
  Left,
  Body,
  Title,
  Right,
  Text,
  H1,
  List,
  ListItem,
  Switch,
  Thumbnail,
  Button
} from 'native-base';

// Assets
const normalButton = require('./public/images/add_button.png');
const dojoImage = require('./public/images/logo.png');
const dojoEdit = require('./public/images/edit.png');

import { StyleSheet, View, TouchableHighlight } from 'react-native';
//import * as theme from './styles/theme';

import * as firebase from 'firebase';

function formatFirstName(name) {
    let words = name.split(' ');

    return words[0];
}

export class DojoScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'Dojo',
    tabBarIcon: ({ tintColor, focused }) => (
      <Icon
        name={focused ? 'ios-home' : 'ios-home-outline'}
        style={{ color: tintColor }}
      />
    )
  });

  render() {
    const users = this.props.screenProps.state.users.map(user => (
      <ListItem key={user.id}>
        <Text>{user.name}</Text>
      </ListItem>
    ));

    const members = this.props.screenProps.state.users.map(user => (
        <View style={styles.member} key={user.id}>
          <Thumbnail large source={{ uri: user.photoURL }}></Thumbnail>
          <Text>{formatFirstName(user.name)}</Text>
        </View>
    ));

    const { navigate } = this.props.navigation;

    return (

        <Container style={styles.container}>
            <Content>
                <View style={styles.dojoContainer}>
                    <View style={styles.dojoHead}>
                        <Thumbnail style={styles.dojoImage} source={ dojoImage }></Thumbnail>
                        <Text>{this.props.screenProps.state.dojoName}</Text>
                    </View>
                    <View>
                        <H1 style={styles.membersTitle}>Members</H1>
                        <View style={styles.membersContainer}>
                            {members}

                                <View style={styles.member}>
                                  <TouchableHighlight onPress={() => navigate('DojoQRCode')}>
                                    <Thumbnail large source={ normalButton }></Thumbnail>
                                  </TouchableHighlight>
                                  <Text>Add member</Text>
                                </View>

                        </View>
                    </View>
                    <Button full danger large onPress={() => this.leaveDojo()}>
                      <Text>Leave Dojo</Text>
                    </Button>
                </View>
            </Content>
        </Container>
    );
  }

  leaveDojo() {
    firebase
      .database()
      .ref('dojos')
      .child(this.props.screenProps.state.dojo)
      .child('users')
      .child(this.props.screenProps.state.user.uid)
      .remove();
    firebase
      .database()
      .ref('users')
      .child(this.props.screenProps.state.user.uid)
      .child('dojo')
      .remove();
  }
}

const styles = StyleSheet.create({

  container: {
    backgroundColor: 'white'
  },

  qr: {
    marginTop: '5%',
    marginBottom: '5%',
    alignItems: 'center',
    justifyContent: 'center'
  },

  membersTitle: {
      marginLeft: 10
  },

  member: {
      margin: 20,
      justifyContent: 'center',
      alignItems: 'center'
  },

  membersContainer: {
      flex: 1,
      flexDirection: 'row',
      flexWrap: "wrap",
      justifyContent: "space-around"
  },

  dojoContainer: {
      flex: 1,
      flexDirection: 'column',
  },

  dojoHead: {
      margin: 20,
      justifyContent: 'center',
      alignItems: 'center'
  },

  dojoImage: {
      width: 150,
      height: 150
  }
});
