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

export class DojoSettingsEditScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'Dojo Settings',
  });

  constructor(props) {
      super(props);
      this.state = { dojoName: this.props.screenProps.state.dojoName, dojoDescription: this.props.screenProps.state.dojoDescription };
  }

  save() {
      firebase
        .database()
        .ref(`dojos/${this.props.screenProps.state.dojo}`)
        .update({
          name: this.state.dojoName,
          description: this.state.dojoDescription
        });
  }

  render() {

    const { navigate } = this.props.navigation;

    return (

        <Container style={styles.container}>
            <Form>
                <Item fixedLabel>
                  <Label>Name</Label>
                  <Input
                    value={this.state.dojoName}
                    onChangeText={text => this.setState({ dojoName: text })}
                  />
                </Item>
                <Item fixedLabel>
                  <Label>Description</Label>
                  <Input
                    value={this.state.dojoDescription}
                     onChangeText={text => this.setState({ dojoDescription: text })}
                  />
                </Item>
            </Form>

            <View style={ styles.saveContainer }>
                <Button iconLeft block success
                  onPress={() => {
                      this.save();
                      this.props.navigation.goBack();
                  }}>
                  <Icon name='ios-share-outline' />
                  <Text>Save</Text>
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

  saveContainer: {
    marginTop: 20
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
    <View style={ styles.leaveContainer }>
        <Button iconLeft danger style={ styles.button } onPress={() => this.leaveDojo()}>
          <Icon name='ios-exit-outline' />
          <Text>Leave Dojo</Text>
        </Button>
    </View>
// </Container>
