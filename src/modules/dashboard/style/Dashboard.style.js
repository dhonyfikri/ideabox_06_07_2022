import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  content: {
    padding: 15,
  },
  cardContainer: {flexDirection: 'row', marginHorizontal: 2},
  contentChart: {
    marginVertical: 10,
    marginHorizontal: 2,
    borderRadius: 5,
    flex: 1,
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  contentChart2: {
    marginTop: 10,
    marginBottom: 30,
    marginHorizontal: 2,
    borderRadius: 5,
    flex: 1,
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },

  titleChart: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
  },
  titleChart2: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  headerWrap: {
    justifyContent: 'center',
    backgroundColor: '#EBEFF5',
    marginVertical: 15,
    width: '80%',
    height: 50,
    borderRadius: 30,
    flexDirection: 'row',
  },
  wrap: {
    flex: 1,
  },
  tabBarActive: {
    flex: 1,
    marginHorizontal: 2,
    marginVertical: 5,
    backgroundColor: '#085D7A',
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textActive: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 13,
    textAlign: 'center',
  },
  textNonActive: {
    color: '#085D7A',
    fontWeight: 'bold',
    fontSize: 13,
    textAlign: 'center',
  },
  tabBar: {
    flex: 1,
    marginVertical: 5,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#EBEFF5',
  },
  button: {
    width: 300,
    height: 50,
    backgroundColor: '#085D7A',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginVertical: 25,
  },
  tableContent: {
    width: '100%',
    height: 70,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  //dropdown
  labelStyle: {
    color: '#000',
    fontSize: 10,
  },
  fontLabelStyle: {fontSize: 10},
  listContainer: {
    height: 45,
  },
  placeholder: {fontWeight: 'bold', fontSize: 13},
  input: {
    backgroundColor: '#EBEFF5',
    width: 150,
    height: 40,
  },
});

export default styles;
