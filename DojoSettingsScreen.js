import React, { Component } from 'react';
import {
  Container,
  Grid,
  Col,
  Row,
  Header,
  Content,
  Footer,
  Item,
  Label,
  Input,
  FooterTab,
  Icon,
  Left,
  Body,
  Title,
  Right,
  Text,
  Form,
  List,
  ListItem,
  Switch,
  Thumbnail,
  Button
} from 'native-base';

import { StyleSheet, View } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import * as firebase from 'firebase';
//import * as theme from './styles/theme';

// Assets

function formatFirstName(name) {
    let words = name.split(' ');

    return words[0];
}

export class DojoSettingsScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'Dojo Settings',
    // headerTintColor: '#c02b2b'

  });

  leaveDojo() {
    firebase
      .database()
      .ref('dojos')
      .child(this.props.screenProps.state.dojo)
      .child('users')
      .child(this.props.screenProps.state.user.uid)
      .remove();
    firebase
      .database()
      .ref('users')
      .child(this.props.screenProps.state.user.uid)
      .child('dojo')
      .remove();
  }

  render() {

    const members = this.props.screenProps.state.users.map(user => (
        <View style={styles.member} key={user.id}>
          <Thumbnail large source={{ uri: user.photoURL }}></Thumbnail>
          <Text>{formatFirstName(user.name)}</Text>
        </View>
    ));

    const { navigate } = this.props.navigation;

    return (

        <Container style={styles.container}>
            <Form>
                <Item fixedLabel>
                  <Label>Name</Label>
                  <Input
                    disabled
                    value={this.props.screenProps.state.dojoName}
                  />
                </Item>
                <Item fixedLabel>
                  <Label>Description</Label>
                  <Input
                    disabled
                    value={this.props.screenProps.state.dojoDescription}
                  />
                </Item>
            </Form>

            <View style={ styles.leaveContainer }>
                <Button iconLeft
                  style={ styles.secondaryButton }
                  onPress={() => navigate('DojoSettingsEdit') }>
                  <Icon name='ios-create-outline' />
                  <Text>Edit Dojo</Text>
                </Button>
                <Button iconLeft danger
                  style={ styles.primaryButton }
                  onPress={() => this.leaveDojo()}>
                  <Icon name='ios-exit-outline' />
                  <Text>Leave Dojo</Text>
                </Button>
            </View>

        </Container>
    );
  }

}


const styles = StyleSheet.create({

  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    backgroundColor: 'white',
    padding: 10,
  },

  leaveContainer: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: "center",
  },

  editContainer: {
    marginTop: 20
  },

  primaryButton: {
    margin: 10,
    backgroundColor: '#c02b2b'
  },

  secondaryButton: {
    margin: 10,
    backgroundColor: '#bebebe'
  }
});


// <Container style={styles.container}>
    // <Form>
    //     <Item fixedLabel>
    //       <Label>Name</Label>
    //       <Input
    //         disabled
    //         value={this.props.screenProps.state.dojoName}
    //       />
    //     </Item>
    //     <Item fixedLabel>
    //       <Label>Description</Label>
    //       <Input
    //         disabled
    //         value={this.props.screenProps.state.dojoDescription}
    //       />
    //     </Item>
    // </Form>
    // <View style={ styles.leaveContainer }>
    //     <Button iconLeft danger style={ styles.button } onPress={() => this.leaveDojo()}>
    //       <Icon name='ios-exit-outline' />
    //       <Text>Leave Dojo</Text>
    //     </Button>
    // </View>
// </Container>
