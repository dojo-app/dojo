import React, { Component } from 'react';
import { StyleSheet } from 'react-native';

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

export class AddTaskScreen extends React.Component {
  static navigationOptions = {
    title: 'Add Task'
  };

  constructor() {
    super();
    this.state = {
      taskTitle: 'Important Task',
      taskDescription: 'Cool Description',
      taskDueDate: 'Due Date',
      taskUsers: 'Users',
      checkBox1Checked: false,
      checkBox2Checked: false
    };
  }

  addTask() {
    var key = firebase
      .database()
      .ref('tasks')
      .push({
        title: this.state.taskTitle,
        description: this.state.taskDescription,
        users: this.state.taskUsers,
        dueDate: this.state.taskDueDate
      }).key;
    firebase
      .database()
      .ref('dojos')
      .child(this.props.screenProps.state.dojo)
      .child('tasks')
      .update({ [key]: true });
  }

  render() {
    return (
      <Container style={styles.container}>
        <Content>
          <Form>
            <Item fixedLabel>
              <Label>Title</Label>
              <Input
                value={this.state.taskTitle}
                onChangeText={text => this.setState({ taskTitle: text })}
              />
            </Item>
            <Item fixedLabel>
              <Label>Description</Label>
              <Input
                value={this.state.taskDescription}
                onChangeText={text => this.setState({ taskDescription: text })}
              />
            </Item>
            <Item fixedLabel>
              <Label>Due Date</Label>
              <Input
                value={this.state.taskDueDate}
                onChangeText={text => this.setState({ taskDueDate: text })}
              />
            </Item>
            <ListItem itemDivider>
              <Body>
                <Text>Users</Text>
              </Body>
            </ListItem>
            <ListItem
              onPress={() =>
                this.setState({
                  checkBox1Checked: !this.state.checkBox1Checked
                })
              }>
              <CheckBox checked={this.state.checkBox1Checked} />
              <Body>
                <Text>User #1</Text>
              </Body>
            </ListItem>
            <ListItem
              onPress={() =>
                this.setState({
                  checkBox2Checked: !this.state.checkBox2Checked
                })
              }>
              <CheckBox checked={this.state.checkBox2Checked} />
              <Body>
                <Text>User #2</Text>
              </Body>
            </ListItem>
          </Form>
          <Button
            full
            onPress={() => {
              this.addTask();
              this.props.navigation.goBack();
            }}>
            <Text>Submit</Text>
          </Button>
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  }
});
