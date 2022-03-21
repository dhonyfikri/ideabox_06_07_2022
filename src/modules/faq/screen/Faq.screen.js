import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import Header from '../../../components/Header';
import style from '../../../config/Style/style.cfg';

const TextContent = props => {
  const [expanded, setExpanded] = useState(false);
  const handleOnClick = () => {
    if (expanded === true) {
      setExpanded(false);
    } else {
      setExpanded(true);
    }
  };
  return (
    <View style={styles.titleContent}>
      <View style={styles.wrapContent}>
        <TouchableOpacity onPress={() => handleOnClick()} style={styles.row}>
          <Text style={[style.h4medium, styles.textTitleContent]}>
            {props.title}
          </Text>
          {expanded === false ? (
            <Image
              source={require('../../../assets/icon/whitearrowdown.png')}
              style={styles.imageArrow}
            />
          ) : (
            <Image
              source={require('../../../assets/icon/whitearrowup.png')}
              style={styles.imageArrow}
            />
          )}
        </TouchableOpacity>
        {expanded === true ? (
          <Text style={[style.h5, styles.textContent]}>{props.desc}</Text>
        ) : null}
      </View>
    </View>
  );
};
const Faq = ({navigation}) => {
  return (
    <SafeAreaView style={styles.container}>
      <Header
        onPress={() => navigation.openDrawer()}
        notification={() => navigation.navigate('Notification')}
      />
      <ScrollView>
        <View style={styles.content}>
          <Image
            source={require('../../../assets/image/faq.png')}
            style={styles.image}
          />
          <Text style={[style.h3, styles.textFaq]}>
            Frequently Asked Questions
          </Text>
          <TextContent
            title={'Apa itu IdeaBox?'}
            desc={
              'IDEABOX merupakan single platform yang berperan sebagai wadah untuk menampung ide-ide inovasi karyawan Telkom Group agar dapat memudahkan dalam berkolaborasi dan mengembangkannya serta sebagai bentuk komitmen Telkom Indonesia dalam menjawab tantangan industri digital dan akselerasi ekosistem digital indonesia.'
            }
          />
          <TextContent
            title={'Kenapa saya harus jadi innovator?'}
            desc={
              'Kamu dapat mengasah dan mengembangkan potensi diri kamu di era disruptif teknologi dan informasi dan juga kamu bisa ikut serta memberikan impact signifikan kepada lingkungan sosial kita dan juga kepada perusahaan. '
            }
          />
          <TextContent
            title={'Ada apa aja sih stream atau role yang tersedia di IdeaBox?'}
            desc={
              'Ada 3 stream yang bisa kamu ikuti salah satunya, yaitu: The Hustler (Market & Business), The Hipster (Design & User Experience), The Hacker. (Engineer & Developer). '
            }
          />
          <TextContent
            title={
              'Siapa aja sih yang bisa submit ide inovasi melalui IdeaBox?'
            }
            desc={'Seluruh karyawan Internal Telkom Group.'}
          />
          <TextContent
            title={
              'Kemana saya harus menghubungi apabila masih ada yang ingin saya tanyakan?'
            }
            desc={
              'Untuk informasi lebih lanjut, kamu bisa menghubungi helpdesk kami, diXXXXX atau menghubungi email kami, hello@digitalamoeba.id.'
            }
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Faq;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#085D7A',
  },
  content: {
    padding: 15,
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: 325,
  },
  textFaq: {
    color: '#FFFFFF',
    marginVertical: 15,
  },
  titleContent: {
    flex: 1,
    width: '100%',
    height: null,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomColor: '#FFFFFF',
    borderBottomWidth: 1,
    paddingVertical: 10,
  },
  row: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  imageArrow: {
    width: 35,
    height: 35,
  },
  textTitleContent: {
    color: '#FFFFFF',
    maxWidth: '80%',
    lineHeight: 25,
  },
  wrapContent: {
    width: '100%',
  },
  textContent: {
    color: '#FFFFFF',
  },
});
