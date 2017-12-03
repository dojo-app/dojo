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

      // <Container style={styles.container}>
      //   <Content>
      //
      //       <Grid>
      //             <Row>
      //                 <Col style={{ backgroundColor: '#635DB7', height: 200 }}></Col>
      //                 <Col style={{ backgroundColor: '#00CE9F', height: 200 }}></Col>
      //             </Row>
      //       </Grid>
      //
      //     // <Text>dojo id: {this.props.screenProps.state.dojo}</Text>
      //     // <Body style={styles.qr}>
      //     //   <QRCode
      //     //     value={this.props.screenProps.state.dojo}
      //     //     size={240}
      //     //     bgColor="black"
      //     //     fgColor="white"
      //     //   />
      //     // </Body>
      //     // <List>
      //     //   <ListItem itemDivider>
      //     //     <Text>Users:</Text>
      //     //   </ListItem>
      //     //   {users}
      //     // </List>
      //     // <Button full danger large onPress={() => this.leaveDojo()}>
      //     //   <Text>Leave Dojo</Text>
      //     // </Button>
      //   </Content>
      // </Container>
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
