import React, { Component } from "react";
import { StyleSheet, Image, View, Keyboard, Alert } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import DatePicker from "react-native-datepicker";
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
} from "native-base";
import * as firebase from "firebase";
import { ViewProfile } from "./component/Profile";
import { FontAwesome, Ionicons } from "@expo/vector-icons";

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

    if (this.state.aboutMe) {
      count = String(this.state.aboutMe).length;
      this.state.currChar = count;
    }
  }

  static navigationOptions = ({ navigation }) => ({
    title: "Profile",

    tabBarIcon: ({ tintColor, focused }) => (
      <Icon
        name={focused ? "ios-person" : "ios-person-outline"}
        style={{ color: tintColor }}
      />
    )
  });

  editState = () => {
    this.setState({
      editMode: true
    });
  };

  // User canceled updated, reset all fields to their values prior to modifications
  resetMode = () => {
    let descLength = this.props.screenProps.state.user.aboutMe.length;

    this.setState({
      editMode: false,
      displayName: this.props.screenProps.state.user.name,
      email: this.props.screenProps.state.user.email,
      phoneNumber: this.props.screenProps.state.user.phoneNumber,
      aboutMe: this.props.screenProps.state.user.aboutMe,
      currChar: descLength
    });
  };

  validateFields = () => {
    let desc = this.state.aboutMe;
    let length = 0;
    if (desc) length = String(desc).length;

    if (length > 121) {
      Alert.alert(
        "Max character limit for your about me is 120. Please shorten your description."
      );
      return false;
    }

    if (!this.state.displayName) {
      Alert.alert("Your name cannot be blank! Please enter a name.");
      return false;
    }

    if (this.state.phoneNumber) {
      let unformattedPhone = this.state.phoneNumber.replace(/-/g, "");

      // User is allowed to leave phone number field blank
      if (unformattedPhone.length == 0) return true;
      if (unformattedPhone.length > 10 || unformattedPhone.length < 10) {
        Alert.alert("Invalid phone number. Please check your number.");
        return false;
      }
    }

    return true;
  };

  updateChanges = () => {
    let key = this.props.screenProps.state.user.uid;
    let dojoRef = firebase
      .database()
      .ref("dojos")
      .child(this.props.screenProps.state.dojo);

    let name = this.state.displayName;
    let phone = this.state.phoneNumber;
    let birth = this.state.date;
    let desc = this.state.aboutMe;

    if (!name) name = "";
    if (!phone) phone = "";
    if (!birth) birth = "";
    if (!desc) desc = "";

    firebase
      .database()
      .ref("users/")
      .child(key)
      .update({
        name: name,
        phoneNumber: phone,
        birthDate: birth,
        aboutMe: desc
      });

    dojoRef.child("users").update({ [key]: false });

    dojoRef.child("users").update({ [key]: true });

    this.setState({
      editMode: false
    });
  };

  updateSize = height => {
    this.setState({
      height
    });
  };

  /*
    Helper method for DatePicker to set maxDate to today's date.
    Users are not allowed to set birthday into the future.
  */
  getTodaysDate = () => {
    let date = new Date();
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();

    if (day < 10) day = "0" + day;

    if (month < 10) month = "0" + month;

    let today = month + "-" + day + "-" + year;
    return today;
  };

  // Helper method for formatting phone number as user types
  formatPhoneNumber = phoneNumber => {
    // Check if user is typing or deleting
    if (this.state.phoneNumber.length <= phoneNumber.length) {
      // If user is typing, append the hyphens
      if (phoneNumber.length == 3 || phoneNumber.length == 7)
        phoneNumber += "-";
      else if (phoneNumber.length == 4 || phoneNumber.length == 8) {
        // If user deleted and decides to type again, fill in the hyphens again
        phoneNumber =
          phoneNumber.substring(0, phoneNumber.length - 1) +
          "-" +
          phoneNumber.substring(phoneNumber.length - 1, phoneNumber.length);
      }
    } else {
      // User is deleting from input, remove hyphens
      if (phoneNumber.length == 4 || phoneNumber.length == 8)
        phoneNumber = phoneNumber.substring(0, phoneNumber.length - 1);
    }

    this.setState({
      phoneNumber: phoneNumber
    });
  };

  componentWillUnmount() {
    if (this.state.editMode) {
      this.setState({
        editMode: false
      });
    }
  }

  render() {
    let today = this.getTodaysDate();
    let user = this.props.screenProps.state.user;
    let desc = this.state.aboutMe;
    let name = this.state.displayName;
    let phoneNumber = this.state.phoneNumber;
    const { height } = this.state;
    let newStyle = {
      height
    };

    if (this.state.editMode) {
      return (
        <Content
          keyboardShouldPersistTaps={"handled"}
          style={{ backgroundColor: "white" }}
        >
          <KeyboardAwareScrollView
            style={{ backgroundColor: "white" }}
            resetScrollToCoords={{ x: 0, y: 0 }}
            contentContainerStyle={styles.container}
          >
            <Image
              style={styles.profilePicture}
              source={{ uri: user.photoURL }}
            />

            <View style={styles.content}>
              <Item>
                <Icon active name="ios-person" />
                <Input
                  value={name}
                  placeholder="Name"
                  onChangeText={displayName => {
                    this.setState({ displayName: displayName });
                  }}
                />
              </Item>
              <Item>
                <Icon active name="ios-call" />
                <Input
                  value={phoneNumber}
                  placeholder="123-456-7890"
                  keyboardType={"numeric"}
                  onChangeText={phoneNumber => {
                    this.formatPhoneNumber(phoneNumber);
                  }}
                />
              </Item>
              <Item>
                <FontAwesome
                  name="birthday-cake"
                  size={16}
                  color="black"
                  style={{ marginRight: 8 }}
                />
                <DatePicker
                  format="MM-DD-YYYY"
                  maxDate={today}
                  date={this.state.date}
                  placeholder="Select Date"
                  mode="date"
                  showIcon={false}
                  confirmBtnText="Submit"
                  cancelBtnText="Cancel"
                  customStyles={{
                    dateInput: {
                      borderLeftWidth: 0,
                      borderRightWidth: 0,
                      borderTopWidth: 0,
                      borderBottomWidth: 0,
                      alignItems: "flex-start",
                      marginLeft: 5
                    },
                    dateText: {
                      fontSize: 16
                    },
                    placeholderText: {
                      fontSize: 16
                    }
                  }}
                  onDateChange={newDate => {
                    this.setState({ date: newDate });
                  }}
                />
              </Item>
              <Item style={{ marginTop: 10 }}>
                <Icon active name="ios-information-circle" />
                <Input
                  placeholder="Describe yourself!"
                  value={desc}
                  multiline={true}
                  style={[newStyle]}
                  onContentSizeChange={e => {
                    this.updateSize(e.nativeEvent.contentSize.height);
                  }}
                  onChangeText={desc => {
                    currChar = String(desc).length;
                    this.setState({ aboutMe: desc, currChar: currChar });
                  }}
                />
              </Item>
              <Text style={{ fontSize: 10.5, alignSelf: "flex-end" }}>
                {this.state.currChar} / 120
              </Text>
            </View>

            <View style={styles.footer}>
              <Button
                style={styles.cancelButton}
                onPress={() => {
                  this.resetMode();
                }}
              >
                <Text>Cancel</Text>
              </Button>
              <Button
                style={styles.button}
                onPress={() => {
                  if (this.validateFields()) this.updateChanges();
                }}>
                <Text style={{ color: "white" }}>Save</Text>
              </Button>
            </View>
          </KeyboardAwareScrollView>
        </Content>
      );
    } else {
      return (
        <ViewProfile
          user={this.props.screenProps.state.user}
          editMode={this.editState}
        />
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center"
  },
  profilePicture: {
    height: 120,
    width: 120,
    borderRadius: 60,
    marginBottom: 10,
    marginTop: 20
  },
  displayName: {
    fontSize: 20,
    fontWeight: "bold"
  },
  fieldName: {
    fontWeight: "bold",
    marginBottom: 5
  },
  content: {
    flex: 4,
    margin: 25,
    padding: 10,
    alignSelf: "stretch",
    borderStyle: "solid",
    borderTopWidth: 2,
    borderBottomWidth: 2,
    borderColor: "#c02b2b"
  },
  cancelButton: {
    margin: 10,
    backgroundColor: "#bebebe"
  },
  button: {
    margin: 10,
    backgroundColor: "#c02b2b"
  },
  footer: {
    flex: 1,
    flexDirection: "row"
  }
});
