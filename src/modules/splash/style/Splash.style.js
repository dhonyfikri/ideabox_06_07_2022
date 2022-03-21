import {StyleSheet} from 'react-native';
import {windowHeight, windowWidth} from '../../../components/WindowDimensions';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  logo: {
    justifyContent: 'center',
    flex: 1,
    marginTop: windowHeight / 5.76,
  },
  image: {
    alignItems: 'center',
    width: windowWidth,
    height: windowHeight / 2.5,
  },
  imageSplash: {
    flex: 1,
    resizeMode: 'contain',
  },
});

export default styles;
