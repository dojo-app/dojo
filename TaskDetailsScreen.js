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

export class TaskDetailsScreen extends React.Component {
  static navigationOptions = {
    title: 'Task Details'
  };

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
