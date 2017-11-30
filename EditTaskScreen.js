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

export class EditTaskScreen extends React.Component {
  static navigationOptions = {
    title: 'Edit Task'
  };

  constructor() {
    super();
    this.state = {
      taskTitle: 'Important Task',
      taskDescription: 'Cool Description',
      taskDueDate: 'Date',
      taskUsers: 'Users'
    };
  }

  editTask() {
    var key = firebase
      .database()
      .ref('tasks').child(this.props.screenProps.state.id)
      // .push({
      //   title: this.state.taskTitle,
      //   description: this.state.taskDescription,
      //   users: this.state.taskUsers,
      //   dueDate: this.state.taskDueDate
      // }).key;
    firebase
      .database()
      .ref('dojos')
      .child(this.props.screenProps.state.dojo)
      .child('tasks')
      .update({ [key]: true });
  }

  render() {
    return (
      <Container>
        <Content>
          <Form>
            <Item fixedLabel>
              <Label>Title</Label>
              <Input
                value={this.props.navigation.state.params.task.title}
                onChangeText={text => this.setState({ taskTitle: text })}
              />
            </Item>
            <Item fixedLabel>
              <Label>Description</Label>
              <Input
                value={this.props.navigation.state.params.task.description}
                onChangeText={text => this.setState({ taskDescription: text })}
              />
            </Item>
            <Item fixedLabel>
              <Label>Users</Label>
              <Input
                value={this.props.navigation.state.params.task.users}
                onChangeText={text => this.setState({ taskUsers: text })}
              />
            </Item>
            <Item fixedLabel>
              <Label>Due Date</Label>
              <Input
                value={this.state.taskDueDate}
                onChangeText={text => this.setState({ taskDueDate: text })}
              />
            </Item>
          </Form>
          <Button
            full
            onPress={() => {

              this.editTask();
              this.props.navigation.goBack();

              // return firebase
              //   .database()
              //   .ref('task')
              //   .push({
              //     task_title: this.state.taskTitle,
              //     tast_description: this.state.taskDescription,
              //     task_users: this.state.taskUsers,
              //     task_dueDate: this.state.taskDueDate
              //   });
            }}>
            <Text>Save</Text>
          </Button>
        </Content>
      </Container>
    );
  }
}
