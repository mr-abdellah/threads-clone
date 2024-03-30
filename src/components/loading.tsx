import {SafeAreaView} from 'react-native';
import React from 'react';
import LottieView from 'lottie-react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {useTheme} from '../hooks';

export function Loading() {
  const {currentColor} = useTheme();
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: currentColor.secondary,
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <LottieView
        source={require('../../assets/lotties/loading.json')}
        style={{
          width: wp(90),
          height: hp(50),
        }}
        autoPlay
        loop
        useNativeLooping
      />
    </SafeAreaView>
  );
}
