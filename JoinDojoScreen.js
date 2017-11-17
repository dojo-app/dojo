import React, { Component } from 'react';
import {
  Alert,
  StyleSheet,
  Image,
  TouchableWithoutFeedback,
  Text,
  View
} from 'react-native';

import { BarCodeScanner, Permissions } from 'expo';
import { secret } from './secret';
import Expo from 'expo';
import * as firebase from 'firebase';

// TODO for deployment to standalone app, need to do stuff : https://docs.expo.io/versions/latest/sdk/google.html

export class JoinDojoScreen extends React.Component {
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
      return <Text>Requesting for camera permission</Text>;
    } else if (hasCameraPermission === false) {
      return <Text>No access to camera</Text>;
    } else {
      return (
        <View style={{ flex: 1 }}>
          <BarCodeScanner
            onBarCodeRead={this._handleBarCodeRead}
            style={StyleSheet.absoluteFill}
          />
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
