import data from '../../data.js'

const ADD_BOARD = "ADD_BOARD";
const REMOVE_BOARD = "REMOVE_BOARD";
const ADD_LIST = "ADD_LIST";
const REMOVE_LIST = "REMOVE_LIST";
const ADD_TASK = "ADD_TASK";



const defaultState = {
  boards: data.boards,
  isFetching: true,
}

export function tasksReducer(state = {}, action){

}

export function listsReducer(state = {}, action){
  switch (action.type) {
    case REMOVE_LIST:
      return {
        ...state,
        lists: state.lists.filter(list => list.id !== action.payload)
      }
    case ADD_LIST:
        return {
          ...state,
          boards: state.boards.map(elem => {
            if (elem.id == action.payload.id) elem.lists.push(action.payload.value)
            return elem
          })
        }
    default:
      return state
  }
}

export function boardsReducer(state = defaultState, action){
  switch (action.type) {
    case ADD_BOARD:
      return {
        ...state,
        boards: action.payload
      }
    case REMOVE_BOARD:
      return {
        ...state,
        boards: state.boards.filter(b => b.id !== action.payload)
      }
    case REMOVE_LIST:
      return {
        ...state,
        boards: state.boards.map(elem => listsReducer(elem,action))
      }
    case ADD_LIST:
        return {
          ...state,
          boards: state.boards.map(elem => listsReducer(elem,action))
        }
    default:
      return state
  }
}

export const addList = (object) => ({
    type: ADD_LIST,
    payload: object
})

export const removeList = (listId) => ({
    type: REMOVE_LIST,
    payload: listId
})

export const addTask = (task) => ({
    type: ADD_TASK,
    payload: task
})


export const addBoard = (boards) => ({
    type: ADD_BOARD,
    payload: boards
})

export const removeBoard = (id) => ({
    type: REMOVE_BOARD,
    payload: id
})
