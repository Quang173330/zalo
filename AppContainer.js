import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AuthStackNavigator from './navigation/AuthStackNavigator';
import MainStackNavigator from './navigation/MainStackNavigator';
// import SplashScreen from './src/screens/SplashScreen';

function AppContainer() {
  const [initializing, setInitializing] = useState(true);

  const user = useSelector(state => state.myAuth.user);

  const dispatch = useDispatch();

  // useEffect(() => {
  //   const unsubscriber = auth().onAuthStateChanged(u => {
  //     console.log('onAuthStateChanged:', u);
  //     dispatch(setUser({ user: u }));
  //     if (initializing) {
  //       setInitializing(false);
  //     }
  //   });

  //   return unsubscriber;
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  // if (initializing) {
  //   return <SplashScreen />;
  // }

  if (user) {
    return <AuthStackNavigator />;
  } else {
    return <MainStackNavigator />;
  }
}

export default AppContainer;
