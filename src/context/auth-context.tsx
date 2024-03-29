import React, {createContext, useContext, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

type UserData = {
  userId: string;
  // Other user data properties
};

type AuthContextType = {
  token: string | null;
  userId: string | null;
  saveUserIdAndToken: (userId: string, token: string) => Promise<void>;
  getUserData: () => Promise<UserData | null>;
};

const AuthContext = createContext<AuthContextType>({
  token: null,
  userId: null,
  saveUserIdAndToken: async () => {},
  getUserData: async () => null,
});

export const useAuth = (): AuthContextType => useContext(AuthContext);

type AuthProviderProps = {
  children: React.ReactNode;
};

export const AuthProvider: React.FC<AuthProviderProps> = ({children}) => {
  const [token, setToken] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);

  const saveUserIdAndToken = async (
    userId: string,
    token: string,
  ): Promise<void> => {
    try {
      await AsyncStorage.setItem('userToken', token);
      setToken(token);
      await AsyncStorage.setItem('threads-user-id', userId);
      setUserId(userId);
    } catch (error) {
      console.error('Error saving user ID and token:', error);
    }
  };

  const getUserData = async (): Promise<UserData | null> => {
    try {
      const storedUserId = await AsyncStorage.getItem('threads-user-id');
      if (!storedUserId) {
        return null;
      }

      // Fetch user data using storedUserId from Firestore or any other data source
      const userData: UserData = {
        userId: storedUserId,
        // Other user data properties
      };
      setUserId(storedUserId);
      return userData;
    } catch (error) {
      console.error('Error getting user data:', error);
      return null;
    }
  };

  return (
    <AuthContext.Provider
      value={{token, userId, saveUserIdAndToken, getUserData}}>
      {children}
    </AuthContext.Provider>
  );
};
