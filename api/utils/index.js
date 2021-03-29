const objIsEmpty = (obj) => obj && Object.keys(obj).length === 0;

const isNull = (item) => item === null;

const changeColumnPosition = (dragId, dropId, columns) => {

  let [prevDrag, nextDrag, prevDrop, nextDrop] = [{}, {}, {}, {}];
  const drag = columns.find(column => column.id === dragId);
  const drop = columns.find(column => column.id === dropId);

  columns.forEach(col => {
    if (col.id === drag.prevId) prevDrag = col;
    if (col.id === drag.nextId) nextDrag = col;
    if (col.id === drop.prevId) prevDrop = col;
    if (col.id === drop.nextId) nextDrop = col;
  })

  switch (true) {
    case nextDrag.id === drop.id: // From the smallest ID to the larger one if they are close
      if (!objIsEmpty(prevDrag)) {
        prevDrag.nextId = drop.id;
      }
      if (!objIsEmpty(nextDrop)) {
        nextDrop.prevId = drag.id;
      }
      {
        const dragTemp = {
          ...drag
        };
        const dropTemp = {
          ...drop
        };
        drag.prevId = dropTemp.id;
        drag.nextId = dropTemp.nextId;
        drop.prevId = dragTemp.prevId;
        drop.nextId = dragTemp.id;
      }
      return [...new Set([prevDrag, nextDrag, prevDrop, nextDrop])];

    case prevDrag.id === drop.id: // From bigger ID to smaller if they are close
      if (!objIsEmpty(nextDrag)) {
        nextDrag.prevId = drop.id;
      }
      if (!objIsEmpty(prevDrop)) {
        prevDrop.nextId = drag.id;
      }
      {
        const dragTemp = {
          ...drag
        };
        const dropTemp = {
          ...drop
        };
        drag.nextId = dropTemp.id;
        drag.prevId = dropTemp.prevId;
        drop.nextId = dragTemp.nextId;
        drop.prevId = dragTemp.id;
      }
      return [...new Set([prevDrag, nextDrag, prevDrop, nextDrop])];


    case prevDrag.prevId === drop.id: // One element apart and moves from right to left
      if (!objIsEmpty(prevDrop)) {
        prevDrop.nextId = drag.id;
      }
      prevDrag.nextId = drag.nextId;
      if (!objIsEmpty(nextDrag)) {
        nextDrag.prevId = drop.nextId;
      }
      {
        const dragTemp = {
          ...drag
        };
        const dropTemp = {
          ...drop
        };
        drag.prevId = dropTemp.prevId;
        drag.nextId = dropTemp.id;
        drop.prevId = dragTemp.id;
      }
      return [...new Set([prevDrag, drag, nextDrag, prevDrop, drop, nextDrop])]

    case nextDrag.nextId === drop.id: // One element apart and moves from left to right
      if (!objIsEmpty(prevDrag)) {
        prevDrag.nextId = drag.nextId;
      }
      nextDrag.prevId = drag.prevId;
      if (!objIsEmpty(nextDrop)) {
        nextDrop.prevId = drag.id;
      }
      {
        const dragTemp = {
          ...drag
        };
        const dropTemp = {
          ...drop
        };
        drag.prevId = dropTemp.id;
        drag.nextId = dropTemp.nextId;
        drop.nextId = dragTemp.id;
      }
      return [...new Set([prevDrag, drag, nextDrag, prevDrop, drop, nextDrop])]

    case drag.id !== drop.id: // Many elements in between
      if (columns.indexOf(drag) < columns.indexOf(drop)) { // from left side to right
        if (!objIsEmpty(prevDrag)) {
          prevDrag.nextId = drag.nextId;
        }
        if (!objIsEmpty(nextDrop)) {
          nextDrop.prevId = drag.id;
        }
        nextDrag.prevId = drag.prevId;
        const dragTemp = {
          ...drag
        };
        const dropTemp = {
          ...drop
        };
        drag.prevId = dropTemp.id;
        drag.nextId = dropTemp.nextId;
        drop.nextId = dragTemp.id;
      } else { // from right side to left
        if (!objIsEmpty(nextDrag)) {
          nextDrag.prevId = drag.prevId;
        }
        if (!objIsEmpty(prevDrop)) {
          prevDrop.nextId = drag.id;
        }
        prevDrag.nextId = drag.nextId;
        const dragTemp = {
          ...drag
        };
        const dropTemp = {
          ...drop
        };
        drag.prevId = dropTemp.prevId;
        drag.nextId = dropTemp.id;
        drop.prevId = dragTemp.id;
      }
      return [...new Set([prevDrag, drag, nextDrag, prevDrop, drop, nextDrop])]

    default: // item on himself
      return [];
  }

}

const sortList = (columns) => {
  const result = [];
  let [current, next, nextElementId] = [null, null, null];
  const removeColumn = column => columns.splice(columns.indexOf(column), 1)[0];
  while (columns.length !== 0) {
    current = columns.find(el => el.prevId === nextElementId);
    if (current === undefined) break;
    result.push(removeColumn(current));
    next = columns.find(el => el.id === current.nextId);
    if (next) nextElementId = next.prevId;
  }
  return result;
}

const removeListElement = (elemId, arr) => {
  let [prevElem, nextElem] = [{}, {}];
  const current = arr.find(e => e.id === +elemId);
  arr.forEach(item => {
    if (item.id === current.prevId) prevElem = item;
    if (item.id === current.nextId) nextElem = item;
  });
  if (!objIsEmpty(prevElem)) {
    prevElem.nextId = current.nextId;
  }
  if (!objIsEmpty(nextElem)) {
    nextElem.prevId = current.prevId;
  }
  return [prevElem, nextElem];
}

module.exports = {
  changeColumnPosition,
  sortList,
  removeListElement,
  objIsEmpty,
  isNull,
}