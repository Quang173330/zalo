import {configureStore} from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import myAuthReducer from './slices/myAuthSlice';
import searchReducer from './slices/searchSlice';

const rootReducer = {
  myAuth: myAuthReducer
};

const store = configureStore({
  reducer: rootReducer,
  middleware: [thunk],
});

export default store;