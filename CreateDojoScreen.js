import React, { Component } from 'react';
import {
  Container,
  Content,
  Text,
  Button,
  Form,
  Input,
  Label,
  Item,
  Icon,
  Image
} from 'native-base';
import { StyleSheet, Alert, View } from 'react-native';

import { secret } from './secret';
import Expo from 'expo';
import * as firebase from 'firebase';

export class CreateDojoScreen extends React.Component {
  constructor() {
    super();
    this.state = { dojoName: '', dojoDescription: '' };
  }
  createDojo() {
    var new_dojo = firebase
      .database()
      .ref('dojos')
      .push({
        name: this.state.dojoName,
        description: this.state.dojoDescription,
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
            // <Image style={styles.backgroundImage} source={require('./login.png')}>

      <Container style={styles.container}>
      <Content>
        <Form>
          <Item fixedLabel>
            <Label>Dojo Name</Label>
            <Input
              autoFocus={true}
              value={this.state.dojoName}
              onChangeText={text => this.setState({ dojoName: text })}
            />
          </Item>
          <Item fixedLabel>
            <Label>Description</Label>
            <Input
              value={this.state.dojoDescription}
              onChangeText={text => this.setState({ dojoDescription: text })}
            />
          </Item>
        </Form>


        <Button style={styles.create}
          large
          iconLeft
          onPress={() => {
            if (this.state.dojoName === '') {
              Alert.alert('Error', 'Dojo name cannot be empty.');
            } else {
              this.createDojo();
            }
          }}>
          <Icon name='ios-create-outline' />
          <Text>Create Dojo</Text>
        </Button>      
      </Content>
      </Container>
            // </Image> 

    );
  }
}

const styles = StyleSheet.create({
  // container: {
  //   flex: 1,
  //   flexDirection: "row",
  //   justifyContent: 'center',
  //   backgroundColor: 'white'
  // },

  container: {
    flex: 1,
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
 
  text: {
    margin: '10%'
  },
  create: {
    backgroundColor: '#c02b2b',
    marginRight: '10%',
    marginTop: 30,
    marginBottom: 10
  },

  back: {
    backgroundColor: '#d3d3d3',
    marginLeft: '10%',
    marginTop: 30,
    marginBottom: 10
  },

  backgroundImage: {
    flex: 1,
    width: null,
    height: null,
    resizeMode: 'cover'
  }

});
