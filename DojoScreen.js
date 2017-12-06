import React, { Component } from 'react';
import {
  Container,
  Grid,
  Col,
  Row,
  Header,
  Content,
  Footer,
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

// Assets
const normalButton = require('./public/images/add_button.png');
const dojoImage = require('./public/images/logo.png');
const dojoEdit = require('./public/images/edit.png');

import { StyleSheet, View, TouchableHighlight } from 'react-native';
import { FontAwesome, Ionicons } from '@expo/vector-icons';
import * as firebase from 'firebase';
import * as theme from './public/styles/theme';
import { ViewMember } from './component/Profile.js';

function formatFirstName(name) {
    let words = name.split(' ');

    return words[0];
}

export class DojoScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = ({
      loadMember: false
    });
  }

  static navigationOptions = ({ navigation }) => ({
    title: 'Dojo',
    headerTintColor: '#c02b2b',
    
    tabBarIcon: ({ tintColor, focused }) => (
      <Icon
        name={focused ? 'ios-home' : 'ios-home-outline'}
        style={{ color: tintColor }}
      />
    )
  });

  render() {
    // const users = this.props.screenProps.state.users.map(user => (
    //   <ListItem key={user.id}>
    //     <Text>{user.name}</Text>
    //   </ListItem>
    // ));

    let members = this.props.screenProps.state.users.map(user => (
        <View style={styles.member} key={user.id}>
          <TouchableHighlight underlayColor='transparent'
            onPress={() => navigate('MemberProfile', {member: user})}>
            <Thumbnail large source={{ uri: user.photoURL }}></Thumbnail>
          </TouchableHighlight>
          <Text>{formatFirstName(user.name)}</Text>
        </View>
    ));

    const { navigate } = this.props.navigation;

    return (
        <Container style={styles.container}>
            <Content>
                <View style={styles.dojoContainer}>
                    <View style={styles.dojoHeadContainer}>
                        <TouchableHighlight onPress={() => navigate('DojoSettings')}>
                        <View style={styles.dojoHead}>
                            <Thumbnail style={styles.dojoImage} source={ dojoImage }></Thumbnail>
                            <View style={styles.dojoNameContainer}>
                                <Text style={styles.dojoName}>{this.props.screenProps.state.dojoName}</Text>
                                <FontAwesome name="gear" size={16} color="black" />
                            </View>
                        </View>
                        </TouchableHighlight>
                    </View>
                </View>

                <View>
                    <H1 style={styles.membersTitle}>Members</H1>
                    <View style={styles.listMembersContainer}>
                        {members}

                        <View style={styles.member}>
                            <TouchableHighlight onPress={() => navigate('DojoQRCode')}>
                                <Thumbnail large source={ normalButton }></Thumbnail>
                            </TouchableHighlight>
                            <Text>Add member</Text>
                        </View>

                    </View>
                </View>
            </Content>
        </Container>
    )};
}

const styles = StyleSheet.create({

  container: {
    backgroundColor: 'white'
  },

  qr: {
    marginTop: '5%',
    marginBottom: '5%',
    alignItems: 'center',
    justifyContent: 'center'
  },

  leaveButton: {
    backgroundColor: '#c02b2b'
  },

  membersTitle: {
      marginLeft: 10
  },

  member: {
      margin: 20,
      justifyContent: 'center',
      alignItems: 'center'
  },

  listMembersContainer: {
      flex: 1,
      flexDirection: 'row',
      flexWrap: "wrap",
      justifyContent: "space-around"
  },

  dojoContainer: {
      flex: 1,
      flexDirection: 'column'
  },

  dojoHeadContainer: {
      marginTop: 10,
      marginBottom: 30
  },

  dojoHead: {
      justifyContent: 'center',
      alignItems: 'center'
  },

  dojoImage: {
      width: 150,
      height: 150
  },

  dojoNameContainer: {
      flex: 1,
      flexDirection: 'row',
      flexWrap: "wrap",
      justifyContent: "center",
      alignItems: "center"
  },

  dojoName: {
      paddingLeft: 10,
      paddingRight: 10
  }
});
