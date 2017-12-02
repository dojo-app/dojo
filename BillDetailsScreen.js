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

export class BillDetailsScreen extends React.Component {
  static navigationOptions = {
    title: 'Bill Details'
  };

  constructor(props) {
      super(props);
      this.state = {
          bill: this.props.navigation.state.params.bill
      };
  }

  deleteBill() {

      //From Bills collection
      firebase
      .database()
      .ref('bills')
      .child(this.state.bill.id)
      .remove()

      //From Dojo Bills collection
      firebase
      .database()
      .ref('dojos')
      .child(this.props.screenProps.state.dojo)
      .child('bills')
      .child(this.state.bill.id)
      .remove()
  }

  render() {
    //const bill = this.props.navigation.state.params.bill;
    const billUsers = this.state.bill.users;
    const user = this.props.screenProps.state.user;
    const users = this.props.screenProps.state.users.filter(user => billUsers[user.id]).map(user => (
      <ListItem key={user.id}>
        <CheckBox
          checked={billUsers[user.id]}
        />
        <Body>
          <Text>{user.name}</Text>
        </Body>
      </ListItem>
    ));

    const { navigate } = this.props.navigation;

    return (
      <Container style={styles.container}>
        <Content>
          <Form>
            <Item fixedLabel>
              <Label>Title</Label>
              <Input
                disabled
                value={this.state.bill.title}
              />
            </Item>

            <Item fixedLabel>
              <Label>Description</Label>
              <Input
                disabled
                value={this.state.bill.description}
              />
            </Item>

            <Item fixedLabel>
              <Label>Amount</Label>
              <Input
                disabled
                value={this.state.bill.amount}
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
            full
            onPress={() => {
               navigate('EditBill', { bill: bill })
            }}>
            <Text>Edit</Text>
          </Button>

          <Button
            full
            onPress={() => {
                this.deleteBill();
                this.props.navigation.goBack();
            }}>

            <Text>Delete</Text>
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
