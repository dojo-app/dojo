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
    Dashboard: { screen: DashboardScreen },
    Tasks: { screen: TaskScreen },
    Bills: { screen: BillScreen },
    Profile: { screen: ProfileScreen }
  },
  options
);
