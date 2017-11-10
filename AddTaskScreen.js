import React, { Component } from 'react';
import { Container, Header, Content, Button, Form, Item, Input, Label, Left, Text } from 'native-base';
import * as firebase from "firebase";

export class AddTaskScreen extends React.Component {
  static navigationOptions = {
    title: 'Add Task',
  };

  constructor() {
    super();
    this.state = {
      taskTitle: 'Important Task',
      taskDescription: 'Cool Description',
    };
  }

  render () {
    return (
      <Container>
          <Content>
            <Form>
              <Item fixedLabel>
                <Label>Task Title</Label>
                <Input value={this.state.taskTitle} onChangeText={(text) => this.setState({taskTitle: text})} />
              </Item>
              <Item fixedLabel>
                <Label>Task Description</Label>
                <Input value={this.state.taskDescription} onChangeText={(text) => this.setState({taskDescription: text})} />
              </Item>
            </Form>
            <Button full onPress={() => {
              return firebase.database().ref('task').push({
                task_title: this.state.taskTitle,
                tast_description: this.state.taskDescription
              })
            }}>
              <Text>Submit</Text>
            </Button>
          </Content>
      </Container>
    );
  }
};