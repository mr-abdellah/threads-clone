import {FlatList} from 'react-native';
import {ThreadCard} from '../../../../components';
import {Logo} from '../../../../../assets/icons';
import {useTheme} from '../../../../hooks';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {useEffect, useState} from 'react';
import firestore from '@react-native-firebase/firestore';

export type Thread = {
  comments: any[];
  description: string;
  likes: any[];
  media: string[];
  owner: string;
};

export function ThreadsList() {
  const {currentColor} = useTheme();
  const [threads, setThreads] = useState<Thread[]>([]);

  useEffect(() => {
    const getThreads = async () => {
      const userSnapshot = await firestore().collection('posts').get();
      const res: any = userSnapshot?.docs?.map(doc => doc.data());
      setThreads(res);
    };

    getThreads();
  });

  return (
    <FlatList
      data={threads}
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
