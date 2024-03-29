import {User} from '../types/user';
import {create} from 'zustand';

export type UserState = {
  user: User;
  setData: (user: User) => void;
  isLoading: boolean;
  setLoading: (isLoading: boolean) => void;
  cheking: boolean;
  setCheking: (cheking: boolean) => void;
};

const useUser = create<UserState>(set => ({
  user: {
    email: '',
    first_name: '',
    last_name: '',
    followers: [], // Corrected to number
    following: [], // Corrected to number
    avatar: '',
    bio: '',
    cover: '',
    id: '',
    is_premium: false,
    is_verified: false,
    location: '',
    username: '',
  },

  setData: user => {
    set(state => ({
      user: {...state.user, ...user}, // Merge existing user data with new data
    }));
  },

  isLoading: false,
  setLoading: isLoading => {
    set({isLoading});
  },

  cheking: false,
  setCheking: cheking => {
    set({cheking});
  },
}));

export {useUser};
