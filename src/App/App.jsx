import React, { PureComponent } from 'react';
import Toolbox from '../Toolbox';
import GridMap from '../GridMap';
import { loadMap } from './utils';
import './App.module.scss';

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
      <div>
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
            <GridMap
              listeners={listeners}
              map={map}
              cellStyles={cellStyles}
            />
          )}
        </Toolbox>
      </div>
    );
  }
}

export default App;
