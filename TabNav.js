import { TabNavigator } from 'react-navigation';
import { DashboardScreen } from './DashboardScreen';
import { TaskScreen } from './TaskScreen';
import { BillScreen } from './BillScreen';
import { ProfileScreen } from './ProfileScreen';
// import { LoginScreen } from './LoginScreen';

const options = {
  tabBarPosition: 'bottom'
};

export const TabNav = TabNavigator(
  {
    // Login: { screen: LoginScreen },
    Dashboard: { screen: DashboardScreen },
    Tasks: { screen: TaskScreen },
    Bills: { screen: BillScreen },
    Profile: { screen: ProfileScreen }
  },
  options
);
