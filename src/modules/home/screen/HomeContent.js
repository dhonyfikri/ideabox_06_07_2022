import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  Image,
  ScrollView,
  Modal,
  TouchableOpacity,
} from 'react-native';
import SearchHeader from '../../../components/SearchHeader';
import style from '../../../config/Style/style.cfg';
import styles from '../style/Home.style';
import Swiper from 'react-native-swiper';
import InovatorSay from '../../../components/InovatorSay';
import CardCategoryHome from '../../../components/CardCategoryHome';
import {Logo} from '../../../assets/image';
import Header from '../../../components/Header';
import Carousel from 'react-native-snap-carousel';
import {WhiteDotHome} from '../../../assets/icon';
import getData from '../../../components/GetData';
import LoadingScreen from '../../../components/LoadingScreen';

const HomeContent = ({navigation}) => {
  const image = [
    'https://images.unsplash.com/photo-1552664730-d307ca884978?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8d29yayUyMGV2ZW50fGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&w=1000&q=80',
    'https://cdn1-production-images-kly.akamaized.net/d6Feui5j5wCSj1C6uq2bC_js-i0=/640x360/smart/filters:quality(75):strip_icc():format(jpeg)/kly-media-production/medias/3170497/original/064866700_1593932946-Telkom_1.jpg',
    'https://p16-hera-va.ibyteimg.com/tos-useast2a-i-hn4qzgxq2n/f0e9d7a074db4f2db68f6b821fca82b6~tplv-hn4qzgxq2n-image:0:0.image',
  ];
  const [data, setData] = useState('');
  const [visible, setVisible] = useState(false);
  const [visible2, setVisible2] = useState(false);
  const [visible3, setVisible3] = useState(false);
  useEffect(() => {
    getData().then(jsonValue => setData(jsonValue));
  }, []);
  return (
    <SafeAreaView style={styles.container}>
      {/* header */}
      {/* <Header
        title="Home"
        onNotificationPress={() => navigation.navigate('Notification')}
      /> */}
      <ScrollView>
        <View style={{flex: 1, flexDirection: 'row', justifyContent: 'center'}}>
          <Carousel
            layout={'default'}
            ref={() => {}}
            data={image}
            sliderWidth={300}
            itemWidth={300}
            renderItem={({item, key}) => {
              return (
                <View key={key}>
                  <Image
                    source={{uri: item}}
                    style={{
                      borderRadius: 5,
                      height: 200,
                      width: 300,
                      padding: 50,
                      margin: 10,
                    }}
                  />
                </View>
              );
            }}
            loop={true}
            autoplay={true}
          />
        </View>
        <View style={styles.desc}>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <View>
              <Text style={[style.h4medium, styles.title]}>
                Welcome back,{'\n'}
                <Text style={{fontWeight: 'bold', textTransform: 'capitalize'}}>
                  {data.name}
                </Text>
                {'\n'}
              </Text>
              <Text style={[style.h4medium, styles.title]}>
                Lets Create your idea!!{'\n'}
              </Text>
            </View>
            <Image
              source={require('../../../assets/icon/whitedothome.png')}
              style={{width: 55, height: 55}}
            />
            <Image
              source={require('../../../assets/icon/whitedothome.png')}
              style={{width: 55, height: 55}}
            />
          </View>

          <View style={{alignItems: 'center', marginBottom: 10}}>
            <Image
              source={require('../../../assets/icon/icon1home.png')}
              style={{position: 'absolute', left: 0}}
            />
            <Image
              source={require('../../../assets/icon/icon2home.png')}
              style={{position: 'absolute', left: 15, width: 60}}
            />
            <Image
              source={require('../../../assets/icon/icon3home.png')}
              style={{position: 'absolute', left: 0, top: 20}}
            />
            <Image
              source={require('../../../assets/icon/icon4home.png')}
              style={{position: 'absolute', left: 20, top: 100}}
            />
            <Image
              source={require('../../../assets/icon/icon1home.png')}
              style={{position: 'absolute', top: 150, right: 0}}
            />
            <Image
              source={require('../../../assets/icon/icon2home.png')}
              style={{position: 'absolute', top: 150, right: 15, width: 60}}
            />
            <Image
              source={require('../../../assets/icon/icon5home.png')}
              style={{position: 'absolute', width: 175, height: 175}}
            />
            <Image
              source={require('../../../assets/image/imageHome.png')}
              style={styles.imageDesc}
            />
          </View>
          <View style={styles.wrap}>
            <Text style={[style.h3, styles.title, {marginTop: 10}]}>
              Apa Itu IDEABOX?
            </Text>
            <Text style={[style.h4normal, styles.descContent]}>
              merupakan single platform yang berperan sebagai wadah untuk
              menampung ide-ide inovasi karyawan Telkom Group agar dapat
              memudahkan dalam berkolaborasi dan mengembangkannya serta sebagai
              bentuk komitmen Telkom Indonesia dalam menjawab tantangan industri
              digital dan akselerasi ekosistem digital indonesia.
            </Text>
            <Text style={[style.h4, styles.quote]}>
              “ Lets Transform to be The Extraordinary You and Become the
              AMAzing Innovator!!! ”
            </Text>
            <Image
              source={require('../../../assets/icon/linehome.png')}
              style={{width: '100%', marginTop: 10, marginBottom: 20}}
            />
          </View>
        </View>
        {/* <View style={styles.containerCategory}>
          <Text style={[style.h2medium, styles.titleCategory]}>Category</Text>
          <View
            style={{
              width: '100%',
              flexDirection: 'column',
              justifyContent: 'space-between',
              height: 200,
            }}>
            <View style={styles.row}>
              <CardCategoryHome
                image={require('../../../assets/image/dummyPicture1.png')}
              />
              <CardCategoryHome
                image={require('../../../assets/image/dummyPicture2.png')}
              />
              <CardCategoryHome
                image={require('../../../assets/image/dummyPicture3.png')}
              />
            </View>
          </View>
        </View> */}
        <View style={styles.horizontalCard}>
          <TouchableOpacity
            style={[styles.cardContainer, {backgroundColor: '#F9CC2C'}]}
            onPress={() => {
              setVisible(true);
            }}>
            <View style={styles.tittleCardContainer}>
              <Text style={[style.h6, styles.titleCard]}>The Hipster Guy</Text>
            </View>
            <View style={styles.imageCardContainer}>
              <Image
                source={require('../../../assets/image/carddummy1.png')}
                style={styles.cardImage}
              />
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.cardContainer, {backgroundColor: '#E15C30'}]}
            onPress={() => {
              setVisible2(true);
            }}>
            <View style={styles.tittleCardContainer}>
              <Text style={[style.h6, styles.titleCard]}>The Hustler Guy</Text>
            </View>
            <View style={styles.imageCardContainer}>
              <Image
                source={require('../../../assets/image/carddummy2.png')}
                style={styles.cardImage}
              />
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.cardContainer, {backgroundColor: '#A9E34B'}]}
            onPress={() => {
              setVisible3(true);
            }}>
            <View style={styles.tittleCardContainer}>
              <Text style={[style.h6, styles.titleCard]}>The Hacker Guy</Text>
            </View>
            <View style={styles.imageCardContainer}>
              <Image
                source={require('../../../assets/image/carddummy3.png')}
                style={styles.cardImage}
              />
            </View>
          </TouchableOpacity>
        </View>

        <Text style={[style.h4, styles.titleInovator]}>
          WHAT THE INNOVATORS SAY
        </Text>
        <Swiper
          height={280}
          showsButtons={true}
          autoplayTimeout={5}
          loop
          autoplay
          activeDotColor="#085D7A"
          dot={<View style={styles.dotColor} />}>
          <InovatorSay
            image={require('../../../assets/image/homeinovator.jpeg')}
            desc={
              '“ Innovation is what keep us alive. Step out of your comfort zone, create values to the world, and you will realize it is all worth it. ”'
            }
            name={
              'Pingkan Prisilia Istra Langi \n CEO Diarium Indonesia & Worki'
            }
          />
          <InovatorSay
            image={require('../../../assets/image/pathya.png')}
            desc={
              '“ Ideabox merupakan sebuah tempat dimana sejarah yang merubah indonesia dimulai ”'
            }
            name={'Pathya Madhyastha Budhiputra \n CEO - SPRINTHINK'}
          />
        </Swiper>
        <View style={styles.descBottom}>
          <View style={styles.row}>
            <Image
              source={require('../../../assets/icon/Logo.png')}
              style={{width: 125, resizeMode: 'cover', height: 30}}
            />
            <View>
              <Text style={[style.h6, styles.descContentBottom]}>
                Jl. Gegerkalong Hilir, Sukarasa, Kec.
              </Text>
              <Text style={[style.h6, styles.descContentBottom]}>
                Sukasari, Kota Bandung, Jawa Barat
              </Text>
              <Text style={[style.h6, styles.descContentBottom]}> 40152</Text>
            </View>
          </View>
          <View style={{flexDirection: 'row'}}>
            <Image source={require('../../../assets/icon/copyright.png')} />
            <Text style={[style.h6, styles.descCopyright]}>
              2021 by AMA CORPU
            </Text>
          </View>
        </View>

        {/* Modal Hipster Guy */}
        <Modal
          animationType="none"
          transparent={true}
          visible={visible}
          onRequestClose={() => {
            setVisible(false);
          }}>
          <View style={styles.centeredView}>
            <View style={styles.centeredcontainer}>
              <View style={styles.modalView}>
                <View style={styles.inputContainer}>
                  <Image
                    source={require('../../../assets/image/hipsterguy.png')}
                    style={{width: '100%', height: 170, resizeMode: 'cover'}}
                  />
                  <View
                    style={{
                      padding: 15,
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: '100%',
                    }}>
                    <Text style={[style.h2]}>The Hipster Guy</Text>
                    <Text
                      style={[style.h4, {textAlign: 'center', marginTop: 15}]}>
                      (Marketing & Business) Sell & Communicate the product.
                    </Text>
                  </View>
                </View>
                <TouchableOpacity
                  onPress={() => setVisible(false)}
                  style={{
                    width: '100%',
                    backgroundColor: '#0C7AB0',
                    padding: 10,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <Text style={[style.h4, {color: '#FFFFFF'}]}>Close</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>

        {/* Modal Hustler Guy */}
        <Modal
          animationType="none"
          transparent={true}
          visible={visible2}
          onRequestClose={() => {
            setVisible2(false);
          }}>
          <View style={styles.centeredView}>
            <View style={styles.centeredcontainer}>
              <View style={styles.modalView}>
                <View style={styles.inputContainer}>
                  <Image
                    source={require('../../../assets/image/hustlerguy.png')}
                    style={{width: '100%', height: 170, resizeMode: 'cover'}}
                  />
                  <View
                    style={{
                      padding: 15,
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: '100%',
                    }}>
                    <Text style={[style.h2]}>The Hustler Guy</Text>
                    <Text
                      style={[style.h4, {textAlign: 'center', marginTop: 15}]}>
                      (Marketing & Business) Sell & Communicate the product.
                    </Text>
                  </View>
                </View>
                <TouchableOpacity
                  onPress={() => setVisible2(false)}
                  style={{
                    width: '100%',
                    backgroundColor: '#0C7AB0',
                    padding: 10,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <Text style={[style.h4, {color: '#FFFFFF'}]}>Close</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>

        {/* Modal Hacker Guy */}
        <Modal
          animationType="none"
          transparent={true}
          visible={visible3}
          onRequestClose={() => {
            setVisible3(false);
          }}>
          <View style={styles.centeredView}>
            <View style={styles.centeredcontainer}>
              <View style={styles.modalView}>
                <View style={styles.inputContainer}>
                  <Image
                    source={require('../../../assets/image/hackerguy.png')}
                    style={{width: '100%', height: 170, resizeMode: 'cover'}}
                  />
                  <View
                    style={{
                      padding: 15,
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: '100%',
                    }}>
                    <Text style={[style.h2]}>The Hacker Guy</Text>
                    <Text
                      style={[style.h4, {textAlign: 'center', marginTop: 15}]}>
                      (Engineer & Developer) Build the product.
                    </Text>
                  </View>
                </View>
                <TouchableOpacity
                  onPress={() => setVisible3(false)}
                  style={{
                    width: '100%',
                    backgroundColor: '#0C7AB0',
                    padding: 10,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <Text style={[style.h4, {color: '#FFFFFF'}]}>Close</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeContent;
