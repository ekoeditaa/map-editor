import React, { PureComponent, Fragment } from 'react';
import { createPortal } from 'react-dom';
import { getNextMap } from '../CommonTool/utils';
import { CellTypes } from '../../App/utils';
import LocationForm from './LocationForm';
import memo from 'memoize-one';
import cx from 'classnames';
import styles from './MarkTool.module.scss';

class MarkTool extends PureComponent {
  state = {
    position: null,
    row: null,
    col: null
  };

  handleClick = (row, col, e) => {
    const { top, left, width } = e.target.getBoundingClientRect();
    this.setState({
      position: { top, left: left + width },
      row,
      col,
    });
    this.props.setCellStyles({ [`${row}_${col}`]: { backgroundColor: '#5ab109' } })
  }

  clear = () => {
    this.setState({
      position: null,
      row: null,
      col: null,
    });
    this.props.setCellStyles({});
  }

  getListeners = memo(() => ({
    onClick: this.handleClick,
  }))

  activate = () => {
    const { setActive } = this.props;
    setActive(CellTypes.MARK);
  }

  componentDidMount() {
    window.addEventListener('keyup', this.handleEscape);
    const { isActive, setListeners } = this.props;
    if (isActive) setListeners(this.getListeners());
  }

  componentWillUnmount() {
    window.removeEventListener('keyup', this.handleEscape);
  }

  handleEscape = (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      this.clear();
    }
  }

  componentDidUpdate(prevProps) {
    const { isActive, setListeners } = this.props;

    if (!prevProps.isActive && isActive) setListeners(this.getListeners());
    if (prevProps.isActive && !isActive) {
      this.clear();
    }
  }

  submitLocation = (locationName) => {
    const { map, setLocations, locations, setMap } = this.props
    const { row, col } = this.state

    if (locations.find(val => val.name === locationName)) {
      setLocations(
        locations.filter(item => {
          if (item.name === locationName) {
            return {
              ...item,
              qrs: [
                ...item.qrs,
                { y: row, x: col }
              ]
            }
          }
          return item
        })
      )
    } else {
      setLocations([
        ...locations,
        {
          name: locationName,
          qrs: [
            { y: row, x: col }
          ]
        }
      ])
    }

    const nextMap = getNextMap(map, [row, col], [row, col], CellTypes.MARK);
    setMap(nextMap);
    this.clear()
  }

  render() {
    const { locations, isActive } = this.props;
    const { position } = this.state;

    return (
      <Fragment>
        <button
          onClick={this.activate}
          className={cx( styles.MarkTool, {
            [styles.active]: isActive,
          })}
        >
          Mark
        </button>
        {position && createPortal(
          <div
            className={styles.Form}
            style={position}
          >
            <LocationForm
              locations={locations}
              submit={this.submitLocation}
              close={this.clear}
            />
          </div>,
          document.body,
        )}
      </Fragment>
    );
  }
}

export default MarkTool;
