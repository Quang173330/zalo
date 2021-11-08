import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import React from 'react';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import DiaryScreen from '../screens/diary/DiaryScreen';
import GroupScreen from '../screens/group/GroupScreen';
import MessageScreen from '../screens/message/MessageScreen';
import MoreScreen from '../screens/more/MoreScreen';
import PhonebookScreen from '../screens/phonebook/PhonebookScreen';
import * as colors from './../constants/colors';

const Tab = createMaterialBottomTabNavigator();

function MainTabNavigator() {
  return (
    <Tab.Navigator
      initialRouteName="MessageScreen"
      activeColor={colors.LIGHT_BLUE_A700}
      inactiveColor={colors.GREY_800}
      barStyle={{backgroundColor: colors.GREY_50}}
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          let iconName;
          if (route.name === 'MessageScreen') {
            iconName = 'comment-dots';
          } else if (route.name === 'PhonebookScreen') {
            iconName = 'address-book';
          } else if (route.name === 'GroupScreen') {
            iconName = 'users';
          } else if (route.name === 'DiaryScreen') {
            iconName = 'clock';
          } else if (route.name === 'MoreScreen') {
            iconName = 'border-all';
          }

          return (
            <FontAwesome5
              name={iconName}
              size={20}
              color={color}
              solid={focused}
            />
          );
        },
      })}>
      <Tab.Screen
        name="MessageScreen"
        component={MessageScreen}
        options={{title: 'Tin nhắn'}}
      />
      {/* <Tab.Screen
        name="PhonebookScreen"
        component={PhonebookScreen}
        options={{title: 'Danh bạ'}}
      /> */}
      <Tab.Screen
        name="GroupScreen"
        component={GroupScreen}
        options={{title: 'Nhóm'}}
      />
      {/* <Tab.Screen
        name="DiaryScreen"
        component={DiaryScreen}
        options={{title: 'Nhật ký'}}
      /> */}
      <Tab.Screen
        name="MoreScreen"
        component={MoreScreen}
        options={{title: 'Thêm'}}
      />
    </Tab.Navigator>
  );
}

export default MainTabNavigator;
