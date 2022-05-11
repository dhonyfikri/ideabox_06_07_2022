import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  TextInput,
} from 'react-native';
import React from 'react';

const CardContentNew = () => {
  return (
    <View
      style={{
        margin: 16,
        padding: 16,
        borderWidth: 1,
        borderColor: '#D4DAE2',
        borderRadius: 16,
      }}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <TouchableOpacity style={{flexDirection: 'row', alignItems: 'center'}}>
          <Image
            style={{
              width: 36,
              height: 36,
              borderRadius: 36,
              marginRight: 4,
            }}
            source={require('../assets/icon/dummyfotoprofile.jpeg')}
          />
          <Text style={{fontFamily: 'Poppins-SemiBold', fontSize: 12}}>
            Joko Widodo
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            paddingVertical: 6.5,
            paddingHorizontal: 8,
            backgroundColor: '#7C4BFF',
            borderRadius: 32,
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Image
            source={require('../assets/icon/joinidea.png')}
            style={{width: 20, height: 20, marginRight: 12}}
          />
          <Text
            style={{
              fontSize: 12,
              color: '#FFFFFF',
              fontWeight: 'bold',
              fontFamily: 'Poppins-Regular',
            }}>
            Join Idea
          </Text>
        </TouchableOpacity>
      </View>
      <View style={{marginVertical: 17, flexDirection: 'row'}}>
        <Image
          source={require('../assets/icon/dummyhistory.png')}
          style={{
            width: 96,
            height: 96,
            borderRadius: 8,
            marginRight: 16,
          }}
        />
        <View style={{flex: 1}}>
          <Text style={{fontFamily: 'Poppins-Bold', fontSize: 16}}>Idea 1</Text>
          <Text
            style={{
              fontFamily: 'Roboto-Regular',
              fontSize: 12,
              color: '#6B7280',
              lineHeight: 22,
            }}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor
          </Text>
        </View>
      </View>
      <View style={{height: 1, backgroundColor: '#D3D2D2'}} />
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginVertical: 21,
        }}>
        <TouchableOpacity>
          <Image
            source={require('../assets/icon/likebynew.png')}
            style={{width: 20, height: 17.8}}
          />
        </TouchableOpacity>
        <View style={{flexDirection: 'row'}}>
          <Image
            source={require('../assets/icon/dummyavatar.png')}
            style={{
              width: 26,
              height: 26,
              borderRadius: 26,
            }}
          />
          <View
            style={{
              width: 26,
              height: 26,
              borderRadius: 26,
              backgroundColor: 'yellow',
              marginLeft: -5,
            }}
          />
          <View
            style={{
              width: 26,
              height: 26,
              borderRadius: 26,
              backgroundColor: 'green',
              marginLeft: -5,
            }}
          />
          <View
            style={{
              width: 26,
              height: 26,
              borderRadius: 26,
              backgroundColor: '#D3D2D2',
              marginLeft: -5,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text>+4</Text>
          </View>
        </View>
        <Text style={{fontFamily: 'Roboto-Regular', fontSize: 12}}>
          Liked by
          <Text style={{fontWeight: 'bold'}}> Sri Mulyani</Text> and
          <Text style={{fontWeight: 'bold'}}> 212 Others</Text>
        </Text>
      </View>
      <TouchableOpacity>
        <Text
          style={{
            fontFamily: 'Roboto-Regular',
            fontSize: 12,
            color: '#9CA3AF',
          }}>
          View all 192 comment
        </Text>
      </TouchableOpacity>
      <View style={{marginVertical: 16}}>
        <Text
          style={{fontFamily: 'Roboto-Regular', fontSize: 12, marginBottom: 8}}>
          <Text style={{fontWeight: 'bold'}}>Livia</Text> woww keren banget
          idenya
        </Text>
        <Text style={{fontFamily: 'Roboto-Regular', fontSize: 12}}>
          <Text style={{fontWeight: 'bold'}}>Rifdah Ri</Text> mau join ideanya
          donggg
        </Text>
      </View>
      <View
        style={{
          borderWidth: 1,
          borderColor: '#D4DAE2',
          borderRadius: 32,
          flexDirection: 'row',
          alignItems: 'center',
          padding: 6,
        }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            flex: 1,
          }}>
          <Image
            source={require('../assets/icon/dummyfotoprofile.jpeg')}
            style={{
              width: 26,
              height: 26,
              borderRadius: 26,
              marginRight: 12,
            }}
          />
          <TextInput
            placeholder="Add Comment..."
            multiline={true}
            style={{
              fontSize: 12,
              fontFamily: 'Roboto-Regular',
              flex: 1,
              paddingVertical: 0,
            }}
          />
        </View>
        <TouchableOpacity>
          <Text
            style={{
              fontFamily: 'Roboto-Regular',
              fontSize: 12,
              color: '#7C4BFF',
            }}>
            Send
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CardContentNew;

const styles = StyleSheet.create({});
