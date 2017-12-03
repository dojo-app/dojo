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
  Icon,
  ListItem,
  CheckBox,
  View,
  Body
} from 'native-base';
import * as firebase from 'firebase';
import { Alert } from 'react-native';

export class TaskDetailsScreen extends React.Component {
  static navigationOptions = {
    title: 'Task Details',
    headerTintColor: '#c02b2b'    

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

          <View style={styles.container}>
            <Button iconLeft style={ styles.editButton }
            onPress={() =>
              this.props.navigation.navigate('EditTask', {task: this.props.navigation.state.params.task})}>
              <Icon name='ios-create-outline' />
              <Text>Edit Task</Text>
            </Button>

            <Button iconLeft style={styles.deleteButton} onPress={() =>
              Alert.alert(
                'Are you sure?',
                'This task will be permanently deleted',
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
              <Icon name='ios-trash' />
              <Text>Delete Task</Text>
            </Button>
          </View>

        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',   
    flexDirection: 'row'
  },

  deleteButton: {
    backgroundColor: '#c02b2b',
    marginRight: 20,
    marginTop: 30

  },

  editButton: {
    backgroundColor: '#d3d3d3',
    marginRight: 50,
    marginLeft: 20,
    marginTop: 30
  }
});