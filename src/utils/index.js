export const updateRowCount = (setCount) => {
  let width = Math.floor(document.documentElement.clientWidth / 370)
  width = width > 4 ? 4 : width;
  setCount(width)
}
