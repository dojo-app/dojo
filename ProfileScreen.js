import React, { Component } from 'react';
import { Container, Button, Header, Content, Footer, FooterTab, Icon, Text, Left, Body, Title, Right, List, ListItem, Switch, Button } from 'native-base';



export class ProfileScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'Profile',
    /*
    headerRight: (
      <Button transparent onPress={() => navigation.navigate('AddBill')}>
        <Text>Add Bill</Text>
      </Button>
    ),
    */

   //TODO: Change the icon
    tabBarIcon: ({ tintColor, focused }) => (
      <Icon
        name={focused ? 'ios-person' : 'ios-person-outline'}
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

          <Text>{this.state.text}</Text>
        </Content>
      </Container>    
    );
  }
}