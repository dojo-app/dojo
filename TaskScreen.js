import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import {
  Container,
  Header,
  Content,
  Footer,
  FooterTab,
  Button,
  Icon,
  Text,
  Left,
  Body,
  Title,
  Right,
  List,
  ListItem,
  Switch,
  Card,
  CardItem
} from 'native-base';
import * as firebase from 'firebase';
import ActionButton from 'react-native-action-button';

export class TaskScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: true
    };
  }

  static navigationOptions = ({ navigation }) => ({
    title: 'Tasks',
    /*
    headerRight: (
      <Button transparent onPress={() => navigation.navigate('AddTask')}>
        <Text>Add Task</Text>
      </Button>
    ),
    headerLeft: (
      <Button transparent onPress={() => navigation.navigate('EditTask')}>
        <Text>Edit Task</Text>
      </Button>
    ),
    */
    tabBarIcon: ({ tintColor, focused }) => (
      <Icon
        name={focused ? 'ios-list-box' : 'ios-list-box-outline'}
        style={{ color: tintColor }}
      />
    )
  });

  render() {
    const { navigate } = this.props.navigation;
    var listItems = [];

    for (const task of this.props.screenProps.state.tasks) {
      listItems.push(
        <ListItem onPress={() => navigate('TaskDetails', { task: task })}>
          <Text>{task.title}</Text>
        </ListItem>
      );
    }

    return (
      <Container style={styles.container}>
        <Content>
          <List>{listItems}</List>
        </Content>
        <ActionButton
          buttonColor="rgba(231,76,60,1)"
          onPress={() => this.props.navigation.navigate('AddTask')}
        />
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
