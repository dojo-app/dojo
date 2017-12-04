import React, { Component } from 'react';
import { StyleSheet, Image, View } from 'react-native';
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

export class ProfileScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editMode: false,
      displayName: this.props.screenProps.state.user.displayName,
      email: this.props.screenProps.state.user.email,
      phoneNumber: this.props.screenProps.state.user.phoneNumber
    };

    this.editMode = this.editMode.bind(this);
    this.updateChanges = this.updateChanges.bind(this);
  }

  static navigationOptions = ({ navigation }) => ({
    title: 'Profile',

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

  updateChanges() {
    let user = this.props.screenProps.state.user.uid;

    this.setState({
      editMode: false
    });

    firebase
      .database()
      .ref(`users/${user}`)
      .update({
        name: this.state.displayName,
        email: this.state.email,
        phoneNumber: this.state.phoneNumber
      });
  }

  componentWillUnmount() {
    this.editMode = undefined;
    this.updateChanges = undefined;
  }

  render() {
    // console.log("Phone number: ", this.props.screenProps.state.user);

    let profContainer;
    if (this.state.editMode) {
      profContainer  = (<EditProfile user={ this.props.screenProps.state.user }
        updateChange={ this.updateChanges } state={ this } />);
    }
    else {
      profContainer = (<ViewProfile user={ this.props.screenProps.state.user }
        editMode={ this.editMode } />);
    }

    return profContainer;
  }
}

const ViewProfile = ({user, editMode}) => (
  <Container style={ styles.container }>
    <Button iconLeft transparent dark style={{ alignSelf: 'flex-end' }}
      onPress={ editMode }>
      <Icon name='ios-create-outline' />
    </Button>

    <Image style={ styles.profilePicture }
      source={{ uri:user.photoURL }} />
    <Text style={ styles.displayName }>{ user.displayName }</Text>

    <Content scrollEnabled={false} keyboardShouldPersistTaps='always'
      enableAutoAutomaticScroll={false} style={ styles.content }>
      <Item>
        <Icon active name='ios-mail' />
        <Input disabled placeholder={ user.email }/>
      </Item>
      <Item>
        <Icon active name='ios-call' />
        <Input disabled placeholder={ user.phoneNumber }/>
      </Item>
    </Content>

    <Footer style={ styles.footer }>
      <Button iconLeft danger style={ styles.button }>
        <Icon name='ios-trash' />
        <Text>Delete Account</Text>
      </Button>
      <Button iconLeft light style={ styles.button }
        onPress={() => firebase.auth().signOut()}>
        <Icon name='ios-log-out' />
        <Text>Log Out</Text>
      </Button>
    </Footer>
  </Container>
);

const EditProfile = ({user, updateChange, state}) => (
  <Container style={ styles.container }>
    <Image style={ styles.profilePicture }
      source={{ uri:user.photoURL }} />

    <Content scrollEnabled={false} keyboardShouldPersistTaps='always'
      enableAutoAutomaticScroll={false} style={ styles.content }>
      <Item>
        <Icon active name='ios-person' />
        <Input placeholder={ user.displayName }
          onChangeText={(displayName) => state.setState({ displayName: displayName })}/>
      </Item>
      <Item>
        <Icon active name='ios-mail' />
        <Input placeholder={ user.email }
          onChangeText={(email) => state.setState({ email: email })}/>
      </Item>
      <Item>
        <Icon active name='ios-call' />
        <Input placeholder={ user.phoneNumber }
          onChangeText={(phoneNumber) => state.setState({ phoneNumber: phoneNumber })} />
      </Item>
    </Content>

    <Footer style={ styles.footer }>
      <Button success style={ styles.button } onPress={ updateChange }>
        <Text>Submit</Text>
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
  button: {
    margin: 10
  },
  footer: {
    backgroundColor: 'white',
    borderTopWidth: 0
  }
});
