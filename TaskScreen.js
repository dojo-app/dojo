import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
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
  CardItem
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

  render() {
    const { navigate } = this.props.navigation;

    const tasks = this.props.screenProps.state.tasks.map(task => (
      <ListItem
        key={task.id}
        onPress={() => navigate('TaskDetails', { task: task })}>
        <Text>{task.title}</Text>
      </ListItem>
    ));

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
          <Content>

          </Content>
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
  segment: {
    backgroundColor: 'white'
  },
  actionButtonIcon: {
    fontSize: 20,
    height: 22,
    color: 'white'
  }
});
