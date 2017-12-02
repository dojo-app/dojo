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

  constructor(props) {
      super(props);
      const taskID = this.props.navigation.state.params.task.id;
      this.state = {
          taskTarget: this.props.screenProps.state.tasks.find(task => task.id === taskID)
      };
  }

  deleteTask() {
    var key = this.props.navigation.state.params.task.id;
    
    firebase
      .database()
      .ref('dojos')
      .child(this.props.screenProps.state.dojo)
      .child('tasks')
      .child(key)
      .remove();

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
          checked={this.state.taskTarget.users[user.id]}
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
                value={this.state.taskTarget.title}
              />
            </Item>

            <Item fixedLabel>
              <Label>Description</Label>
              <Input
                disabled
                value={this.state.taskTarget.description}
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
            onPress={() =>
              this.props.navigation.navigate('EditTask', {task: this.state.taskTarget})}
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
