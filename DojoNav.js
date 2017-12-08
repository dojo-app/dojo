import { StackNavigator } from 'react-navigation';
import { JoinDojoScreen } from './JoinDojoScreen';
import { NotInDojoScreen } from './NotInDojoScreen';
import { CreateDojoScreen } from './CreateDojoScreen';

const options = {  };

export const DojoNav = StackNavigator(
  {
    NotInDojo: { screen: NotInDojoScreen },
    JoinDojo: { screen: JoinDojoScreen },
    CreateDojo: { screen: CreateDojoScreen }
  },
  options
);
