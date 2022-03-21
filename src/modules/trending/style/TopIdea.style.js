import {StyleSheet} from 'react-native';
import {windowHeight, windowWidth} from '../../../components/WindowDimensions';
const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#FFFFFF'},
  head: {
    height: windowHeight / 13,
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: windowWidth / 16.92,
  },
  topBarContainer: {
    marginTop: 0,
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 0,
  },
  content: {},
});

export default styles;
