import data from '../../data.js';
import C from '../../constants';
import {listsReducer} from './listsReducer.js';


const defaultState = [
  ...data.boards
];

export function boardsReducer(state = defaultState, action){
  switch (action.type) {
    case C.ADD_BOARD:
      return [ ...state,
         action.payload
      ]
    case C.REMOVE_BOARD:
      return state.filter(b => b.id !== action.payload)
    case C.UPDATE_BOARD:
      return state.map(elem => elem.id === action.id ? {...elem, title:action.payload} : elem)
    case C.ADD_LIST:
      return state.map(elem => elem.id === action.id ? listsReducer(elem,action) : elem)
    case C.REMOVE_LIST:
        return state.map(board => ({...board , lists: board.lists.filter(list => list.id !== action.payload)}))
    case C.UPDATE_LIST:
        return state.map(board => ({...board,
          lists: board.lists.map(list => list.id === action.id ? {...list, title: action.title} : list)}))
    case C.ADD_TASK:
        return state.map(elem => listsReducer(elem,action))
    case C.REMOVE_TASK:
        return state.map(elem => listsReducer(elem,action))
    case C.UPDATE_TASK:
        return state.map(elem => listsReducer(elem,action))
    default:
      return state
  }
}

export const addBoard = (boards) => ({
    type: C.ADD_BOARD,
    payload: boards
})

export const removeBoard = (id) => ({
    type: C.REMOVE_BOARD,
    payload: id
})

export const updateBoard = (title, boardId) => ({
    type: C.UPDATE_BOARD,
    payload: title,
    id: boardId
})

export const addList = (object, boardId) => ({
    type: C.ADD_LIST,
    payload: object,
    id: boardId
})

export const removeList = (listId) => ({
    type: C.REMOVE_LIST,
    payload: listId
})

export const updateList = (title, listId) => ({
    type: C.UPDATE_LIST,
    payload: title,
    id: listId
})

export const addTask = (task, listId) => ({
    type: C.ADD_TASK,
    payload: task,
    id: listId
})

export const removeTask = (id) => ({
    type: C.REMOVE_TASK,
    payload: id
})

export const updateTask = (task) => ({
    type: C.UPDATE_TASK,
    payload: task
})
