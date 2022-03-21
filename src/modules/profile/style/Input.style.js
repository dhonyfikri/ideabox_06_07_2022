import {StyleSheet, Dimensions} from 'react-native';
import {windowHeight} from '../../../components/WindowDimensions';
const windowWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#FFFFFF'},
  head: {
    height: windowHeight / 15,
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: 25,
    paddingRight: 25,
  },
  Button: {
    width: 24,
    height: 24,
  },
  ButtonCamera: {
    width: 24,
    height: 24,
    top: 30,
    right: 30,
    zIndex: 3,
    position: 'absolute',
  },
  image: {
    alignItems: 'flex-end',
    width: '100%',
    height: 170,
    backgroundColor: '#E0E0E0',
  },
  mainContainer: {
    alignItems: 'center',
  },
  mainContent: {
    backgroundColor: '#FFFFFF',
    paddingBottom: 30,
    paddingLeft: 25,
    paddingTop: 35,
  },
  h1: {
    fontWeight: '700',
    fontSize: 15,
    fontFamily: 'Roboto',
    color: '#085D7A',
    marginTop: 13,
  },
  h2: {
    fontSize: 12,
    fontWeight: '200',
    fontFamily: 'Roboto',
  },
  h3: {
    fontWeight: '400',
    fontSize: 12,
    fontFamily: 'Roboto',
  },
  profilePicture: {
    top: -50,
    width: 100,
    height: 100,
    borderRadius: 100,
    zIndex: 3,
    borderWidth: 2,
    borderColor: '#E5E5E5',
  },
  profileImage: {
    flex: 1,
    width: null,
    height: null,
    borderRadius: 1080 / 2,
    backgroundColor: '#FFFFFF',
  },
  contentContainer: {
    paddingTop: 70,
    paddingHorizontal: 25,
    top: -100,
    backgroundColor: '#FFFFFF',
    width: windowWidth,
  },
  input: {
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    borderBottomWidth: 1,
    borderBottomColor: '#B9B9B9',
    marginBottom: 10,
    color: 'black',
    height: 40,
    borderRadius: 0,
    paddingLeft: 5,
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    width: '35%',
    height: 35,
    borderRadius: 10,
    backgroundColor: '#085D7A',
  },
  save: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  imageBackground: {
    width: '100%',
    height: 200,
  },
  backgroundImage: {
    flex: 1,
    width: null,
    height: null,
    resizeMode: 'cover',
    opacity: 0.5,
  },

  //dropdown
  labelStyle: {
    color: '#000',
    fontSize: 16,
  },
  fontLabelStyle: {fontSize: 16},
  listContainer: {
    height: 45,
  },
  placeholder: {fontSize: 16},
});

export default styles;
