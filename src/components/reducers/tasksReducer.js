import C from '../../constants';

export function tasksReducer(state = {}, action){
  switch (action.type) {
    case C.UPDATE_TASK:
        return {
          ...state,
          tasks: state.tasks.map(task => task.id === action.payload.id ? action.payload : task)
        }
    default:
      return state
  }
}
