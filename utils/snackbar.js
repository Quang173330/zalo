import Snackbar from 'react-native-snackbar';

const showSnackBar = txt => {
  Snackbar.show({
    text: txt,
    duration: Snackbar.LENGTH_LONG,
  });
};

export default showSnackBar;
