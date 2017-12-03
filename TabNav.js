import { TabNavigator } from 'react-navigation';
import { TaskScreen } from './TaskScreen';
import { BillScreen } from './BillScreen';
import { DojoScreen } from './DojoScreen';
import { ProfileScreen } from './ProfileScreen';

import { Platform } from 'react-native';

const options = {
  tabBarPosition: 'bottom',
  activeTintColor: '#c02b2b',
  navigationOptions: {
    headerStyle: {
      marginTop: Platform.OS === 'ios' ? 0 : 24
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
