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
  Text,
  ListItem,
  CheckBox,
  Body,
  //new ss
  Icon,
  Title,
  Right,
  Segment,
  List
} from 'native-base';
import ActionButton from 'react-native-action-button';
import * as firebase from 'firebase';

export class BillScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: true,
      onList: true
    };
  }
  static navigationOptions = ({ navigation }) => ({
    title: 'Bills',

    tabBarIcon: ({ tintColor, focused }) => (
      <Icon
        name={focused ? 'ios-cash' : 'ios-cash-outline'}
        style={{ color: tintColor }}
      />
    )
  });

  getExcess() {
    let sumPaid = 0.0;
    let sumOwed = 0.0;
    let excess = 0.0;
    const billCreated = this.props.screenProps.state.bills
      .filter(bill => bill.requester === this.props.screenProps.state.user.uid)
      .map(bill => (sumPaid += parseInt(bill.amount.substring(1))));
    const billInvolved = this.props.screenProps.state.bills
      .filter(bill => {
        return this.props.screenProps.state.user.uid in bill.users;
      })
      .map(
        bill =>
          (sumOwed +=
            parseInt(bill.amount.substring(1)) /
            parseInt(Object.keys(bill.users).length)) // +1 includes the requester MOD THIS ACCORDING TO UDPATED TEST
      );
    excess = sumPaid - sumOwed;
    // if positve then they're in deficit, people owe this person money.
    // if negative then they're in excess, they owe money to people.
    return excess;
  }

  getPersonalTotal() {
    if (this.getExcess() > 0) {
      return 'People owe you $' + this.getExcess() + ' total.';
    } else if (this.getExcess == 0) {
      return 'You are in perfect balance!';
    } else {
      return 'You owe people $' + Math.abs(this.getExcess()) + ' total.';
    }
    // check to see if theyre in excess or deficit, display that number.
    // if in excess then display the amount that other users in the dojo owe them.
    // if in deficit then display the amount that they owe other users in the dojo.
  }

  /*
  getTransactions() {
    if (this.getExcess() > -1) {

      // people owe this person money.
      // iterate through all the users who are in excess. So where users.id.getExcess()<-1
      const Payers = this.props.screenProps.state.user // iterates through all the users in the dojo.
        .filter(user => {
          // only considers the users who are in excess.
          return this.props.screenProps.state.user.uid.getExcess() > 0;
        })
        .map(
          user =>
            (sumOwed +=
              parseInt(user.amount) / parseInt(Object.keys(bill.users).length)) // +1 includes the requester MOD THIS ACCORDING TO UPDATED TEST
        );
    } else {
      // this person owes someone else money.
      const Payee = this.props.screenProps.state.bills
        .filter(bill => {
          return this.props.screenProps.state.user.uid in bill.users;
        })
        .map(
          bill =>
            (sumOwed +=
              parseInt(bill.amount) / parseInt(Object.keys(bill.users).length)) // +1 includes the requester MOD THIS ACCORDING TO UDPATED TEST
        );
    }
  }
*/
  render() {
    const { navigate } = this.props.navigation;
    const bills = this.props.screenProps.state.bills.map(bill => (
      <ListItem
        key={bill.id}
        onPress={() => navigate('BillDetails', { bill: bill })}>
        <Text>{bill.title}</Text>
      </ListItem>
    ));

    const listBill = (
      <Content>
        <Container style={styles.container}>
          <Content>
            <List>{bills}</List>
          </Content>
        </Container>
      </Content>
    );

    const personalTotal = (
      <Content>
        <Container style={styles.container}>
          <Content>
            <Text>{this.getExcess()}</Text>
            <Text>{this.getPersonalTotal()}</Text>
          </Content>
        </Container>
      </Content>
    );
    return (
      <Container style={styles.container}>
        <Header hasTabs style={styles.segment}>
          <Segment style={styles.segment}>
            <Button
              first
              active={this.state.onList}
              onPress={() => {
                if (!this.state.onList) {
                  this.setState({ onList: true });
                }
              }}>
              <Text>List of Bills</Text>
            </Button>
            <Button
              last
              active={!this.state.onList}
              onPress={() => {
                if (this.state.onList) {
                  this.setState({ onList: false });
                }
              }}>
              <Text>Personal Total</Text>
            </Button>
          </Segment>
        </Header>
        {this.state.onList ? listBill : personalTotal}
        <ActionButton
          buttonColor="#c02b2b"
          onPress={() => navigate('AddBill')}
        />
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  },
  segment: {
    backgroundColor: 'white'
  },
  actionButtonIcon: {
    fontSize: 20,
    height: 22,
    color: 'white'
  }
});
