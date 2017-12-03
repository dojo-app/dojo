import { TabNavigator } from 'react-navigation';
import { TaskScreen } from './TaskScreen';
import { BillScreen } from './BillScreen';
import { DojoScreen } from './DojoScreen';
import { ProfileScreen } from './ProfileScreen';

const options = {
  tabBarPosition: 'bottom'
};

export const TabNav = TabNavigator(
  {
    Tasks: { screen: TaskScreen },
    Bills: { screen: BillScreen },
    Dojo: { screen: DojoScreen },
    Profile: { screen: ProfileScreen }
  },
  {
    tabBarOptions: {
      activeTintColor: '#c02b2b',
    },
  },
  options
);
