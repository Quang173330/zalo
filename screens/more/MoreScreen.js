import React from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useSelector} from 'react-redux';
import {windowWidth} from '../../constants/dimensions';
import * as colors from './../../constants/colors';
import MoreAppBar from './MoreAppBar';

function MoreScreen({navigation}) {
  const user = useSelector(state => state.myauth.user);

  return (
    <Text>MoreScreen</Text>
    // <View style={styles.container}>
    //   <MoreAppBar navigation={navigation} />
    //   <ScrollView>
    //     <TouchableOpacity
    //       onPress={() => navigation.navigate('MyProfileScreen')}>
    //       <View style={styles.userCard}>
    //         {user.photoURL != null ? (
    //           <Image source={{uri: user.photoURL}} style={styles.imageAvatar} />
    //         ) : (
    //           <View style={styles.textAvatar}>
    //             <Text style={styles.text3}>{user.displayName[0]}</Text>
    //           </View>
    //         )}
    //         <View>
    //           <Text style={styles.text1}>{user.displayName}</Text>
    //           <Text style={styles.text2}>Bấm để xem trang cá nhân</Text>
    //         </View>
    //       </View>
    //     </TouchableOpacity>
    //     <Image
    //       source={require('./../../../assets/images/more1.jpg')}
    //       style={styles.more1}
    //     />
    //     <View style={styles.gamesContainer}>
    //       <Text style={styles.gamesTitle}>Top Games</Text>
    //       <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
    //         <Image
    //           source={require('./../../../assets/images/games1.jpg')}
    //           style={styles.games1}
    //         />
    //         <Image
    //           source={require('./../../../assets/images/games2.jpg')}
    //           style={styles.games2}
    //         />
    //       </ScrollView>
    //     </View>
    //     <View style={styles.gamesContainer}>
    //       <Text style={styles.gamesTitle}>Sticker</Text>
    //       <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
    //         <Image
    //           source={require('./../../../assets/images/stickers1.jpg')}
    //           style={styles.stickers1}
    //         />
    //         <Image
    //           source={require('./../../../assets/images/stickers2.jpg')}
    //           style={styles.stickers2}
    //         />
    //         <Image
    //           source={require('./../../../assets/images/stickers3.jpg')}
    //           style={styles.stickers3}
    //         />
    //       </ScrollView>
    //     </View>
    //     <Image
    //       source={require('./../../../assets/images/more2.jpg')}
    //       style={styles.more2}
    //     />
    //   </ScrollView>
    // </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.BLUE_GREY_50,
    flex: 1,
  },
  userCard: {
    alignItems: 'center',
    backgroundColor: colors.WHITE,
    flexDirection: 'row',
    paddingVertical: 15,
  },
  imageAvatar: {
    borderRadius: 20,
    height: 40,
    marginHorizontal: 15,
    width: 40,
  },
  textAvatar: {
    alignItems: 'center',
    backgroundColor: colors.LIGHT_BLUE_A400,
    borderRadius: 20,
    justifyContent: 'center',
    height: 40,
    marginHorizontal: 15,
    width: 40,
  },
  text1: {
    color: colors.GREY_900,
    fontSize: 16,
  },
  text2: {
    color: colors.BLUE_GREY_400,
    fontSize: 12,
  },
  text3: {
    color: colors.WHITE,
    fontSize: 18,
    fontWeight: 'bold',
  },
  more1: {
    height: windowWidth / (1080 / 929),
    marginTop: 10,
    width: windowWidth,
  },
  more2: {
    height: windowWidth / (945 / 598),
    marginTop: 10,
    width: windowWidth,
  },
  gamesContainer: {
    backgroundColor: colors.WHITE,
    marginTop: 10,
  },
  gamesTitle: {
    color: colors.GREY_900,
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 15,
    marginTop: 10,
  },
  games1: {
    height: windowWidth * (284 / 1080) * 1.1,
    width: windowWidth * (889 / 1080) * 1.1,
  },
  games2: {
    height: windowWidth * (286 / 1080) * 1.1,
    width: windowWidth * (876 / 1080) * 1.1,
  },
  stickers1: {
    height: windowWidth * (360 / 1080),
    width: windowWidth * (895 / 1080),
  },
  stickers2: {
    height: windowWidth * (368 / 1080),
    width: windowWidth * (960 / 1080),
  },
  stickers3: {
    height: windowWidth * (366 / 1080),
    width: windowWidth * (920 / 1080),
  },
});

export default MoreScreen;
