import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import CommentScreen from '../screens/diary/CommentScreen';
// import OtherProfileScreen from '../screens/diary/OtherProfileScreen';
// import ChatScreen from '../screens/message/ChatScreen';
// import MyProfileScreen from '../screens/more/MyProfileScreen';
import PostDiaryScreen from '../screens/more/PostDiaryScreen';
import SettingScreen from '../screens/more/SettingScreen';
// import UploadAvatarScreen from '../screens/more/UploadAvatarScreen';
// import SearchScreen from '../screens/search/SearchScreen';
import MainTabNavigator from './MainTabNavigator';
const Stack = createStackNavigator()

function MainStackNavigator() {
  return (
    <Stack.Navigator initialRouteName="MainTabNavigator">
      <Stack.Screen
        name="MainTabNavigator"
        component={MainTabNavigator}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="SettingScreen"
        component={SettingScreen}
        options={{
          headerShown: false,
        }}
      />
      {/* <Stack.Screen
        name="SearchScreen"
        component={SearchScreen}
        options={{
          headerShown: false,
        }}
      /> */}
      {/* <Stack.Screen
        name="ChatScreen"
        component={ChatScreen}
        options={{
          headerShown: false,
        }}
      /> */}
      {/* <Stack.Screen
        name="MyProfileScreen"
        component={MyProfileScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="UploadAvatarScreen"
        component={UploadAvatarScreen}
        options={{
          headerShown: false,
        }}
      /> */}
      <Stack.Screen
        name="PostDiaryScreen"
        component={PostDiaryScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="CommentScreen"
        component={CommentScreen}
        options={{
          headerShown: false,
        }}
      />
      {/* <Stack.Screen
        name="OtherProfileScreen"
        component={OtherProfileScreen}
        options={{
          headerShown: false,
        }}
      /> */}
    </Stack.Navigator>
  );
}

export default MainStackNavigator;
