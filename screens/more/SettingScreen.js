import React from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {useDispatch} from 'react-redux';
import {windowWidth} from '../../constants/dimensions';
// import {signOutRequest} from '../../slices/myauthSlice';
// import {searchRequest} from '../../slices/searchSlice';
import * as colors from './../../constants/colors';
// import SettingAppBar from './SettingAppBar';

function SettingScreen({navigation}) {
  const dispatch = useDispatch();

  return (
    <Text>SettingScreen</Text>
    // <View style={styles.container}>
    //   <SettingAppBar navigation={navigation} />
    //   <ScrollView>
    //     <Image
    //       source={require('./../../../assets/images/setting1.jpg')}
    //       style={styles.setting1}
    //     />
    //     <Image
    //       source={require('./../../../assets/images/setting2.jpg')}
    //       style={styles.setting2}
    //     />
    //     <Image
    //       source={require('./../../../assets/images/setting3.jpg')}
    //       style={styles.setting3}
    //     />
    //     <TouchableOpacity
    //       onPress={() => {
    //         dispatch(searchRequest({keyword: ''}));
    //         dispatch(signOutRequest());
    //       }}>
    //       <Image
    //         source={require('./../../../assets/images/setting4.jpg')}
    //         style={styles.setting4}
    //       />
    //     </TouchableOpacity>
    //   </ScrollView>
    // </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.BLUE_GREY_50,
    flex: 1,
  },
  setting1: {
    height: windowWidth / (1080 / 387),
    marginBottom: 10,
    width: windowWidth,
  },
  setting2: {
    height: windowWidth / (1080 / 1237),
    marginBottom: 10,
    width: windowWidth,
  },
  setting3: {
    height: windowWidth / (1080 / 131),
    width: windowWidth,
  },
  setting4: {
    height: windowWidth / (1080 / 133),
    width: windowWidth,
  },
});

export default SettingScreen;
