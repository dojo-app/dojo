import React, { Component } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import {
  Container,
  Header,
  Content,
  Footer,
  FooterTab,
  Button,
  Icon,
  Text,
  Left,
  Body,
  Title,
  Right,
  Segment,
  List,
  ListItem,
  Switch,
  Card,
  CardItem,
  CheckBox,
  View,
  Thumbnail
} from 'native-base';
import * as firebase from 'firebase';
import ActionButton from 'react-native-action-button';
import { FontAwesome } from '@expo/vector-icons';

export class TaskScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true
    };
  }

  static navigationOptions = ({ navigation }) => ({
    title: 'Tasks',
    // headerTintColor: '#c02b2b',

    tabBarIcon: ({ tintColor, focused }) => (
      <Icon
        name={focused ? 'ios-list-box' : 'ios-list-box-outline'}
        style={{ color: tintColor }}
      />
    )
  });

  toggleCheck(bool, title) {
    if (bool) {
      return (
        <View style={styles.view}>
          <Thumbnail
            style={styles.thumbnail}
            source={require('./checkmark.png')}
          />
{/*          <CheckBox uncheckedIcon='circle-o' checkedIcon='dot-circle-o' color='#c02b2b' checked={this.state.checked} />
*/}          <Text style={styles.strikethrough}>{title}</Text>
        </View>
      );
    } else {
      return (
        <View style={styles.view}>
          <Thumbnail
            style={styles.thumbnail}
            source={require('./checkmark_false.png')}
          />
{/*          <CheckBox color='#c02b2b' checked={this.state.checked} />
*/}          <Text>{title}</Text>
        </View>
      );
    }
  }

  // creates an object of list items from array
  createList(array) {
    const { navigate } = this.props.navigation;
    var list = array.map(task => (


      <ListItem style={styles.listItem}
        key={task.id}
        onPress={() => navigate('TaskDetails', { task: task })}>
        <TouchableOpacity
          onPress={() => {
            var toggle = !task.checked;
            firebase
              .database()
              .ref('tasks')
              .child(task.id)
              .update({ checked: toggle });

            firebase
              .database()
              .ref('dojos')
              .child(this.props.screenProps.state.dojo)
              .child('tasks')
              .update({ [task.id]: toggle });
          }}>
          {this.toggleCheck(task.checked, task.title)}
        </TouchableOpacity>
      </ListItem>
    ));    
    return list;
  }

  render() {
    const { navigate } = this.props.navigation;

    // build array of tasks assigned by me
    const assignedByMeArray = this.props.screenProps.state.tasks.filter(
      task => {
        return task.source === this.props.screenProps.state.user.uid;
      }
    );

    // build array of tasks assigned to me
    const assignedToMeArray = this.props.screenProps.state.tasks.filter(
      task => {
        var uid = this.props.screenProps.state.user.uid;
        return task.users[uid];
      }
    );

    // create list items from array
    const assignedByMeList = this.createList(assignedByMeArray);

    const assignedToMeList = this.createList(assignedToMeArray);

    const AssignedByMe = (
      <Content>
        <Container style={styles.container}>
          <Content>
            <List>{assignedByMeList}</List>
          </Content>
        </Container>
      </Content>
    );

    const AssignedToMe = (
      <Content>
        <Container style={styles.container}>
          <Content>
            <List>{assignedToMeList}</List>
          </Content>
        </Container>
      </Content>
    );

    return (
      <Container style={styles.container}>
        <Header hasTabs style={styles.segment}>
          <Segment style={styles.segment}>
            <Button
              style={{
                backgroundColor: this.state.onList ? '#c02b2b' : undefined,
                borderColor: '#c02b2b'
              }}
              first
              active={this.state.onList}
              onPress={() => {
                if (!this.state.onList) {
                  this.setState({ onList: true });
                }
              }}>
              <Text style={{ color: this.state.onList ? '#FFF' : '#c02b2b' }}>
                Assigned By Me
              </Text>
            </Button>
            <Button
              last
              style={{
                backgroundColor: !this.state.onList ? '#c02b2b' : undefined,
                borderColor: '#c02b2b'
              }}
              active={!this.state.onList}
              onPress={() => {
                if (this.state.onList) {
                  this.setState({ onList: false });
                }
              }}>
              <Text style={{ color: !this.state.onList ? '#FFF' : '#c02b2b' }}>
                Assigned To Me
              </Text>
            </Button>
          </Segment>
        </Header>
        {this.state.onList ? AssignedByMe : AssignedToMe}
        <ActionButton
          buttonColor="#c02b2b"
          onPress={() => navigate('AddTask')}
        />
      </Container>
      /*
      <Container style={styles.container}>
        <Content>
          <List>{tasks}</List>
        </Content>
        <ActionButton
          buttonColor="#c02b2b"
          onPress={() => this.props.navigation.navigate('AddTask')}
        />
      </Container>
      */
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  },

  container1: {
    // borderWidth: 1,
    // borderWidth: 1,
    // borderColor: '#c02b2b'    
  },

  listItem: {
    borderBottomWidth: 1,
    borderColor: '#c02b2b',
    padding: 0,
    margin: 0     
    // borderTopWidth: 1,
    // borderBottomWidth: 1,
    // borderBottomColor: '#c02b2b'
    //display: 'flex',
    //flexWrap: 'nowrap'

  },
  strikethrough: {
    textDecorationLine: 'line-through'
  },
  segment: {
    backgroundColor: 'white'
  },
  seg: {
    backgroundColor: 'green'
  },
  actionButtonIcon: {
    fontSize: 20,
    height: 22,
    color: 'white'
  },
  view: {
    //flexWrap: 'nowrap'
    flex: 10,
    flexDirection: 'row',
    //justifyContent: 'center',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  list: {
    flexWrap: 'nowrap'
  },
  thumbnail: {
    marginRight: 12
  }
});
