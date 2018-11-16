import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { getStyle, getContent } from './utils';
import styles from './GridCell.module.scss';

class GridCell extends PureComponent {
  proxyListeners = (listeners) => {
    const { row, col } = this.props;
    const result = {};

    Object
      .entries(listeners)
      .forEach(([key, handler]) => {
        result[key] = e => handler(row, col, e);
      });

    return result;
  }

  render() {
    const {
      listeners,
      value,
      style,
      row,
      col,
      map,
    } = this.props;

    const proxied = this.proxyListeners(listeners);

    return (
      <td
        {...proxied}
        style={{ ...style, ...getStyle(value, row, col, map) }}
        className={styles.GridCell}
      >
        {getContent(value)}
      </td>
    );
  }
}

GridCell.propTypes = {
  listeners: PropTypes.objectOf(PropTypes.func).isRequired,
  style: PropTypes.object,
};

GridCell.defaultProps = {
  style: {},
}

export default GridCell;
