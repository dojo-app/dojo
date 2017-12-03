import React, { Component } from 'react';
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
  Button
} from 'native-base';
import { StyleSheet } from 'react-native';

import * as firebase from 'firebase';
import QRCode from 'react-native-qrcode';

export class DojoScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'Dojo',
    headerTintColor: '#c02b2b',

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

    return (
      <Container style={styles.container}>
        <Content>
          <Text>dojo id: {this.props.screenProps.state.dojo}</Text>
          <Body style={styles.qr}>
            <QRCode
              value={this.props.screenProps.state.dojo}
              size={240}
              bgColor="black"
              fgColor="white"
            />
          </Body>
          <List>
            <ListItem itemDivider>
              <Text>Users:</Text>
            </ListItem>
            {users}
          </List>
          <Button style={styles.leaveButton} full large onPress={() => this.leaveDojo()}>
            <Text>Leave Dojo</Text>
          </Button>
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
    flex: 1,
    backgroundColor: 'white'
  },
  qr: {
    marginTop: '5%',
    marginBottom: '5%',
    alignItems: 'center',
    justifyContent: 'center'
  },

  leaveButton: {
    backgroundColor: '#c02b2b'
  }
});
