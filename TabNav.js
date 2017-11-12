import { TabNavigator } from 'react-navigation';
import { TaskScreen } from './TaskScreen';
import { BillScreen } from './BillScreen';
import { DashboardScreen } from './DashboardScreen';
import { ProfileScreen } from './ProfileScreen';

const options = {
  tabBarPosition: 'bottom'
};

export const TabNav = TabNavigator(
  {
    Tasks: { screen: TaskScreen },
    Bills: { screen: BillScreen },
    Dashboard: { screen: DashboardScreen },
    Profile: { screen: ProfileScreen }
  },
  options
);
