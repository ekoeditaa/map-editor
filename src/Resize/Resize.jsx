import React, { PureComponent, Fragment } from 'react';
import Dialog from '../Dialog';
import styles from './Resize.module.scss';

class Resize extends PureComponent {
  state = {
    active: false,
  };

  open = () => this.setState({ active: true });
  close = () => this.setState({ active: false });

  submit = () => {
    const width = +this.widthInput.value;
    const height = +this.heightInput.value;
    this.props.resize(height, width);
    this.close();
  }

  render() {
    const { active } = this.state;
    const { map } = this.props;
    const row = map[0];
    const width = row ? row.length : 0;

    return (
      <Fragment>
        <button
          onClick={this.open}
          className={styles.flatButton}
        >
          Resize
        </button>
        <Dialog
          active={active}
          onOutsideClick={this.close}
        >
          <input
            className={styles.input}
            defaultValue={map.length}
            ref={heightInput => this.heightInput = heightInput}
          />
          x
          <input
            className={styles.input}
            defaultValue={width}
            ref={widthInput => this.widthInput = widthInput}
          />
          <button
            className={styles.button}
            onClick={this.close}
          >
            Close
          </button>
          <button
            className={styles.button}
            onClick={this.submit}
          >
            Resize
          </button>
        </Dialog>
      </Fragment>
    );
  }
}

export default Resize;