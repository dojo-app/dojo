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
      loading: true,
      segment: 'ASSIGNED_TO_ME'
    };
  }

  static navigationOptions = ({ navigation }) => ({
    title: 'Tasks',

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
          <Text style={styles.strikethrough}>{title}</Text>
        </View>
      );
    } else {
      return (
        <View style={styles.view}>
          <Thumbnail
            style={styles.thumbnail}
            source={require('./checkmark_false.png')}
          />
          <Text>{title}</Text>
        </View>
      );
    }
  }

  // creates an object of list items from array
  createList(array) {
    const { navigate } = this.props.navigation;
    var list = array.map(task => (
      <ListItem
        style={{ marginLeft: 0 }}
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

    const noTasks = (
      <View>
        <ListItem style={styles.center}>
          <Text style={styles.center}> No Tasks to Display </Text>
        </ListItem>
      </View>
    );

    const AssignedByMe = (
      <Content>
        <Container style={styles.container}>
          <Content>
            <List>
              {assignedByMeArray.length != 0 ? assignedByMeList : noTasks}
            </List>
          </Content>
        </Container>
      </Content>
    );

    const AssignedToMe = (
      <Content>
        <Container style={styles.container}>
          <Content>
            <List>
              {assignedToMeArray.length != 0 ? assignedToMeList : noTasks}
            </List>
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
                backgroundColor:
                  this.state.segment === 'ASSIGNED_TO_ME'
                    ? '#c02b2b'
                    : undefined,
                borderColor: '#c02b2b'
              }}
              first
              active={this.state.segment === 'ASSIGNED_TO_ME'}
              onPress={() => {
                if (this.state.segment !== 'ASSIGNED_TO_ME') {
                  this.setState({ segment: 'ASSIGNED_TO_ME' });
                }
              }}>
              <Text
                style={{
                  color:
                    this.state.segment === 'ASSIGNED_TO_ME' ? '#FFF' : '#c02b2b'
                }}>
                Assigned To Me
              </Text>
            </Button>
            <Button
              last
              style={{
                backgroundColor:
                  this.state.segment === 'ASSIGNED_BY_ME'
                    ? '#c02b2b'
                    : undefined,
                borderColor: '#c02b2b'
              }}
              active={this.state.segment === 'ASSIGNED_BY_ME'}
              onPress={() => {
                if (this.state.segment !== 'ASSIGNED_BY_ME') {
                  this.setState({ segment: 'ASSIGNED_BY_ME' });
                }
              }}>
              <Text
                style={{
                  color:
                    this.state.segment === 'ASSIGNED_BY_ME' ? '#FFF' : '#c02b2b'
                }}>
                Assigned By Me
              </Text>
            </Button>
          </Segment>
        </Header>
        {this.state.segment === 'ASSIGNED_TO_ME' ? AssignedToMe : AssignedByMe}
        <ActionButton
          buttonColor="#c02b2b"
          onPress={() => navigate('AddTask')}
        />
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'flex-end',
    justifyContent: 'flex-end'
  },
  container: {
    flex: 1,
    backgroundColor: 'white'
  },

  listItem: {
    borderBottomWidth: 1,
    padding: 0,
    margin: 0
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
    marginRight: 12,
    marginLeft: 12
  }
});
