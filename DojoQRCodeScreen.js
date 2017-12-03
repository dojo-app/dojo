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

import { StyleSheet, View } from 'react-native';

import * as firebase from 'firebase';
import QRCode from 'react-native-qrcode';

export class DojoQRCodeScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'Add User',
  });

  render() {

    const { navigate } = this.props.navigation;

    return (

        <Container style={styles.container}>
            <Content>
                <Body style={styles.qr}>
                      <QRCode
                        value={this.props.screenProps.state.dojo}
                        size={300}
                        bgColor="black"
                        fgColor="white"
                      />
                </Body>
            </Content>
        </Container>
    );
  }
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'white',
  },

  qr: {
    marginTop: '25%',
    alignItems: 'center',
    justifyContent: 'center'
  },

});
