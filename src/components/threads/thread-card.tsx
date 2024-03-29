import {View, Text, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {
  HeartIcon,
  MessageIcon,
  RepostIcon,
  SendIcon,
} from '../../../assets/icons';
import {useTheme} from '../../hooks';

export function ThreadCard() {
  const {currentColor} = useTheme();
  return (
    <View
      style={{
        width: wp(97),
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
      }}>
      <View
        style={{
          width: wp(15),
        }}>
        <Image
          source={require('../../../assets/images/avatar.png')}
          style={{
            width: wp(10),
            height: wp(10),
            borderRadius: wp(10 / 2),
          }}
        />
      </View>

      <View
        style={{
          width: wp(80),
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'flex-start',
          rowGap: wp(1.2),
        }}>
        <View
          style={{
            width: '100%',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <Text
            style={{
              fontWeight: '800',
              fontSize: wp(3.5),
              color: currentColor.secondary,
            }}>
            Wade Warren
          </Text>
          <Text
            style={{
              fontWeight: '300',
              fontSize: wp(3.2),
              color: currentColor.secondary,
            }}>
            33m
          </Text>
        </View>
        <Text
          style={{
            fontWeight: '500',
            fontSize: wp(3.2),
            color: currentColor.secondary,
          }}>
          Let's talk about the incredible power of perseverance and how it can
          change your life. 🚀
        </Text>
        <View
          style={{
            width: '100%',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'flex-start',
            columnGap: wp(2),
          }}>
          <TouchableOpacity>
            <HeartIcon fill="red" width={wp(5)} height={wp(5)} />
          </TouchableOpacity>
          <TouchableOpacity>
            <MessageIcon
              width={wp(5)}
              height={wp(5)}
              color={currentColor.secondary}
            />
          </TouchableOpacity>
          <TouchableOpacity>
            <RepostIcon
              width={wp(5)}
              height={wp(5)}
              color={currentColor.secondary}
            />
          </TouchableOpacity>
          <TouchableOpacity>
            <SendIcon
              width={wp(5)}
              height={wp(5)}
              color={currentColor.secondary}
            />
          </TouchableOpacity>
        </View>
        <View
          style={{
            width: '100%',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'flex-start',
            columnGap: wp(2),
          }}>
          <Text
            style={{
              fontWeight: '500',
              fontSize: wp(3.2),
              color: currentColor.lightGray,
            }}>
            26 replies
          </Text>
          <Text
            style={{
              fontWeight: '500',
              fontSize: wp(3.2),
              color: currentColor.lightGray,
            }}>
            • 112 Likes
          </Text>
        </View>
      </View>
    </View>
  );
}
