import React, { Component } from 'react';
import {
  Container,
  Header,
  Content,
  Button,
  Form,
  Item,
  Input,
  Label,
  Left,
  Text
} from 'native-base';
import * as firebase from 'firebase';

export class TaskDetailsScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      // editMode: false
    };
  }
  static navigationOptions = {
    title: 'Task Details'
  };

  render() {
    const users = this.props.screenProps.state.users.map(user => (
      <ListItem key={user.id}>
        <CheckBox
          checked={this.props.navigation.state.params.task.users[user.id]}
        />
        <Body>
          <Text>{user.name}</Text>
        </Body>
      </ListItem>
    ));

    return (
      <Container style={styles.container}>
        <Content>
          <Form>
            <Item fixedLabel>
              <Label>Title</Label>
              <Input
                disabled
                value={this.props.navigation.state.params.task.title}
              />
            </Item>

            <Item fixedLabel>
              <Label>Description</Label>
              <Input
                disabled
                value={this.props.navigation.state.params.task.description}
              />
            </Item>

            <ListItem itemDivider>
              <Body>
                <Text>Users</Text>
              </Body>
            </ListItem>

            {users}
          </Form>


          <Button
            large
            warning={!this.state.editMode}
            success={this.state.editMode}
            full
            onPress={() => {
              this.props.navigation.navigate('EditTask')
              // this.setState({ editMode: !this.state.editMode });
            }}
            ><Text>Edit Task</Text>

          </Button>

          <Button
            large
            color='#c02b2b'
            full
            onPress={() => this.props.navigation.goBack()}>
            <Text>Delete Task (not implemented)</Text>
          </Button>
                    
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  }
});

  render() {
    return (
      <Container>
        <Content>
          <Form>
            <Item fixedLabel disabled={!this.state.editMode}>
              <Label>Task Title</Label>
              <Input
                disabled={!this.state.editMode}
                value={this.props.navigation.state.params.task.title}
                onChangeText={text => this.setState({ taskTitle: text })}
              />
            </Item>
            <Item fixedLabel disabled={!this.state.editMode}>
              <Label>Task Description</Label>
              <Input
                disabled={!this.state.editMode}
                value={this.props.navigation.state.params.task.description}
                onChangeText={text => this.setState({ taskDescription: text })}
              />
            </Item>
            <Item fixedLabel disabled={!this.state.editMode}>
              <Label>Task Users</Label>
              <Input
                disabled={!this.state.editMode}
                value={this.props.navigation.state.params.task.users}
                onChangeText={text => this.setState({ taskUsers: text })}
              />
            </Item>
            <Item fixedLabel disabled={!this.state.editMode}>
              <Label>Task Due Date</Label>
              <Input
                disabled={!this.state.editMode}
                value={this.state.taskDueDate}
                onChangeText={text => this.setState({ taskDueDate: text })}
              />
            </Item>
          </Form>

          <Button
            large
            warning={!this.state.editMode}
            success={this.state.editMode}
            full
            onPress={() => {
              this.props.navigation.navigate('EditTask')
              // this.setState({ editMode: !this.state.editMode });
            }}
            ><Text>Edit Task</Text>

          </Button>

          <Button
            large
            color='#c02b2b'
            full
            onPress={() => this.props.navigation.goBack()}>
            <Text>Delete Task (not implemented)</Text>
          </Button>
        </Content>
      </Container>
    );
  }
}
