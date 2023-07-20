// import { configureStore, createSlice, combineReducers } from '@reduxjs/toolkit';
// import { persistStore, persistReducer } from 'redux-persist';
// import storage from 'redux-persist/lib/storage';

// const contactsSlice = createSlice({
//   name: 'contacts',
//   initialState: [],
//   reducers: {
//     addContact: (state, action) => {
//       state.push(action.payload);
//     },
//     deleteContact: (state, action) => {
//       return state.filter(contact => contact.id !== action.payload);
//     },
//   },
// });

// const filterSlice = createSlice({
//   name: 'filter',
//   initialState: '',
//   reducers: {
//     setFilter: (state, action) => {
//       return action.payload;
//     },
//   },
// });

// const persistConfig = {
//   key: 'root',
//   storage,
//   whitelist: ['contacts'],
// };

// const persistedReducer = persistReducer(
//   persistConfig,
//   combineReducers({
//     contacts: contactsSlice.reducer,
//     filter: filterSlice.reducer,
//   })
// );

// export const store = configureStore({
//   reducer: persistedReducer,
//   middleware: getDefaultMiddleware =>
//     getDefaultMiddleware({ serializableCheck: false }),
// });

// export const persistor = persistStore(store);

// export const { addContact, deleteContact } = contactsSlice.actions;
// export const { setFilter } = filterSlice.actions;

import {
  configureStore,
  getDefaultMiddleware,
  createSlice,
  combineReducers,
} from '@reduxjs/toolkit';
import { api } from '../api';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const contactsSlice = createSlice({
  name: 'contacts',
  initialState: [],
  reducers: {
    addContact: (state, action) => {
      state.push(action.payload);
    },
    deleteContact: (state, action) => {
      return state.filter(contact => contact.id !== action.payload);
    },
  },
});

const filterSlice = createSlice({
  name: 'filter',
  initialState: '',
  reducers: {
    setFilter: (state, action) => {
      return action.payload;
    },
  },
});

export const { addContact, deleteContact } = contactsSlice.actions;
export const { setFilter } = filterSlice.actions;

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['contacts'],
};

const persistedReducer = persistReducer(
  persistConfig,
  combineReducers({
    contacts: contactsSlice.reducer,
    filter: filterSlice.reducer,
    [api.reducerPath]: api.reducer,
  })
);

const customizedMiddleware = getDefaultMiddleware({
  serializableCheck: false,
  // Add any other options you want to customize
});

export const store = configureStore({
  reducer: persistedReducer,
  middleware: customizedMiddleware.concat(api.middleware),
});

export const persistor = persistStore(store);
export default store;
