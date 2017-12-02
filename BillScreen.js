import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import {
  Container,
  Header,
  Content,
  Footer,
  FooterTab,
  Icon,
  Text,
  Left,
  Body,
  Title,
  Right,
  List,
  ListItem,
  Switch,
  Button
} from 'native-base';
import ActionButton from 'react-native-action-button';

export class BillScreen extends React.Component {
  // added ss
  constructor() {
    super();
    this.state = {
      loading: true
    };
  }
// end ss
  static navigationOptions = ({ navigation }) => ({
    title: 'Bills',

    tabBarIcon: ({ tintColor, focused }) => (
      <Icon
        name={focused ? 'ios-cash' : 'ios-cash-outline'}
        style={{ color: tintColor }}
      />
    )
  });

  render() {
    const { navigate } = this.props.navigation;

// start ss
    const bills = this.props.screenProps.state.bills.map(bill => (
      <ListItem
        key={bill.id}
        onPress={() => navigate('BillDetails', { bill: bill })}>
        <Text>{bill.title}</Text>
      </ListItem>
    ));
// end ss

    return (
      <Container style={styles.container}>
       <Content>
          <List>{bills}</List>
        </Content>
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
  actionButtonIcon: {
    fontSize: 20,
    height: 22,
    color: 'white'
  }
});
