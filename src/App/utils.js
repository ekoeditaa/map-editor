export const CellTypes = {
  OBSTACLE: '#',
  WALKWAY: '.',
  MARK: 'x',
  INTERSECTION: 'o',
};

const DEFAULT_CELL = CellTypes.WALKWAY;

export const getCleanLocations = (locations, map) => {
  return locations.map(location => {
    const qrs = location.qrs.filter(item => {
      if (map[item.y][item.x] !== CellTypes.MARK) return false;
      return true;
    })
    return {
      ...location,
      qrs
    }
  }).filter(locations => locations.qrs.length > 0);
}

export async function loadMap() {
  const res = await fetch('http://b1f17f9c.ngrok.io/api/admin/get_map/');
  const { data } = await res.json();

  return {
    map: data.grid.map(row => row.split('')),
    locations: data.locations,
  };
};

export async function saveMap(map, locations) {
  const res = await fetch('http://b1f17f9c.ngrok.io/api/admin/edit_map/', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      grid: map.map(row => row.join('')),
      locations,
    }),
  });

  const { data } = await res.json();
  return {
    map: data.grid.map(row => row.split('')),
    locations: data.locations,
  };
}

export const expand = (map, height, width) => {
  let nextMap = map.map(row => row.map(cell => cell));

  if (map.length > height) nextMap = nextMap.slice(0, height + 1);
  else nextMap = [...nextMap, ...new Array(height - map.length)
    .fill(null)
    .map(() => new Array(map[0].length).fill(DEFAULT_CELL))];

  if (map[0].length > width) nextMap = nextMap.map(row => row.slice(0, width + 1));
  else nextMap = nextMap.map(row => [...row, ...new Array(width - map[0].length).fill(DEFAULT_CELL)]);

  return nextMap;
};
