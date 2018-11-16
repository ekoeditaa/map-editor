import React, { PureComponent } from 'react';
import Toolbox from '../Toolbox';
import GridMap from '../GridMap';
import Resize from '../Resize';
import { loadMap, saveMap, expand, getCleanLocations } from './utils';
import styles from './App.module.scss';

class App extends PureComponent {
  state = {
    map: [],
    locations: [],
    cellStyles: {},
  };

  async componentDidMount() {
    const { map, locations } = await loadMap();
    this.setState({ map, locations });
  }

  saveMap = async () => {
    const { map, locations } = this.state;
    const cleanLocations = getCleanLocations(locations, map);

    const { map: nextMap, locations: nextLocations } = await saveMap(map, cleanLocations);
    this.setState({
      map: nextMap,
      locations: nextLocations,
    });
  }

  resize = (height, width) => {
    const { map } = this.state;
    const nextMap = expand(map, height, width);
    this.setMap(nextMap);
  }

  setCellStyles = s => this.setState({ cellStyles: s });

  setMap = map => this.setState({ map });

  setLocations = locations => this.setState({ locations });

  render() {
    const {
      map,
      locations,
      cellStyles,
    } = this.state;

    return (
      <div className={styles.App}>
        <h1>Map Editor</h1>
        <Toolbox
          map={map}
          cellStyles={cellStyles}
          locations={locations}
          setCellStyles={this.setCellStyles}
          setMap={this.setMap}
          setLocations={this.setLocations}
        >
          {listeners => (
            <div className={styles.gridContainer}>
              <GridMap
                listeners={listeners}
                map={map}
                cellStyles={cellStyles}
              />
              <Resize
                resize={this.resize}
                map={map}
              />
              <button
                onClick={this.saveMap}
                className={styles.saveButton}
              >
                Save
              </button>
            </div>
          )}
        </Toolbox>
      </div>
    );
  }
}

export default App;
