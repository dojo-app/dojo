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
  Body,
  Thumbnail
} from 'native-base';
import * as firebase from 'firebase';
import { Alert } from 'react-native';


export class BillDetailsScreen extends React.Component {
  static navigationOptions = {
    title: 'Bill Detail',
    headerTintColor: '#c02b2b'        
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
        <Thumbnail small source={{ uri: user.photoURL }} />
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

          <View style={styles.container}>
            <Button iconLeft style={ styles.editButton }
            onPress={() => {
               navigate('EditBill', { bill: this.props.navigation.state.params.bill })
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
    flexDirection: 'row',
    justifyContent: 'space-between'
  },

  deleteButton: {
    backgroundColor: '#c02b2b',
    marginRight: '10%',
    marginTop: 30,
    marginBottom: 10
  },

  editButton: {
    backgroundColor: '#d3d3d3',
    marginLeft: '10%',
    marginTop: 30,
    marginBottom: 10
  }
});
