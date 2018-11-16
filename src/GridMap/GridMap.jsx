import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import GridCell from '../GridCell';
import styles from './GridMap.module.scss';

class GridMap extends PureComponent {
  render() {
    const {
      listeners,
      cellStyles,
      map,
    } = this.props;

    return (
      <table className={styles.GridMap}>
        <tbody>
          {map.map((row, rowNum) => (
            <tr key={rowNum}>
              {row.map((cell, colNum) => {
                const key = `${rowNum}_${colNum}`;
                const style = cellStyles[key];

                return (
                  <GridCell
                    key={key}
                    value={cell}
                    col={colNum}
                    row={rowNum}
                    map={map}
                    listeners={listeners}
                    style={style}
                  />
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
}

GridMap.propTypes = {
  listeners: PropTypes.objectOf(PropTypes.func).isRequired,
};

GridMap.defaultProps = {
  listeners: {},
};

export default GridMap;
