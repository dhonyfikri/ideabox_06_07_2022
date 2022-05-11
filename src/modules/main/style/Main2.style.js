import {StyleSheet} from 'react-native';
import {windowHeight, windowWidth} from '../../../components/WindowDimensions';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#085D7A',
  },
  line: {
    alignItems: 'center',
    display: 'flex',
    resizeMode: 'cover',
    height: windowHeight > 800 ? windowHeight / 3.7 : windowHeight / 5,
    width: windowWidth,
  },
  wrap: {
    padding: 15,
    marginTop: 30,
    marginHorizontal: 10,
  },
  title: {
    flexDirection: 'row',
  },
  content: {
    flexDirection: 'row',
    marginTop: windowWidth / 20,
  },
  textwhitetitle: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: 'bold',
  },
  textredtitle: {
    color: '#FF0001',
    fontSize: 24,
    fontWeight: 'bold',
  },
  redtitlecontent: {
    color: '#FF0001',
    fontSize: 16,
    fontWeight: 'bold',
  },
  whitetitlecontent: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  textcontent: {
    color: '#FFFFFF',
    textAlign: 'justify',
    lineHeight: 25,
  },
  button: {
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
    marginVertical: windowHeight / 25,
    width: windowWidth / 3,
    height: windowHeight / 24,
    borderRadius: 5,
    backgroundColor: '#F9CC2C',
  },
  getstarted: {
    color: '#085D7A',
    fontWeight: 'bold',
  },
  mainimage: {
    alignItems: 'center',
    width: windowWidth,
    height: windowHeight / 3,
  },
});

export default styles;
