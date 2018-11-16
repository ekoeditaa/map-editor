import React, { PureComponent, Fragment } from 'react';
import { createPortal } from 'react-dom';
import { CellTypes } from '../../App/utils';
import LocationForm from './LocationForm';
import memo from 'memoize-one';
import styles from './MarkTool.module.scss';

class MarkTool extends PureComponent {
  state = {
    position: null,
  };

  handleClick = (row, col, e) => {
    const { top, left } = e.target.getBoundingClientRect();
    this.setState({ position: { top, left }});
  }

  clearPosition = () => this.setState({ position: null });

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

  componentDidUpdate(prevProps) {
    const { isActive, setListeners } = this.props;

    if (!prevProps.isActive && isActive) setListeners(this.getListeners());
    if (prevProps.isActive && !isActive) {
      this.clear();
    }
  }

  componentWillUnmount() {
    window.removeEventListener('keyup', this.handleEscape);
  }

  render() {
    const { locations } = this.props;
    const { position } = this.state;

    return (
      <Fragment>
        <button
          onClick={this.activate}
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
              close={this.clearPosition}
            />
          </div>,
          document.body,
        )}
      </Fragment>
    );
  }
}

export default MarkTool;
