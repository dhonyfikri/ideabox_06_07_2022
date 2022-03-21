import {StyleSheet} from 'react-native';
import {windowHeight, windowWidth} from '../../../components/WindowDimensions';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: '7%',
    backgroundColor: 'black',
    width: '100%',
    position: 'absolute',
    bottom: 0,
    zIndex: 100,
    borderWidth: 1,
    borderColor: '#085D7A',
  },
  button: {
    flex: 1,
    height: '100%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default styles;
