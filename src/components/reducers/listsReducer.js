import C from '../../constants';
import {tasksReducer} from './tasksReducer.js';

export function listsReducer(state = {}, action){
  switch (action.type) {
    case C.ADD_LIST:
        return state.id === action.id
        ? {
          ...state,
          lists: [...state.lists, action.payload]
        }
        : state
    case C.REMOVE_LIST:
        return {
          ...state,
          lists: state.lists.filter(list => list.id !== action.payload)
        }
    case C.UPDATE_LIST:
        return {
          ...state,
        lists: state.lists.map(list => (list.id === action.id ? {...list, title: action.payload} : list))
        }
    case C.MOVE_LIST:
        if (action.id !== state.id) return state
        const newBoard = state.lists.filter((b,i) => i !== action.payload.source.index);
        newBoard.splice(action.payload.destination.index,0,state.lists[action.payload.source.index]);
        return {
          ...state,
        lists: newBoard
        }
    case C.MOVE_TASK:
        if (action.id !== state.id) return state;
        const {destination, source, draggableId} = action.payload;
        if(destination.droppableId === source.droppableId){
          return {
            ...state,
            lists: state.lists.map(list => list.id === source.droppableId ? tasksReducer(list,action) : list)
          }
        }
        const newLists = state.lists.map(list => {
          switch (list.id) {
            case source.droppableId:
              return tasksReducer(list,{
                  type: C.REMOVE_TASK,
                  payload: draggableId
              })
            case destination.droppableId:
              const destinationTasks = [...list.tasks];
              const [task] = state.lists.map(e => e.tasks.filter(task => task.id === draggableId)).flat();
              destinationTasks.splice(destination.index, 0, task);
              return {...list, tasks: destinationTasks}
            default:
              return list
          }
        })
        return {
          ...state,
          lists: newLists
        }
    default:
        return {
          ...state,
          lists: state.lists.map(list => tasksReducer(list,action))
        }
  }
}
