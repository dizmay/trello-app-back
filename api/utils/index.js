const { isEmpty, isUndefined } = require("lodash");

function* repeat(x) {
  while (true) yield x;
}

const changePositionDnD = (dragId, dropId, columns) => {

  let [prevDrag, nextDrag, prevDrop, nextDrop] = repeat({});
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
      console.log(111);
      if (!isEmpty(prevDrag)) {
        prevDrag.nextId = drop.id;
      }
      if (!isEmpty(nextDrop)) {
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
      console.log(222);
      if (!isEmpty(nextDrag)) {
        nextDrag.prevId = drop.id;
      }
      if (!isEmpty(prevDrop)) {
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
      console.log(333);
      if (!isEmpty(prevDrop)) {
        prevDrop.nextId = drag.id;
      }
      prevDrag.nextId = drag.nextId;
      if (!isEmpty(nextDrag)) {
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
      console.log(444);
      if (!isEmpty(prevDrag)) {
        prevDrag.nextId = drag.nextId;
      }
      nextDrag.prevId = drag.prevId;
      if (!isEmpty(nextDrop)) {
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
      console.log('test\n');
      if (columns.indexOf(drag) < columns.indexOf(drop)) { // from left side to right
        if (!isEmpty(prevDrag)) {
          prevDrag.nextId = drag.nextId;
        }
        if (!isEmpty(nextDrop)) {
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
        if (!isEmpty(nextDrag)) {
          nextDrag.prevId = drag.prevId;
        }
        if (!isEmpty(prevDrop)) {
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

const dllSort = (columns) => {
  const result = [];
  let [current, next, nextElementId] = repeat(null);
  const removeColumn = column => columns.splice(columns.indexOf(column), 1)[0];
  while (columns.length !== 0) {
    current = columns.find(el => el.prevId === nextElementId);
    if (isUndefined(current)) break;
    result.push(removeColumn(current));
    next = columns.find(el => el.id === current.nextId);
    if (next) nextElementId = next.prevId;
  }
  return result;
}

const dllElementRemove = (elemId, arr) => {
  let [prevElem, nextElem] = repeat({});
  const current = arr.find(e => e.id === +elemId);
  arr.forEach(item => {
    if (item.id === current.prevId) prevElem = item;
    if (item.id === current.nextId) nextElem = item;
  });
  if (!isEmpty(prevElem)) {
    prevElem.nextId = current.nextId;
  }
  if (!isEmpty(nextElem)) {
    nextElem.prevId = current.prevId;
  }
  return [prevElem, nextElem];
}

module.exports = {
  changePositionDnD,
  dllSort,
  dllElementRemove,
}