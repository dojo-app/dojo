import React from 'react';
import { StackNavigator } from 'react-navigation';
import { TabNav } from './TabNav';
import { AddBillScreen } from './AddBillScreen';
import { AddTaskScreen } from './AddTaskScreen';
import { EditTaskScreen } from './EditTaskScreen';
import { EditBillScreen } from './EditBillScreen';
import { TaskDetailsScreen } from './TaskDetailsScreen';
import { JoinDojoScreen } from './JoinDojoScreen';
import { NotInDojoScreen } from './NotInDojoScreen';
import { BillDetailsScreen } from './BillDetailsScreen';
import { DojoQRCodeScreen } from './DojoQRCodeScreen';
import { ViewMember } from './component/Profile';
import { DojoSettingsScreen } from './DojoSettingsScreen';
import { DojoSettingsEditScreen } from './DojoSettingsEditScreen';
import { CreateDojoScreen } from './CreateDojoScreen';

const options = {};

export const MainNav = StackNavigator(
  {
    Home: { screen: TabNav },
    AddBill: { screen: AddBillScreen },
    EditBill: { screen: EditBillScreen },
    AddTask: { screen: AddTaskScreen },
    EditTask: { screen: EditTaskScreen },
    TaskDetails: { screen: TaskDetailsScreen },
    NotInDojo: { screen: NotInDojoScreen },
    CreateDojo: { screen: CreateDojoScreen },
    JoinDojo: { screen: JoinDojoScreen },
    BillDetails: { screen: BillDetailsScreen },
    DojoQRCode: { screen: DojoQRCodeScreen },
    MemberProfile: { screen: (props) => <ViewMember user={props.navigation.state.params.member} />},
    DojoSettings: { screen: DojoSettingsScreen },
    DojoSettingsEdit: { screen: DojoSettingsEditScreen }
  },
  options
);
