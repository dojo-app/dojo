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
  Thumbnail,
  View
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
      billDueDate: '',
      billUsers: users,
      date: this.getDateString()
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

  addBill() {
    var key = firebase
      .database()
      .ref('bills')
      .push({
        amount: this.state.billAmount,
        date: this.state.billDueDate,
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
        <Content>
          <Form>
            <Item fixedLabel style={styles.category}>
              <Label>Title</Label>
              <Input
                style={styles.border}
                value={this.state.billTitle}
                onChangeText={text => this.setState({ billTitle: text })}
              />
            </Item>
            <Item fixedLabel style={styles.category}>
              <Label>Amount </Label>
              <Input
                style={[styles.border, styles.right]}
                onChangeText={text =>
                  this.setState({ billAmount: this.formatAmount(text) })
                }
                value={this.state.billAmount}
              />
            </Item>
            <Item fixedLabel style={styles.category}>
              <Label>Description</Label>
              <Input
                multiline={true}
                style={[styles.border, styles.description]}
                value={this.state.billDescription}
                onChangeText={text => this.setState({ billDescription: text })}
              />
            </Item>
            <Item fixedLabel style={styles.category}>
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
              hideText
              showIcon={false}
              confirmBtnText="Submit"
              cancelBtnText="Cancel"
              //customStyles={customStyles}
              ref="datepicker"
              onDateChange={date => {
                this.setState({ date: date });
              }}
            />
            <View style={styles.category}>
              <Item fixedLabel style={styles.user}>
                <Label>Users Involved </Label>
              </Item>
              {users}
            </View>
          </Form>
          <Button
            style={styles.button}
            full
            onPress={() => {
              console.log('usercount = ' + this.usersCount());
              if (this.state.billTitle === '') {
                Alert.alert('Submission Failed', 'Title cannot be empty.');
              } else if (this.billAmount === '$0.00') {
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

  category: {
    flex: 0,
    marginRight: 10,
    marginTop: 10,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderColor: '#c02b2b'
  },
  user: {
    flex: 0,
    marginRight: 10,
    marginLeft: 10,
    marginTop: 20,
    paddingBottom: 20
  },

  button: {
    backgroundColor: '#c02b2b'
  },

  right: {
    textAlign: 'right'
  },

  text: {
    marginTop: 17,
    marginBottom: 17,
    marginRight: 25
  },
  border: {
    paddingBottom: 0,
    paddingTop: 0,
    flex: 2.5,
    borderWidth: 0.5,
    borderColor: '#CCCCCC'
  },
  description: {
    textAlignVertical: 'top',

    height: 100
  }
});
