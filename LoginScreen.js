import React, { Component } from 'react';
import {Alert, StyleSheet} from 'react-native';
import { Container, Header, Content, Footer, FooterTab, Icon, Text, Left, Body, Title, Right, List, ListItem, Switch, Button } from 'native-base';
import { secret } from './secret';
import Expo from 'expo';

// TODO for deployment to standalone app, need to do stuff : https://docs.expo.io/versions/latest/sdk/google.html
async function signInWithGoogleAsync() {
  try {
    const result = await Expo.Google.logInAsync({
      androidClientId: secret.googleAndroidClientID,
      scopes: ['profile', 'email'],
    });

    if (result.type === 'success') {
      Alert.alert(result.accessToken)
      return result.accessToken;
    } else {
      return {cancelled: true};
    }
  } catch(e) {
    return {error: true};
}
}


export class LoginScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'Login Screen',
    /*
    headerRight: (
      <Button transparent onPress={() => navigation.navigate('AddBill')}>
        <Text>Add Bill</Text>
      </Button>
    ),
    */

    //TODO: Change the icon
    tabBarIcon: ({ tintColor, focused }) => (
      <Icon
        name={focused ? 'ios-home' : 'ios-home-outline'}
        style={{ color: tintColor }}
      />
    ),

  });

  render() {
    return (
      <Container>
        <Content>
            <Button style={styles.buttonSection} onPress={() => { signInWithGoogleAsync() }}>
                <Text style={styles.textSection}>
                    Sign-In
                </Text>
            </Button>
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  loginSection: {
        width: '100%',
        height: '30%',
  },

  buttonSection: {
      marginLeft: '20%',
      width: '60%'
  },

  textSection: {

  }

});
