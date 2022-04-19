import data from '../../data.js'

const ADD_BOARD = "ADD_BOARD";
const REMOVE_BOARD = "REMOVE_BOARD";


const defaultState = {
  boards: data.boards,
  isFetching: true,
}

export function reposReducer(state = defaultState, action){
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
    default:
      return state
  }
}

export const addBoard = (boards) => ({
    type: ADD_BOARD,
    payload: boards
})

export const removeBoard = (id) => ({
    type: REMOVE_BOARD,
    payload: id
})
