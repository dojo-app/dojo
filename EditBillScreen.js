import React, { Component } from 'react';
import { StyleSheet, Alert } from 'react-native';

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
    headerTintColor: '#c02b2b'    
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
      billUsers: users,
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
    
    /* do not need to update this, key is true either way
      firebase
      .database()
      .ref('dojos')
      .child(this.props.screenProps.state.dojo)
      .child('bills')
<<<<<<< Updated upstream
      .update({ [key]: true });*/
  }

  usersCount() {
    let count = 0;
    for (const user of Object.values(this.state.billUsers)) {
      if (user) count++;
    }
    return count;
  }

  toggleCheck(bool, user){
    console.log(bool);
    if(bool){
      return (
        <Thumbnail
            medium
            source={require('./checkmark.png')}
            
          />
          );
    }
    else {
      return(
        <Thumbnail
          medium
          source={{ uri: user.photoURL }}
        />
      );
    }

  }

  formatAmount(text){
    var txtLen = text.length-1;
    var check = text;

    if(check.charAt(txtLen) < '0' || check.charAt(txtLen) > '9'){
      check = check.substr(0, txtLen)
    }

    check = check.replace(/[^0-9]/g,'');
    var accounting = require('accounting');
    return accounting.formatMoney(parseFloat(check)/100);



  }

  render() {
     const users = this.props.screenProps.state.users.map(user => (
      <ListItem
        key={user.id}
        onPress={() => {
          var prevUsers = this.state.billUsers;
          prevUsers[user.id] = !prevUsers[user.id];
          this.setState({ 
            users: prevUsers,
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
            <Item fixedLabel>
              <Label>Bill Title</Label>
              <Input
                value={this.state.billTitle}
                onChangeText={text => this.setState({ billTitle: text })}
              />
            </Item>
            <Item fixedLabel>
              <Label>Bill Amount </Label>
              <Input
              style = {styles.right}
                onChangeText={text => this.setState({ billAmount: this.formatAmount(text) })}
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
              <Input
                value={this.state.billDueDate}
                onChangeText={text => this.setState({ billDueDate: text })}
              />
            </Item>

            <ListItem itemDivider>
              <Body>
                <Text>Users</Text>
              </Body>
            </ListItem>
            {users}
          </Form>

          <View style={styles.view}>
          <Button style={styles.button}
            onPress={() => {
              console.log('usercount = ' + this.usersCount());
              if (this.state.billTitle === '') {
                Alert.alert('Submission Failed', 'Title cannot be empty.');
              } else if (this.state.billAmount === '$0.00') {
                Alert.alert(
                  'Submission Failed',
                  'Your Bill Amount cannot be $0.00'
                );
              }else if (this.usersCount() === 0) {
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
    marginRight:20,
    textAlign: 'right' ,
  },

  container: {
    backgroundColor: 'white'
  },

  button: {
    marginTop: 30,
    backgroundColor: '#c02b2b'
  },

  view: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center'
  }  
});
