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
  ListItem,
  CheckBox,
  Text,
  Body,
  Thumbnail
} from 'native-base';
import * as firebase from 'firebase';

export class EditBillScreen extends React.Component {
  static navigationOptions = {
    title: 'Edit Bill'
  };

  constructor(props) {
    super(props);
    var users = {};
    for (const user of this.props.screenProps.state.users) {
      users[user.id] = true;
    }

    var billField = this.props.navigation.state.params.bill;
    this.state = {
      billTitle: billField.title,
      billAmount: billField.amount,
      billDescription: billField.description,
      billDueDate: billField.date,
      billUsers: users,
    };
  }

  editBill() {
    var key = this.props.navigation.state.params.bill.id;

    firebase
      .database()
      .ref('bills')
      .child(key)
      .update({
        amount: 10,
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
      .child('tasks')
      .update({ [key]: true });
  }

  usersCount() {
    let count = 0;
    for (const user of Object.values(this.state.billUsers)) {
      if (user) count++;
    }
    return count;
  }

  toggleCheck(bool, user){
    console.log(bool);
    if(bool){
      return (
        <Thumbnail
            medium
            source={require('./checkmark.png')}
            
          />
          );
    }
    else {
      return(
        <Thumbnail
          medium
          source={{ uri: user.photoURL }}
        />
      );
    }

  }

  checkAmount(){

  }

  render() {
     const users = this.props.screenProps.state.users.map(user => (
      <ListItem
        key={user.id}
        onPress={() => {
          var prevUsers = this.state.billUsers;
          prevUsers[user.id] = !prevUsers[user.id];
          this.setState({ 
            users: prevUsers,
          });
        }}>
        
        {this.toggleCheck(this.state.billUsers[user.id], user)}
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
              <Label>Bill Amount &#160;&nbsp;$</Label>
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
              } else if (this.usersCount() === 0) {
                Alert.alert(
                  'Submission Failed',
                  'At least one user must be involved.'
                );
              } else {
                this.editBill();
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
