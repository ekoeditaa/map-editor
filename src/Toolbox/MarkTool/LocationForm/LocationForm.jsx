import React, { PureComponent } from 'react';
import memo from 'memoize-one';
import styles from './LocationForm.module.scss';

class LocationForm extends PureComponent {
  state = {
    search: '',
  };

  getLocationNames = memo(locations => locations.map(l => l.name));

  componentDidMount () {
    this.refs.input.focus()
  }

  onSearchChange = (e) => {
    if (!e.target) return
    this.setState({ search: e.target.value })
  }

  handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      this.handleSubmit()
    }
  }

  getSearchResult = () => {
    const { search } = this.state;
    const { locations } = this.props;
    return locations.filter(item => item.name.includes(search));
  }

  handleSubmit = () => this.state.search && this.props.submit(this.state.search)

  handleClickSearchItem = (val) => this.props.submit(val)

  render() {
    const { search } = this.state

    return (
      <div className={styles.LocationForm}>
        <input
          ref="input"
          className={styles.input}
          placeholder="location"
          onChange={this.onSearchChange}
          onKeyPress={this.handleKeyPress}
          value={search}
        />
        <div className={styles.LocationList}>
          {this.getSearchResult().map(item => (
            <div key={item.name} className={styles.LocationItem} onClick={() => this.handleClickSearchItem(item.name)}>{item.name}</div>
          ))}
        </div>
        <button className={styles.button} onClick={this.handleSubmit}>OK</button>
      </div>
    );
  }
}

export default LocationForm;
