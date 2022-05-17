import C from '../../constants';
import {tasksReducer} from './tasksReducer.js';

//по факту данный редюсер оперирует внутренностям доски (принимает объект доски), в котором находится массив списков
export function listsReducer(state = {}, action){
  switch (action.type) {
    //проверяем на совпадение нужной нам доски и возвращаем доску со (списками + новый элемент)
    case C.ADD_LIST:
        return state.id === action.id
        ? {
          ...state,
          lists: [...state.lists, action.payload]
        }
        : state
    //удаляем нужный список из массива списков и возвращаем новый объект доски
    case C.REMOVE_LIST:
        return {
          ...state,
          lists: state.lists.filter(list => list.id !== action.payload)
        }
    //ищем нужный список по id среди массива списков и при совпадении меняем название
    //затем получаем новый массив списков и возвращаем объект доски
    case C.UPDATE_LIST:
        return {
          ...state,
        lists: state.lists.map(list => (list.id === action.id ? {...list, title: action.payload} : list))
        }
    //после того как мы нашли нужную доску по ID, перемещаем список внутри неё (меняем индекс элемента в массиве)
    //информацию об изменениях получаем через специальный объект события react-beautiful-dnd
    case C.MOVE_LIST:
        if (action.id !== state.id) return state
        //массив списков новой доски без перемещаемого элемента
        const newBoardLists = state.lists.filter((b,i) => i !== action.payload.source.index);
        //вставляем удалённый элемент по нужному индексу
        newBoardLists.splice(action.payload.destination.index,0,state.lists[action.payload.source.index]);
        //возвращаем обновлённую доску
        return {
          ...state,
        lists: newBoardLists
        }
        //после того как мы нашли нужную доску по ID, перемещаем задачу внутри или между списками
        //информацию об изменениях получаем через специальный объект события react-beautiful-dnd
    case C.MOVE_TASK:
        if (action.id !== state.id) return state;
        //получаем объекты специального события
        const {destination, source, draggableId} = action.payload;
        //проверка перемещается ли таск внутри одного списка, если да, то делигируем задачу таск редюсеру
        if(destination.droppableId === source.droppableId){
          return {
            ...state,
            lists: state.lists.map(list => list.id === source.droppableId ? tasksReducer(list,action) : list)
          }
        }
        //если не находится в одном списке, то перебираем массив со списками доски
        const newLists = state.lists.map(list => {
          switch (list.id) {
            //если это список источника, то удаляем элемент из него
            case source.droppableId:
              return tasksReducer(list,{
                  type: C.REMOVE_TASK,
                  payload: draggableId
              })
            //если это список назначения, то добавляем элемент на нужный индекс
            case destination.droppableId:
              //новый список
              const destinationTasks = [...list.tasks];
              //поиск нужного элемента
              const [task] = state.lists.map(e => e.tasks.filter(task => task.id === draggableId)).flat();
              //добавляем элемент в новый список
              destinationTasks.splice(destination.index, 0, task);
              //обновляем нужный список назначения
              return {...list, tasks: destinationTasks}
            default:
              //для прочих списков ничего не происходит
              return list
          }
        })
        //возвращаем новый объект доски
        return {
          ...state,
          lists: newLists
        }
    default:
        //если событие не относится к спискам, то делигируем таск редюсеру
        return {
          ...state,
          lists: state.lists.map(list => tasksReducer(list,action))
        }
  }
}
