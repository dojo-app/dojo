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
  H1,
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
    const users = this.props.screenProps.state.users.map(user => (
      <ListItem key={user.id}>
        <Text>{user.name}</Text>
      </ListItem>
    ));

    const members = this.props.screenProps.state.users.map(user => (
        <View style={styles.member} key={user.id}>
          <Thumbnail large source={{ uri: user.photoURL }}></Thumbnail>
          <Text>{formatFirstName(user.name)}</Text>
        </View>
    ));

    const { navigate } = this.props.navigation;

    return (

        <Container style={styles.container}>
            <Content>
                <View>
                    <Item fixedLabel>
                      <Label>Name</Label>
                      <Input
                        disabled
                        value={this.props.screenProps.state.dojoName}
                      />
                    </Item>
                    <Button full danger large onPress={() => this.leaveDojo()}>
                      <Text>Leave Dojo</Text>
                    </Button>
                </View>
            </Content>
        </Container>
    );
  }

}


const styles = StyleSheet.create({

  container: {
    backgroundColor: 'white'
  }

});
