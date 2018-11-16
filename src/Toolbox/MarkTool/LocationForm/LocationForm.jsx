import React, { PureComponent, Fragment } from 'react';
import memo from 'memoize-one';

class LocationForm extends PureComponent {
  state = {
    search: '',
  };

  getLocationNames = memo(locations => locations.map(l => l.name));

  getSearchResult = () => {
    const { search } = this.state;
    const { locations } = this.props;

    return [];
  }

  render() {
    return (
      <Fragment>
        <input
          placeholder="location"
        />
      </Fragment>
    );
  }
}

export default LocationForm;
