import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import MaidNav from './navigator/MaidNav';

//redux
import ReduxThunk from 'redux-thunk';
import {combineReducers,createStore,applyMiddleware} from 'redux';
import {Provider} from 'react-redux';

//reducers
import authReducer from './store/reducer/Auth';
import manageUserReducer from './store/reducer/ManageUser';

const rootReducer = combineReducers({
  auth:authReducer,
  manage:manageUserReducer
});

const store =createStore(rootReducer,applyMiddleware(ReduxThunk));


export default function App() {
  return (<Provider store={store}>
    <MaidNav/>
    </Provider>
    
  );
}

const styles = StyleSheet.create({
});
