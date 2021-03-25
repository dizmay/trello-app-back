// const columnsDnD = (dragId, dropId, columns) => {
//   const [prevDragId, nextDragId] = [dragId - 1, dragId + 1];
//   const [prevDropId, nextDropId] = [dropId - 1, dropId + 1];
//   let prevDrag, drag, nextDrag, prevDrop, drop, nextDrop;
//   columns.forEach(col => {
//     if (col.id === prevDragId) prevDrag = col;
//     if (col.id === dragId) drag = col;
//     if (col.id === nextDragId) nextDrag = col;
//     if (col.id === prevDropId) prevDrop = col;
//     if (col.id === dropId) drop = col;
//     if (col.id === nextDropId) nextDrop = col;
//   })

//   switch (true) {
//     case dragId - dropId === 1:
//       prevDrag.nextId = nextDragId;
//       nextDrop.prevId = prevDropId;
//       prevDrag.prevId = dragId;
//       nextDrag.prevId = dropId;
//       prevDrop.nextId = dragId;
//       nextDrop.nextId = dropId;
//       return [prevDrag, nextDrag, prevDrop, nextDrop];

//     case dropId - dragId === 1:
//       nextDrag.prevId = prevDragId;
//       prevDrop.nextId = nextDropId;
//       prevDrag.nextId = dropId;
//       nextDrag.nextId = dragId;
//       prevDrop.prevId = dropId;
//       nextDrop.prevId = dragId;
//       return [prevDrag, nextDrag, prevDrop, nextDrop];

//     case dragId - dropId === 2:
//       prevDrag.nextId = nextDragId;
//       nextDrag.prevId = prevDragId;
//       prevDrop.nextId = dragId;
//       nextDrop.nextId = nextDragId
//       drag.nextId = dropId;
//       drag.prevId = prevDropId;
//       drop.prevId = dragId;
//       return [...new Set([prevDrag, drag, nextDrag, prevDrop, drop, nextDrop])]

//     case dropId - dragId === 2:
//       prevDrag.nextId = nextDragId;
//       nextDrag.prevId = prevDragId;
//       prevDrop.prevId = prevDragId;
//       nextDrop.prevId = dragId;
//       drag.nextId = nextDropId;
//       drag.prevId = dropId;
//       drop.nextId = dragId;
//       return [...new Set([prevDrag, drag, nextDrag, prevDrop, drop, nextDrop])]
//   }

// }