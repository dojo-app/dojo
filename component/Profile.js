import React, { Component } from 'react';
import { StyleSheet, Image, Keyboard, TextInput, View } from 'react-native';
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
import { FontAwesome, Ionicons } from '@expo/vector-icons';

export const ViewProfile = ({user, editMode}) => {
  if (user.aboutMe)
    desc = (<Text>{user.aboutMe}</Text>);
  else
    desc = (<Text style={{ color: '#d3d3d3' }}>Describe yourself!</Text>);

  return (
    <Container style={ styles.container }>
      <Button iconLeft transparent dark style={{ alignSelf: 'flex-end' }}
        onPress={ editMode }>
        <FontAwesome name="gear" size={28} color="black" />
      </Button>

      <Image style={ styles.profilePicture }
        source={{ uri:user.photoURL }} />
      <Text style={ styles.displayName }>{ user.name }</Text>

      <Content style={ styles.content } scrollEnabled={false}>
        <Item>
          <Icon active name='ios-mail' />
          <Input disabled value={ user.email }
            placeholder="E-Mail" placeholderTextColor='#d3d3d3' />
        </Item>
        <Item>
          <Icon active name='ios-call' />
          <Input disabled value={ user.phoneNumber }
            placeholder="123-456-7890" placeholderTextColor='#d3d3d3' />
        </Item>
        <Item>
          <FontAwesome name="birthday-cake" size={16}  color="black"
            style={{ marginRight: 8 }} />
          <Input disabled value={ user.birthDate }
            placeholder="Birthday" placeholderTextColor='#d3d3d3' />
        </Item>
        <Item style={{ paddingTop: 10, paddingBottom: 10 }}>
          <Icon active name='ios-information-circle'
            style={{ marginRight: 3 }} />
          {desc}
        </Item>
      </Content>

      <Button iconLeft block style={ styles.logoutButton }
        onPress={() => firebase.auth().signOut()}>
        <Icon name='ios-log-out' />
        <Text>Log Out</Text>
      </Button>
    </Container>
  );
}


export const ViewMember = ({user}) => {
  if (user.aboutMe)
    desc = (<Text>{user.aboutMe}</Text>);
  else
    desc = (<Text style={{ color: '#d3d3d3' }}>Describe yourself!</Text>);

  return (
    <Container style={styles.memberContainer }>
      <Image style={styles.profilePicture}
        source={{ uri:user.photoURL }} />
      <Text style={styles.displayName}>{ user.name }</Text>

      <Content style={styles.content} scrollEnabled={false}>
        <Item>
          <Icon active name='ios-mail' />
          <Input disabled value={user.email}
            placeholder="E-Mail" placeholderTextColor='#d3d3d3' />
        </Item>
        <Item>
          <Icon active name='ios-call' />
          <Input disabled value={user.phoneNumber}
            placeholder="123-456-7890" placeholderTextColor='#d3d3d3' />
        </Item>
        <Item>
          <FontAwesome name="birthday-cake" size={16}  color="black"
            style={{ marginRight: 8 }} />
          <Input disabled value={user.birthDate}
            placeholder="Birthday" placeholderTextColor='#d3d3d3' />
        </Item>
        <Item style={{ paddingTop: 10, paddingBottom: 10 }}>
          <Icon active name='ios-information-circle'
              style={{ marginRight: 3 }} />
          {desc}
        </Item>
      </Content>
    </Container>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center'
  },
  memberContainer: {
    flex: 1,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 30,
    paddingTop: 30,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center'
  },
  profilePicture: {
    height: 120,
    width: 120,
    borderRadius: 60,
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