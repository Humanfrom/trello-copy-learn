import {createStore, combineReducers, applyMiddleware} from "redux"
import {boardsReducer} from '../reducers/boardsReducer.js'
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from "redux-thunk"
import initialState from './initialState.js';

//функция высшего порядка для сохранения нашего хранилища в localStorage
const saver = store => next => action => {
  let result = next(action)
  localStorage['local-store'] = JSON.stringify(store.getState())
  return result;
}

//при запуске прикручиваем сохранение нашего хранилища в localStorage, а также выполняем проверку есть ли уже что-то в localStorage
export const newStore = () =>
applyMiddleware(saver)(createStore)(
  boardsReducer,
  (localStorage['local-store']) ?
    JSON.parse(localStorage['local-store']) :
  initialState.boards
)
