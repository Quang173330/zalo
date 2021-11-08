import firestore from '@react-native-firebase/firestore';
import React, {useEffect, useRef, useState} from 'react';
import {FlatList, Image, StyleSheet, Text, TextInput, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useSelector} from 'react-redux';
import getChatId from '../../utils/chatId';
import * as colors from './../../constants/colors';
import ChatAppBar from './ChatAppBar';

function ChatScreen({navigation, route}) {
  const user = useSelector(state => state.myauth.user);

  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  const flatlistRef = useRef();

  const sendMessage = () => {
    const now = Date.now();

    firestore()
      .collection('Conversations')
      .doc(getChatId(user.uid, route.params.user.id))
      .collection('Messages')
      .add({
        sender: {
          id: user.uid,
          name: user.displayName,
          avatar: user.photoURL,
        },
        receiver: {
          id: route.params.user.id,
          name: route.params.user.name,
          avatar: route.params.user.avatar,
        },
        created: now,
        content: message,
        type: 'text',
      });

    firestore()
      .collection('Conversations')
      .doc(getChatId(user.uid, route.params.user.id))
      .set({
        lastSender: {
          id: user.uid,
          name: user.displayName,
          avatar: user.photoURL,
        },
        lastReceiver: {
          id: route.params.user.id,
          name: route.params.user.name,
          avatar: route.params.user.avatar,
        },
        lastTime: now,
        lastContent: message,
        lastType: 'text',
      });

    setMessage('');
  };

  useEffect(() => {
    const unsubscriber = firestore()
      .collection('Conversations')
      .doc(getChatId(user.uid, route.params.user.id))
      .collection('Messages')
      .onSnapshot(querySnapshot => {
        const newMessages = [];

        querySnapshot.forEach(documentSnapshot => {
          newMessages.push({
            ...documentSnapshot.data(),
            key: documentSnapshot.id,
          });
        });

        newMessages.sort((a, b) => a.created - b.created);

        setMessages(newMessages);

        flatlistRef.current.scrollToEnd({animating: true});
      });

    return () => unsubscriber();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const renderItem = ({item, index}) => {
    if (item.sender.id === user.uid) {
      return (
        <View style={styles.messageContainer1}>
          <View style={styles.message1}>
            <Text style={styles.text1}>{item.content}</Text>
          </View>
        </View>
      );
    } else {
      let showAvatar = true;
      if (
        index > 0 &&
        messages[index - 1].sender.id === messages[index].sender.id
      ) {
        showAvatar = false;
      }

      return (
        <View style={styles.messageContainer2}>
          {showAvatar ? (
            item.avatar ? (
              <Image source={{uri: item.avatar}} style={styles.imageAvatar} />
            ) : (
              <View style={styles.textAvatar}>
                <Text style={styles.text3}>{item.sender.name[0]}</Text>
              </View>
            )
          ) : (
            <View style={styles.imageAvatar} />
          )}
          <View style={styles.message2}>
            <Text style={styles.text1}>{item.content}</Text>
          </View>
        </View>
      );
    }
  };

  return (
    <View style={styles.container}>
      <ChatAppBar navigation={navigation} user={route.params.user} />
      <View style={styles.messagesContainer}>
        <FlatList data={messages} renderItem={renderItem} ref={flatlistRef} />
      </View>
      <View style={styles.inputContainer}>
        <TouchableOpacity style={styles.icon}>
          <Ionicons name="happy-outline" size={28} color={colors.GREY_600} />
        </TouchableOpacity>
        <TextInput
          placeholder="Tin nhắn"
          style={styles.input}
          value={message}
          onChangeText={text => setMessage(text)}
        />
        {message === '' ? (
          <>
            <TouchableOpacity style={styles.icon}>
              <Ionicons
                name="ellipsis-horizontal-outline"
                size={28}
                color={colors.GREY_600}
              />
            </TouchableOpacity>
            <TouchableOpacity style={styles.icon}>
              <Ionicons name="mic-outline" size={28} color={colors.GREY_600} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.icon}>
              <Ionicons
                name="image-outline"
                size={28}
                color={colors.GREY_600}
              />
            </TouchableOpacity>
          </>
        ) : (
          <TouchableOpacity style={styles.icon} onPress={sendMessage}>
            <Ionicons name="send" size={28} color={colors.LIGHT_BLUE_A700} />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.INDIGO_50,
    flex: 1,
  },
  messagesContainer: {
    flex: 1,
  },
  inputContainer: {
    alignItems: 'center',
    backgroundColor: colors.WHITE,
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
  messageContainer1: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginVertical: 4,
  },
  message1: {
    backgroundColor: colors.LIGHT_BLUE_50,
    borderRadius: 10,
    marginRight: 15,
    maxWidth: '65%',
    padding: 10,
  },
  text1: {
    color: colors.GREY_900,
    fontSize: 16,
  },
  messageContainer2: {
    flexDirection: 'row',
    marginVertical: 4,
  },
  imageAvatar: {
    borderRadius: 15,
    height: 30,
    marginLeft: 15,
    marginRight: 5,
    width: 30,
  },
  textAvatar: {
    alignItems: 'center',
    backgroundColor: colors.LIGHT_BLUE_A400,
    borderRadius: 15,
    justifyContent: 'center',
    height: 30,
    marginLeft: 15,
    marginRight: 5,
    width: 30,
  },
  text3: {
    color: colors.WHITE,
    fontSize: 14,
  },
  message2: {
    backgroundColor: colors.WHITE,
    borderRadius: 10,
    marginRight: 15,
    maxWidth: '65%',
    padding: 10,
  },
});

export default ChatScreen;
