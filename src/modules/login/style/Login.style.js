import { StyleSheet } from 'react-native';
import { windowHeight, windowWidth } from '../../../components/WindowDimensions';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#085D7A',
  },
  headLogin: {
    fontSize: 26,
    fontFamily: 'Roboto-Bold',
    color: '#FFFFFF',
  },
  headWelcome: {
    fontSize: 18,
    fontFamily: 'Roboto-Italic',
    color: '#FFFFFF',
  },
  inputText: {
    borderBottomWidth: 1,
    borderColor: '#FFFFFF',
    marginBottom: windowHeight / 432,
    paddingLeft: windowWidth / 10.575,
    color: '#FFFFFF',
  },
  button: {
    backgroundColor: '#F9CC2C',
    borderRadius: 5,
  },
  buttonNonActive: {
    backgroundColor: '#FFFFFF',
    borderRadius: 5,
  },
  center: {
    alignItems: 'center',
  },
  or: {
    fontWeight: '700',
    marginVertical: 20,
    color: '#FFFFFF',
  },
  rowterm: {
    alignItems: 'center',
    flexDirection: 'row',
    maxWidth: '80%',
    marginLeft: 10,
  },
  term: {
    marginVertical: 20,
    marginLeft: 15,
    color: '#FFFFFF'
  },
});

export default styles;
