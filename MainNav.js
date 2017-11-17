import { StackNavigator } from 'react-navigation';
import { TabNav } from './TabNav';
import { AddBillScreen } from './AddBillScreen';
import { AddTaskScreen } from './AddTaskScreen';
import { EditTaskScreen } from './EditTaskScreen';
import { EditBillScreen } from './EditBillScreen';
import { TaskDetailsScreen } from './TaskDetailsScreen';

const options = {};

export const MainNav = StackNavigator(
  {
    Home: { screen: TabNav },
    AddBill: { screen: AddBillScreen },
    EditBill: { screen: EditBillScreen },
    AddTask: { screen: AddTaskScreen },
    EditTask: { screen: EditTaskScreen },
    TaskDetails: { screen: TaskDetailsScreen }
  },
  options
);
