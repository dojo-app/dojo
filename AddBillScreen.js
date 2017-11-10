import React, { Component } from 'react';
import { Container, Header, Content, Button, Form, Item, Input, Label, Left, Text } from 'native-base';


export class AddBillScreen extends React.Component {
  static navigationOptions = {
    title: 'Add Bill',
  };

  render () {
    return (
      <Container>
          <Content>
            <Form>
              <Item fixedLabel>
                <Label>Username</Label>
                <Input />
              </Item>
              <Item fixedLabel last>
                <Label>Password</Label>
                <Input />
              </Item>
            </Form>
          </Content>
      </Container>
    );
  }
};