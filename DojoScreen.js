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
    tabBarIcon: ({ tintColor, focused }) => (
      <Icon
        name={focused ? 'ios-home' : 'ios-home-outline'}
        style={{ color: tintColor }}
      />
    )
  });

  render() {
    var listItems = [];
    for (const user of this.props.screenProps.state.users) {
      listItems.push(
        <ListItem>
          <Text>{user.name}</Text>
        </ListItem>
      );
    }
    return (
      <Container style={styles.container}>
        <Content>
          <Text>dojo id: {this.props.screenProps.state.dojo}</Text>
          <QRCode
            value={this.props.screenProps.state.dojo}
            size={200}
            bgColor="black"
            fgColor="white"
          />

          <List>
            <ListItem itemDivider>
              <Text>Users:</Text>
            </ListItem>
            {listItems}
          </List>
          <Button full danger large onPress={() => this.leaveDojo()}>
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
  }
});
