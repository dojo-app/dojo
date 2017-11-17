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
        hasCameraPermission: null,
    };
  }

  async componentWillMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({hasCameraPermission: status === 'granted'});
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
    alert(`Bar code with type ${type} and data ${data} has been scanned!`);
    const dojoIdRead = data;


    //TODO tmp use user passed to component props
    //TODO when implemented, use : user = this.props.user
    const user = {
        "uid": "4M9Gui0NLoQg8bv4A3TM8u0wYs83",
        "first_name": "Simon",
        "last_name": "Li",
        "email": "john@email.com",
        "dojo_id": ""
    };

    //Updating Users collection
    let refUserDojo = firebase.database().ref('users').child(user.uid).child('dojo_id');
    refUserDojo.set(dojoIdRead);

    //Updating Dojo collection
    let refDojoUserIds = firebase.database().ref('dojos').child(dojoIdRead).child('user_ids');
    let newUserId = {}; newUserId[user.uid] = true;
    refDojoUserIds.update(newUserId);
  }
}
