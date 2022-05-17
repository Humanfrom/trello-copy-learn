import C from '../../constants';

//редюсер оперирует внутренностям списка (принимает объект списка), в котором находится массив тасков
export function tasksReducer(state = {}, action){
  switch (action.type) {
    //ищем нужный список по id среди списка и при совпадении заменяем нужный таск на новый готовый объект таска
    case C.UPDATE_TASK:
        return {
          ...state,
          tasks: state.tasks.map(task => task.id === action.payload.id ? action.payload : task)
        }
    //проверяем на совпадение нужного нам списка и возвращаем список с (тасками + новый элемент)
    case C.ADD_TASK:
        return {
          ...state,
          tasks: state.id === action.id ? [...state.tasks, action.payload] : state.tasks
        }
    //удаляем нужный список из массива списков и возвращаем новый объект доски
    case C.REMOVE_TASK:
        return {
          ...state,
          tasks: state.tasks.filter(task => task.id !== action.payload)
        }
    //после того как мы нашли нужный список по ID, перемещаем таск внутри него (меняем индекс элемента в массиве)
    //информацию об изменениях получаем через специальный объект события react-beautiful-dnd
    case C.MOVE_TASK:
        const {destination, source, draggableId} = action.payload;
        //новый список без перемещаемого элемента
        const newTasks = state.tasks.filter((b,i) => i !== source.index);
        //вставляем перемещаемый элемент в нужный индекс
        newTasks.splice(destination.index,0,state.tasks[source.index]);
        //возвращаем список с новым массивом тасков
        return {
          ...state,
          tasks: newTasks
        }
    default:
      return state
  }
}
