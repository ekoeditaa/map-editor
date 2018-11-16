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
  fetch('http://b1f17f9c.ngrok.io/api/admin/get_map/')
  return {
    map: new Array(MOCK_HEIGHT)
      .fill(null)
      .map(() => new Array(MOCK_WIDTH).fill(CellTypes.OBSTACLE)),
    locations: [],
  };
};

export async function saveMap(map, locations) {
  const res = await fetch('http://b1f17f9c.ngrok.io/api/admin/edit_map/', {
    method: 'POST',
    body: JSON.stringify({
      grid: map,
      locations
    })
  });
  const data = await res.json();
  return {
    map: data.result.grid,
    locations: data.result.locations
  };
}
