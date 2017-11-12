import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import {
  Container,
  Header,
  Content,
  Footer,
  FooterTab,
  Button,
  Icon,
  Text,
  Left,
  Body,
  Title,
  Right,
  List,
  ListItem,
  Switch
} from 'native-base';
import * as firebase from 'firebase';

export class ProfileScreen extends React.Component {
  constructor(props) {
    super(props);
    const user = firebase.auth().currentUser;
    this.state = {
      displayName: user.displayName,
      email: user.email
    };
  }

  static navigationOptions = ({ navigation }) => ({
    title: 'Profile',

    tabBarIcon: ({ tintColor, focused }) => (
      <Icon
        name={focused ? 'ios-person' : 'ios-person-outline'}
        style={{ color: tintColor }}
      />
    )
  });

  render() {
    return (
      <Container style={styles.container}>
        <Content scrollEnabled={false}>
          <List>
            <ListItem itemDivider>
              <Text>Name</Text>
            </ListItem>

            <ListItem>
              <Text>{this.state.displayName}</Text>
            </ListItem>
            <ListItem itemDivider>
              <Text>Email</Text>
            </ListItem>

            <ListItem>
              <Text>{this.state.email}</Text>
            </ListItem>
          </List>

          <Button full danger onPress={() => firebase.auth().signOut()}>
            <Text>Log Out</Text>
          </Button>
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  }
});
