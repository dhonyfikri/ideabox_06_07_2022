import React, {useState, useEffect, useRef} from 'react';
import styles from '../style/TopIdea.style';
import {Text, View, ScrollView, SafeAreaView} from 'react-native';
import {
  CardProductiveTrending,
  CardTopTrending,
} from '../../../components/CardTrending';
import SearchHeader from '../../../components/SearchHeader';
import CardFilterTrending from '../../../components/CardFilterTrending';
import {useScrollToTop} from '@react-navigation/native';
import {
  GetDataTopComment,
  GetDataTopLike,
  GetDataTrending,
} from '../../../config/GetData/GetDataTrending';
import LoadingScreen from '../../../components/LoadingScreen';

const TopIdea = ({navigation}) => {
  const dataTop = require('../data/Top.json');
  const dataFilter = require('../data/DataFilter.json');
  const dataProductive = require('../data/Most.json');
  const [selectedId, setSelectedId] = useState(3);
  const [hasil, setHasil] = useState('');
  const [placeholder, setPlaceholder] = useState('');
  const getData = dataSearch => {
    setHasil(dataSearch);
  };
  const [dataTopComment, setDataTopComment] = useState(null);
  const [dataTopLike, setDataTopLike] = useState(null);
  const [dataTrending, setDataTrending] = useState(null);
  useEffect(() => {
    GetDataTopComment().then(response => setDataTopComment(response));
    GetDataTopLike().then(response => setDataTopLike(response));
    GetDataTrending().then(response => setDataTrending(response));
  }, []);
  useEffect(() => {
    if (selectedId === 1) {
      setPlaceholder('Search an Idea ... ');
    } else if (selectedId === 2) {
      setPlaceholder('Search a Profile ... ');
    } else if (selectedId === 3) {
      setPlaceholder('Search an Idea ... ');
    } else if (selectedId === 4) {
      setPlaceholder('Search an Idea ... ');
    }
  }, [selectedId]);
  const ref = useRef(null);
  useScrollToTop(ref);
  if (
    dataTopComment === null ||
    dataTopLike === null ||
    dataTrending === null
  ) {
    return <LoadingScreen />;
  }
  return (
    <SafeAreaView style={styles.container}>
      {/* header */}
      <SearchHeader
        onPress={() => navigation.openDrawer()}
        notification={() => navigation.navigate('Notification')}
        getData={getData}
        placeholder={placeholder}
      />

      {/* Top Bar */}
      <View style={{paddingHorizontal: 5}}>
        <ScrollView
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          ref={ref}>
          {dataFilter.map((val, key) => {
            const backgroundColor =
              val.id === selectedId ? '#095E7B' : '#FFFFFF';
            const fontColor = val.id === selectedId ? '#FFFFFF' : '#095E7B';
            return (
              <View key={key}>
                <CardFilterTrending
                  title={val.title}
                  getId={() => setSelectedId(val.id)}
                  backgroundColor={backgroundColor}
                  fontColor={fontColor}
                />
              </View>
            );
          })}
        </ScrollView>
      </View>

      <ScrollView ref={ref}>
        {
          // selectedId === 1
          // ? dataTrending
          //     .filter(top => {
          //       if (hasil === '') {
          //          return top;
          //        } else if (
          //          top.ideas.desc[0].value
          //            .toLowerCase()
          //           .includes(hasil.toLowerCase())
          //       ) {
          //         return top;
          //       }
          //     })
          //     .map((top, key) => {
          //       return (
          //         <View key={key}>
          //           <CardTopTrending
          //             title={top.ideas.desc[0].value}
          //             name={top.ideas.user.name}
          //             image={
          //               top.ideas.user.pictures === ''
          //                 ? require('../../../assets/icon/profilepicture.png')
          //                 : {uri: top.ideas.user.pictures}
          //             }
          //             desc={'Total comment & like : ' + top.total}
          //           />
          //         </View>
          //       );
          //     })
          //   :
          // : selectedId === 2
          // ? dataProductive
          //     .filter(productive => {
          //       if (hasil === '') {
          //         return productive;
          //       } else if (
          //         productive.name.toLowerCase().includes(hasil.toLowerCase())
          //       ) {
          //         return productive;
          //       }
          //     })
          //     .map((productive, key) => {
          //       return (
          //         <View key={key}>
          //           <CardProductiveTrending
          //             totalIdea={productive.totalidea}
          //             name={productive.name}
          //             image={productive.image}
          //           />
          //         </View>
          //       );
          //     })
          selectedId === 3
            ? dataTopLike
                .filter(top => {
                  if (hasil === '') {
                    return top;
                  } else if (
                    top.ideas.desc[0].value
                      .toLowerCase()
                      .includes(hasil.toLowerCase())
                  ) {
                    return top;
                  }
                })
                .map((top, key) => {
                  // console.log(top.title);
                  return (
                    <View key={key}>
                      <CardTopTrending
                        title={top.ideas.desc[0].value}
                        name={top.ideas.user.name}
                        image={
                          top.ideas.user.pictures === ''
                            ? require('../../../assets/icon/profilepicture.png')
                            : {uri: top.ideas.user.pictures}
                        }
                        desc={'Total like : ' + top.id}
                      />
                    </View>
                  );
                })
            : selectedId === 4
            ? dataTopComment
                .filter(top => {
                  if (hasil === '') {
                    return top;
                  } else if (
                    top.ideas.desc[0].value
                      .toLowerCase()
                      .includes(hasil.toLowerCase())
                  ) {
                    return top;
                  }
                })
                .map((top, key) => {
                  // console.log(top.title);
                  return (
                    <View key={key}>
                      <CardTopTrending
                        title={top.ideas.desc[0].value}
                        name={top.ideas.user.name}
                        image={
                          top.ideas.user.pictures === ''
                            ? require('../../../assets/icon/profilepicture.png')
                            : {uri: top.ideas.user.pictures}
                        }
                        desc={'Total comment : ' + top.comment}
                      />
                    </View>
                  );
                })
            : null
        }
      </ScrollView>

      {/* CARD */}
      <View style={{height: 70}}></View>
    </SafeAreaView>
  );
};

export default TopIdea;
