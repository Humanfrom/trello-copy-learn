import C from '../../constants';
import {listsReducer} from './listsReducer.js';

export function boardsReducer(state = [], action){
  console.log(state)
  switch (action.type) {
    case C.ADD_BOARD:
      return [ ...state,
         action.payload
      ]
    case C.REMOVE_BOARD:
      return state.filter(b => b.id !== action.payload)
    case C.UPDATE_BOARD:
      return state.map(elem => elem.id === action.id ? {...elem, title:action.payload} : elem)
    case C.MOVE_BOARD:
      const {destination, source, draggableId} = action.payload;
      const newBoards = state.filter((b,i) => i !== source.index);
      newBoards.splice(destination.index,0,state[source.index]);
      return newBoards
    default:
      return state.map(elem => listsReducer(elem,action))
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

export const moveBoard = (result) => ({
    type: C.MOVE_BOARD,
    payload: result
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

export const moveList = (result, boardId) => ({
    type: C.MOVE_LIST,
    payload: result,
    id: boardId
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

export const moveTask = (result, boardId) => ({
    type: C.MOVE_TASK,
    payload: result,
    id: boardId
})
