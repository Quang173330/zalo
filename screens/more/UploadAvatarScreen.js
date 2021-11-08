import storage from '@react-native-firebase/storage';
import React, {useState} from 'react';
import {
  ActivityIndicator,
  Image,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useDispatch} from 'react-redux';
import {windowWidth} from '../../constants/dimensions';
import {updateAvatarRequest} from '../../slices/myauthSlice';
import makeId from '../../utils/makeId';
import * as colors from './../../constants/colors';

function UploadAvatarScreen({navigation, route}) {
  const [modalVisible, setModalVisible] = useState(false);
  const [progress, setProgress] = useState(0);

  const dispatch = useDispatch();

  const uploadAvatar = () => {
    const fileName = makeId(5);

    const task = storage().ref(fileName).putFile(route.params.uri);

    setModalVisible(true);

    task.on('state_changed', taskSnapshot => {
      setProgress(
        Math.floor(taskSnapshot.bytesTransferred / taskSnapshot.totalBytes) *
          100,
      );
    });

    task.then(() => {
      storage()
        .ref(fileName)
        .getDownloadURL()
        .then(url => {
          dispatch(updateAvatarRequest({url}));
        });

      setModalVisible(false);

      navigation.goBack();
    });
  };

  return (
    <View style={styles.container}>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false);
        }}>
        <View style={styles.modalContainer}>
          <View style={styles.modalView}>
            <ActivityIndicator color={colors.LIGHT_BLUE_500} />
            <Text style={styles.textProgress}>{`${progress}%`}</Text>
          </View>
        </View>
      </Modal>
      <View style={styles.bar}>
        <TouchableOpacity
          style={styles.back}
          onPress={() => {
            navigation.goBack();
          }}>
          <Ionicons name="arrow-back-outline" size={24} color={colors.WHITE} />
        </TouchableOpacity>
        <Text style={styles.text}>Cập nhật ảnh đại diện</Text>
      </View>
      <Image source={route.params} style={styles.avatar} />
      <TouchableOpacity style={styles.button} onPress={uploadAvatar}>
        <Text style={styles.textButton}>XONG</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-between',
    backgroundColor: colors.BLACK,
    flex: 1,
  },
  bar: {
    alignItems: 'center',
    backgroundColor: colors.GREY_900,
    flexDirection: 'row',
    paddingVertical: 10,
  },
  back: {
    marginHorizontal: 15,
  },
  text: {
    color: colors.WHITE,
    fontSize: 16,
    fontWeight: 'bold',
  },
  avatar: {
    height: windowWidth,
    resizeMode: 'cover',
    width: windowWidth,
  },
  button: {
    alignSelf: 'flex-end',
    backgroundColor: colors.LIGHT_BLUE_500,
    borderRadius: 20,
    margin: 10,
    paddingHorizontal: 20,
    paddingVertical: 5,
  },
  textButton: {
    color: colors.WHITE,
    fontSize: 14,
  },
  modalContainer: {
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
    flex: 1,
    justifyContent: 'center',
  },
  modalView: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  textProgress: {
    color: colors.WHITE,
    fontSize: 16,
    marginLeft: 5,
  },
});

export default UploadAvatarScreen;
