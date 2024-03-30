import {View, Text, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {AuthStackRoutes} from '../../../navigation/_types/navigation';
import {useTheme} from '../../../hooks';
import {SafeAreaView} from 'react-native-safe-area-context';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {InstagramIcon} from '../../../../assets/icons';

export function OnboardingScreen() {
  const navigation = useNavigation<NavigationProp<AuthStackRoutes>>();
  const {currentColor, theme} = useTheme();
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: currentColor.primary,
        flexDirection: 'column',
        justifyContent: 'space-evenly',
        alignItems: 'center',
      }}>
      {/* <OnboardingPattern /> */}
      <Image
        source={require('../../../../assets/patterns/onboarding.png')}
        style={{
          width: wp(100),
          height: hp(70),
        }}
        resizeMethod="resize"
        resizeMode="cover"
      />

      <View
        style={{
          width: wp(90),
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          rowGap: wp(3),
        }}>
        <TouchableOpacity
          style={{
            backgroundColor:
              theme === 'dark' ? currentColor.quaternary : currentColor.primary,
            borderWidth: 1,
            borderColor: currentColor.tertiary,
            width: '100%',
            padding: wp(3.6),
            borderRadius: wp(2),
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: theme === 'dark' ? 5 : 1,
          }}
          onPress={() => {
            navigation.navigate('LoginScreen');
          }}>
          <Text
            style={{
              color: currentColor.secondary,
              fontSize: wp(4.3),
            }}>
            Login with instagram
          </Text>
          <InstagramIcon width={wp(5)} height={wp(5)} />
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            backgroundColor:
              theme === 'dark' ? currentColor.quaternary : currentColor.primary,
            borderWidth: 1,
            borderColor: currentColor.tertiary,
            width: '100%',
            padding: wp(3.6),
            borderRadius: wp(2),
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,

            elevation: theme === 'dark' ? 5 : 1,
          }}
          onPress={() => {
            navigation.navigate('RegisterScreen');
          }}>
          <Text
            style={{
              color: currentColor.secondary,
              fontSize: wp(4.3),
            }}>
            Register
          </Text>
          <InstagramIcon width={wp(5)} height={wp(5)} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
