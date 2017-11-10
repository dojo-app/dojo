import { TabNavigator } from 'react-navigation';
import { TaskScreen } from './TaskScreen';
import { BillScreen } from './BillScreen';

const options = {
    tabBarPosition: 'bottom'
};

export const TabNav = TabNavigator({
  Tasks: { screen: TaskScreen },
  Bills: { screen: BillScreen },
}, options);
