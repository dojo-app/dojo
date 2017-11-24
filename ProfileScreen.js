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
  Switch,
  Thumbnail
} from 'native-base';
import * as firebase from 'firebase';

export class ProfileScreen extends React.Component {
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
          <Thumbnail
            large
            source={{ uri: this.props.screenProps.state.user.photoURL }}
          />

          <Text>{this.props.screenProps.state.user.displayName}</Text>

          <Button full danger large onPress={() => firebase.auth().signOut()}>
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
