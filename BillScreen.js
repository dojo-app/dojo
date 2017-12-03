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
  List,
  View
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
    headerTintColor: '#c02b2b',

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
      // iterate through all the users who are in excess. So where users.id.getExcess()<0
      const Payers = this.props.screenProps.state.user // iterates through all the users in the dojo.
        .filter(user => {
          // only considers the users who are in excess.
          // if users.getExcess==this.getExcess) then return that user pays this user.
          // else grab the largest user.getExcess thats still less than this users.getExcess and display that user pays this user all that user.getExcess has
          // else have next largest user.getExcess pay this user the rest of their getExcess amount.
          return this.props.screenProps.state.user.uid.getExcess() > 0;
        })
        .map(
          user =>
            (sumOwed +=
              parseInt(user.amount) / parseInt(Object.keys(bill.users).length)) // +1 includes the requester MOD THIS ACCORDING TO UPDATED TEST
        );
    } else {
      // this person owes someone else money.
      // iterate through all the users who are in deficit. So where users.id.getExcess()>0
      // opposite of above code.
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

  // creates an object of list items from array
  createList(array) {
    const { navigate } = this.props.navigation;
    var list = array.map(bill => (
      <ListItem
        key={bill.id}
        onPress={() => navigate('BillDetails', { bill: bill })}>
        <Text>{bill.title}</Text>
      </ListItem>
    ));

    return list;
  }

  // decide which view to show
  showBills(involvingMe, assignedByMe) {
    if (involvingMe.length > 0 && assignedByMe.length > 0) {
      return (
        <View>
          <ListItem itemDivider>
            <Text>Involving Me </Text>
          </ListItem>
          {this.createList(involvingMe)}
          <ListItem itemDivider>
            <Text>Assigned By Me </Text>
          </ListItem>
          {this.createList(assignedByMe)}
        </View>
      );
    } else if (involvingMe.length > 0) {
      return (
        <View>
          <ListItem itemDivider>
            <Text>Involving Me</Text>
          </ListItem>
          {this.createList(involvingMe)}
        </View>
      );
    } else if (assignedByMe.length > 0) {
      return (
        <View>
          <ListItem itemDivider>
            <Text>Assigned By Me</Text>
          </ListItem>
          {this.createList(assignedByMe)}
        </View>
      );
    } else {
      return <Text> No Bills to Display :( </Text>;
    }
  }

  render() {
    const { navigate } = this.props.navigation;
    /*const bills = this.props.screenProps.state.bills.map(bill => (
      <ListItem
        key={bill.id}
        onPress={() => navigate('BillDetails', { bill: bill })}>
        <Text>{bill.title}</Text>
      </ListItem>
    ));*/

    // build array of bills assigned by me
    const assignedByMeArray = this.props.screenProps.state.bills.filter(
      bill => {
        return bill.requester === this.props.screenProps.state.user.uid;
      }
    );

    // build array of bills assigned to me
    const involvingMeArray = this.props.screenProps.state.bills.filter(bill => {
      var uid = this.props.screenProps.state.user.uid;
      return bill.users[uid];
    });

    const listBill = (
      <Content>
        <Container style={styles.container}>
          <Content>
            <List>{this.showBills(involvingMeArray, assignedByMeArray)}</List>
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
              style={{
                backgroundColor: this.state.onList ? '#c02b2b' : undefined,
                borderColor: '#c02b2b'
              }}
              first
              active={this.state.onList}
              onPress={() => {
                if (!this.state.onList) {
                  this.setState({ onList: true });
                }
              }}>
              <Text style={{ color: this.state.onList ? '#FFF' : '#c02b2b' }}>
                List of Bills
              </Text>
            </Button>
            <Button
              last
              style={{
                backgroundColor: !this.state.onList ? '#c02b2b' : undefined,
                borderColor: '#c02b2b'
              }}
              active={!this.state.onList}
              onPress={() => {
                if (this.state.onList) {
                  this.setState({ onList: false });
                }
              }}>
              <Text style={{ color: !this.state.onList ? '#FFF' : '#c02b2b' }}>
                Personal Totals
              </Text>
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
