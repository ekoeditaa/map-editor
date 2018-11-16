export const computeStyle = (selected, hovered) => {
  const [rowSelected, colSelected] = selected;
  const [rowHovered, colHovered] = hovered;

  const startRow = Math.min(rowSelected, rowHovered);
  const endRow = Math.max(rowSelected, rowHovered);
  const startCol = Math.min(colSelected, colHovered);
  const endCol = Math.max(colSelected, colHovered);

  const styles = {};
  for (let row = startRow; row <= endRow; row++) {
    for (let col = startCol; col <= endCol; col++) {
      styles[`${row}_${col}`] = {
        backgroundColor: '#F0F0F0',
      };
    }
  }

  return styles;
};

export const getNextMap = (currMap, selected, endCell, type) => {
  const [rowSelected, colSelected] = selected;
  const [rowEnd, colEnd] = endCell;

  const startRow = Math.min(rowSelected, rowEnd);
  const endRow = Math.max(rowSelected, rowEnd);
  const startCol = Math.min(colSelected, colEnd);
  const endCol = Math.max(colSelected, colEnd);

  const map = currMap.map(row => row.map(cell => cell));
  for (let row = startRow; row <= endRow; row++) {
    for (let col = startCol; col <= endCol; col++) {
      map[row][col] = type;
    }
  }

  return map;
};
