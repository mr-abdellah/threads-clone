import {
  View,
  Text,
  SafeAreaView,
  TextInput,
  Image,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useForm} from 'react-hook-form';
import {useUser} from '../../../features';
import {useTheme} from '../../../hooks';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {AttachementIcon} from '../../../../assets/icons';
import {
  ImageLibraryOptions,
  launchImageLibrary,
} from 'react-native-image-picker';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import {Loading} from '../../../components';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {BottomTabsRoutes} from '../../../navigation/_types/navigation';
type CreateProps = {
  description: string;
  media: string[];
};

export function CreateScreen() {
  const {user} = useUser();
  const navigation = useNavigation<NavigationProp<BottomTabsRoutes>>();
  const {currentColor} = useTheme();
  const form = useForm<CreateProps>({
    defaultValues: {
      description: '',
      media: [],
    },
  });

  const [sharing, setSharing] = useState<boolean>(false);

  const media = form.watch('media');

  const openImagePicker = () => {
    const options: ImageLibraryOptions = {
      mediaType: 'mixed',
      presentationStyle: 'popover',
    };

    launchImageLibrary(options, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else {
        let imagesUri = response?.assets?.map(e => e?.uri);
        if (imagesUri !== undefined) {
          if (!media || media.length === 0) {
            form.setValue('media', imagesUri);
          } else {
            // Append the selected images to the existing ones
            form.setValue('media', [...media, ...imagesUri]);
          }
        }
      }
    });
  };

  const handleCreateThread = async (data: CreateProps) => {
    try {
      setSharing(true);
      if (data?.media?.length > 0) {
        // Upload media to Firebase Storage
        const urls: string[] = [];
        for (const media of data.media) {
          const ref = storage().ref(`posts/${user?.id}/${Date.now()}`);
          await ref.putFile(media);
          const url = await ref.getDownloadURL();
          urls.push(url);
        }
        // Create post in Firestore with media URLs
        await firestore().collection('posts').doc(`${user.id}-posts`).set({
          description: data.description,
          media: urls,
          likes: [],
          comments: [],
          owner: user?.id,
        });
      } else {
        // If no media, just create the post in Firestore without media URLs
        await firestore().collection('posts').doc(`${user.id}-posts`).set({
          description: data.description,
          media: [],
          likes: [],
          comments: [],
          owner: user?.id,
        });
      }
      setSharing(false);
      navigation.navigate('HomeScreen');
    } catch (error) {
      setSharing(false);
      console.error('Error while handling create thread:', error);
      throw error; // Rethrow error for handling higher up the call stack
    }
  };

  useEffect(() => {
    navigation.getParent()?.setOptions({
      tabBarStyle: {
        display: 'none',
      },
      headerShown: false,
    });
    return () =>
      navigation.getParent()?.setOptions({
        tabBarStyle: undefined,
        headerShown: true,
      });
  }, [navigation, sharing]);

  return (
    <>
      {sharing ? (
        <Loading />
      ) : (
        <SafeAreaView
          style={{
            flex: 1,
            backgroundColor: currentColor.primary,
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'flex-start',
              justifyContent: 'flex-start',
              paddingTop: wp(3),
              columnGap: wp(2),
            }}>
            <View
              style={{
                width: wp(15),
                alignItems: 'center',
                justifyContent: 'space-between',
                height: 'auto',
                minHeight: hp(20),
              }}>
              <Image
                source={{
                  uri: user?.avatar,
                }}
                style={{
                  width: wp(9),
                  height: wp(9),
                  borderRadius: wp(9 / 2),
                  borderWidth: 1,
                  borderColor: currentColor.secondary,
                }}
              />
              <View
                style={{
                  flexGrow: 1,
                  marginVertical: hp(1),
                  borderColor: currentColor.secondary,
                  borderWidth: 0.6,
                  borderStyle: 'dashed',
                }}
              />
              <Image
                source={{
                  uri: user?.avatar,
                }}
                style={{
                  width: wp(4),
                  height: wp(4),
                  borderRadius: wp(4 / 2),
                  borderWidth: 1,
                  borderColor: currentColor.secondary,
                  marginTop: 'auto',
                }}
              />
            </View>
            <View
              style={{
                width: wp(80),
                minHeight: hp(30),
              }}>
              <Text
                style={{
                  color: currentColor.secondary,
                  fontSize: wp(4.2),
                }}>{`${user?.first_name} ${user?.last_name}`}</Text>
              <TextInput
                value={form.watch('description')}
                onChangeText={t => form.setValue('description', t)}
                placeholder="Write anything..."
                placeholderTextColor={currentColor.lightGray}
                style={{
                  color: currentColor.secondary,
                  fontSize: wp(4.4),
                  paddingHorizontal: 0,
                  paddingTop: hp(0.3),
                }}
                textAlignVertical="top"
                multiline
                numberOfLines={8}
              />
              <TouchableOpacity onPress={openImagePicker}>
                <AttachementIcon
                  color={currentColor.secondary}
                  width={wp(5)}
                  height={wp(5)}
                />
              </TouchableOpacity>
              <FlatList
                data={media}
                style={{
                  marginVertical: hp(1),
                }}
                columnWrapperStyle={{
                  columnGap: wp(2),
                  rowGap: wp(2),
                }}
                numColumns={4}
                key={media?.length}
                keyExtractor={item => item}
                renderItem={({item}) => {
                  return (
                    <Image
                      style={{
                        width: wp(15),
                        height: wp(15),
                        borderRadius: 4,
                        marginBottom: hp(1),
                      }}
                      source={{
                        uri: item,
                      }}
                    />
                  );
                }}
              />
            </View>
          </View>
          <View
            style={{
              marginTop: 'auto',
              width: wp(100),
              flexDirection: 'row',
              height: hp(5),
              justifyContent: 'space-between',
              alignItems: 'center',
              backgroundColor: currentColor.primary,
            }}>
            <Text
              style={{
                color: currentColor.lightGray,
                fontSize: wp(3.2),
              }}>
              Anyone can reply
            </Text>
            <TouchableOpacity onPress={form.handleSubmit(handleCreateThread)}>
              <Text
                style={{
                  color: currentColor.blue,
                  fontSize: wp(4),
                }}>
                Post
              </Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      )}
    </>
  );
}
