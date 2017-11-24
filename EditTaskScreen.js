import React, { Component } from 'react';
import {
  Container,
  Header,
  Content,
  Modal,
  TouchableHighlight,
  View,
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

  state = {
    modalVisible: false,
  }

  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }

  render() {
    return (
      <Container>
        <Content>
          <Form>
            <Item fixedLabel>
              <Label>Task Title</Label>
              <Input
                value={this.state.taskTitle}
                onChangeText={text => this.setState({ taskTitle: text })}
              />
            </Item>
            <Item fixedLabel>
              <Label>Task Description</Label>
              <Input
                value={this.state.taskDescription}
                onChangeText={text => this.setState({ taskDescription: text })}
              />
            </Item>
            <Item fixedLabel>
              <Label>Users</Label>
              <Input
                value={this.state.taskUsers}
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
          <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.modalVisible}
          onRequestClose={() => {alert("Modal has been closed.")}}
          >
         <View style={{marginTop: 22}}>
          <View>
            <Text>Hello World!</Text>

            <TouchableHighlight onPress={() => {
              this.setModalVisible(!this.state.modalVisible)
            }}>
              <Text>Hide Modal</Text>
            </TouchableHighlight>

          </View>
         </View>
        </Modal>

        <TouchableHighlight onPress={() => {
          this.setModalVisible(true)
        }}>
          <Text>Show Modal</Text>
        </TouchableHighlight>
          <Button
            full
            onPress={() => {
              return firebase
                .database()
                .ref('task')
                .push({
                  task_title: this.state.taskTitle,
                  tast_description: this.state.taskDescription,
                  task_users: this.state.taskUsers,
                  task_dueDate: this.state.taskDueDate
                });
            }}>
            <Text>Save</Text>
          </Button>
          <Button
          full
          onPress={() => {
          this.setModalVisible(true)
        }}>
          <Text>Delete</Text>
          </Button>
        </Content>
      </Container>
    );
  }
}
