import React, { Component } from 'react';
import { StyleSheet, Image } from 'react-native';
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
  Thumbnail,
  H3,
  Row
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
      <Profile user={ this.props.screenProps.state.user } />
    );
  }
}

const Profile = ({user}) => (
  <Container style={ styles.container }>
    <Button iconLeft transparent dark style={{ alignSelf: 'flex-end' }}>
      <Icon name='ios-create-outline' />
    </Button>

    <Image style={ styles.profilePicture }
      source={{ uri:user.photoURL }} />
    <Text style={ styles.displayName }>{ user.displayName }</Text>

    <Content scrollEnabled={ false } style={ styles.content }>
      <H3 style={ styles.fieldName }>Email</H3>
      <Text>{ user.email }</Text>

      <H3 style={ styles.fieldName }>Phone Number</H3>
      <Text>1-234-5678</Text>
    </Content>

    <Row style={{ backgroundColor: 'black', flexGrow: 1 }}>
      <Button iconLeft danger style={ styles.button }>
        <Icon name='ios-trash' />
        <Text>Delete Account</Text>
      </Button>
      <Button iconLeft style={ styles.button }
        onPress={() => firebase.auth().signOut()}>
        <Icon name='ios-log-out' />
        <Text>Log Out</Text>
      </Button>
    </Row>
  </Container>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: 'green',
    alignItems: 'center',
    justifyContent: 'center'
  },
  profilePicture: {
    height: 150,
    width: 150,
    borderRadius: 75,
    marginBottom: 10
  },
  displayName: {
    fontSize: 20,
    fontWeight: 'bold'
  },
  fieldName: {
    fontWeight: 'bold',
    marginBottom: 5
  },
  content: {
    flex: 1,
    margin: 25,
    backgroundColor: 'white',
    alignSelf: 'flex-start',
    borderStyle: 'solid',
    borderTopWidth: 2,
    borderBottomWidth: 2
  },
  button: {
    margin: 10
  }
});
