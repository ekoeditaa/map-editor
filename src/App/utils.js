const MOCK_WIDTH = 20;
const MOCK_HEIGHT = 20;

export const CellTypes = {
  OBSTACLE: '#',
  WALKWAY: '.',
  MARK: 'x',
  INTERSECTION: 'o',
};

export async function loadMap() {
  return {
    map: new Array(MOCK_HEIGHT)
      .fill(null)
      .map(() => new Array(MOCK_WIDTH).fill(CellTypes.OBSTACLE)),
    locations: [],
  };
};
