import {StyleSheet} from 'react-native';
import style from '../../../config/Style/style.cfg';
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    marginBottom: 60,
  },
  imageContainer: {
    width: '100%',
    height: 225,
    resizeMode: 'cover',
  },
  desc: {
    backgroundColor: '#0C7AB0',
    width: '100%',
    padding: 15,
    justifyContent: 'center',
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    paddingBottom: 70,
  },
  descBottom: {
    backgroundColor: '#0C7AB0',
    width: '100%',
    padding: 15,
  },
  imageDesc: {
    marginLeft: 10,
    width: 250,
    height: 170,
    alignSelf: 'center',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flex: 1,
    width: '100%',
  },
  title: {
    color: '#FFFFFF',
  },
  descContent: {
    color: '#FFFFFF',
    textAlign: 'justify',
  },
  quote: {
    color: '#FFFFFF',
    marginVertical: 10,
    alignSelf: 'center',
    textAlign: 'center',
    fontFamily: 'Roboto-Medium',
  },
  containerCategory: {
    backgroundColor: '#2F2E41',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 15,
  },
  titleCategory: {
    color: '#FFFFFF',
    marginVertical: 15,
  },
  wrap: {
    width: '100%',
  },
  dotColor: {
    backgroundColor: 'rgba(0,0,0,.2)',
    width: 5,
    height: 5,
    borderRadius: 4,
    marginLeft: 3,
    marginRight: 3,
    marginTop: 3,
    marginBottom: 3,
  },
  titleInovator: {
    marginTop: 20,
    textAlign: 'center',
  },
  imageSplash: {
    flex: 1,
    resizeMode: 'contain',
  },
  descContentBottom: {
    color: '#FFFFFF',
    textAlign: 'right',
  },
  descCopyright: {
    marginLeft: 5,
    color: '#FFFFFF',
  },
  horizontalCard: {
    justifyContent: 'space-around',
    flexDirection: 'row',
    marginTop: -55,
    paddingHorizontal: 15,
    width: '100%',
  },
  cardContainer: {
    width: 100,
    height: 100,
    borderRadius: 10,
    alignItems: 'center',
    paddingHorizontal: 5,
  },
  titleCard: {
    fontWeight: 'bold',
    color: 'white',
  },
  cardImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  tittleCardContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 0.5,
  },
  imageCardContainer: {
    flex: 1,
    height: '100%',
    width: '100%',
  },

  // Modal
  centeredcontainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  centeredView: {
    flex: 1,
  },
  modalView: {
    backgroundColor: 'white',
    width: '70%',
  },
  inputContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default styles;
