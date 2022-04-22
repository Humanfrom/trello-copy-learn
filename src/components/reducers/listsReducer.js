import C from '../../constants';
import {tasksReducer} from './tasksReducer.js';

export function listsReducer(state = {}, action){
  switch (action.type) {
    case C.ADD_LIST:
        return {
          ...state,
          lists: [...state.lists, action.payload]
        }
    case C.ADD_TASK:
        return {
          ...state,
          lists: state.lists.map(list => list.id === action.id ? {...list, 'tasks': [...list.tasks, action.payload]} : list)
        }
    case C.REMOVE_TASK:
        return {
          ...state,
          lists: state.lists.map(list => ({ ...list , 'tasks': list.tasks.filter(task => task.id !== action.payload) }))
        }
    case C.UPDATE_TASK:
        return {
          ...state,
          lists: state.lists.map(list => tasksReducer(list,action))
        }
    default:
      return state
  }
}
