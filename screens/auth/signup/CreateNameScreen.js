import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import * as colors from '../../../constants/colors';

function CreateNameScreen({navigation}) {
  const [username, setName] = useState('');

  return (
    <View style={styles.container}>
      <View style={styles.title}>
        <Text style={styles.textTitle}>
          Sử dụng tên thật giúp bạn bè dễ dàng nhận ra bạn.
        </Text>
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Tên đầy đủ"
          autoFocus={true}
          style={styles.input}
          value={username}
          onChangeText={text => setName(text)}
        />
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            if (username) {
              navigation.navigate('CreateEmailPasswordScreen', {username});
            }
          }}>
          <FontAwesome5 name={'arrow-right'} size={16} color={colors.WHITE} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.WHITE,
    flex: 1,
  },
  title: {
    backgroundColor: '#ECEFF1',
    paddingHorizontal: 10,
    paddingVertical: 12,
  },
  textTitle: {
    color: colors.GREY_900,
    fontSize: 12,
  },
  inputContainer: {
    marginTop: 25,
    paddingHorizontal: 15,
  },
  input: {
    borderBottomColor: colors.CYAN_400,
    borderBottomWidth: 2,
    color: colors.GREY_900,
    fontSize: 16,
  },
  buttonContainer: {
    alignItems: 'flex-end',
    flex: 1,
    justifyContent: 'flex-end',
    paddingVertical: 15,
    paddingHorizontal: 15,
  },
  button: {
    backgroundColor: colors.LIGHT_BLUE_A700,
    borderRadius: 40,
    paddingHorizontal: 17,
    paddingVertical: 15,

    elevation: 11,
    shadowColor: colors.BLACK,
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.36,
    shadowRadius: 6.68,
  },
});

export default CreateNameScreen;
