import {createContext, ReactNode, useContext, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useUser} from '../features/userSlice';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import {User} from '../types/user';

export interface AuthContextProps {
  authenticateUser: (token: string) => Promise<void>;
  isAuthenticated: boolean;
  checking: boolean;
  getUserCollection: () => Promise<void>;
  logout: () => Promise<void>;
  userID: string | null;
}

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

  const authenticateUser = async (token: string): Promise<void> => {
    try {
      await AsyncStorage.setItem('threads-user-id', token);
      setIsAuthenticated(true);
    } catch (error) {
      console.error('Error while authenticating user:', error);
      setIsAuthenticated(false);
    }
  };

  const isLoggedIn = async (): Promise<boolean> => {
    const token = await AsyncStorage.getItem('threads-user-id');
    if (token) {
      setUserID(token);
      return true;
    } else {
      setIsAuthenticated(false);
      return false;
    }
  };

  const getUserCollection = async (): Promise<void> => {
    try {
      setChecking(true);
      const isLoggedInUser = await isLoggedIn();
      if (isLoggedInUser) {
        const userSnapshot = await firestore()
          .collection('users')
          .where('id', '==', userID)
          .get();

        if (!userSnapshot.empty) {
          const user = userSnapshot.docs[0].data() as User;
          setData(user);
          setIsAuthenticated(true);
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

  const logout = async (): Promise<void> => {
    try {
      await AsyncStorage.removeItem('threads-user-id');
      await auth().signOut();
      setUserID(null);
      setIsAuthenticated(false);
    } catch (error: any) {
      console.error('Error while logging out:', error);
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
        userID,
      }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextProps =>
  useContext(AuthContext) as AuthContextProps;
