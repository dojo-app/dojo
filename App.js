import React, { Component } from 'react';
import { Container, Header, Content, Footer, FooterTab, Button, Icon, Text, Left, Body, Title, Right, List, ListItem, Switch } from 'native-base';


export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      isReady: false
    };
  }

  async componentWillMount() {
    await Expo.Font.loadAsync({
      Roboto: require("native-base/Fonts/Roboto.ttf"),
      Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
      Ionicons: require("@expo/vector-icons/fonts/Ionicons.ttf")
    });

    this.setState({ isReady: true });
  }


  render() {
    if (!this.state.isReady) {
      return <Expo.AppLoading />;
    }
    return (
      <Container>
        <Header>
          <Body>
            <Title>Tasks</Title>
          </Body>
        </Header>
        <Content>
          <List>
            <ListItem icon>
              <Left>
                <Icon name="trash" />
              </Left>
              <Body>
                <Text>Throw out trash</Text>
              </Body>
              <Right>
                <Button transparent>
                  <Text>Done</Text>
                </Button>
              </Right>
            </ListItem>
          </List>
        </Content>
        <Footer>
          <FooterTab>
            <Button vertical active>
              <Icon active name="list" />
              <Text>Tasks</Text>
            </Button>
            <Button vertical>
              <Icon name="cash" />
              <Text>Bills</Text>
            </Button>
            <Button vertical>
              <Icon name="person" />
              <Text>Profile</Text>
            </Button>
            <Button vertical>
              <Icon name="settings" />
              <Text>Settings</Text>
            </Button>
          </FooterTab>
        </Footer>
      </Container>    
    );
  }

  
}
