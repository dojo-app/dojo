import React, { Component } from 'react';
import { Container, Header, Content, Footer, FooterTab, Icon, Text, Left, Body, Title, Right, List, ListItem, Switch, Button } from 'native-base';

export class BillScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'Bills',
    headerRight: (
      <Button transparent onPress={() => navigation.navigate('AddBill')}>
        <Text>Add Bill</Text>
      </Button>
    ),
    tabBarIcon: ({ tintColor, focused }) => (
      <Icon
        name={focused ? 'ios-cash' : 'ios-cash-outline'}
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