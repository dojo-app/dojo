import React, { Component } from 'react';
import { Container, Header, Content, Footer, FooterTab, Icon, Text, Left, Body, Title, Right, List, ListItem, Switch, Button } from 'native-base';

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
      <Container>
        <Content>
        </Content>
      </Container>    
    );
  }
}