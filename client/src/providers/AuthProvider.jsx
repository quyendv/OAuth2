import { createContext, useReducer } from 'react';

// Context
const AuthContext = createContext();

// Actions
const setUser = (payload) => ({
  type: 'SET_USER',
  payload,
});

// Reducer
const initialState = {
  user: null,
};

const authReducer = (state, action) => {
  switch (action.type) {
    case 'SET_USER':
      // if (!action.payload) localStorage.removeItem('acc_token');
      // else if (action.payload.accessToken) localStorage.setItem('acc_token', action.payload.accessToken);

      return {
        ...state,
        user: action.payload,
      };
    default:
      return state;
  }
};

// Component provider
function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(authReducer, initialState);

  return <AuthContext.Provider value={[state, dispatch]}>{children}</AuthContext.Provider>;
}

export { AuthContext, setUser };
export default AuthProvider;
