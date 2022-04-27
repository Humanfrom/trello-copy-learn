import C from '../../constants';

export function tasksReducer(state = {}, action){
  switch (action.type) {
    case C.UPDATE_TASK:
        return {
          ...state,
          tasks: state.tasks.map(task => task.id === action.payload.id ? action.payload : task)
        }
    case C.ADD_TASK:
        return {
          ...state,
          tasks: state.id === action.id ? [...state.tasks, action.payload] : state.tasks
        }
    case C.REMOVE_TASK:
        return {
          ...state,
          tasks: state.tasks.filter(task => task.id !== action.payload)
        }
    case C.MOVE_TASK:
        const {destination, source, draggableId} = action.payload;
        const newTasks = state.tasks.filter((b,i) => i !== source.index);
        newTasks.splice(destination.index,0,state.tasks[source.index]);
        return {
          ...state,
          tasks: newTasks
        }
    default:
      return state
  }
}
