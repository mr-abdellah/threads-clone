import {Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {LockIcon, Logo, UserCheckIcon} from '../../../../assets/icons';
// import {NavigationProp, useNavigation} from '@react-navigation/native';
// import {AuthStackRoutes} from '../../../navigation/_types/navigation';
import {useTheme} from '../../../hooks';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import InputComponent from '../_components/input-component';
import {useForm} from 'react-hook-form';

export function LoginScreen() {
  // const navigation = useNavigation<NavigationProp<AuthStackRoutes>>();
  const {currentColor} = useTheme();

  const form = useForm<{email: string; password: string}>({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: currentColor.primary,
        alignItems: 'center',
        justifyContent: 'center',
        padding: wp(6),
        rowGap: wp(3),
      }}>
      <View
        style={{
          backgroundColor: currentColor.secondary,
          width: wp(18),
          height: wp(18),
          alignContent: 'center',
          justifyContent: 'center',
          alignItems: 'center',
          padding: wp(2),
          borderRadius: wp(2),
        }}>
        <Logo fill={currentColor.primary} width={wp(12)} height={wp(12)} />
      </View>
      <View
        style={{
          width: '100%',
          flexDirection: 'column',
          rowGap: wp(3),
          borderColor: currentColor.tertiary,
          borderWidth: 2,
          borderRadius: wp(3),
          padding: wp(4),
        }}>
        <InputComponent
          control={form.control}
          label="Email"
          name="email"
          placeholder="example@example.com"
          type="email-address"
          isPassword={false}
          Icon1={UserCheckIcon}
        />
        <InputComponent
          control={form.control}
          label="Password"
          name="password"
          placeholder="********"
          type="default"
          isPassword={true}
          Icon1={LockIcon}
          showDevider={false}
        />
      </View>
      <TouchableOpacity
        style={{
          width: '100%',
          backgroundColor: currentColor.secondary,
          borderRadius: wp(3),
          padding: wp(3),
        }}>
        <Text
          style={{
            fontSize: wp(3.5),
            color: currentColor.primary,
            textAlign: 'center',
            fontWeight: 'bold',
          }}>
          Login
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
