const columnsDnD = (dragId, dropId, columns) => {

  function* repeat(x) {
    while (true) yield x;
  }

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
    case nextDrag.id === drop.id:
      if (prevDrop === drag) {
        prevDrag.nextId = drop.id;
        nextDrop.prevId = drag.id;
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
      } else {
        nextDrag.prevId = drop.id;
        prevDrop.nextId = drag.id;
        const dragTemp = {
          ...drag
        };
        const dropTemp = {
          ...drop
        };
        drag.prevId = dropTemp.prevId;
        drag.nextId = dropTemp.id;
        drop.prevId = dragTemp.id;
        drop.nextId = dragTemp.nextId;
      }
      return [prevDrag, nextDrag, prevDrop, nextDrop];

    case prevDrag.id === drop.id:
      if (prevDrag === drop) {
        nextDrag.prevId = drop.id;
        prevDrop.nextId = drag.id;
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
      } else {
        prevDrag.nextId = drop.id;
        nextDrop.prevId = drag.id;
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
      return [prevDrag, nextDrag, prevDrop, nextDrop];


    case prevDrag.prevId === drop.id:
      prevDrop.nextId = drag.id;
      prevDrag.nextId = drag.nextId;
      nextDrag.prevId = drop.nextId; {
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

    case nextDrag.nextId === drop.id:
      prevDrag.nextId = drag.nextId;
      nextDrag.prevId = drag.prevId;
      nextDrop.prevId = drag.id; {
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

    default:
      if (columns.indexOf(drag) < columns.indexOf(drop)) {
        if (Object.keys(prevDrag).length !== 0) {
          prevDrag.nextId = drag.nextId;
        }
        if (Object.keys(nextDrop).length !== 0) {
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
      } else {
        if (Object.keys(nextDrag).length !== 0) {
          nextDrag.prevId = drag.prevId;
        }
        if (Object.keys(prevDrop).length !== 0) {
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
        console.log(1);
      }
      return [...new Set([prevDrag, drag, nextDrag, prevDrop, drop, nextDrop])]
  }

}

const moveElementInArr = (arr, from, to) => {
  console.log(from, to);
  arr.splice(to, 0, arr.splice(from, 1)[0]);
  arr.forEach((el, id) => {
    el.index = id + 1;
  });
  console.log(arr);
  return arr;
}

module.exports = {
  columnsDnD,
  moveElementInArr,
}