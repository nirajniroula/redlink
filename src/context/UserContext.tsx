// UserContext.tsx

import React, { createContext, useReducer, useEffect, ReactNode } from 'react';
import { appStorage } from '../utils/storage';
import { User } from './types';

// Define the state type
export interface UserState {
  user: User | null;
  loading: boolean;
}

// Define action types
export type UserAction =
  | { type: 'SET_USER'; payload: User }
  | { type: 'CLEAR_USER' };

// Define the initial state
const initialState: UserState = {
  user: null,
  loading: true,
};

// Define the reducer function
const userReducer = (state: UserState, action: UserAction): UserState => {
  switch (action.type) {
    case 'SET_USER':
      return { ...state, user: action.payload, loading: false };
    case 'CLEAR_USER':
      return { ...state, user: null, loading: false };
    default:
      return state;
  }
};

// Create the context
const UserContext = createContext<
  { state: UserState; dispatch: React.Dispatch<UserAction> } | undefined
>(undefined);

// Create the context provider component
const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(userReducer, initialState);

  // Load user from MMKV on component mount
  useEffect(() => {
    const loadUser = () => {
      try {
        let userObject = {} as User;
        const jsonUser = appStorage.getString('user');
        if (jsonUser) {
          userObject = JSON.parse(jsonUser);
        }
        dispatch({ type: 'SET_USER', payload: userObject });
      } catch (error) {
        console.error('Error loading user from MMKV', error);
      }
    };

    loadUser();
  }, []);

  // Save user to MMKV whenever it changes
  useEffect(() => {
    const saveUser = () => {
      try {
        appStorage.set('user', JSON.stringify(state.user));
      } catch (error) {
        console.error('Error saving user to MMKV', error);
      }
    };

    saveUser();
  }, [state.user]);

  return (
    <UserContext.Provider value={{ state, dispatch }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };
