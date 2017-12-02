import React, { Component } from 'react';
import { StyleSheet, Alert } from 'react-native';
import { NavigationActions } from 'react-navigation';

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

export class EditTaskScreen extends React.Component {
  static navigationOptions = {
    title: 'Edit Task'
  };

  constructor(props) {
    super(props);

    this.state = {
      title: this.props.navigation.state.params.task.title,
      description: this.props.navigation.state.params.task.description,
      users: this.props.navigation.state.params.task.users
    };
  }

  editTask() {
    var key = this.props.navigation.state.params.task.id;

    firebase
      .database()
      .ref('tasks')
      .child(key)
      .update({
        title: this.state.title,
        description: this.state.description,
        users: this.state.users
      });

    firebase
      .database()
      .ref('dojos')
      .child(this.props.screenProps.state.dojo)
      .child('tasks')
      .child(key)
      .remove();

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
              console.log('usercount = ' + this.usersCount());
              if (this.state.title === '') {
                Alert.alert('Submission Failed', 'Title cannot be empty.');
              } else if (this.usersCount() === 0) {
                Alert.alert(
                  'Submission Failed',
                  'At least one user must be involved.'
                );
              } else {
                this.editTask();
                this.props.navigation.dispatch(
                  NavigationActions.reset({
                    index: 0,
                    actions: [NavigationActions.navigate({ routeName: 'Home' })]
                  })
                );
              }
            }}>
            <Text>Save</Text>
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
