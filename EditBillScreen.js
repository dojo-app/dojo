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
  ListItem,
  CheckBox,
  Text,
  Body,
  Thumbnail,
  View
} from 'native-base';
import * as firebase from 'firebase';

export class EditBillScreen extends React.Component {
  static navigationOptions = {
    title: 'Edit Bill',
    // headerTintColor: '#c02b2b'
  };

  constructor(props) {
    super(props);
    var users = {};
    for (const user of this.props.screenProps.state.users) {
      users[user.id] = true;
    }

    var billField = this.props.navigation.state.params.bill;
    this.state = {
      billTitle: billField.title,
      billAmount: billField.amount,
      billDescription: billField.description,
      billDueDate: billField.date,
      billUsers: billField.users
    };
  }

  editBill() {
    var key = this.props.navigation.state.params.bill.id;

    firebase
      .database()
      .ref('bills')
      .child(key)
      .update({
        amount: this.state.billAmount,
        date: this.state.billDueDate,
        description: this.state.billDescription,
        requester: this.props.screenProps.state.user.uid,
        users: this.state.billUsers,
        title: this.state.billTitle
      });

    firebase
      .database()
      .ref('dojos')
      .child(this.props.screenProps.state.dojo)
      .child('bills')
      .child(key)
      .remove();

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
    console.log(bool);
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
          this.setState({
            users: prevUsers
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
              <Label>Bill Title</Label>
              <Input
                style={styles.border}
                value={this.state.billTitle}
                onChangeText={text => this.setState({ billTitle: text })}
              />
            </Item>
            <Item fixedLabel style={styles.category}>
              <Label>Bill Amount </Label>
              <Input
                style={[styles.border,styles.right]}
                onChangeText={text =>
                  this.setState({ billAmount: this.formatAmount(text) })
                }
                value={this.state.billAmount}
              />
            </Item>
            <Item fixedLabel style={styles.category}>
              <Label style={styles.label}>Description</Label>
              <Input
                multiline={true}
                style={[styles.border,styles.description]}
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
                {this.state.billDueDate}
              </Text>
            </Item>
            <DatePicker
              date={this.state.billDueDate}
              mode="date"
              style={{ width: 0, height: 0 }}
              showIcon={false}
              confirmBtnText="Submit"
              cancelBtnText="Cancel"
              //customStyles={customStyles}
              ref="datepicker"
              onDateChange={date => {
                this.setState({ billDueDate: date });
              }}
            />

            <View style={styles.category}>
              <Item fixedLabel style={styles.user}>
                <Label>Users Involved </Label>
               </Item>
              {users}
            </View>
          </Form>

          <View style={styles.view}>
            <Button full
              style={styles.button}
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
                } else if (this.usersCount() === 0) {
                  Alert.alert(
                    'Submission Failed',
                    'At least one user must be involved.'
                  );
                } else {
                  this.editBill();
                  this.props.navigation.goBack();
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
  right: {
    textAlign: 'right'
  },
  category:{
    flex: 0,
    marginRight: 10,
    marginTop: 10,
    paddingBottom: 10,
    borderBottomWidth:1,
    borderColor: '#c02b2b',


  },
  text: {
    marginTop: 17,
    marginBottom: 17,
    marginRight: 100,
    backgroundColor:'red'
  },
  user:{
    flex: 0,
    marginRight: 10,
    marginLeft: 10,
    marginTop: 20,
    paddingBottom: 10,

    borderBottomWidth: .75,
  
  },
  container: {
    backgroundColor: 'white'
  },
  button: {
    // marginTop: 30,
    backgroundColor: '#c02b2b'
  },
  view: {
    flex: 1,
    // flexDirection: 'row',
    // justifyContent: 'center'
  },
  border:{
    paddingBottom:0,
    paddingTop:0,
    flex:2.5,
    borderWidth: .5,
    borderColor: '#CCCCCC',
  },
  description:{
    textAlignVertical: 'top',
    height: 100
  },
  label:{
    marginTop: 0,
    height: 100,
  }
});
