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
  ListItem,
  CheckBox,
  Body
} from 'native-base';
import * as firebase from 'firebase';
import { Alert } from 'react-native';

export class TaskDetailsScreen extends React.Component {
  static navigationOptions = {
    title: 'Task Details'
  };

  deleteTask() {
    var key = this.props.navigation.state.params.task.id;
    //Alert.alert('This is the key: ' +key)
    firebase
      .database()
      .ref('dojos')
      .child(this.props.screenProps.state.dojo)
      .child('tasks')
      .child(key)
      .remove();
    //.child('tasks')
    //.update({ [key]: false });

    firebase
      .database()
      .ref()
      .child('tasks')
      .child(key)
      .remove();
  }

  render() {
    const users = this.props.screenProps.state.users.map(user => (
      <ListItem key={user.id}>
        <CheckBox
          checked={this.props.navigation.state.params.task.users[user.id]}
        />
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
                disabled
                value={this.props.navigation.state.params.task.title}
              />
            </Item>

            <Item fixedLabel>
              <Label>Description</Label>
              <Input
                disabled
                value={this.props.navigation.state.params.task.description}
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
            danger
            //onPress={() =>
            // go to edit task page
            //}
          >
            <Text>Edit Task</Text>
          </Button>

          <Button
            danger
            onPress={() =>
              Alert.alert(
                'Are you sure?',
                'The task will be permanently deleted',
                [
                  { text: 'Cancel' },
                  {
                    text: 'Delete',
                    onPress: () => {
                      this.deleteTask();
                      this.props.navigation.goBack();
                    }
                  }
                ],
                { cancelable: false }
              )
            }>
            <Text>Delete Task</Text>
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
