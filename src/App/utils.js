const MOCK_WIDTH = 20;
const MOCK_HEIGHT = 20;

export const CellTypes = {
  OBSTACLE: '#',
  WALKWAY: '.',
  MARK: 'x',
  INTERSECTION: 'o',
};

export const getCleanLocations = (locations, map) => {
  return locations.map(location => {
    const qrs = location.qrs.filter(item => {
      if (map[item.y][item.x] !== CellTypes.MARK) return false;
      return true; 
    })
    return {
      ...locations,
      qrs
    }
  }).filter(locations => locations.qrs.length > 0);
}

export async function loadMap() {
  return {
    map: new Array(MOCK_HEIGHT)
      .fill(null)
      .map(() => new Array(MOCK_WIDTH).fill(CellTypes.OBSTACLE)),
    locations: [],
  };
};

export async function saveMap(map, locations) {
  return {
    map,
    locations,
  };
};
