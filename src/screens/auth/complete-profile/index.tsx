import {
  ActivityIndicator,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useTheme} from '../../../hooks';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import InputComponent from '../_components/input-component';
import {useForm} from 'react-hook-form';
import firestore from '@react-native-firebase/firestore';
import Snackbar from 'react-native-snackbar';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  ImageLibraryOptions,
  launchImageLibrary,
} from 'react-native-image-picker';
import ProfileHeader from './_components/profile-header';
import storage from '@react-native-firebase/storage';
import {AtIcon} from '../../../../assets/icons';
import {useAuth} from '../../../context/auth-context';

export type completeProfileProps = {
  first_name: string;
  last_name: string;
  avatar: string | null;
  cover: string | null;
  bio: string;
  location: string;
  username: string;
};

export function CompleteProfileScreen() {
  const {currentColor} = useTheme();
  const {authenticateUser} = useAuth();

  const form = useForm<completeProfileProps>({
    defaultValues: {
      first_name: '',
      last_name: '',
      avatar:
        'https://t4.ftcdn.net/jpg/05/42/36/11/360_F_542361185_VFRJWpR2FH5OiAEVveWO7oZnfSccZfD3.jpg',
      cover: 'https://savethefrogs.com/wp-content/uploads/placeholder-1-2.png',
      bio: '',
      location: '',
      username: '',
    },
  });

  const [loading, setLoading] = React.useState<boolean>(false);

  const openImagePicker = ({name}: {name: string}) => {
    const options: ImageLibraryOptions = {
      mediaType: 'photo',
      presentationStyle: 'popover',
      selectionLimit: 1,
    };

    launchImageLibrary(options, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else {
        let imageUri = response.assets?.[0]?.uri;
        form.setValue(name, imageUri);
      }
    });
  };

  const handleSubmit = async (data: completeProfileProps) => {
    try {
      setLoading(true);
      const userID = await AsyncStorage.getItem('threads-user-id');
      if (!userID) {
        return;
      }

      const uploadAvatar = async () => {
        if (!data?.avatar) {
          return;
        }
        const ref = storage().ref(`users/avatars/${userID}`);
        await ref.putFile(data?.avatar);
        const url = await ref?.getDownloadURL();
        return url;
      };

      const uploadCover = async () => {
        if (!data?.cover) {
          return;
        }
        const ref = storage().ref(`users/covers/${userID}`);
        await ref.putFile(data?.cover);
        const url = await ref?.getDownloadURL();
        return url;
      };

      const [avatarImageUrl, coverImageUrl] = await Promise.all([
        uploadAvatar(),
        uploadCover(),
      ]);

      await firestore().collection('users').doc(userID).update({
        first_name: data?.first_name,
        last_name: data?.last_name,
        bio: data?.bio,
        username: data?.username,
        location: data?.location,
        avatar: avatarImageUrl,
        cover: coverImageUrl,
      });

      Snackbar.show({
        text: 'Account has been completed successfully',
        duration: Snackbar.LENGTH_SHORT,
        action: {
          text: 'UNDO',
          textColor: '#fff',
          onPress: () => {
            // Undo action
          },
        },
        backgroundColor: currentColor.violet,
      });
      setLoading(false);
      authenticateUser(userID);
    } catch (error: any) {
      setLoading(false);
      Snackbar.show({
        text: error?.userInfo?.message || 'An error occurred',
        duration: Snackbar.LENGTH_INDEFINITE,
        action: {
          text: 'UNDO',
          textColor: '#fff',
          onPress: () => {
            // Undo action
          },
        },
        backgroundColor: 'red',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: currentColor.primary,
        alignItems: 'center',
        justifyContent: 'flex-start',
        padding: wp(6),
        rowGap: wp(6),
      }}>
      {/* cover image */}

      <ScrollView>
        <ProfileHeader form={form} openImagePicker={openImagePicker} />

        <View
          style={{
            width: '100%',
            flexDirection: 'column',
            rowGap: wp(3),
            marginTop: hp(3),
            padding: wp(4),
          }}>
          <InputComponent
            control={form.control}
            label="Username"
            name="username"
            placeholder="username"
            type="default"
            isPassword={false}
            Icon1={AtIcon}
          />
          <InputComponent
            control={form.control}
            label="First Name"
            name="first_name"
            placeholder="John"
            type="default"
            isPassword={false}
          />
          <InputComponent
            control={form.control}
            label="Last Name"
            name="last_name"
            placeholder="John"
            type="default"
            showDevider={true}
          />
          <InputComponent
            control={form.control}
            label="Bio"
            name="bio"
            type="default"
            placeholder="Your profile bio..."
            isPassword={false}
            showDevider={true}
            multiline
            numOfLines={3}
            textAlignVertical="top"
          />
          <InputComponent
            control={form.control}
            label="Location"
            name="location"
            type="default"
            placeholder="Your location..."
            showDevider={false}
          />
        </View>
        <TouchableOpacity
          onPress={form.handleSubmit(handleSubmit)}
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
              Save
            </Text>
          )}
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}
