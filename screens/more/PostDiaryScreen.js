/* eslint-disable react-native/no-inline-styles */
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import React, {useRef, useState} from 'react';
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import AutoHeightImage from 'react-native-auto-height-image';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import Ionicons from 'react-native-vector-icons/Ionicons';
import VideoPlayer from 'react-native-video-player';
import {useSelector} from 'react-redux';
import {windowWidth} from '../../constants/dimensions';
import makeId from '../../utils/makeId';
import showSnackBar from '../../utils/snackbar';
import * as colors from './../../constants/colors';

function PostDiaryScreen({navigation}) {
  const user = useSelector(state => state.myauth.user);

  const [text, setText] = useState('');
  const inputRef = useRef(null);

  const [font, setFont] = useState('Charm');
  const [color, setColor] = useState('#FFB300');

  const [image, setImage] = useState(null);
  const [video, setVideo] = useState(null);

  const handleAddImageCamera = () => {
    if (image || video) {
      showSnackBar('Bạn chỉ có thể đăng 1 tệp đa phương tiện!');
    } else {
      launchCamera(
        {
          mediaType: 'photo',
          saveToPhotos: true,
        },
        response => {
          if (!response.didCancel && !response.errorCode) {
            setImage(response.uri);
          }
        },
      );
    }
  };

  const handleAddImageLibrary = () => {
    if (image || video) {
      showSnackBar('Bạn chỉ có thể đăng 1 tệp đa phương tiện!');
    } else {
      launchImageLibrary(
        {
          mediaType: 'photo',
        },
        response => {
          if (!response.didCancel && !response.errorCode) {
            setImage(response.uri);
          }
        },
      );
    }
  };

  const handleAddVideoCamera = () => {
    if (image || video) {
      showSnackBar('Bạn chỉ có thể đăng 1 tệp đa phương tiện!');
    } else {
      launchCamera(
        {
          mediaType: 'video',
          saveToPhotos: true,
        },
        response => {
          if (!response.didCancel && !response.errorCode) {
            setVideo(response.uri);
          }
        },
      );
    }
  };

  const handleAddVideoLibrary = () => {
    if (image || video) {
      showSnackBar('Bạn chỉ có thể đăng 1 tệp đa phương tiện!');
    } else {
      launchImageLibrary(
        {
          mediaType: 'video',
        },
        response => {
          if (!response.didCancel && !response.errorCode) {
            setVideo(response.uri);
          }
        },
      );
    }
  };

  const handleBack = () => {
    if (text || image || video) {
      Alert.alert(null, 'Nội dung chưa được lưu. Bạn có chắc muón hủy?', [
        {
          text: 'KHÔNG',
          onPress: () => {},
          style: 'cancel',
        },
        {text: 'CÓ', onPress: () => navigation.goBack()},
      ]);
    } else {
      navigation.goBack();
    }
  };

  const handlePost = async () => {
    showSnackBar('Chờ một lát, bài viết của bạn sẽ sớm xuất hiện!');

    navigation.goBack();

    let media, fileName, uri;

    if (image) {
      media = image;
    }
    if (video) {
      media = video;
    }

    if (media) {
      fileName = makeId(5);

      await storage().ref(fileName).putFile(media);

      uri = await storage().ref(fileName).getDownloadURL();
    }

    await firestore()
      .collection('Diaries')
      .add({
        user: {
          id: user.uid,
          name: user.displayName,
          avatar: user.photoURL,
        },
        created: Date.now(),
        text: text,
        font: font,
        color: color,
        image: image ? uri : null,
        video: video ? uri : null,
        likes: [],
        comments: [],
      });
  };

  return (
    <Text>PostDiaryScreen</Text>
    // <View style={styles.container}>
    //   <View style={styles.bar}>
    //     <TouchableOpacity style={styles.back} onPress={handleBack}>
    //       <Ionicons
    //         name="arrow-back-outline"
    //         size={24}
    //         color={colors.GREY_800}
    //       />
    //     </TouchableOpacity>
    //     <Text style={styles.textBar}>Công khai</Text>
    //     <TouchableOpacity
    //       style={styles.post}
    //       disabled={!text && !image && !video}
    //       onPress={handlePost}>
    //       <Text
    //         style={
    //           text || image || video ? styles.textPostActive : styles.textPost
    //         }>
    //         ĐĂNG
    //       </Text>
    //     </TouchableOpacity>
    //   </View>
    //   <ScrollView>
    //     <TextInput
    //       ref={inputRef}
    //       multiline={true}
    //       placeholder="Bạn đang nghĩ gì?"
    //       placeholderTextColor={color}
    //       style={{
    //         fontFamily: font,
    //         color: color,
    //         fontSize: 24,
    //         minHeight: 80,
    //       }}
    //       value={text}
    //       onChangeText={txt => setText(txt)}
    //     />
    //     {image !== null && (
    //       <View>
    //         <AutoHeightImage width={windowWidth} source={{uri: image}} />
    //         <TouchableOpacity
    //           style={styles.deleteMedia}
    //           onPress={() => setImage(null)}>
    //           <Ionicons name="close-outline" size={18} color={colors.WHITE} />
    //         </TouchableOpacity>
    //       </View>
    //     )}
    //     {video !== null && (
    //       <View>
    //         <VideoPlayer
    //           video={{
    //             uri: video,
    //           }}
    //           videoWidth={windowWidth}
    //           videoHeight={windowWidth}
    //           thumbnail={{uri: video}}
    //         />
    //         <TouchableOpacity
    //           style={styles.deleteMedia}
    //           onPress={() => setVideo(null)}>
    //           <Ionicons name="close-outline" size={18} color={colors.WHITE} />
    //         </TouchableOpacity>
    //       </View>
    //     )}
    //   </ScrollView>
    //   <View>
    //     <ScrollView
    //       horizontal={true}
    //       showsHorizontalScrollIndicator={false}
    //       contentContainerStyle={{
    //         alignItems: 'center',
    //         marginTop: 10,
    //       }}>
    //       <TouchableOpacity
    //         style={
    //           font === 'Charm' ? styles.activeFontButton : styles.fontButton
    //         }
    //         onPress={() => {
    //           setFont('Charm');
    //           setColor('#FFB300');
    //         }}>
    //         <Text style={{fontFamily: 'Charm', fontSize: 14, color: '#FFB300'}}>
    //           Charm
    //         </Text>
    //       </TouchableOpacity>
    //       <TouchableOpacity
    //         style={
    //           font === 'Charmonman'
    //             ? styles.activeFontButton
    //             : styles.fontButton
    //         }
    //         onPress={() => {
    //           setFont('Charmonman');
    //           setColor('#B71C1C');
    //         }}>
    //         <Text
    //           style={{
    //             fontFamily: 'Charmonman',
    //             fontSize: 14,
    //             color: '#B71C1C',
    //           }}>
    //           Charmonman
    //         </Text>
    //       </TouchableOpacity>
    //       <TouchableOpacity
    //         style={
    //           font === 'Dancing' ? styles.activeFontButton : styles.fontButton
    //         }
    //         onPress={() => {
    //           setFont('Dancing');
    //           setColor('#1976D2');
    //         }}>
    //         <Text
    //           style={{fontFamily: 'Dancing', fontSize: 14, color: '#1976D2'}}>
    //           Dancing
    //         </Text>
    //       </TouchableOpacity>
    //       <TouchableOpacity
    //         style={
    //           font === 'Itim' ? styles.activeFontButton : styles.fontButton
    //         }
    //         onPress={() => {
    //           setFont('Itim');
    //           setColor('#64DD17');
    //         }}>
    //         <Text style={{fontFamily: 'Itim', fontSize: 14, color: '#64DD17'}}>
    //           Itim
    //         </Text>
    //       </TouchableOpacity>
    //       <TouchableOpacity
    //         style={
    //           font === 'Mali' ? styles.activeFontButton : styles.fontButton
    //         }
    //         onPress={() => {
    //           setFont('Mali');
    //           setColor('#FF5252');
    //         }}>
    //         <Text style={{fontFamily: 'Mali', fontSize: 14, color: '#FF5252'}}>
    //           Mali
    //         </Text>
    //       </TouchableOpacity>
    //       <TouchableOpacity
    //         style={
    //           font === 'Pacifico' ? styles.activeFontButton : styles.fontButton
    //         }
    //         onPress={() => {
    //           setFont('Pacifico');
    //           setColor('#00BFA5');
    //         }}>
    //         <Text
    //           style={{fontFamily: 'Pacifico', fontSize: 14, color: '#00BFA5'}}>
    //           Pacifico
    //         </Text>
    //       </TouchableOpacity>
    //       <TouchableOpacity
    //         style={
    //           font === 'Pangolin' ? styles.activeFontButton : styles.fontButton
    //         }
    //         onPress={() => {
    //           setFont('Pangolin');
    //           setColor('#FF8A65');
    //         }}>
    //         <Text
    //           style={{fontFamily: 'Pangolin', fontSize: 14, color: '#FF8A65'}}>
    //           Pangolin
    //         </Text>
    //       </TouchableOpacity>
    //       <TouchableOpacity
    //         style={
    //           font === 'SedgwickAve'
    //             ? styles.activeFontButton
    //             : styles.fontButton
    //         }
    //         onPress={() => {
    //           setFont('SedgwickAve');
    //           setColor('#7C4DFF');
    //         }}>
    //         <Text
    //           style={{
    //             fontFamily: 'SedgwickAve',
    //             fontSize: 14,
    //             color: '#7C4DFF',
    //           }}>
    //           SedgwickAve
    //         </Text>
    //       </TouchableOpacity>
    //       <TouchableOpacity
    //         style={
    //           font === 'Sriracha' ? styles.activeFontButton : styles.fontButton
    //         }
    //         onPress={() => {
    //           setFont('Sriracha');
    //           setColor('#29B6F6');
    //         }}>
    //         <Text
    //           style={{fontFamily: 'Sriracha', fontSize: 14, color: '#29B6F6'}}>
    //           Sriracha
    //         </Text>
    //       </TouchableOpacity>
    //     </ScrollView>
    //     <View style={styles.mediaContainer}>
    //       <TouchableOpacity
    //         style={styles.mediaButton}
    //         onPress={handleAddImageCamera}>
    //         <Ionicons name="camera-outline" size={28} color={colors.GREY_600} />
    //       </TouchableOpacity>
    //       <TouchableOpacity
    //         style={styles.mediaButton}
    //         onPress={handleAddImageLibrary}>
    //         <Ionicons name="image-outline" size={28} color={colors.GREY_600} />
    //       </TouchableOpacity>
    //       <TouchableOpacity
    //         style={styles.mediaButton}
    //         onPress={handleAddVideoCamera}>
    //         <Ionicons
    //           name="videocam-outline"
    //           size={28}
    //           color={colors.GREY_600}
    //         />
    //       </TouchableOpacity>
    //       <TouchableOpacity
    //         style={styles.mediaButton}
    //         onPress={handleAddVideoLibrary}>
    //         <Ionicons
    //           name="play-circle-outline"
    //           size={28}
    //           color={colors.GREY_600}
    //         />
    //       </TouchableOpacity>
    //     </View>
    //   </View>
    // </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.WHITE,
    flex: 1,
  },
  bar: {
    alignItems: 'center',
    backgroundColor: colors.GREY_50,
    elevation: 3,
    flexDirection: 'row',
    paddingVertical: 10,
  },
  back: {
    marginHorizontal: 15,
  },
  textBar: {
    color: colors.GREY_800,
    fontSize: 18,
  },
  post: {
    marginLeft: 'auto',
  },
  textPost: {
    color: colors.BLUE_200,
    fontWeight: 'bold',
    marginRight: 15,
  },
  textPostActive: {
    color: colors.LIGHT_BLUE_A700,
    fontWeight: 'bold',
    marginRight: 15,
  },
  deleteMedia: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    position: 'absolute',
    right: 4,
    top: 4,
  },
  activeFontButton: {
    borderColor: colors.LIGHT_BLUE_A700,
    borderRadius: 4,
    borderWidth: 2,
    marginHorizontal: 4,
    paddingHorizontal: 8,
  },
  fontButton: {
    borderColor: colors.BLUE_GREY_100,
    borderRadius: 4,
    borderWidth: 0.75,
    marginHorizontal: 4,
    paddingHorizontal: 8,
  },
  mediaContainer: {
    alignItems: 'center',
    borderTopColor: colors.GREY_300,
    borderTopWidth: 0.75,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 10,
    paddingVertical: 10,
  },
  mediaButton: {
    marginHorizontal: 10,
  },
});

export default PostDiaryScreen;
