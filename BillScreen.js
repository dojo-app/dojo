import React, { Component } from 'react';
import {
  Container,
  Header,
  Content,
  Footer,
  FooterTab,
  Icon,
  Text,
  Left,
  Body,
  Title,
  Right,
  List,
  ListItem,
  Switch,
  Button
} from 'native-base';

export class BillScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'Bills',
    headerRight: (
      <Button transparent onPress={() => navigation.navigate('AddBill')}>
        <Text>Add Bill</Text>
      </Button>
    ),
    headerLeft: (
      <Button transparent onPress={() => navigation.navigate('EditBill')}>
        <Text>Edit Bill</Text>
      </Button>
    ),
    tabBarIcon: ({ tintColor, focused }) => (
      <Icon
        name={focused ? 'ios-cash' : 'ios-cash-outline'}
        style={{ color: tintColor }}
      />
    )
  });

  render() {
    return (
      <Container>
<<<<<<< HEAD
        <Content>
        </Content>
=======
        <Content />
>>>>>>> d8369eff42c164dae9c359b7e4966fd3eaafbcc9
      </Container>
    );
  }
}
