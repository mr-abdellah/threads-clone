import {ActivityIndicator, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {LockIcon, Logo, UserCheckIcon} from '../../../../assets/icons';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {AuthStackRoutes} from '../../../navigation/_types/navigation';
import {useTheme} from '../../../hooks';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import InputComponent from '../_components/input-component';
import {useForm} from 'react-hook-form';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import Snackbar from 'react-native-snackbar';
import {FirebaseError} from '../../../types';
import {yupResolver} from '@hookform/resolvers/yup';
import registrationSchema from './_validation/register-schema';

type registerProps = {
  email: string;
  password: string;
  password_confirmation: string;
};

export function RegisterScreen() {
  const navigation = useNavigation<NavigationProp<AuthStackRoutes>>();
  const {currentColor} = useTheme();

  const form = useForm<registerProps>({
    defaultValues: {
      email: 'belkaid.abdulah@gmail.com',
      password: '12345678',
      password_confirmation: '12345678',
    },
    resolver: yupResolver(registrationSchema),
  });

  const [loading, setLoading] = React.useState<boolean>(false);

  const register = async (data: registerProps) => {
    try {
      setLoading(true);
      auth()
        .createUserWithEmailAndPassword(data.email, data.password)
        .then(res => {
          firestore()
            .collection('users')
            .doc(res.user.uid)
            .set({
              email: data.email,
              first_name: null,
              last_name: null,
              followers: 0,
              following: 0,
              id: res.user.uid,
              avatar: null,
              cover: null,
              bio: null,
              is_verified: false,
              is_premium: false,
              location: null,
            })
            .then(res => {
              console.log('registered : ', res);
              // setData({
              //   token: res.user.uid,
              //   user: {
              //     email: data.email,
              //     first_name: null,
              //     last_name: null,
              //     followers: [],
              //     following: [],
              //     username: null,
              //   },
              // });
              setLoading(false);
              Snackbar.show({
                text: 'Account has been created successfully',
                duration: Snackbar.LENGTH_INDEFINITE,
                action: {
                  text: 'UNDO',
                  textColor: '#fff',
                  onPress: () => {
                    //
                  },
                },
                backgroundColor: currentColor.violet,
              });
              // navigation.navigate('CompleteProfile', {
              //   email: data.email,
              // });
            })
            .catch((error: FirebaseError) => {
              console.log('error creating in users table : ', error);
              Snackbar.show({
                text: error?.userInfo?.message,
                duration: Snackbar.LENGTH_INDEFINITE,
                action: {
                  text: 'UNDO',
                  textColor: '#fff',
                  onPress: () => {
                    //
                  },
                },
                backgroundColor: 'red',
              });
              setLoading(false);
            });
        })
        .catch((error: FirebaseError) => {
          Snackbar.show({
            text: error?.userInfo?.message,
            duration: Snackbar.LENGTH_INDEFINITE,
            action: {
              text: 'UNDO',
              textColor: '#fff',
              onPress: () => {
                //
              },
            },
            backgroundColor: 'red',
          });
          setLoading(false);
        });
    } catch (error: any) {
      setLoading(false);
      console.log('error while creating user : ', error);
      Snackbar.show({
        text: error?.userInfo?.message,
        duration: Snackbar.LENGTH_INDEFINITE,
        action: {
          text: 'UNDO',
          textColor: '#fff',
          onPress: () => {
            //
          },
        },
        backgroundColor: 'red',
      });
    }
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: currentColor.primary,
        alignItems: 'center',
        justifyContent: 'center',
        padding: wp(6),
        rowGap: wp(6),
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
      <Text
        style={{
          fontSize: wp(4),
          color: currentColor.secondary,
          textAlign: 'center',
          fontWeight: 'bold',
        }}>
        Create a new account
      </Text>
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
          showDevider={true}
        />
        <InputComponent
          control={form.control}
          label="Password confirmation"
          name="password_confirmation"
          placeholder="********"
          type="default"
          isPassword={true}
          Icon1={LockIcon}
          showDevider={false}
        />
      </View>
      <TouchableOpacity
        onPress={form.handleSubmit(register)}
        style={{
          width: '100%',
          backgroundColor: currentColor.secondary,
          borderRadius: wp(3),
          padding: wp(3),
        }}
        disabled={loading}>
        {loading ? (
          <ActivityIndicator color={currentColor.primary} size="small" />
        ) : (
          <Text
            style={{
              fontSize: wp(3.5),
              color: currentColor.primary,
              textAlign: 'center',
              fontWeight: 'bold',
            }}>
            Register
          </Text>
        )}
      </TouchableOpacity>

      <View
        style={{
          width: '100%',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          columnGap: wp(1),
        }}>
        <Text
          style={{
            fontSize: wp(3.5),
            color: currentColor.lightGray,
            textAlign: 'center',
            fontWeight: '400',
          }}>
          You already have an account ?
        </Text>

        <TouchableOpacity onPress={() => navigation.navigate('LoginScreen')}>
          <Text
            style={{
              fontSize: wp(3.5),
              color: currentColor.secondary,
              textAlign: 'center',
              fontWeight: 'bold',
            }}>
            Login
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
