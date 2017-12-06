import React, { Component } from 'react';
import { StyleSheet, Image, Keyboard, TouchableWithoutFeedback, View } from 'react-native';
import {
  Container,
  Header,
  Content,
  Footer,
  Button,
  Icon,
  Text,
  Item,
  Input,
  Label
} from 'native-base';
import * as firebase from 'firebase';

export const ViewProfile = ({user, editMode}) => (
  <Container style={ styles.container }>
    <Button iconLeft transparent dark style={{ alignSelf: 'flex-end' }}
      onPress={ editMode }>
      <Icon name='ios-create-outline' />
    </Button>

    <Image style={ styles.profilePicture }
      source={{ uri:user.photoURL }} />
    <Text style={ styles.displayName }>{ user.name }</Text>

    <Content style={ styles.content }>
      <Item>
        <Icon active name='ios-mail' />
        <Input disabled value={ user.email } />
      </Item>
      <Item>
        <Icon active name='ios-call' />
        <Input disabled value={ user.phoneNumber } />
      </Item>
      <Item>
        <Icon active name='ios-calendar' />
        <Input disabled value={ user.birthDate } />
      </Item>
      <Item style={{ paddingTop: 10, paddingBottom: 10 }}>
        <Icon active name='ios-information-circle' />
        <Text>{ user.aboutMe }</Text>
      </Item>
    </Content>

    <Button iconLeft block style={ styles.logoutButton }
      onPress={() => firebase.auth().signOut()}>
      <Icon name='ios-log-out' />
      <Text>Log Out</Text>
    </Button>
  </Container>
);


export const ViewMember = ({user}) => (
  <Container style={ styles.container }>
    <Image style={ styles.profilePicture }
      source={{ uri:user.photoURL }} />
    <Text style={ styles.displayName }>{ user.name }</Text>

    <Content style={ styles.content } scrollEnabled={false}>
      <Item>
        <Icon active name='ios-mail' />
        <Input disabled value={ user.email } />
      </Item>
      <Item>
        <Icon active name='ios-call' />
        <Input disabled value={ user.phoneNumber } />
      </Item>
      <Item>
        <Icon active name='ios-calendar' />
        <Input disabled value={ user.birthDate } />
      </Item>
      <Item style={{ paddingTop: 10, paddingBottom: 10 }}>
        <Icon active name='ios-information-circle' />
        <Text>{ user.aboutMe }</Text>
      </Item>
    </Content>
  </Container>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: 'white',
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
    padding: 10,
    backgroundColor: 'white',
    alignSelf: 'stretch',
    borderStyle: 'solid',
    borderTopWidth: 2,
    borderBottomWidth: 2,
    borderColor: '#c02b2b'
  },
  button: {
    margin: 10
  },
  logoutButton: {
    backgroundColor: '#c02b2b'
  },
  footer: {
    backgroundColor: 'white',
    borderTopWidth: 0
  }
});
