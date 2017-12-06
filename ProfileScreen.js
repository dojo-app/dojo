import React, { Component } from 'react';
import { StyleSheet,
  Image, 
  View, 
  Keyboard, 
  Alert } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import DatePicker from 'react-native-datepicker';
import {
  Container,
  Header,
  Content,
  Footer,
  Button,
  Icon,
  Text,
  Item,
  Input,
  Form
} from 'native-base';
import * as firebase from 'firebase';
import { ViewProfile } from './component/Profile';
import { FontAwesome, Ionicons } from '@expo/vector-icons';

export class ProfileScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editMode: false,
      displayName: this.props.screenProps.state.user.name,
      email: this.props.screenProps.state.user.email,
      phoneNumber: this.props.screenProps.state.user.phoneNumber,
      aboutMe: this.props.screenProps.state.user.aboutMe,
      date: this.props.screenProps.state.user.birthDate,
      height: 40,
      currChar: 0
    };

    if (this.state.aboutMe)
    {
      count = String(this.state.aboutMe).length;
      this.state.currChar = count;
    }

    this.editMode = this.editMode.bind(this);
    this.resetMode = this.resetMode.bind(this);
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

  resetMode() {
    this.setState({
      editMode: false
    });
  }

  validateFields = () => {
    let desc = this.state.aboutMe;
    let length = 0;
    if (desc)
      length = String(desc).length

    if (length > 121) {
      Alert.alert("Max character limit for your about me is 120. Please shorten your description.");
      return false;
    }

    if (!this.state.displayName) {
      Alert.alert("Your name cannot be blank! Please enter a name.");
      return false;
    }

    return true;
  }

  updateChanges = () => {
    let key = this.props.screenProps.state.user.uid;
    let dojoRef = 
      firebase
        .database()
        .ref('dojos')
        .child(this.props.screenProps.state.dojo);

    firebase
      .database()
      .ref('users/')
      .child(key)
      .update({
        name: this.state.displayName,
        phoneNumber: this.state.phoneNumber,
        birthDate: this.state.date,
        aboutMe: this.state.aboutMe
      });

    dojoRef
      .child('users')
      .update({ [key]: false });

    dojoRef
      .child('users')
      .update({ [key]: true });

    this.resetMode();
  }

  updateSize = (height) => {
    this.setState({
      height
    });
  }

  getTodaysDate = () => {
    let date = new Date();
    let day = date.getDate();
    let month = (date.getMonth()+1);
    let year = date.getFullYear();

    if (day < 10)
      day = "0" + day;

    if (month < 10)
      month = "0" + month;

    let today = month + '-' + day + '-' + year;
    return today;
  }

  componentWillUnmount() {
    this.editMode = undefined;
    this.resetMode = undefined;

    if (this.state.editMode) {
      this.setState({
        editMode: false
      });
    }
  }

  // TODO: character count for about me

  render() {
    let today = this.getTodaysDate();
    let user = this.props.screenProps.state.user;
    let desc = this.state.aboutMe;
    let name = this.state.displayName;
    let phoneNumber = this.state.phoneNumber;
    const {height} = this.state;
    let newStyle = {
      height
    }

    if (this.state.editMode) {
      return (
        <Content keyboardShouldPersistTaps={'handled'}
          style={{ backgroundColor: 'white' }}>
          <KeyboardAwareScrollView
            style={{ backgroundColor: 'white' }}
            resetScrollToCoords={{ x: 0, y: 0 }}
            contentContainerStyle={ styles.container }>
            <Image
              style={ styles.profilePicture }
              source={{ uri:user.photoURL }} />

            <View
              style={ styles.content }
              >
              <Item>
                <Icon active name='ios-person' />
                <Input
                  value={name}
                  placeholder="Name"
                  onChangeText={(displayName) => this.setState({ displayName: displayName })} />
              </Item>
              <Item>
                <Icon active name='ios-call' />
                <Input
                  value={phoneNumber}
                  placeholder="Phone Number"
                  keyboardType={'numeric'} 
                  onChangeText={(phoneNumber) => this.setState({ phoneNumber: phoneNumber })} />
              </Item>
              <Item>
                <FontAwesome name="birthday-cake" size={16}  color="black"
                  style={{ marginRight: 8 }} />
                <DatePicker
                  format="MM-DD-YYYY"
                  maxDate={today}
                  date={this.state.date}
                  placeholder="Select Date"
                  mode="date"
                  showIcon={false}
                  confirmBtnText='Submit'
                  cancelBtnText='Cancel'
                  customStyles={{
                    dateInput: {
                      borderLeftWidth: 0,
                      borderRightWidth: 0,
                      borderTopWidth: 0,
                      borderBottomWidth: 0,
                      alignItems: 'flex-start',
                      marginLeft: 5
                    },
                    dateText: {
                      fontSize: 16
                    },
                    placeholderText: {
                      fontSize: 16
                    }
                  }}
                  onDateChange={(newDate) => this.setState({date: newDate})}
                />
              </Item>
              <Item style={{ marginTop: 10 }}>
                <Icon active name='ios-information-circle' />
                <Input 
                  placeholder="Describe yourself!"
                  value={desc}
                  multiline={true}
                  style={[newStyle]}
                  onContentSizeChange={(e) => this.updateSize(e.nativeEvent.contentSize.height)}
                  onChangeText={(desc) => {
                    currChar = String(desc).length
                    this.setState({ aboutMe: desc, currChar: currChar });
                  }} />
              </Item>
              <Text style={{ fontSize: 10.5, alignSelf: 'flex-end' }}>
                {this.state.currChar} / 120
              </Text>
            </View>

            <View style={ styles.footer }>
              <Button light
                style={ styles.cancelButton } 
                onPress={ this.resetMode }>
                <Text>Cancel</Text>
              </Button>
              <Button 
                style={ styles.button } 
                onPress={ () => {
                  if (this.validateFields())
                    this.updateChanges();
                }}>
                <Text style={{ color: 'white' }}>Save</Text>
              </Button>
            </View>
          </KeyboardAwareScrollView>
          </Content>
      );
    }
    else {
      return (
        <ViewProfile user={ this.props.screenProps.state.user }
            editMode={ this.editMode } />
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
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
    flex: 4,
    margin: 25,
    padding: 10,
    alignSelf: 'stretch',
    borderStyle: 'solid',
    borderTopWidth: 2,
    borderBottomWidth: 2,
    borderColor: '#c02b2b'
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
    flex: 1,
    flexDirection: 'row'
  }
});
