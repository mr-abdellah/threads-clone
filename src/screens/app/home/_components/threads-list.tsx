import {FlatList} from 'react-native';
import {ThreadCard} from '../../../../components';
import {Logo} from '../../../../../assets/icons';
import {useTheme} from '../../../../hooks';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

export function ThreadsList() {
  const {currentColor} = useTheme();
  return (
    <FlatList
      data={[1]}
      style={{
        backgroundColor: currentColor.primary,
        width: wp(100),
        height: hp(100),
        padding: wp(2),
      }}
      contentContainerStyle={{}}
      ListHeaderComponent={<Logo color={currentColor.secondary} />}
      ListHeaderComponentStyle={{
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: hp(3),
      }}
      renderItem={({item}) => <ThreadCard {...item} />}
    />
  );
}
