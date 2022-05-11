import { StyleSheet } from 'react-native';
import { windowHeight, windowWidth } from '../../../components/WindowDimensions';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#5F49D2',
    color: 'white',
  },
  flatlist: {
    marginBottom: 28.61,
  },
  button: {
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
    width: 358,
    height: 52,
    borderRadius: 5,
    backgroundColor: '#FF5C1B',
  },
  getstarted: {
    color: 'white',
    fontFamily: 'Poppins-Bold',
    fontSize: 16,
    lineHeight: 25.6,
  },
});

export default styles;
