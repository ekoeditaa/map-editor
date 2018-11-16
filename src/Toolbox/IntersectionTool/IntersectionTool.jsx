import React, { PureComponent } from 'react';
import { CellTypes } from '../../App/utils';
import intersectIcon from '../../assets/intersect_color.svg';
import intersectIconInverted from '../../assets/intersect_inverted.svg';
import memo from 'memoize-one';
import cx from 'classnames';
import styles from './IntersectionTool.module.scss';

class IntersectionTool extends PureComponent {
  handleClick = (row, col) => {
    const { map, setMap } = this.props;
    const nextMap = map.map(row => row.map(cell => cell));
    nextMap[row][col] = CellTypes.INTERSECTION;
    setMap(nextMap);
  }

  getListeners = memo(() => ({
    onClick: this.handleClick,
  }))

  activate = () => {
    const { setActive } = this.props;
    setActive(CellTypes.INTERSECTION);
  }

  componentDidMount() {
    const { isActive, setListeners } = this.props;
    if (isActive) setListeners(this.getListeners());
  }

  componentDidUpdate(prevProps) {
    const { isActive, setListeners } = this.props;

    if (!prevProps.isActive && isActive) setListeners(this.getListeners());
  }

  render() {
    const { isActive } = this.props;

    return (
      <button
        onClick={this.activate}
        className={cx( styles.IntersectionTool, {
          [styles.active]: isActive,
        })}
      >
        <img
          className={styles.icon}
          src={isActive
            ? intersectIconInverted
            : intersectIcon}
          alt="intersect"
        />
        <div className={styles.Tooltip}>
          Add Checkpoint
        </div>
      </button>
    );
  }
}

export default IntersectionTool;
