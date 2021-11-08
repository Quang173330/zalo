/* eslint-disable react-native/no-inline-styles */
import firestore from '@react-native-firebase/firestore';
import React, {useEffect, useState} from 'react';
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import AutoHeightImage from 'react-native-auto-height-image';
import Ionicons from 'react-native-vector-icons/Ionicons';
import VideoPlayer from 'react-native-video-player';
import {useSelector} from 'react-redux';
import {windowHeight, windowWidth} from '../../constants/dimensions';
import timeAgo from '../../utils/timeAgo';
import * as colors from './../../constants/colors';
import OtherProfileAppBar from './OtherProfileAppBar';

function OtherProfileScreen({navigation, route}) {
  const user = useSelector(state => state.myauth.user);

  const [diaries, setDiaries] = useState([]);

  useEffect(() => {
    const unsubscriber = firestore()
      .collection('Diaries')
      .onSnapshot(querySnapshot => {
        const newDiaries = [];

        querySnapshot.forEach(documentSnapshot => {
          if (documentSnapshot.data().user.id === route.params.other.id) {
            newDiaries.push({
              ...documentSnapshot.data(),
              key: documentSnapshot.id,
            });
          }
        });

        newDiaries.sort((a, b) => b.created - a.created);

        setDiaries(newDiaries);
      });

    return () => unsubscriber();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const renderItem = ({item}) => {
    const likedIndex = item.likes.findIndex(value => value === user.uid);
    const liked = likedIndex === -1 ? false : true;

    const handleLike = () => {
      let newLikes = [...item.likes];

      if (liked) {
        newLikes.splice(likedIndex, 1);
      } else {
        newLikes.push(user.uid);
      }

      firestore().collection('Diaries').doc(item.key).update({
        likes: newLikes,
      });
    };

    return (
      <View style={styles.diaryContainer}>
        <Text style={styles.diaryTime}>{timeAgo(item.created)}</Text>
        <View style={styles.diary}>
          <Text
            style={{fontFamily: item.font, color: item.color, fontSize: 24}}>
            {item.text}
          </Text>
          {item.image !== null && (
            <AutoHeightImage
              width={windowWidth - 70}
              source={{uri: item.image}}
            />
          )}
          {item.video !== null && (
            <VideoPlayer
              video={{
                uri: item.video,
              }}
              videoWidth={windowWidth - 70}
              videoHeight={windowWidth - 70}
              thumbnail={{uri: item.video}}
            />
          )}
          <View style={styles.actionsContainer}>
            <TouchableOpacity style={styles.action} onPress={handleLike}>
              <Ionicons
                name={liked ? 'heart' : 'heart-outline'}
                size={24}
                color={liked ? colors.RED_600 : colors.GREY_600}
              />
              <Text style={styles.textAction}>{item.likes.length}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.action}
              onPress={() =>
                navigation.navigate('CommentScreen', {diaryId: item.key})
              }>
              <Ionicons
                name="chatbox-ellipses-outline"
                size={24}
                color={colors.GREY_600}
              />
              <Text style={styles.textAction}>{item.comments.length}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <OtherProfileAppBar
        navigation={navigation}
        user={{
          photoURL: route.params.other.avatar,
          displayName: route.params.other.name,
        }}
      />
      <FlatList
        ListEmptyComponent={
          <Text style={styles.text4}>
            {`${route.params.other.name} chưa có hoạt động nào. Hãy trò chuyện để hiểu nhau hơn.`}
          </Text>
        }
        ListHeaderComponent={
          <>
            <View style={styles.backgroundImageContainer}>
              <Image
                source={{
                  uri: 'https://picsum.photos/1000',
                }}
                style={styles.backgroundImage}
              />
            </View>
            <View style={styles.avatarContainer}>
              {route.params.other.avatar != null ? (
                <Image
                  source={{uri: route.params.other.avatar}}
                  style={styles.imageAvatar}
                />
              ) : (
                <View style={styles.textAvatar}>
                  <Text style={styles.text1}>{route.params.other.name[0]}</Text>
                </View>
              )}
              <Text style={styles.text2}>{route.params.other.name}</Text>
            </View>
          </>
        }
        data={diaries}
        renderItem={renderItem}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImageContainer: {
    backgroundColor: colors.GREY_300,
  },
  backgroundImage: {
    height: windowHeight / 4,
    width: windowWidth,
  },
  avatarContainer: {
    alignItems: 'center',
    marginBottom: 15,
    marginTop: -windowWidth / 6,
  },
  imageAvatar: {
    borderColor: colors.WHITE,
    borderRadius: windowWidth / 6,
    borderWidth: 3,
    height: windowWidth / 3,
    width: windowWidth / 3,
  },
  textAvatar: {
    alignItems: 'center',
    backgroundColor: colors.LIGHT_BLUE_A400,
    borderColor: colors.WHITE,
    borderRadius: windowWidth / 6,
    borderWidth: 3,
    justifyContent: 'center',
    height: windowWidth / 3,
    width: windowWidth / 3,
  },
  text1: {
    color: colors.WHITE,
    fontSize: 60,
    fontWeight: 'bold',
  },
  text2: {
    color: colors.GREY_900,
    fontSize: 24,
    fontWeight: 'bold',
  },
  diaryContainer: {
    marginBottom: 10,
    marginLeft: 30,
    marginRight: 10,
  },
  diaryTime: {
    alignSelf: 'flex-start',
    backgroundColor: colors.BLUE_GREY_100,
    borderRadius: 5,
    color: colors.GREY_900,
    fontSize: 16,
    paddingHorizontal: 15,
    paddingVertical: 1,
  },
  diary: {
    backgroundColor: colors.WHITE,
    borderRadius: 5,
    padding: 15,
    marginBottom: 15,
    marginTop: 10,
  },
  actionsContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: 15,
  },
  action: {
    alignItems: 'center',
    flexDirection: 'row',
    marginRight: 25,
  },
  textAction: {
    color: colors.GREY_900,
    fontSize: 18,
    marginLeft: 5,
  },
  text4: {
    color: colors.BLUE_GREY_400,
    fontSize: 14,
    marginHorizontal: 50,
    marginTop: 10,
    textAlign: 'center',
  },
});

export default OtherProfileScreen;
