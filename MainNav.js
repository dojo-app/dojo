import { StackNavigator } from 'react-navigation';
import { TabNav } from './TabNav';
import { AddBillScreen } from './AddBillScreen';
import { AddTaskScreen } from './AddTaskScreen';
import { EditTaskScreen } from './EditTaskScreen';

const options = {};

export const MainNav = StackNavigator(
  {
    Home: { screen: TabNav },
    AddBill: { screen: AddBillScreen },
    AddTask: { screen: AddTaskScreen },
    EditTask: { screen: EditTaskScreen }
  },
  options
);
