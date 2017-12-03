import React, { Component } from 'react';
import {
  Alert,
  StyleSheet,
  Image,
  TouchableWithoutFeedback,
  View,
  TouchableOpacity,
} from 'react-native';
import { Container, Content, Button, Text, Spinner } from 'native-base';
import { BarCodeScanner, Permissions } from 'expo';
import { secret } from './secret';
import Expo from 'expo';
import * as firebase from 'firebase';

// TODO for deployment to standalone app, need to do stuff : https://docs.expo.io/versions/latest/sdk/google.html

export class JoinDojoScreen extends React.Component {
  static navigationOptions = {
    title: 'Scan QR Code '
  };

  constructor(props) {
    super(props);

    this.state = {
      hasCameraPermission: null
    };
  }

  async componentWillMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === 'granted' });
  }

  render() {
    const { hasCameraPermission } = this.state;

    if (hasCameraPermission === null) {
      return (
        <Container>
          <Text>Requesting for camera permission</Text>
          <Spinner color="black" />
        </Container>
      );
    } else if (hasCameraPermission === false) {
      return <Text>Please allow camera permission in your settings.</Text>;
    } else {
      return (
        <View style={{ flex: 1 }}>
          <Text>Test test test</Text>
          <BarCodeScanner
            onBarCodeRead={this._handleBarCodeRead}
            style={StyleSheet.absoluteFill}>
            <View
              style={{
                flex: 1,
                backgroundColor: 'transparent',
                flexDirection: 'row'
              }}>
              <TouchableOpacity
                style={{
                  flex: 0.1,
                  alignSelf: 'flex-end',
                  alignItems: 'center'
                }}
                onPress={() => {
                  this.props.navigation.goBack();
                }}>
                <Text style={{ color: 'white' }}>Back</Text>
              </TouchableOpacity>
            </View>
          </BarCodeScanner>
        </View>
      );
    }
  }

  _handleBarCodeRead = ({ type, data }) => {
    //alert(`Bar code with type ${type} and data ${data} has been scanned!`);
    console.log(
      `Bar code with type ${type} and data ${data} has been scanned!`
    );
    const dojoIdRead = data;

    // check if dojo read exists
    firebase
      .database()
      .ref('dojos')
      .child(dojoIdRead)
      .once('value')
      .then(snapshot => {
        if (snapshot.exists()) {
          // if the scanned qrcode matches a existing dojo
          //Updating Users collection
          let refUserDojo = firebase
            .database()
            .ref('users')
            .child(this.props.screenProps.state.user.uid)
            .child('dojo');
          refUserDojo.set(dojoIdRead);

          //Updating Dojo collection
          let refDojoUserIds = firebase
            .database()
            .ref('dojos')
            .child(dojoIdRead)
            .child('users')
            .update({ [this.props.screenProps.state.user.uid]: true });
        }
      });
  };
}
