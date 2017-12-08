import React, { Component } from 'react';
import { StyleSheet, Alert } from 'react-native';
import DatePicker from 'react-native-datepicker';

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
  Body,
  Thumbnail
} from 'native-base';
import * as firebase from 'firebase';

function removeFalseEntries(obj) {
  let result = {};
  for (const key in obj) {
    if (obj[key]) {
      //holds a true
      result[key] = true;
    }
  }

  return result;
}

export class AddTaskScreen extends React.Component {
  static navigationOptions = {
    title: 'Add Task',
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
      date: this.getDateString(),
      users: users
    };
  }

  getDateString() {
    const date = new Date();

    const year = date.getFullYear();
    const month = this.prependZero(date.getMonth() + 1);
    const day = this.prependZero(date.getDate());

    return `${year}-${month}-${day}`;
  }

  prependZero(n) {
    if (n < 10) {
      return '0' + n;
    }
    return n;
  }

  addTask() {
    var key = firebase
      .database()
      .ref('tasks')
      .push({
        title: this.state.title,
        description: this.state.description,
        users: this.state.users,
        date: this.state.date,
        checked: false,
        source: this.props.screenProps.state.user.uid
      }).key;

    firebase
      .database()
      .ref('dojos')
      .child(this.props.screenProps.state.dojo)
      .child('tasks')
      .update({ [key]: false });
  }

  usersCount() {
    let count = 0;
    for (const user of Object.values(this.state.users)) {
      if (user) count++;
    }
    return count;
  }

  toggleCheck(bool, user) {
    if (bool) {
      return <Thumbnail small source={require('./checkmark.png')} />;
    } else {
      return <Thumbnail small source={{ uri: user.photoURL }} />;
    }
  }

  render() {
    const users = this.props.screenProps.state.users.map(user => (
      <ListItem
        key={user.id}
        onPress={() => {
          var prevUsers = this.state.users;
          prevUsers[user.id] = !prevUsers[user.id];

          //Fix : false ones are not included in the object
          this.setState({
            users: removeFalseEntries(prevUsers)
          });
        }}>
        {this.toggleCheck(this.state.users[user.id], user)}
        <Body>
          <Text>{user.name}</Text>
        </Body>
      </ListItem>
    ));

    return (
      <Container style={styles.container}>
        <Content keyboardShouldPersistTaps={'handled'}>
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

            <Item fixedLabel>
              <Label>Due Date</Label>
              <Text
                style={styles.text}
                onPress={() => {
                  this.refs.datepicker.onPressDate();
                }}>
                {this.state.date}
              </Text>
            </Item>
            <DatePicker
              date={this.state.date}
              mode="date"
              style={{ width: 0, height: 0 }}
              showIcon={false}
              confirmBtnText="Submit"
              cancelBtnText="Cancel"
              //customStyles={customStyles}
              ref="datepicker"
              onDateChange={date => {
                this.setState({ date: date });
              }}
            />

            <ListItem itemDivider>
              <Body>
                <Text>Users</Text>
              </Body>
            </ListItem>

            {users}
          </Form>
          <Button
            style={styles.button}
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
  },

  button: {
    backgroundColor: '#c02b2b'
  },

  text: {
    marginTop: 17,
    marginBottom: 17,
    marginRight: 25
  }
});
