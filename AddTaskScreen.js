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

export class AddTaskScreen extends React.Component {
  static navigationOptions = {
    title: 'Add Task'
  };

  constructor(props) {
    super(props);
    var users = {};
    for (const user of this.props.screenProps.state.users) {
      users[user.id] = true;
    }
    this.state = {
      title: '',
      description: '',
      users: users,
      showToast: false
    };
  }

  addTask() {
    var key = firebase
      .database()
      .ref('tasks')
      .push({
        title: this.state.title,
        description: this.state.description,
        users: this.state.users
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
    for (const user of Object.values(this.state.users)) {
      if (user) count++;
    }
    return count;
  }

  render() {
    const users = this.props.screenProps.state.users.map(user => (
      <ListItem
        key={user.id}
        onPress={() => {
          var prevUsers = this.state.users;
          prevUsers[user.id] = !prevUsers[user.id];
          this.setState({
            users: prevUsers
          });
        }}>
        <CheckBox checked={this.state.users[user.id]} />
        <Body>
          <Text>{user.name}</Text>
        </Body>
      </ListItem>
    ));

    return (
      <Container style={styles.container}>
        <Content>
          <Form>
            <Item fixedLabel>
              <Label>Title</Label>
              <Input
                value={this.state.title}
                onChangeText={text => this.setState({ title: text })}
                autoFocus={true}
              />
            </Item>

            <Item fixedLabel>
              <Label>Description</Label>
              <Input
                value={this.state.description}
                onChangeText={text => this.setState({ description: text })}
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
              if (this.state.title === '') {
                Alert.alert('Submission Failed', 'Title cannot be empty.');
              } else if (this.usersCount() === 0) {
                Alert.alert(
                  'Submission Failed',
                  'At least one user must be involved.'
                );
              } else {
                this.addTask();
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  }
});
