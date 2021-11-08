import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import AuthScreen from '../screens/auth/AuthScreen';
import SignInScreen from '../screens/auth/signin/SignInScreen';
import CreateEmailPasswordScreen from '../screens/auth/signup/CreateEmailPasswordScreen';
import CreateNameScreen from '../screens/auth/signup/CreateNameScreen';
import * as colors from '../constants/colors';

const Stack = createStackNavigator();

function AuthStackNavigator() {
  return (
    <Stack.Navigator initialRouteName="AuthScreen">
      <Stack.Screen
        name="AuthScreen"
        component={AuthScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="SignInScreen"
        options={{
          title: 'Đăng nhập',
          headerStyle: {
            backgroundColor: colors.LIGHT_BLUE_A700,
          },
          headerTintColor: colors.WHITE,
          headerTitleStyle: {
            fontSize: 16,
          },
        }}
        component={SignInScreen}
      />
      <Stack.Screen
        name="CreateNameScreen"
        options={{
          title: 'Tạo tài khoản',
          headerStyle: {
            backgroundColor: colors.LIGHT_BLUE_A700,
          },
          headerTintColor: colors.WHITE,
          headerTitleStyle: {
            fontSize: 16,
          },
        }}
        component={CreateNameScreen}
      />
      <Stack.Screen
        name="CreateEmailPasswordScreen"
        options={{
          title: 'Tạo tài khoản',
          headerStyle: {
            backgroundColor: colors.LIGHT_BLUE_A700,
          },
          headerTintColor: colors.WHITE,
          headerTitleStyle: {
            fontSize: 16,
          },
        }}
        component={CreateEmailPasswordScreen}
      />
    </Stack.Navigator>
  );
}

export default AuthStackNavigator;