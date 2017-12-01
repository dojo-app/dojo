import React, { Component } from 'react';
import { StyleSheet, Alert } from 'react-native';

import {
  Container,
  Header,
  Content,
  Button,
  Form,
  Item,
  Input,
  Label,
  Left,
  Text,
  CheckBox,
  ListItem,
  Body
} from 'native-base';
import * as firebase from 'firebase';

export class AddBillScreen extends React.Component {
  static navigationOptions = {
    title: 'Add Bill'
  };

  constructor(props) {
    super(props);
    var users = {};
    for (const user of this.props.screenProps.state.users) {
      users[user.id] = true;
    }

    this.state = {
      billTitle: '',
      billAmount: '',
      billDescription: '',
      billDueDate: '',
      billUsers: users,
      showToast: false
    };
  }
  addBill() {
    var key = firebase
      .database()
      .ref('bills')
      .push({
        amount: this.state.billAmount,
        date: this.state.billDueDate,
        description: this.state.billDescription,
        requester: this.props.screenProps.state.user.uid,
        users: this.state.billUsers,
        title: this.state.billTitle
      }).key;
    firebase
      .database()
      .ref('dojos')
      .child(this.props.screenProps.state.dojo)
      .child('bills')
      .update({ [key]: true });
  }

  usersCount() {
    let count = 0;
    for (const user of Object.values(this.state.billUsers)) {
      if (user) count++;
    }
    return count;
  }

  render() {
    const users = this.props.screenProps.state.users.map(user => (
      <ListItem
        key={user.id}
        onPress={() => {
          var prevUsers = this.state.billUsers;
          prevUsers[user.id] = !prevUsers[user.id];
          this.setState({
            users: prevUsers
          });
        }}>
        <CheckBox checked={this.state.billUsers[user.id]} />
        <Body>
          <Text>{user.name}</Text>
        </Body>
      </ListItem>
    ));

    return (
      <Container>
        <Content>
          <Form>
          <Item fixedLabel>
              <Label>Bill Title</Label>
              <Input
                value={this.state.billTitle}
                onChangeText={text => this.setState({ billTitle: text })}
              />
            </Item>
            <Item fixedLabel>
              <Label>Bill Amount</Label>
              <Input
                value={this.state.billAmount}
                onChangeText={text => this.setState({ billAmount: text })}
              />
            </Item>
            <Item fixedLabel>
              <Label>Bill Description</Label>
              <Input
                value={this.state.billDescription}
                onChangeText={text => this.setState({ billDescription: text })}
              />
            </Item>
            <Item fixedLabel>
              <Label>Bill Due Date</Label>
              <Input
                value={this.state.billDueDate}
                onChangeText={text => this.setState({ billDueDate: text })}
              />
            </Item>
            <ListItem itemDivider>
              <Body>
                <Text>Users</Text>
              </Body>
            </ListItem>
            {users}
          </Form>
          <Button
            full
            onPress={() => {
              console.log('usercount = ' + this.usersCount());
              if (this.state.billTitle === '') {
                Alert.alert('Submission Failed', 'Title cannot be empty.');
              } else if (this.usersCount() === 0) {
                Alert.alert(
                  'Submission Failed',
                  'At least one user must be involved.'
                );
              } else {
                this.addBill();
                this.props.navigation.goBack();
              }
            }}>
            <Text>Submit</Text>
          </Button>
        </Content>
      </Container>
    );
  }
}