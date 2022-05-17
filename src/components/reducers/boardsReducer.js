import C from '../../constants';
import {listsReducer} from './listsReducer.js';

export function boardsReducer(state = [], action){
  switch (action.type) {
    //добавляем доску в конец массива, путём реструктуризации + объект новой доски
    //пример коммента на английском:
    //add new board to last index of array by the restructuring + new board
    case C.ADD_BOARD:
      return [ ...state,
         action.payload
      ]
    //удаляем доску из массива путём фильтрации элементов по ID, который передаётся отдельным полем в экшн
    //пример коммента на английском:
    //delete board from array with using "filter" by ID, which sending in special property of action
    case C.REMOVE_BOARD:
      return state.filter(b => b.id !== action.payload)
    //обновляем поле title нужной доски. Поиск доски выполнен через перебор с условием совпадения ID
    //который передаётся через отдельное свойство в экшене
    case C.UPDATE_BOARD:
      return state.map(elem => elem.id === action.id ? {...elem, title:action.payload} : elem)
    //пермещение доски через react-beautiful-dnd. Библиотека создаёт специальный объект с нужной
    //для переноса информацией, которую мы деструктурирует из него: {назначение, источник, IDПереносимогоЭлемента}
    case C.MOVE_BOARD:
      const {destination, source, draggableId} = action.payload;
      const newBoards = state.filter((b,i) => i !== source.index);
      newBoards.splice(destination.index,0,state[source.index]);
      return newBoards
    //в случае, если редюсер был вызван, но это не событие связанное с доской делигируем событие внутрь досок, редюсеру списков
    default:
      return state.map(elem => listsReducer(elem,action))
  }
}

//добавляем новую доску, ожидаем получения готового объекта новой доски, который пишем в payload
export const addBoard = (boards) => ({
    type: C.ADD_BOARD,
    payload: boards
})

//удаляем доску по ID доски, так как требуется всего одно поле, пишем его в payload
export const removeBoard = (id) => ({
    type: C.REMOVE_BOARD,
    payload: id
})

//обновляем название доски по ID доски, которое пишем в payload, ID доски пишем отдельно в id
export const updateBoard = (title, boardId) => ({
    type: C.UPDATE_BOARD,
    payload: title,
    id: boardId
})

//перемещаем доску с помощью react-beautiful-dnd. Специальное событие библиотеки пишем в payload
export const moveBoard = (result) => ({
    type: C.MOVE_BOARD,
    payload: result
})

//добавляем новый список в конец доски, которую находим по ID (пишем в id). Сам готовый объект списка пишем в payload
export const addList = (object, boardId) => ({
    type: C.ADD_LIST,
    payload: object,
    id: boardId
})

//удаляем список по ID списка, так как требуется всего одно поле, пишем его в payload
export const removeList = (listId) => ({
    type: C.REMOVE_LIST,
    payload: listId
})

//обновляем название списка по ID списка, которое пишем в payload, ID списка пишем отдельно в id
export const updateList = (title, listId) => ({
    type: C.UPDATE_LIST,
    payload: title,
    id: listId
})

//перемещаем cписок с помощью react-beautiful-dnd. Специальное событие библиотеки пишем в payload.
//Также указываем ID доски (пишем в id экшена) внутри которой перемещаем список.
export const moveList = (result, boardId) => ({
    type: C.MOVE_LIST,
    payload: result,
    id: boardId
})

//добавляем новый таск в конец списка, который находим по ID (пишем в id). Сам готовый объект таска пишем в payload
export const addTask = (task, listId) => ({
    type: C.ADD_TASK,
    payload: task,
    id: listId
})

//удаляем таск по ID таска, так как требуется всего одно поле, пишем его в payload
export const removeTask = (id) => ({
    type: C.REMOVE_TASK,
    payload: id
})

//обновляем таск, так как таск фактически является листом нашего дерева компонентов
//мы можем передать цельный новый объект (пишем в payload) и обработать его в редюсере
export const updateTask = (task) => ({
    type: C.UPDATE_TASK,
    payload: task
})

//перемещаем таск с помощью react-beautiful-dnd. Специальное событие библиотеки пишем в payload.
//Также указываем ID доски (пишем в id экшена) внутри которой перемещаем список, чтобы сократить затрату ресурсов и избежать возможных ошибок
export const moveTask = (result, boardId) => ({
    type: C.MOVE_TASK,
    payload: result,
    id: boardId
})
