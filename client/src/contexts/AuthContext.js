import { createContext, useEffect, useState, useReducer } from "react";
import { initializeApp } from 'firebase/app';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID
};

const firebaseApp = initializeApp(firebaseConfig);

const AUTH = getAuth(firebaseApp);

const initialState = {
  isAuthenticated: false,
  isInitialized: false,
  user: null,
  loading: true,
};

const reducer = (state, action) => {
  if (action.type === 'INITIALIZE') {
    const { isAuthenticated, loading, user } = action.payload;
    return {
      ...state,
      isAuthenticated,
      isInitialized: true,
      user,
      loading
    };
  }

  return state;
};

const AuthContext = createContext({
  ...initialState,
  method: 'firebase'
});

function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() =>
      onAuthStateChanged(AUTH, async (user) => {
        if (user) {
          // setProfile(user);
          dispatch({
            type: 'INITIALIZE',
            payload: { isAuthenticated: true, user, loading:false },
          });
        } else {
          dispatch({
            type: 'INITIALIZE',
            payload: { isAuthenticated: false, user: null, loading:false },
          });
        }
      }),
    [dispatch]
  );

  return (
    <AuthContext.Provider 
      value={{
        ...state,
        method: 'firebase',
        user: {
          id: state?.user?.uid,
          displayName: state?.user?.displayName,
          email: state?.user?.email,
          token: state?.user?.accessToken
      }}}
    >
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthProvider };