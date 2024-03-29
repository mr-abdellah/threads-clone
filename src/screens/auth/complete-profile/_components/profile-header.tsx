import React from 'react';
import {Image, TouchableOpacity, View} from 'react-native';
import {AttachementIcon} from '../../../../../assets/icons';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {UseFormReturn} from 'react-hook-form';
import {completeProfileProps} from '..';
import {useTheme} from '../../../../hooks';

type ProfileHeaderProps = {
  form: UseFormReturn<completeProfileProps, any, undefined>;
  openImagePicker: ({name}: {name: string}) => void;
};

const ProfileHeader: React.FC<ProfileHeaderProps> = ({
  form,
  openImagePicker,
}) => {
  const avatar = form.watch('avatar');

  const {currentColor, theme} = useTheme();

  return (
    <View
      style={{
        position: 'relative',
      }}>
      <TouchableOpacity
        onPress={() =>
          openImagePicker({
            name: 'cover',
          })
        }
        style={{
          width: wp(86),
          height: hp(16),
          borderRadius: wp(2),
          backgroundColor:
            theme === 'dark' ? currentColor.quaternary : currentColor.primary,
          borderWidth: 1,
          borderColor: currentColor.tertiary,
          overflow: 'hidden',
        }}>
        <Image
          source={{uri: form.watch('cover')}}
          style={{flex: 1}}
          resizeMethod="resize"
          resizeMode="cover"
        />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() =>
          openImagePicker({
            name: 'avatar',
          })
        }
        style={{
          backgroundColor:
            theme === 'dark' ? currentColor.quaternary : currentColor.primary,

          width: wp(20),
          height: wp(20),
          borderRadius: wp(20 / 2),
          alignContent: 'center',
          justifyContent: 'center',
          alignItems: 'center',
          padding: wp(2),
          position: 'absolute',
          bottom: -20,
          left: 10,
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
          elevation: theme === 'dark' ? 5 : 1,
          borderWidth: 1,
          borderColor: currentColor.tertiary,
        }}>
        {avatar && (
          <Image
            source={{
              uri: avatar,
            }}
            style={{
              width: wp(20),
              height: wp(20),
              borderRadius: wp(20 / 2),
            }}
            resizeMethod="resize"
            resizeMode="cover"
          />
        )}
        <AttachementIcon
          color={currentColor.secondary}
          width={wp(4)}
          height={wp(4)}
          style={{
            position: 'absolute',
            bottom: 0,
            right: 10,
          }}
          fill={
            theme === 'dark' ? currentColor.quaternary : currentColor.primary
          }
        />
      </TouchableOpacity>
    </View>
  );
};

export default ProfileHeader;
