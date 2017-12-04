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

export class TaskScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: true
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

  /*
  toggleCheck(bool, title) {
    if (bool) {
      return (
        <View>
          <Thumbnail source={require('./checkmark.png')} />
          <Text style={styles.strikethrough}>{title}</Text>
        </View>
      );
    } else {
      return (
        <View>
          <Thumbnail source={require('./checkmark_false.png')} />
          <Text>{title}</Text>
        </View>
      );
    }
  }
  */
  toggleCheck(bool, title) {
    if (bool) {
      return (
        <View style={styles.view}>
          <Thumbnail source={require('./checkmark.png')} />
          <Text style={styles.strikethrough}>{title}</Text>
        </View>
      );
    } else {
      return (
        <View style={styles.view}>
          <Thumbnail source={require('./checkmark_false.png')} />
          <Text>{title}</Text>
        </View>
      );
    }
  }

  render() {
    const { navigate } = this.props.navigation;

    const tasks = this.props.screenProps.state.tasks.map(task => (
      <ListItem
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
    /*
<CheckBox
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
          }}
          checked={task.checked}
        />
        */

    const AssignedByMe = (
      <Content>
        <Container style={styles.container}>
          <Content>
            <List>{tasks}</List>
          </Content>
        </Container>
      </Content>
    );

    const AssignedToMe = (
      <Content>
        <Container style={styles.container}>
          <Content />
        </Container>
      </Content>
    );

    return (
      <Container style={styles.container}>
        <Header hasTabs style={styles.segment}>
          <Segment style={styles.segment}>
            <Button
              first
              active={this.state.onList}
              onPress={() => {
                if (!this.state.onList) {
                  this.setState({ onList: true });
                }
              }}>
              <Text>Assigned By Me</Text>
            </Button>
            <Button
              last
              active={!this.state.onList}
              onPress={() => {
                if (this.state.onList) {
                  this.setState({ onList: false });
                }
              }}>
              <Text>Assigned To Me</Text>
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
  listItem: {
    //display: 'flex',
    //flexWrap: 'nowrap'
  },
  strikethrough: {
    textDecorationLine: 'line-through'
  },
  segment: {
    backgroundColor: 'white'
  },
  actionButtonIcon: {
    fontSize: 20,
    height: 22,
    color: 'white'
  },
  view: {
    //flexWrap: 'nowrap'
    flexDirection: 'row'
  },
  list: {
    flexWrap: 'nowrap'
  }
});
