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
  static navigationOptions = ({ navigation }) => ({
    title: 'Bills',
    headerLeft: (
      <Button transparent onPress={() => navigation.navigate('EditBill')}>
        <Text>Edit Bill</Text>
      </Button>
    ),
    tabBarIcon: ({ tintColor, focused }) => (
      <Icon
        name={focused ? 'ios-cash' : 'ios-cash-outline'}
        style={{ color: tintColor }}
      />
    )
  });

  render() {
    const {navigate} = this.props.navigation;
    return (
      <Container style={styles.container}>
        <ActionButton buttonColor="rgba(231,76,60,1)" onPress={() => navigate('EditBill')}>
        </ActionButton>
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
    color: 'white',
  },
});
