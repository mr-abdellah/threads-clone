import {createContext, ReactNode, useContext, useState} from 'react';
import Storage from 'react-native-storage';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useUser} from '../features/userSlice';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import {User} from '../types/user';

export interface AuthContextProps {
  authenticateUser: (token: string) => void;
  isAuthenticated: boolean;
  checking: boolean;
  getUserCollection: () => void;
  logout: () => void;
}

const storage = new Storage({
  size: 1000,
  storageBackend: AsyncStorage,
  defaultExpires: 1000 * 3600 * 24,
  enableCache: true,
  sync: {},
});

export const AuthContext = createContext<AuthContextProps | null>(null);

export const AuthProvider = ({
  children,
}: {
  children: ReactNode;
}): JSX.Element => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [userID, setUserID] = useState<string | null>(null);
  const [checking, setChecking] = useState<boolean>(false);
  const {setData} = useUser();

  const authenticateUser = (token: string) => {
    storage
      .save({
        key: 'threads-user-id',
        data: {
          token: token,
        },
        expires: 1000 * 3600,
      })
      .then(() => {
        setIsAuthenticated(true);
      })
      .catch(() => {
        setIsAuthenticated(false);
      });
  };

  const isLoggedIn = async () => {
    const {token} = await storage.load({
      key: 'threads-user-id',
      autoSync: true,
    });
    if (token) {
      setUserID(token);
      await getUserCollection();
      return true;
    } else {
      setIsAuthenticated(false);
      return false;
    }
  };

  const getUserCollection = async () => {
    try {
      setChecking(true);

      const isLoggedInUser = await isLoggedIn();

      if (isLoggedInUser && userID !== null) {
        const userSnapshot = await firestore()
          .collection('users')
          .where('id', '==', userID)
          .get();

        if (!userSnapshot.empty) {
          const res = userSnapshot.docs[0].data();
          const user = res as User;
          console.log('User data:', user);

          setData(user);
        } else {
          console.log('No user found with the given ID.');
        }
      }

      setChecking(false);
    } catch (error) {
      setChecking(false);
      console.error('Error while getting user collection:', error);
    }
  };

  const logout = async () => {
    try {
      await storage
        .remove({
          key: 'threads-user-id',
        })
        .then(async () => {
          await auth()
            .signOut()
            .then(() => {
              setUserID(null);
              setIsAuthenticated(false);
            });
        });
    } catch (error: any) {
      console.log('error while logout', error);
      if (error?.code === 'auth/no-current-user') {
        setUserID(null);
        setIsAuthenticated(false);
      }
    }
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        authenticateUser,
        getUserCollection,
        logout,
        checking,
      }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextProps =>
  useContext(AuthContext) as AuthContextProps;
