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
import * as colors from '../../constants/colors';
import {windowWidth} from '../../constants/dimensions';
import timeAgo from '../../utils/timeAgo';
import DiaryAppBar from './DiaryAppBar';

function DiaryScreen({navigation}) {
  const user = useSelector(state => state.myauth.user);

  const [diaries, setDiaries] = useState([]);

  useEffect(() => {
    const unsubscriber = firestore()
      .collection('Diaries')
      .onSnapshot(querySnapshot => {
        const newDiaries = [];

        querySnapshot.forEach(documentSnapshot => {
          newDiaries.push({
            ...documentSnapshot.data(),
            key: documentSnapshot.id,
          });
        });

        newDiaries.sort((a, b) => b.created - a.created);

        setDiaries(newDiaries);
      });

    return () => unsubscriber();
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
        <View style={styles.diaryInfo}>
          {item.user.avatar != null ? (
            <TouchableOpacity
              onPress={() => {
                if (item.user.id === user.uid) {
                  navigation.navigate('MyProfileScreen');
                } else {
                  navigation.navigate('OtherProfileScreen', {other: item.user});
                }
              }}>
              <Image
                source={{uri: item.user.avatar}}
                style={styles.diaryImageAvatar}
              />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              onPress={() => {
                if (item.user.id === user.uid) {
                  navigation.navigate('MyProfileScreen');
                } else {
                  navigation.navigate('OtherProfileScreen', {other: item.user});
                }
              }}>
              <View style={styles.diaryTextAvatar}>
                <Text style={styles.text1}>{item.user.name[0]}</Text>
              </View>
            </TouchableOpacity>
          )}
          <View>
            <Text style={styles.text2}>{item.user.name}</Text>
            <Text style={styles.text3}>{timeAgo(item.created)}</Text>
          </View>
        </View>
        <Text
          style={{
            fontFamily: item.font,
            color: item.color,
            fontSize: 24,
            marginHorizontal: 15,
          }}>
          {item.text}
        </Text>
        {item.image !== null && (
          <AutoHeightImage width={windowWidth} source={{uri: item.image}} />
        )}
        {item.video !== null && (
          <VideoPlayer
            video={{
              uri: item.video,
            }}
            videoWidth={windowWidth}
            videoHeight={windowWidth}
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
    );
  };

  return (
    <View style={styles.container}>
      <DiaryAppBar navigation={navigation} />
      <FlatList
        ListHeaderComponent={
          <View style={styles.headerContainer}>
            {user.photoURL != null ? (
              <Image
                source={{uri: user.photoURL}}
                style={styles.diaryImageAvatar}
              />
            ) : (
              <View style={styles.diaryTextAvatar}>
                <Text style={styles.text1}>{user.displayName[0]}</Text>
              </View>
            )}
            <TouchableOpacity
              onPress={() => navigation.navigate('PostDiaryScreen')}>
              <Text style={styles.text4}>Hôm nay bạn thế nào?</Text>
            </TouchableOpacity>
          </View>
        }
        data={diaries}
        renderItem={renderItem}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.BLUE_GREY_50,
    flex: 1,
  },
  diaryContainer: {
    backgroundColor: colors.WHITE,
    marginTop: 10,
  },
  diaryInfo: {
    alignItems: 'center',
    flexDirection: 'row',
    paddingVertical: 10,
  },
  diaryImageAvatar: {
    borderRadius: 20,
    height: 40,
    marginHorizontal: 20,
    width: 40,
  },
  diaryTextAvatar: {
    alignItems: 'center',
    backgroundColor: colors.LIGHT_BLUE_A400,
    borderRadius: 20,
    justifyContent: 'center',
    height: 40,
    marginHorizontal: 20,
    width: 40,
  },
  text1: {
    color: colors.WHITE,
    fontSize: 16,
    fontWeight: 'bold',
  },
  text2: {
    color: colors.GREY_900,
    fontSize: 16,
    fontWeight: 'bold',
  },
  text3: {
    color: colors.BLUE_GREY_400,
    fontSize: 12,
  },
  actionsContainer: {
    alignItems: 'center',
    borderTopColor: colors.GREY_300,
    borderTopWidth: 0.75,
    flexDirection: 'row',
    paddingLeft: 15,
    paddingVertical: 10,
  },
  action: {
    alignItems: 'center',
    flexDirection: 'row',
    marginRight: 24,
  },
  textAction: {
    color: colors.GREY_900,
    fontSize: 18,
    marginLeft: 5,
  },
  headerContainer: {
    alignItems: 'center',
    backgroundColor: colors.WHITE,
    flexDirection: 'row',
    paddingVertical: 10,
  },
  text4: {
    color: colors.GREY_400,
    fontSize: 18,
  },
});

export default DiaryScreen;
