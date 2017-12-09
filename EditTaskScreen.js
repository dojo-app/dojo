import React, { Component } from 'react';
import { StyleSheet, Alert, Keyboard } from 'react-native';
import { NavigationActions } from 'react-navigation';
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
  View,
  Body,
  Thumbnail
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
      date: this.props.navigation.state.params.task.date,
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
        users: this.state.users,
        date: this.state.date
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

  toggleCheck(bool, user) {
    console.log(bool);
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
          this.setState({
            users: prevUsers
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
                //value={this.state.billDueDate}
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

          <View style={styles.view}>
            <Button
              style={styles.button}
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
                  Keyboard.dismiss();
                  this.editTask();
                  this.props.navigation.dispatch(
                    NavigationActions.reset({
                      index: 0,
                      actions: [
                        NavigationActions.navigate({ routeName: 'Tasks' })
                      ]
                    })
                  );
                }
              }}>
              <Text>Save</Text>
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
    backgroundColor: 'white'
  },

  button: {
    // marginTop: '10%',
    backgroundColor: '#c02b2b'
  },

  text: {
    marginTop: 17,
    marginBottom: 17,
    marginRight: 25
  },

  view: {
    flex: 1
    // flexDirection: 'row',
    // justifyContent: 'center'
  }
});
