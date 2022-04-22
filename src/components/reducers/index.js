import {combineReducers} from "redux";
import {createStore, applyMiddleware} from "redux"
import {boardsReducer} from './boardsReducer.js'
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from "redux-thunk"

const rootReducer = combineReducers({
  data: boardsReducer
})

export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)))
