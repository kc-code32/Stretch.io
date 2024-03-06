import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "@redux-devtools/extension";

import {
  userLoginReducer,
  userRegisterReducer,
} from "./reducers/userReducers.js";

import { searchReducer } from "./reducers/searchReducers.js";
import { favoritesReducer } from "./reducers/favoritesReducers.js";

const reducer = combineReducers({
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  favorites: favoritesReducer,
  searchResults: searchReducer
});

// const userInfoFromStorage = localStorage.getItem('userInfo')
// 	? JSON.parse(localStorage.getItem('userInfo'))
// 	: null;

const initialState = {};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
