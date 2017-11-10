import { TabNavigator } from 'react-navigation';
import { DashboardScreen } from './DashboardScreen';
import { TaskScreen } from './TaskScreen';
import { BillScreen } from './BillScreen';
import { ProfileScreen } from './ProfileScreen';

const options = {
    tabBarPosition: 'bottom'
};

export const TabNav = TabNavigator({
  Dashboard: { screen: DashboardScreen },
  Tasks: { screen: TaskScreen },
  Bills: { screen: BillScreen },
  Profile: { screen: ProfileScreen },
}, options);

