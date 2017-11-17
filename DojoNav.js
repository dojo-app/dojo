import { StackNavigator } from 'react-navigation';
import { JoinDojoScreen } from './JoinDojoScreen';
import { NotInDojoScreen } from './NotInDojoScreen';

const options = {};

export const DojoNav = StackNavigator(
  {
    NotInDojo: { screen: NotInDojoScreen },
    JoinDojo: { screen: JoinDojoScreen }
  },
  options
);
