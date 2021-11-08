import firestore from '@react-native-firebase/firestore';
import React, {useEffect, useState} from 'react';
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
// import Ionicons from 'react-native-vector-icons/Ionicons';
import {useSelector} from 'react-redux';
import * as colors from '../../constants/colors';
import {windowWidth} from '../../constants/dimensions';
import timeAgo from '../../utils/timeAgo';
// import CommentAppBar from './CommentAppBar';

function CommentScreen({navigation, route}) {
  const user = useSelector(state => state.myauth.user);

  const [diary, setDiary] = useState(null);
  const [comments, setComments] = useState([]);

  const [comment, setComment] = useState('');

  const likedIndex = diary?.likes.findIndex(value => value === user.uid);
  let liked = false;
  if (likedIndex !== undefined && likedIndex !== -1) {
    liked = true;
  }

  const handleLike = () => {
    let newLikes = [...diary.likes];

    if (liked) {
      newLikes.splice(likedIndex, 1);
    } else {
      newLikes.push(user.uid);
    }

    firestore().collection('Diaries').doc(route.params.diaryId).update({
      likes: newLikes,
    });
  };

  useEffect(() => {
    const unsubscriber = firestore()
      .collection('Diaries')
      .doc(route.params.diaryId)
      .onSnapshot(documentSnapshot => {
        setDiary(documentSnapshot.data());

        setComments(documentSnapshot.data().comments);
      });

    return () => unsubscriber();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleComment = () => {
    firestore()
      .collection('Diaries')
      .doc(route.params.diaryId)
      .update({
        comments: [
          {
            user: {id: user.uid, name: user.displayName, avatar: user.photoURL},
            created: Date.now(),
            text: comment,
          },
          ...comments,
        ],
      });

    setComment('');
  };

  const renderItem = ({item}) => {
    return (
      <View style={styles.commentContainer}>
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
              style={styles.imageAvatar}
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
            <View style={styles.textAvatar}>
              <Text style={styles.text1}>{item.user.name[0]}</Text>
            </View>
          </TouchableOpacity>
        )}
        <View style={styles.commentContent}>
          <Text style={styles.text2}>{item.user.name}</Text>
          <Text style={styles.text3}>{item.text}</Text>
          <Text style={styles.text4}>{timeAgo(item.created)}</Text>
        </View>
      </View>
    );
  };

  return (
    <Text>CommentScreen</Text>
    // <View style={styles.container}>
    //   <CommentAppBar navigation={navigation} />
    //   <FlatList
    //     ListEmptyComponent={
    //       <Image
    //         source={require('./../../../assets/images/comment.jpg')}
    //         style={styles.imageComment}
    //       />
    //     }
    //     ListHeaderComponent={
    //       <View style={styles.heartContainer}>
    //         <TouchableOpacity style={styles.buttonLike} onPress={handleLike}>
    //           <Ionicons
    //             name={liked ? 'heart' : 'heart-outline'}
    //             size={28}
    //             color={liked ? colors.RED_600 : colors.GREY_600}
    //           />
    //           <Text style={styles.text5}>{diary?.likes.length}</Text>
    //         </TouchableOpacity>
    //       </View>
    //     }
    //     data={comments}
    //     renderItem={renderItem}
    //     keyExtractor={(_, index) => index.toString()}
    //   />
    //   <View style={styles.inputContainer}>
    //     <TouchableOpacity style={styles.icon}>
    //       <Ionicons name="happy-outline" size={28} color={colors.GREY_600} />
    //     </TouchableOpacity>
    //     <TextInput
    //       placeholder="Nhập bình luận"
    //       style={styles.input}
    //       value={comment}
    //       onChangeText={text => setComment(text)}
    //     />
    //     <TouchableOpacity style={styles.icon}>
    //       <Ionicons name="image-outline" size={28} color={colors.GREY_600} />
    //     </TouchableOpacity>
    //     <TouchableOpacity
    //       style={styles.icon}
    //       disabled={!comment}
    //       onPress={handleComment}>
    //       <Ionicons
    //         name="send"
    //         size={28}
    //         color={comment ? colors.LIGHT_BLUE_A700 : colors.GREY_300}
    //       />
    //     </TouchableOpacity>
    //   </View>
    // </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.WHITE,
    flex: 1,
  },
  inputContainer: {
    alignItems: 'center',
    backgroundColor: colors.GREY_50,
    flexDirection: 'row',
  },
  input: {
    color: colors.GREY_900,
    flex: 1,
    fontSize: 18,
  },
  icon: {
    marginHorizontal: 10,
  },
  commentContainer: {
    flexDirection: 'row',
    paddingTop: 15,
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
    color: colors.WHITE,
    fontSize: 18,
    fontWeight: 'bold',
  },
  commentContent: {
    flex: 1,
    borderBottomColor: colors.GREY_300,
    borderBottomWidth: 0.75,
    paddingRight: 15,
  },
  text2: {
    color: colors.GREY_900,
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 2,
  },
  text3: {
    color: colors.GREY_900,
    fontSize: 16,
    marginBottom: 2,
  },
  text4: {
    color: colors.BLUE_GREY_400,
    fontSize: 14,
    marginBottom: 15,
  },
  heartContainer: {
    borderBottomColor: colors.GREY_300,
    borderBottomWidth: 0.75,
    padding: 15,
  },
  buttonLike: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  text5: {
    color: colors.GREY_900,
    fontSize: 18,
    marginLeft: 5,
  },
  imageComment: {
    height: (windowWidth / 945) * 268,
    width: windowWidth,
  },
});

export default CommentScreen;
