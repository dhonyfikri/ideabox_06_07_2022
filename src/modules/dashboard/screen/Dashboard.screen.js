import React, {useState} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {BarChart, LineChart} from 'react-native-chart-kit';
import DropDownPicker from 'react-native-dropdown-picker';
import CardDashboard from '../../../components/CardDashboard';
import SearchHeader from '../../../components/SearchHeader';
import {windowWidth} from '../../../components/WindowDimensions';
import style from '../../../config/Style/style.cfg';
import styles from '../style/Dashboard.style';

const Dashboard = ({navigation}) => {
  // dropdown 1
  const [open1, setOpen1] = useState(false);
  const [value1, setValue1] = useState(null);
  const [items1, setItems1] = useState([
    {label: 'CORPORATE COMM & INVESTOR RELATION DEP', value: '1'},
    {label: 'CORPORATE SECRETARY DEPARTMENT', value: '2'},
    {label: 'DEPT GROUP CORPORATE TRANSFORMATION', value: '3'},
    {label: 'INTERNAL AUDIT', value: '4'},
  ]);
  // dropdown 2
  const [open2, setOpen2] = useState(false);
  const [value2, setValue2] = useState(null);
  const [items2, setItems2] = useState([
    {label: '2022', value: '2022'},
    {label: '2021', value: '2021'},
  ]);
  // dropdown 3
  const [open3, setOpen3] = useState(false);
  const [value3, setValue3] = useState(null);
  const [items3, setItems3] = useState([
    {label: "CEO'S-OFFICE", value: '1'},
    {label: 'CFU-CONSUMER', value: '2'},
    {label: 'CFU-DIGSERV', value: '3'},
    {label: 'CFU-ENTPRISE', value: '4'},
    {label: 'CFU MOBILE', value: '5'},
    {label: 'CFU-WHSALE', value: '6'},
    {label: 'FU-FINANCE', value: '7'},
    {label: 'FU-HCM', value: '8'},
    {label: 'FU-NITS', value: '9'},
    {label: 'FU-SP', value: '10'},
    {label: 'SUBSIDIARIES', value: '11'},
  ]);
  // dropdown 4
  const [open4, setOpen4] = useState(false);
  const [value4, setValue4] = useState(null);
  const [items4, setItems4] = useState([
    {label: 'Q1', value: '1'},
    {label: 'Q2', value: '2'},
    {label: 'Q3', value: '3'},
    {label: 'Q4', value: '4'},
  ]);
  // dropdown 5
  const [open5, setOpen5] = useState(false);
  const [value5, setValue5] = useState(null);
  const [items5, setItems5] = useState([
    {label: 'DIREKTORAT', value: '1'},
    {label: 'DIVISI/CENTER', value: '2'},
    {label: 'REGIONAL', value: '3'},
    {label: 'WITEL', value: '4'},
    {label: 'DIREKTORAT', value: '5'},
  ]);
  // dropdown 6
  const [open6, setOpen6] = useState(false);
  const [value6, setValue6] = useState(null);
  const [items6, setItems6] = useState([
    {label: 'DIT CONS-SUBDIT CONSUMER FULFILLMENT', value: '1'},
    {label: 'DIT CONS-SUBDIT CONSUMER ASSURANCE', value: '2'},
    {label: 'DIT CONS-SUBDIT PLANNING & RESOURCE MANAGEMENT', value: '3'},
    {label: 'DIT CONS-SUBDIT MARKETING MANAGEMENT', value: '4'},
  ]);
  // dropdown 7
  const [open7, setOpen7] = useState(false);
  const [value7, setValue7] = useState(null);
  const [items7, setItems7] = useState([
    {label: 'Excel', value: '1'},
    {label: 'PDF', value: '2'},
  ]);

  //chart
  const dataChart = {
    labels: ["CEO'S-OFFICE", 'CONSUMER', 'DIGSERV', 'ETREPISE', 'MOBILE'],
    datasets: [
      {
        data: [20, 45, 28, 80, 99],
      },
    ],
  };
  // const chartConfig = {
  //   backgroundGradientFrom: '#0B87B1',
  //   backgroundGradientFromOpacity: 1,
  //   backgroundGradientTo: '#085D7A',
  //   backgroundGradientToOpacity: 1,
  //   color: (opacity = 1) => `white`,
  //   strokeWidth: 2, // optional, default 3
  //   barPercentage: 0.5,
  //   useShadowColorFromDataset: false, // optional
  //   labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
  //   labelSize: () => 5,
  // };
  DropDownPicker.setListMode('SCROLLVIEW');
  return (
    <SafeAreaView style={styles.container}>
      <SearchHeader
        onPress={() => navigation.openDrawer()}
        notification={() => navigation.navigate('Notification')}
        placeholder={'Search an Event ... '}
      />
      <ScrollView style={styles.content}>
        <Text style={[style.h4, {color: '#085D7A', fontSize: 20}]}>
          Monitoring Dashboard Report
        </Text>
        <View style={styles.cardContainer}>
          <CardDashboard
            icon={require('../../../assets/icon/iconTotalIdea.png')}
            total={2131}
            item={'Idea'}
            marginRight={10}
          />
          <CardDashboard
            icon={require('../../../assets/icon/iconTotalTalent.png')}
            total={1121}
            item={'Talent'}
          />
        </View>
        <View style={styles.contentChart}>
          <View style={styles.titleChart}>
            <Text style={[style.h4, {color: '#085D7A', fontSize: 20}]}>
              Chart By
            </Text>
            <View>
              <DropDownPicker
                open={open1}
                value={value1}
                items={items1}
                setOpen={setOpen1}
                setValue={setValue1}
                setItems={setItems1}
                style={styles.input}
                placeholder="All Event"
                labelStyle={styles.fontLabelStyle}
                listItemLabelStyle={styles.labelStyle}
                listItemContainerStyle={styles.listContainer}
                placeholderStyle={styles.placeholder}
              />
            </View>
          </View>
          <View
            style={{
              width: '100%',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <View style={styles.headerWrap}>
              <TouchableOpacity style={styles.wrap} onPress={() => {}}>
                <View style={styles.tabBarActive}>
                  <Text style={styles.textActive}>CFU / FU</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity style={styles.wrap} onPress={() => {}}>
                <View style={styles.tabBar}>
                  <Text style={styles.textNonActive}>Talent</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
          <View
            style={{
              width: '100%',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <BarChart
              data={dataChart}
              width={windowWidth * 0.92} // from react-native
              height={350}
              fromZero={true}
              // verticalLabelRotation={90}
              chartConfig={{
                backgroundGradientFrom: '#085D7A',
                backgroundGradientTo: '#000',
                decimalPlaces: 0, // optional, defaults to 2dp
                color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                style: {
                  borderRadius: 16,
                },
                barPercentage: 1,
                propsForLabels: {wordSpacing: 3},
                propsForVerticalLabels: {fontSize: 10},
                propsForHorizontalLabels: {fontSize: 12, x: 30},
                fillShadowGradient: '#33A8A1',
                fillShadowGradientOpacity: 1,
              }}
              bezier
              segments={4}
              style={{
                marginTop: 10,
                borderRadius: 5,
              }}
            />
            {/* <BarChart
              data={dataChart}
              width={windowWidth}
              height={260}
              yAxisLabel="$"
              chartConfig={chartConfig}
              style={{}}
            /> */}
          </View>
        </View>
        <View style={styles.contentChart2}>
          <View style={{padding: 10}}>
            <Text
              style={[
                style.h4,
                {
                  color: '#085D7A',
                  marginTop: 20,
                  marginBottom: 30,
                  fontSize: 20,
                  marginLeft: 10,
                },
              ]}>
              Data
            </Text>
            <View style={styles.titleChart2}>
              <View>
                <DropDownPicker
                  open={open2}
                  value={value2}
                  items={items2}
                  setOpen={setOpen2}
                  setValue={setValue2}
                  setItems={setItems2}
                  style={styles.input}
                  placeholder="All Event"
                  labelStyle={styles.fontLabelStyle}
                  listItemLabelStyle={styles.labelStyle}
                  listItemContainerStyle={styles.listContainer}
                  dropDownDirection="TOP"
                  placeholderStyle={styles.placeholder}
                />
              </View>
              <View>
                <DropDownPicker
                  open={open7}
                  value={value7}
                  items={items7}
                  setOpen={setOpen7}
                  setValue={setValue7}
                  setItems={setItems7}
                  placeholder="Export"
                  style={styles.input}
                  scrollViewProps={true}
                  labelStyle={styles.fontLabelStyle}
                  listItemLabelStyle={styles.labelStyle}
                  listItemContainerStyle={styles.listContainer}
                  dropDownDirection="TOP"
                  placeholderStyle={styles.placeholder}
                />
              </View>
            </View>
            <View style={styles.titleChart2}>
              <View>
                <DropDownPicker
                  open={open4}
                  value={value4}
                  items={items4}
                  setOpen={setOpen4}
                  setValue={setValue4}
                  setItems={setItems4}
                  style={styles.input}
                  placeholder="Month"
                  scrollViewProps={true}
                  labelStyle={styles.fontLabelStyle}
                  listItemLabelStyle={styles.labelStyle}
                  listItemContainerStyle={styles.listContainer}
                  maxHeight={150}
                  zIndex={6000}
                  placeholderStyle={styles.placeholder}
                />
              </View>
              <View>
                <DropDownPicker
                  open={open5}
                  value={value5}
                  items={items5}
                  setOpen={setOpen5}
                  setValue={setValue5}
                  setItems={setItems5}
                  style={styles.input}
                  placeholder="Category Unit"
                  scrollViewProps={true}
                  labelStyle={styles.labelStyle}
                  listItemLabelStyle={styles.labelStyle}
                  listItemContainerStyle={styles.listContainer}
                  maxHeight={150}
                  zIndex={6000}
                  placeholderStyle={styles.placeholder}
                />
              </View>
            </View>
            <View style={styles.titleChart2}>
              <View>
                <DropDownPicker
                  open={open6}
                  value={value6}
                  items={items6}
                  setOpen={setOpen6}
                  setValue={setValue6}
                  setItems={setItems6}
                  style={styles.input}
                  placeholder="Unit"
                  scrollViewProps={true}
                  labelStyle={styles.fontLabelStyle}
                  listItemLabelStyle={styles.labelStyle}
                  listItemContainerStyle={styles.listContainer}
                  maxHeight={200}
                  placeholderStyle={styles.placeholder}
                />
              </View>
              <View>
                <DropDownPicker
                  open={open3}
                  value={value3}
                  items={items3}
                  setOpen={setOpen3}
                  setValue={setValue3}
                  setItems={setItems3}
                  style={styles.input}
                  placeholder="CFU/FU"
                  scrollViewProps={true}
                  labelStyle={styles.fontLabelStyle}
                  listItemLabelStyle={styles.labelStyle}
                  listItemContainerStyle={styles.listContainer}
                  placeholderStyle={styles.placeholder}
                  maxHeight={180}
                />
              </View>
            </View>
            <TouchableOpacity style={styles.button}>
              <Text style={[style.h4, {color: '#FFFFFF'}]}>Search</Text>
            </TouchableOpacity>
          </View>
          <View style={[styles.tableContent, {backgroundColor: '#085D7A'}]}>
            <Text style={[style.h4, {color: '#FFFFFF'}]}>CFU/FU</Text>
            <Text style={[style.h4, {color: '#FFFFFF'}]}>Kat.Unit</Text>
            <Text style={[style.h4, {color: '#FFFFFF'}]}>Unit</Text>
          </View>
          <View style={[styles.tableContent, {backgroundColor: '#EBEBEB'}]}>
            <Text style={[style.h4medium, {fontSize: 14}]}>CFU/FU</Text>
            <Text style={[style.h4medium, {fontSize: 14}]}>Kat.Unit</Text>
            <Text style={[style.h4medium, {fontSize: 14}]}>Unit</Text>
          </View>
          <View style={[styles.tableContent, {backgroundColor: '#FFFFFF'}]}>
            <Text style={[style.h4medium, {fontSize: 14}]}>CFU/FU</Text>
            <Text style={[style.h4medium, {fontSize: 14}]}>Kat.Unit</Text>
            <Text style={[style.h4medium, {fontSize: 14}]}>Unit</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Dashboard;
