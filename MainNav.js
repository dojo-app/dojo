import { StackNavigator } from 'react-navigation';
import { TabNav } from './TabNav';
import { AddBillScreen } from './AddBillScreen';
import { AddTaskScreen } from './AddTaskScreen';
import { EditTaskScreen } from './EditTaskScreen';
import { EditBillScreen } from './EditBillScreen';

const options = {};

<<<<<<< HEAD
export const MainNav = StackNavigator({
  Home: { screen: TabNav },
  AddBill: { screen: AddBillScreen },
  EditBill: {screen: EditBillScreen},
  AddTask: { screen: AddTaskScreen },
  EditTask: {screen: EditTaskScreen },
}, options);
=======
export const MainNav = StackNavigator(
  {
    Home: { screen: TabNav },
    AddBill: { screen: AddBillScreen },
    AddTask: { screen: AddTaskScreen },
    EditTask: { screen: EditTaskScreen }
  },
  options
);
>>>>>>> d8369eff42c164dae9c359b7e4966fd3eaafbcc9
