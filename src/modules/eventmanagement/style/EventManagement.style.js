import {StyleSheet} from 'react-native';
import {windowHeight} from '../../../components/WindowDimensions';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  contentContainer: {
    padding: 15,
    marginBottom: windowHeight / 10,
  },
  titleEvent: {
    color: '#085D7A',
    fontWeight: '700',
    fontSize: 20,
    marginVertical: 10,
  },
  titleCategory: {
    color: '#085D7A',
    fontWeight: '700',
    fontSize: 20,
    marginBottom: 10,
  },
  titleCategory2: {
    color: '#085D7A',
    fontWeight: '700',
    fontSize: 16,
    marginBottom: 10,
  },

  content: {
    margin: 15,
    backgroundColor: '#FFFFFF',
    flex: 1,
    marginBottom: 90,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,

    elevation: 4,
  },
  titleWrap: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  date: {
    fontSize: 12,
    fontFamily: 'Roboto-Regular',
    marginVertical: 10,
    color: '#808080',
    fontStyle: 'italic',
  },
  desc: {
    textAlign: 'justify',
    fontSize: 14,
  },
  imageContent: {
    width: '100%',
    height: 250,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    resizeMode: 'cover',
  },
  textWrap: {
    padding: 10,
  },
  wrapIcon: {
    flexDirection: 'row',
  },
  icon: {
    margin: 10,
  },
  buttonJoin: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: 50,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    backgroundColor: '#34A68A',
    alignSelf: 'center',
  },
  button: {
    width: 160,
    padding: 10,
    backgroundColor: '#085D7A',
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    flexDirection: 'row',
  },
  // Modal View style
  centeredcontainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
  },
  centeredView: {
    flex: 1,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#EBEFF5',
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  inputContainer: {
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  buttondelete: {
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10,
    width: '40%',
    height: 35,
    borderRadius: 10,
    backgroundColor: '#34A68A',
    alignSelf: 'center',
  },
  buttoncancel: {
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: '#DE1B1B',
    borderWidth: 1,
    margin: 10,
    width: '40%',
    height: 35,
    borderRadius: 10,
    backgroundColor: '#FFFFFF',
    alignSelf: 'center',
  },
  save: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  batal: {
    color: '#DE1B1B',
    fontWeight: 'bold',
  },
  input: {
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#085D7A',
    color: 'black',
    height: 35,
    fontSize: 12,
  },
  input2: {
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#085D7A',
    color: 'black',
    height: 35,
    width: 160,
    fontSize: 12,
  },
  h2: {
    fontSize: 14,
    fontWeight: '200',
    fontFamily: 'Roboto',
    marginBottom: 10,
  },
  textEdit: {
    fontSize: 20,
    fontWeight: 'bold',
    textDecorationLine: 'underline',
    color: '#085D7A',
  },
  rowDelete: {
    flexDirection: 'row',
    alignSelf: 'flex-end',
  },
});

export default styles;
