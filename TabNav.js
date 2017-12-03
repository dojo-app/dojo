import { TabNavigator } from 'react-navigation';
import { TaskScreen } from './TaskScreen';
import { BillScreen } from './BillScreen';
import { DojoScreen } from './DojoScreen';
import { ProfileScreen } from './ProfileScreen';
import * as theme from './public/styles/theme';

//import * as theme from './styles/theme';

import { Platform } from 'react-native';

const options = {
  tabBarPosition: 'bottom',
  animationEnabled: true,
  activeTintColor: '#c02b2b',
  navigationOptions: {
    headerStyle: {
      marginTop: Platform.OS === 'ios' ? 0 : 24
    }
  },
  tabBarOptions: {
    showIcon: true,
    activeTintColor: theme.COLORS.primary, // done for label and icon (but icon used in tabs are Expo ones so it doesn't affect them)
    inactiveTintColor: theme.COLORS.default,
    labelStyle: {
      fontSize: 10
    },
    indicatorStyle: {
      backgroundColor: 'white'
    },
    style: {
      backgroundColor: 'white',
      height: Platform.OS === 'ios' ? 50 : 60
    }
  }
};

export const TabNav = TabNavigator(
  {
    Tasks: { screen: TaskScreen },
    Bills: { screen: BillScreen },
    Dojo: { screen: DojoScreen },
    Profile: { screen: ProfileScreen }
  },
  options
);
