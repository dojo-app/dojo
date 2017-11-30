import React, { Component } from 'react';
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
  Text
} from 'native-base';
import * as firebase from 'firebase';

export class EditBillScreen extends React.Component {
  static navigationOptions = {
    title: 'Edit Bill'
  };

  constructor() {
    super();
    this.state = {
      billAmount: 'Important Task',
      billDescription: 'Cool Description',
      billDueDate: 'Due Date',
      billUsers: 'Users'
    };
  }

  render() {
    return (
      <Container>
        <Content>
          <Form>
            <Item fixedLabel>
              <Label>Bill Amount</Label>
              <Input
                value={this.state.billAmount}
                onChangeText={text => this.setState({ billAmount: text })}
              />
            </Item>
            <Item fixedLabel>
              <Label>Description</Label>
              <Input
                value={this.state.billDescription}
                onChangeText={text => this.setState({ billDescription: text })}
              />
            </Item>
            <Item fixedLabel>
              <Label>Due Date</Label>
              <Input
                value={this.state.billDueDate}
                onChangeText={text => this.setState({ billDueDate: text })}
              />
            </Item>
            <Item fixedLabel>
              <Label>Users</Label>
              <Input
                value={this.state.billUsers}
                onChangeText={text => this.setState({ billUsers: text })}
              />
            </Item>
          </Form>
          <Button
            full
            onPress={() => {
              return firebase
                .database()
                .ref('bill')
                .push({
                  bill_amount: this.state.billAmount,
                  bill_description: this.state.billDescription,
                  bill_date: this.state.billDueDate,
                  bill_users: this.state.billUsers
                });
            }}>
            <Text>Submit</Text>
          </Button>
        </Content>
      </Container>
    );
  }
}
