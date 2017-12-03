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
  View,
  Icon,
  Alert,
  Body
} from 'native-base';
import * as firebase from 'firebase';

export class BillDetailsScreen extends React.Component {
  static navigationOptions = {
    title: 'Bill Details',
    headerTintColor: '#c02b2b'        
  };

  deleteBill() {
    var key = this.props.screenProps.state.user.id;

    firebase
    .database()
    .ref('bills')
    .child('bill')
    .child(key)
    .remove()

    firebase
    .database()
    .ref('dojos')
    .child('todo')
    .child(todo)
    .remove()      
  }

  render() {
    const bill = this.props.navigation.state.params.bill;
    const billUsers = bill.users;
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
                value={bill.title}
              />
            </Item>

            <Item fixedLabel>
              <Label>Description</Label>
              <Input
                disabled
                value={bill.description}
              />
            </Item>

            <Item fixedLabel>
              <Label>Amount</Label>
              <Input
                disabled
                value={bill.amount}
              />
            </Item>


            <ListItem itemDivider>
              <Body>
                <Text>Users</Text>
              </Body>
            </ListItem>
            {users}
          </Form>

          <View style={styles.container}>
            <Button iconLeft style={ styles.editButton }
            onPress={() => {
               navigate('EditBill', { bill: bill })
            }}>
              <Icon name='ios-create-outline' />
              <Text>Edit Bill</Text>
            </Button>

            <Button iconLeft style={styles.deleteButton} onPress={() =>
              Alert.alert(
                'Are you sure?',
                'This bill will be permanently deleted',
                [
                  { text: 'Cancel' },
                  {
                    text: 'Delete',
                    onPress: () => {
                      this.deleteBill();
                      this.props.navigation.goBack();

                    //   firebase
                    // .database()
                    // .ref('bills')
                    // .child('bill')
                    // .child(key)
                    // .remove()

                    // firebase
                    // .database()
                    // .ref('dojos')
                    // .child('todo')
                    // .child(todo)
                    // .remove()
                  }
                  }
                ],
                { cancelable: false }
              )
            }>
              <Icon name='ios-trash' />
              <Text>Delete Bill</Text>
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
    backgroundColor: 'white',   
    flexDirection: 'row'
  },

  deleteButton: {
    backgroundColor: '#c02b2b',
    marginRight: 20,
    marginTop: 30,
    marginLeft: 30

  },

  editButton: {
    backgroundColor: '#d3d3d3',
    marginLeft: 20,
    marginRight: 30,
    marginTop: 30
  }
});
