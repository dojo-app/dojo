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

export class TaskDetailsScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      editMode: false
    };
  }
  static navigationOptions = {
    title: 'Task Details'
  };

  render() {
    return (
      <Container>
        <Content>
          <Form>
            <Item fixedLabel disabled={!this.state.editMode}>
              <Label>Task Title</Label>
              <Input
                disabled={!this.state.editMode}
                value={this.props.navigation.state.params.task.title}
                onChangeText={text => this.setState({ taskTitle: text })}
              />
            </Item>
            <Item fixedLabel disabled={!this.state.editMode}>
              <Label>Task Description</Label>
              <Input
                disabled={!this.state.editMode}
                value={this.props.navigation.state.params.task.description}
                onChangeText={text => this.setState({ taskDescription: text })}
              />
            </Item>
            <Item fixedLabel disabled={!this.state.editMode}>
              <Label>Task Users</Label>
              <Input
                disabled={!this.state.editMode}
                value={this.props.navigation.state.params.task.users}
                onChangeText={text => this.setState({ taskUsers: text })}
              />
            </Item>
            <Item fixedLabel disabled={!this.state.editMode}>
              <Label>Task Due Date</Label>
              <Input
                disabled={!this.state.editMode}
                value={this.state.taskDueDate}
                onChangeText={text => this.setState({ taskDueDate: text })}
              />
            </Item>
          </Form>

          <Button
            large
            warning={!this.state.editMode}
            success={this.state.editMode}
            full
            onPress={() => {
              this.setState({ editMode: !this.state.editMode });
            }}>
            <Text>
              {this.state.editMode
                ? 'Editing Mode (not implemented)'
                : 'Enter Edit Mode'}
            </Text>
          </Button>

          <Button
            large
            danger
            full
            onPress={() => this.props.navigation.goBack()}>
            <Text>Delete Task (not implemented)</Text>
          </Button>
        </Content>
      </Container>
    );
  }
}
