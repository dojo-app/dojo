import React, { Component } from 'react';
import { StyleSheet, Image, View, Keyboard } from 'react-native';
import {
  Container,
  Header,
  Content,
  Footer,
  Button,
  Icon,
  Text,
  Item,
  Input
} from 'native-base';
import * as firebase from 'firebase';
import { ViewProfile } from './component/Profile';

export class ProfileScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editMode: false,
      displayName: this.props.screenProps.state.user.displayName,
      email: this.props.screenProps.state.user.email,
      phoneNumber: this.props.screenProps.state.user.phoneNumber,
      aboutMe: ''
    };

    this.editMode = this.editMode.bind(this);
    this.updateChanges = this.updateChanges.bind(this);
    this.cancelUpdate = this.cancelUpdate.bind(this);
  }

  static navigationOptions = ({ navigation }) => ({
    title: 'Profile',
    headerTintColor: '#c02b2b',

    tabBarIcon: ({ tintColor, focused }) => (
      <Icon
        name={focused ? 'ios-person' : 'ios-person-outline'}
        style={{ color: tintColor }}
      />
    )
  });

  editMode() {
    this.setState({
      editMode: true
    });
  }

  cancelUpdate() {
    this.setState({
      editMode: false
    });
  }

  updateChanges() {
    // TODO: fix App.js 's user from overwriting data
    // let user = this.props.screenProps.state.user.uid;

    this.setState({
      editMode: false
    });

    // firebase
    //   .database()
    //   .ref(`users/${user}`)
    //   .update({
    //     name: this.state.displayName,
    //     phoneNumber: this.state.phoneNumber
    //   });
  }

  componentWillUnmount() {
    this.editMode = undefined;
    this.updateChanges = undefined;
    this.cancelUpdate = undefined;

    if (this.state.editMode) {
      this.setState({
        editMode: false
      });
    }

  }

  render() {
    let profContainer;
    if (this.state.editMode) {
      profContainer  = (
        <EditProfile user={ this.props.screenProps.state.user }
        updateChange={ this.updateChanges } state={ this } cancel={ this.cancelUpdate } />
      );
    }
    else {
      profContainer = (
          <ViewProfile user={ this.props.screenProps.state.user }
            editMode={ this.editMode } />
      );
    }

    return (profContainer);
  }
}


const EditProfile = ({user, updateChange, state, cancel}) => (
  <Container style={ styles.container } scrollEnabled={false}
      enableAutoAutomaticScroll={false}>
    <Image style={ styles.profilePicture }
      source={{ uri:user.photoURL }} />

    <Content style={ styles.content } scrollEnabled={false}>
      <Item>
        <Icon active name='ios-person' />
        <Input placeholder={ user.displayName } 
          onChangeText={(displayName) => state.setState({ displayName: displayName })}/>
      </Item>
      <Item>
        <Icon active name='ios-call' />
        <Input placeholder={ user.phoneNumber } keyboardType={'numeric'} 
          onChangeText={(phoneNumber) => state.setState({ phoneNumber: phoneNumber })} />
      </Item>
    </Content>

    <Footer style={ styles.footer }>
      <Button light style={ styles.cancelButton } onPress={ cancel }>
        <Text>Cancel</Text>
      </Button>
      <Button success style={ styles.button } onPress={ updateChange }>
        <Text>Save</Text>
      </Button>
    </Footer>
  </Container>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center'
  },
  profilePicture: {
    height: 150,
    width: 150,
    borderRadius: 75,
    marginBottom: 10
  },
  displayName: {
    fontSize: 20,
    fontWeight: 'bold'
  },
  fieldName: {
    fontWeight: 'bold',
    marginBottom: 5
  },
  content: {
    flex: 1,
    margin: 25,
    padding: 10,
    backgroundColor: 'white',
    alignSelf: 'stretch',
    borderStyle: 'solid',
    borderTopWidth: 2,
    borderBottomWidth: 2
  },
  cancelButton: {
    margin: 10,
    backgroundColor: '#d3d3d3'
  },
  button: {
    margin: 10,
    backgroundColor: '#c02b2b'
  },
  footer: {
    backgroundColor: 'white',
    borderTopWidth: 0
  }
});
