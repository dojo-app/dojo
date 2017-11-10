import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { Container, Header, Content, Footer, FooterTab, Button, Icon, Text, Left, Body, Title, Right, List, ListItem, Switch } from 'native-base';
import * as firebase from "firebase";

export class ProfileScreen extends React.Component {
  // constructor() {
  //   super();
  //   this.state = {
  //     text: ''
  //   };
  //   firebase.database().ref('task').once("value").then(function(snapshot) {
  //     console.log( snapshot );
  //   });
  // }

  static navigationOptions = ({navigation}) => ({

    title: 'Profile',

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
              <Text>Name</Text>
            </ListItem>
            <ListItem>
              <Text>Email</Text>
            </ListItem>
            <ListItem>
              <Text>Phone</Text>
            </ListItem>
          </List>

          <Button danger/*transparent onPress={() => navigation.navigate('AddBill')}*/>
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
    backgroundColor: 'white',
  },
});