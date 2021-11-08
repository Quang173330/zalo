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
import {useSelector} from 'react-redux';
import timeAgo from '../../utils/timeAgo';
import * as colors from './../../constants/colors';
import MessageAppBar from './MessageAppBar';
import LinearGradient from 'react-native-linear-gradient';

function MessageScreen({navigation}) {
  const user = useSelector(state => state.myauth.user);

  const [conversations, setConversations] = useState([]);

  useEffect(() => {
    const unsubscriber = firestore()
      .collection('Conversations')
      .onSnapshot(querySnapshot => {
        const newConversations = [];

        querySnapshot.forEach(documentSnapshot => {
          if (
            documentSnapshot.data().lastSender.id === user.uid ||
            documentSnapshot.data().lastReceiver.id === user.uid
          ) {
            newConversations.push({
              ...documentSnapshot.data(),
              key: documentSnapshot.id,
            });
          }
        });

        newConversations.sort((a, b) => b.lastTime - a.lastTime);

        setConversations(newConversations);
      });

    return () => unsubscriber();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const renderItem = ({item}) => {
    const partner =
      user.uid === item.lastSender.id ? item.lastReceiver : item.lastSender;

    return (
      <Text>MessageScreen</Text>
      // <TouchableOpacity
      //   onPress={() => navigation.navigate('ChatScreen', {user: partner})}>
      //   <View style={styles.conversationContainer}>
      //     {partner.avatar != null ? (
      //       <Image source={{uri: partner.avatar}} style={styles.imageAvatar} />
      //     ) : (
      //       <View style={styles.textAvatar}>
      //         <Text style={styles.text1}>{partner.name[0]}</Text>
      //       </View>
      //     )}
      //     <View style={styles.divide}>
      //       <View style={styles.messageContainer}>
      //         <Text style={styles.text2}>{partner.name}</Text>
      //         <Text style={styles.text3} numberOfLines={1}>
      //           {item.lastContent}
      //         </Text>
      //       </View>
      //       <Text style={styles.text4}>{timeAgo(item.lastTime)}</Text>
      //     </View>
      //   </View>
      // </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <MessageAppBar navigation={navigation} />
      <View style={styles.conversationsContainer}>
        <FlatList
          data={conversations}
          renderItem={renderItem}
          ListFooterComponent={
            <View style={styles.conversationsFooter}>
              <Text style={styles.textConversationsFooter}>
                Dễ dàng tìm kiếm và trò chuyện với bạn bè
              </Text>
              <TouchableOpacity
                onPress={() => navigation.navigate('SearchScreen')}>
                <LinearGradient
                  start={{x: 0, y: 0}}
                  end={{x: 1, y: 0}}
                  colors={[colors.LIGHT_BLUE_A700, colors.LIGHT_BLUE_A400]}
                  style={styles.button}>
                  <Text style={styles.textButton}>TÌM THÊM BẠN</Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          }
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.WHITE,
    flex: 1,
  },
  conversationsContainer: {
    flex: 1,
  },
  conversationContainer: {
    flexDirection: 'row',
  },
  imageAvatar: {
    borderRadius: 20,
    height: 40,
    margin: 15,
    width: 40,
  },
  textAvatar: {
    alignItems: 'center',
    backgroundColor: colors.LIGHT_BLUE_A400,
    borderRadius: 20,
    justifyContent: 'center',
    height: 40,
    margin: 15,
    width: 40,
  },
  text1: {
    color: colors.WHITE,
    fontSize: 18,
    fontWeight: 'bold',
  },
  messageContainer: {
    flex: 1,
  },
  text2: {
    color: colors.GREY_900,
    fontSize: 16,
  },
  text3: {
    color: colors.BLUE_GREY_400,
    fontSize: 12,
  },
  text4: {
    color: colors.BLUE_GREY_400,
    fontSize: 12,
    marginRight: 15,
  },
  divide: {
    borderBottomColor: colors.GREY_300,
    borderBottomWidth: 0.75,
    flex: 1,
    flexDirection: 'row',
    paddingVertical: 15,
  },
  conversationsFooter: {
    alignItems: 'center',
  },
  textConversationsFooter: {
    color: colors.BLUE_GREY_400,
    fontSize: 14,
    marginVertical: 15,
  },
  button: {
    borderRadius: 30,
    paddingHorizontal: 32,
    paddingVertical: 8,
  },
  textButton: {
    color: colors.WHITE,
    fontSize: 14,
  },
});

export default MessageScreen;
