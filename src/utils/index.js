//функция, которая на основании ширны окна визуально изменяет количество элементов
//в строке, а по факту изменяет количество заполняемых колонок
export const updateRowCount = (setCount) => {
  let width = Math.floor(document.documentElement.clientWidth / 370)
  width = width > 4 ? 4 : width;
  setCount(width)
}
