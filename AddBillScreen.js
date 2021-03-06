import React, { Component } from 'react';
import { StyleSheet, Alert, Keyboard } from 'react-native';
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

export class AddBillScreen extends React.Component {
  static navigationOptions = {
    title: 'Add Bill'
  };

  constructor(props) {
    super(props);

    var users = {};

    for (const user of this.props.screenProps.state.users) {
      users[user.id] = true;
    }

    this.state = {
      billTitle: '',
      billAmount: '$0.00',
      billDescription: '',
      billUsers: users,
      date: this.getDateString()
    };
  }

  getDateString() {
    const date = new Date();

    const year = date.getFullYear();
    const month = this.prependZero(date.getMonth() + 1);
    const day = this.prependZero(date.getDate());

    return `${month}-${day}-${year}`;
  }

  prependZero(n) {
    if (n < 10) {
      return '0' + n;
    }
    return n;
  }

  addBill() {
    var key = firebase
      .database()
      .ref('bills')
      .push({
        amount: this.state.billAmount,
        date: this.state.date,
        description: this.state.billDescription,
        requester: this.props.screenProps.state.user.uid,
        users: this.state.billUsers,
        title: this.state.billTitle
      }).key;
    firebase
      .database()
      .ref('dojos')
      .child(this.props.screenProps.state.dojo)
      .child('bills')
      .update({ [key]: true });
  }

  usersCount() {
    let count = 0;
    for (const user of Object.values(this.state.billUsers)) {
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

  formatAmount(text) {
    var txtLen = text.length - 1;
    var check = text;

    if (check.charAt(txtLen) < '0' || check.charAt(txtLen) > '9') {
      check = check.substr(0, txtLen);
    }

    check = check.replace(/[^0-9]/g, '');
    var accounting = require('accounting');
    return accounting.formatMoney(parseFloat(check) / 100);
  }

  render() {
    const users = this.props.screenProps.state.users.map(user => (
      <ListItem
        key={user.id}
        onPress={() => {
          var prevUsers = this.state.billUsers;
          prevUsers[user.id] = !prevUsers[user.id];

          //Fix : false ones are not included in the object
          this.setState({
            billUsers: removeFalseEntries(prevUsers)
          });
        }}>
        {this.toggleCheck(this.state.billUsers[user.id], user)}
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
                value={this.state.billTitle}
                onChangeText={text => this.setState({ billTitle: text })}
              />
            </Item>
            <Item fixedLabel>
              <Label>Amount</Label>
              <Input
                keyboardType={'numeric'}
                style={styles.right}
                onChangeText={text =>
                  this.setState({ billAmount: this.formatAmount(text) })
                }
                value={this.state.billAmount}
              />
            </Item>
            <Item fixedLabel>
              <Label>Description</Label>
              <Input
                value={this.state.billDescription}
                onChangeText={text => this.setState({ billDescription: text })}
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
          <Button
            style={styles.button}
            full
            onPress={() => {
              console.log('usercount = ' + this.usersCount());
              if (this.state.billTitle === '') {
                Alert.alert('Submission Failed', 'Title cannot be empty.');
              } else if (this.state.billAmount === '$0.00') {
                Alert.alert(
                  'Submission Failed',
                  'Your Bill Amount cannot be $0.00'
                );
              } else if (this.usersCount() === 0) {
                Alert.alert(
                  'Submission Failed',
                  'At least one user must be involved.'
                );
              } else {
                Keyboard.dismiss();
                this.addBill();
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

  right: {
    marginRight: 20,
    textAlign: 'right'
  },

  text: {
    marginTop: 17,
    marginBottom: 17,
    marginRight: 25
  }
});
