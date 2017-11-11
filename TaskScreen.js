import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { Container, Header, Content, Footer, FooterTab, Button, Icon, Text, Left, Body, Title, Right, List, ListItem, Switch } from 'native-base';
import * as firebase from "firebase";

export class TaskScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      text: ''
    };
    // firebase.database().ref('task').once("value").then(function(snapshot) {
    //   console.log( snapshot );
    // });
  }

  static navigationOptions = ({navigation}) => ({

    title: 'Tasks',
    headerRight: (
      <Button transparent onPress={() => navigation.navigate('AddTask')}>
        <Text>Add Task</Text>
      </Button>
    
    ),
    headerLeft: (
      <Button transparent onPress={() => navigation.navigate('EditTask')}>
        <Text>Edit Task</Text>
      </Button>

    ),
    tabBarIcon: ({ tintColor, focused }) => (
    <Icon
      name={focused ? 'ios-list-box' : 'ios-list-box-outline'}
      style={{ color: tintColor }}
    />
    ),
  });


  render() {
    return (
      <Container style={styles.container}>
        <Content>
          <List>
            <ListItem>

                <Text>Example Task #1</Text>
              
            </ListItem>
            <ListItem>
              <Text>Example Task #2</Text>
            </ListItem>
            <ListItem>
              <Text>Example Task #3</Text>
            </ListItem>
          </List>
          <Text>{this.state.text}</Text>
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});
