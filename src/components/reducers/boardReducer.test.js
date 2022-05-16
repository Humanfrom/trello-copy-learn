import initialState from '../store/initialState.js'
import {boardsReducer, addBoard, removeBoard, updateBoard, moveBoard} from './boardsReducer'

describe('getData', () => {
  let boards;

  beforeEach(() => {
    boards = initialState.boards;
  })

  test('Добавить доску', () => {
    expect(boardsReducer(boards,addBoard({id:'new board'}))).toEqual([...boards, {id:'new board'}]);
  })

  test('Удалить доску', () => {
    let id = boards[0].id;
    let newBoards = boardsReducer(boards,removeBoard(id));
    expect(newBoards).toEqual(boards.filter(item => item.id !== id));
    expect(newBoards).toHaveLength(boards.length - 1);
  })

  test('Обновить название доски', () => {
    let id = boards[0].id;
    let newTitle = 'Новое название'
    let newBoards = boardsReducer(boards,updateBoard(newTitle,id));
    expect(newBoards[0].title).toBe(newTitle);
  })

  test('Переместить доску с позиции 0 на 1', () => {
    let beautifulDndEvent = {
      destination: {index: 1},
      source: {index: 0},
      draggableId: null
    }
    let newBoards = boardsReducer(boards,moveBoard(beautifulDndEvent));
    expect(newBoards[0]).toBe(boards[1]);
    expect(newBoards[1]).toBe(boards[0]);
  })


})
